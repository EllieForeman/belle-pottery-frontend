"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/cartContext";
import Image from "next/image";

const MenuBar: React.FC<{ isHome?: boolean }> = ({ isHome = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  let itemCounter = 0;
  cart.map((item) => itemCounter += item.quantity);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`w-full z-20 py-4 px-6 transition-all duration-300 ${
        isHome
          ? "fixed top-0 left-0 w-full z-20 bg-transparent text-background text-bold"
          : "bg-background text-foreground"
      }`}
    >
    <button
      className={`
        absolute right-0 mr-6 mt-2 md:hidden block focus:outline-none z-[9999]
        ${
          isHome
            ? (isOpen ? "text-[var(--foreground)]" : "text-[var(--background)]")
            : "text-[var(--foreground)]"
        }
      `}
      onClick={handleClick}
    >
      <span className="text-lg font-bagnard material-icons">
        {isOpen ? "close" : "menu"}
      </span>
    </button>

      <nav className="flex justify-between items-center mt-2">
        <div>
          <Link href="/">
            <Image
              src="/NavbarTitle.png"
              alt="Isabelle Proffitt Pottery"
              width={200}
              height={80}
              priority
              className={`w-[230px] md:w-[250px] lg:w-[450px] xl:w-[550px] ${isHome ? "brightness-0 invert" : ""}`}
            />
          </Link>
        </div>
        {/*  DESKTOP MENU */}
        <div className="flex items-center space-x-8 max-md:hidden">
          <ul
            className={`pb-8 flex space-x-10 font-bagnard ${isHome ? "text-[var(--background)]" : "text-[var(--foreground)]"}`}
          >
            <li>
              <Link
                className="text-xl hover:underline underline-offset-4"
                href="/shop"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                className="text-xl hover:underline underline-offset-4"
                href="/about"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="text-xl hover:underline underline-offset-4 whitespace-nowrap"
                href="/gallery"
              >
                Selected Works
              </Link>
            </li>
            <li>
              <Link
                className="text-xl hover:underline underline-offset-4"
                href="/cart"
              >
                Basket
                {itemCounter > 0 && <span>: {itemCounter}</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* Full-Screen Mobile Menu */}
        <div
          className={`fixed inset-0 z-10 flex flex-col justify-center items-center space-y-6 md:hidden
            bg-white text-[var(--foreground)] transition-opacity duration-500 ease-in-out
            ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsOpen(false)}
        >
          <ul className="font-bagnard text-center space-y-12 group">
              <li>
                <Link
                  className="text-4xl transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  className="text-4xl transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
                  href="/about"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-4xl transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
                  href="/gallery"
                  onClick={() => setIsOpen(false)}
                >
                  Selected Works
                </Link>
              </li>
              <li>
                <Link
                  className="text-4xl transition-opacity duration-300 group-hover:opacity-50 hover:!opacity-100"
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                >
                  Basket
                  {itemCounter > 0 && <span>: {itemCounter}</span>}
                </Link>
              </li>
            </ul>
          </div>
      </nav>
    </header>
  );
};

export default MenuBar;
