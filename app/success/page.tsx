import { redirect } from "next/navigation";
import { stripe } from "../lib/stripe";
import { fetchFromCMS } from "../lib/api";
import Image from "next/image";

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
    expand: ["line_items", "payment_intent"],
  });

  const status = session.status;
  const customerEmail = session.customer_details?.email;

  const aboutData = await fetchFromCMS("about");
  const profileImage =
    aboutData?.data?.profilePhoto?.formats?.medium?.url ?? null;

  return (
    <div
      id="success"
      className="pt-20 min-h-[500px] w-full sm:w-[95%] max-w-[1500px] mx-auto px-4 sm:px-2 pb-10"
    >
      {status === "complete" && (
        <>
          <h2 className="text-2xl mb-4 font-bagnard flex justify-center">
            Thank you for your order!
          </h2>
          <p className="mt-4 text-lg flex justify-center">
            I will get it in the post ASAP
          </p>
          <p className="mt-4 text-lg flex justify-center">
            A confirmation email will be sent to {customerEmail}
          </p>
          <div className="mt-4 text-lg flex justify-center gap-x-2">
            <p>If you have any questions please reach out to </p>
            <a
              className="underline underline-offset-4"
              href="mailto:hello@belleproffitt.com"
            >
              hello@belleproffitt.com
            </a>
          </div>
          {profileImage && (
            <div className="flex justify-center mt-8">
              <Image
                src={profileImage}
                alt="Profile Photo"
                width={300}
                height={400}
                className="object-cover rounded-md shadow-lg"
              />
            </div>
          )}
        </>
      )}
      {status === "open" && redirect("/")}
    </div>
  );
}
