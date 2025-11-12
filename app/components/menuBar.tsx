"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/cartContext";

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
        className="z-index: 9999 absolute right-0 mr-6 mt-2 md:hidden block focus:outline-none z-20"
        onClick={handleClick}
      >
        <span className="text-lg font-bagnard material-icons">
          {isOpen ? "close" : "menu"}
        </span>
      </button>
      <nav className="flex justify-between items-center mt-2">
        <div>
          <Link href="/">
            <h1 className="text-xl md:text-xl lg:text-4xl text-left">
              Isabelle Proffitt
              <br />
              Pottery
            </h1>
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
                className="text-xl hover:underline underline-offset-4"
                href="/gallery"
              >
                Gallery
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
        {isOpen && (
          <div
            className="bg-[var(--background)] fixed inset-0 z-10 flex flex-col justify-center items-center space-y-6 md:hidden"
            onClick={() => setIsOpen(false)} // Close the menu when clicking outside the links
          >
            <ul className="text-black font-bagnard text-center space-y-12">
              <li>
                <Link
                  className="text-4xl"
                  href="/shop"
                  onClick={() => setIsOpen(false)}
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  className="text-4xl"
                  href="/about"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  className="text-4xl"
                  href="/gallery"
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  className="text-4xl"
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                >
                  Basket
                  {itemCounter > 0 && <span>: {itemCounter}</span>}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default MenuBar;
