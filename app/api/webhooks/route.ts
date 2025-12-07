import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  try {
    console.log("🔔 Webhook route invoked"); 
    const rawBody = Buffer.from(await req.arrayBuffer());
    const sig = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook signature error:", err?.message);
      return new NextResponse(`Webhook Error: ${err.message}`, {
        status: 400,
      });
    }

    console.log(" Webhook event type:", event.type);

    if (
      event.type === "checkout.session.completed" ||
      event.type === "checkout.session.expired"
    ) {
      const session = event.data.object as Stripe.Checkout.Session;
      const cart = session.metadata?.cart
        ? JSON.parse(session.metadata.cart)
        : [];

      if (event.type === "checkout.session.completed") {
        console.log("Checkout completed for session", session.id);
      }

      if (event.type === "checkout.session.expired") {
        console.log("Checkout expired for session", session.id);

        for (const item of cart) {
          try {
            await fetch(
              `${process.env.STRAPI_URL}/api/sale-items/unreserve`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                },
                body: JSON.stringify({
                  id: item.id,
                  quantity: item.quantity ?? 1,
                }),
              }
            );
          } catch (err) {
            console.error("Failed to unreserve item", item.id, err);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
