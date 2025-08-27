import { reduceProductStock, getStockFromCMS } from "@/app/lib/stock";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {

  try {
    const rawBody = Buffer.from(await req.arrayBuffer());
    const sig = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err: any) {
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const sessionWithItems = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items.data.price.product", "line_items"],
        }
      );

      const lineItems = sessionWithItems.line_items?.data || [];

      for (const item of lineItems) {
        if (!item.price || typeof item.price === "string") continue;
        const product = item.price.product;

        if (typeof product === "string" || !("metadata" in product)) continue;
        const productId = product.metadata.productId;
        const documentId = product.metadata.documentId;
        const currentStock = await getStockFromCMS(productId);
        await reduceProductStock(documentId, currentStock);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
