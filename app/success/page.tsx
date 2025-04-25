import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent", "customer_details"],
  });

  const customerEmail = session.customer_details?.email;
  const status = session.status;

  if (status === "open") {
    redirect("/");
  }

  return (
    <section className="mx-auto py-20 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Thank you for your order!</h1>
      <p className="text-lg mb-2">
        A confirmation email has been sent to <strong>{customerEmail}</strong>.
      </p>
      <p>
        If you have questions, contact{" "}
        <a href="mailto:orders@example.com">orders@example.com</a>
      </p>
    </section>
  );
}
