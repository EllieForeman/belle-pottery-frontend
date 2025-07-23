import Stripe from "stripe";
import { NextResponse } from "next/server";
import { fetchFromCMS } from "@/app/lib/api";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cart = body.cart;

    const line_items = await Promise.all(
      cart.map(async (item: any) => {
        const res = await fetchFromCMS(
          "sale-items",
          `filters[id][$eq]=${item.id}`,
        );
        const cmsProduct = res?.data?.[0];
        console.log("cmsProduct", cmsProduct);
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
              },
            },
            unit_amount: cmsProduct.price * 100,
          },
          quantity: 1,
        };
      }),
    );

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items,
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
