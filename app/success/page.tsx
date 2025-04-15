// app/success/page.tsx
import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { headers } from 'next/headers';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16' as any,
});

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    throw new Error('Please provide a valid session_id (`cs_test_...`)');
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'payment_intent', 'customer_details'],
  });

  const customerEmail = session.customer_details?.email;
  const status = session.status;

  if (status === 'open') {
    redirect('/');
  }

  if (status === 'complete') {
    return (
      <section id="success" className="container mx-auto py-20 text-center">
        <p className="text-xl mb-4">
          Thank you for ordering my ceramics! A confirmation email will be sent to{' '}
          <strong>{customerEmail}</strong>. If you have any questions, please email:
        </p>
        <a href="mailto:orders@example.com" className="text-blue-600 underline">
            hello@belleproffitt.com
        </a>
      </section>
    );
  }

  return (
    <section className="container mx-auto py-20 text-center">
      <p>Unable to verify the order status.</p>
    </section>
  );
}