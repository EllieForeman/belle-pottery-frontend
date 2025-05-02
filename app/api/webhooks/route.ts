import { reduceProductStock, getStockFromCMS } from "@/app/lib/stock";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed.", err.message);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // Handle successful checkout session
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const sessionWithItems = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items.data.price.product"],
        },
      );

      const lineItems = sessionWithItems.line_items?.data || [];

      for (const item of lineItems) {
        if (!item.price || typeof item.price === "string") continue;
        const product = item.price.product;

        if (typeof product === "string" || !("metadata" in product)) continue;

        const productId = product.metadata.productId;
        const currentStock = await getStockFromCMS(productId);
        await reduceProductStock(Number(productId), currentStock);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook handler failed:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
