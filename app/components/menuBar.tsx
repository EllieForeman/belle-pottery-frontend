"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/cartContext";

const MenuBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const itemCount = cart.length;
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[var(--background)] p-4 sm:px-6 lg:px-8">
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
          <ul className="flex space-x-10 text-[var(--foreground)] font-bagnard">
            <li>
              <Link className="text-lg" href="/shop">
                Shop
              </Link>
            </li>
            <li>
              <Link className="text-lg" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-lg" href="/gallery">
                Gallery
              </Link>
            </li>
            <li>
              <Link className="text-lg" href="/cart">
                Basket
                {itemCount > 0 && <span>: {itemCount}</span>}
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
                  href="/"
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
                  href="/contact"
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
                  {itemCount > 0 && <span>: {itemCount}</span>}
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
