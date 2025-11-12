import Image from "next/image";
import Link from "next/link";
import NewsletterForm from "../forms/newsletter";

export default function Footer() {
  return (
    <footer className="relative  pt-12 pb-6 px-6">
      <div className="absolute inset-0">
        <Image
          src="/banner.png"
          alt="Footer Background"
          priority
          fill
          className="object-cover object-bottom"
        />
      </div>

      <div className="relative max-w-[1450px] mx-auto flex flex-col md:flex-row justify-between items-start">
        {/* Newsletter Signup Section */}
        <div className="w-full md:w-1/2 md:pl-6">
          <h2 className="text-2xl mb-4 font-bagnard">
            Sign up to my newsletter
          </h2>
          <p className="text-[15px] mb-4">
            Sign up with your email to receive occasional news and updates
          </p>
          <NewsletterForm />
        </div>

        {/* Links Section */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-60">
          <h2 className="text-2xl mb-4 font-bagnard">Links</h2>
          <Link
            href="/shop"
            className="text-[1.1rem] block underline-offset-2 underline pb-2 hover:font-bold"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-[1.1rem] block underline-offset-2  underline pb-2 hover:font-bold"
          >
            About
          </Link>
          <Link
            href="/gallery"
            className="text-[1.1rem] block underline-offset-2 underline pb-2 hover:font-bold"
          >
            Gallery
          </Link>
          <a
            href="https://www.instagram.com/belle.pots/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[1.1rem] block underline-offset-2 underline pb-2 hover:font-bold"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@belleproffitt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[1.1rem] block  underline-offset-2 underline pb-2 hover:font-bold"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="relative text-center text-xs">
        &copy; Copyright Isabelle Proffitt 2025
      </div>
    </footer>
  );
}
