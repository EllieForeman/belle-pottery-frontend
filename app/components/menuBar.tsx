"use client";

import { useState } from "react";
import Link from "next/link";

const MenuBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    console.log("Burger menu toggled!", !isOpen);
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-[var(--background)] mx-4 p-2 lg:p-4 lg:mx-8">
      <button
        className="z-index: 9999 absolute right-0 mr-6 mt-2 md:hidden block focus:outline-none z-20"
        onClick={handleClick}
      >
        <span className="text-lg font-bagnard material-icons">
          {isOpen ? "close" : "menu"}
        </span>
      </button>
      <nav className="flex justify-between items-center mt-4">
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
          <ul className="flex space-x-10 text-black font-bagnard">
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
              <Link className="text-lg" href="/contact">
                Gallery
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-end w-[100px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8 "
            >
              <path d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </div>
        </div>

        {/* Full-Screen Mobile Menu */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-white z-10 flex flex-col justify-center items-center space-y-6 md:hidden"
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
                  Gallry
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
