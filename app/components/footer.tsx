import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative  py-12 px-6">
      <div className="absolute inset-0">
        <Image
          src="/footerBg.png"
          alt="Footer Background"
          priority
          fill
          className="object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start">
        {/* Newsletter Signup Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl mb-4 font-bagnard">
            Sign up to my newsletter
          </h2>
          <p className="text-[1.1rem]  mb-6">
            Sign up with your email to receive occasional news and updates
            <br />
            (maximum 12 a year).
          </p>
          <form className="flex flex-col space-y-4 w-80">
            <input
              type="text"
              placeholder="First Name"
              className="bg-transparent rounded-md px-4 py-2 text-[#45381d] placeholder-[#45381d] border-2 border-[rgba(151,131,120,1)] focus:border-[rgba(121,101,90,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(151,131,120,1)]"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="bg-transparent rounded-md px-4 py-2 text-[#45381d] placeholder-[#45381d] border-2 border-[rgba(151,131,120,1)] focus:border-[rgba(121,101,90,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(151,131,120,1)]"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent rounded-md px-4 py-2 text-[#45381d] placeholder-[#45381d] border-2 border-[rgba(151,131,120,1)] focus:border-[rgba(121,101,90,1)] focus:outline-none focus:ring-2 focus:ring-[rgba(151,131,120,1)]"
            />
            <button
              type="submit"
              className="w-40 px-6 py-2 rounded-lg bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] hover:underline hover:underline-offset-4"
            >
              Sign up
            </button>
          </form>
        </div>

        {/* Links Section */}
        <div className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-60">
          <h2 className="text-2xl mb-4 font-bagnard">Links</h2>
          <Link
            href="/shop"
            className="text-[1.1rem] block  hover:underline pb-2"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="text-[1.1rem] block  hover:underline pb-2"
          >
            About
          </Link>
          <Link
            href="/gallery"
            className="text-[1.1rem] block  hover:underline pb-2"
          >
            Gallery
          </Link>
          <Link
            href="/faq"
            className="text-[1.1rem] block  hover:underline pb-2"
          >
            FAQ
          </Link>
          <a
            href="https://www.instagram.com/belle.pots/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[1.1rem] block  hover:underline pb-2"
          >
            Instagram
          </a>
          <a
            href="mailto:hello@belleproffitt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[1.1rem] block  hover:underline pb-2"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="relative mt-8 text-center  text-sm">
        &copy; 2024 by Isabelle Proffitt
      </div>
    </footer>
  );
}
