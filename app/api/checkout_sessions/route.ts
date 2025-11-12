import Stripe from "stripe";
import { NextResponse } from "next/server";
import { fetchFromCMS } from "@/app/lib/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cart = body.cart;

    const isOnlyBrooch = cart.length > 0 && cart.every((item: { type: string; }) => item.type === "brooch");


    const line_items = await Promise.all(
      cart.map(async (item: any) => {
        const res = await fetchFromCMS(
          "sale-items",
          `filters[id][$eq]=${item.id}`,
        );
        const cmsProduct = res?.data?.[0];
        if (!cmsProduct) {
          throw new Error(`Product ${item.id} no longer available`);
        }

        return {
          price_data: {
            currency: "gbp",
            product_data: {
              name: cmsProduct.title,
              images: item.image ? [item.image] : [],
              metadata: {
                productId: cmsProduct.id.toString(),
                documentId: cmsProduct.documentId
              },
            },
            unit_amount: cmsProduct.price * 100,
          },
          quantity: 1,
        };
      }),
    );

    type ShippingOption = Stripe.Checkout.SessionCreateParams.ShippingOption;

    const standardOption: ShippingOption = {
      shipping_rate_data: {
        display_name: "Standard (2–4 business days)",
        type: "fixed_amount",
        fixed_amount: { amount: 495, currency: "gbp" },
        delivery_estimate: {
          minimum: { unit: "business_day", value: 3 },
          maximum: { unit: "business_day", value: 4 },
        },
      },
    };

    const freeBroochOption: ShippingOption = {
      shipping_rate_data: {
        display_name: "Free Shipping (Brooch)",
        type: "fixed_amount",
        fixed_amount: { amount: 0, currency: "gbp" },
        delivery_estimate: {
          minimum: { unit: "business_day", value: 2 },
          maximum: { unit: "business_day", value: 4 },
        },
      },
    };

    const shipping_options: ShippingOption[] = isOnlyBrooch ? [freeBroochOption] : [standardOption];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
        billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["GB"], 
      },
      shipping_options,
      phone_number_collection: { enabled: true },
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 },
    );
  }
}
