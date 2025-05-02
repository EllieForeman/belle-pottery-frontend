import { redirect } from "next/navigation";
import { stripe } from "../lib/stripe";
import { fetchFromCMS } from "../lib/api";
import Image from "next/image";

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
  };
}

interface CustomerDetails {
  email: {
    session_id?: string;
  };
}

export default async function Success({ searchParams }: SuccessPageProps) {
  const aboutData = await fetchFromCMS("about");

  if (!aboutData?.data?.profilePhoto?.formats?.medium?.url) {
    return <div>Error loading profile image.</div>;
  }

  const profileImage = aboutData.data.profilePhoto.formats.medium.url;

  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  const status = session.status;
  const customerEmail = session.customer_details?.email;

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    return (
      <div
        id="success"
        className="pt-20 min-h-[500px] w-full sm:w-[95%] max-w-[1500px] mx-auto px-4 sm:px-2 pb-10"
      >
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
            className="underline underline-offset-4 "
            href="mailto:hello@belleproffitt.com"
          >
            {" "}
            hello@belleproffitt.com
          </a>
        </div>
        <div className="flex justify-center mt-8">
          <Image
            src={profileImage}
            alt="Profile Photo"
            width={300}
            height={400}
            className="object-cover rounded-md shadow-lg"
          />
        </div>
      </div>
    );
  }
}
