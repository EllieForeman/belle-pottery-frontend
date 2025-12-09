"use client";

import Image from "next/image";
import { useCart } from "../context/cartContext";
import CheckoutButton from "../components/checkoutButton";
import { useEffect, useState } from "react";
import { fetchFromCMS } from "../lib/api";
import Link from "next/link";

export default function CartPage() {

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    if (cart.length === 0) return;

    const validateCartItems = async () => {
      for (let item of cart) {
        try {
          const res = await fetchFromCMS(
            "sale-items",
            `filters[id][$eq]=${item.id}`
          );
          const product = res?.data?.[0];

          if (!product || product.stock < 1) {
            removeFromCart(item.id);
            setErrorMessage(`${item.title} is no longer available and was removed from your cart.`);
          }
        } catch (err) {
          console.error("Failed to validate cart item:", item.id, err);
        }
      }
    };

    validateCartItems();
  }, [cart, removeFromCart, setErrorMessage]);

  return (
    <div className="p-10 w-full sm:w-[95%] max-w-[1800px] mx-auto px-4 sm:px-2 pb-10">
      <h1 className={`text-2xl pb-6`}>Shopping Basket</h1>
      {errorMessage && (
        <div className="bg-[rgba(69,56,29,0.1)] text-[rgba(69,56,29,1)] border border-[rgba(69,56,29,0.3)] p-3 mb-6 rounded-sm">
          {errorMessage}
        </div>
      )}
      {!hasMounted ? null : cart.length === 0 ? (
        <div className="pb-64"> 
         <p>Your basket is currently empty.</p>
         <p className="pt-4">Browse the shop items <Link className="underline-offset-2 underline pb-2 hover:font-bold" href="../shop">here</Link></p>
        </div>
      ) : (
        <>
          <ul className="max-w-[600px]">
            {cart.map((item) => (
              <li
                key={item.id}
                className="relative first:border-t-[1.5px] border-b-[1.5px] border-[var(--foreground)] py-2 sm:py-8"
              >
                <button
                  className="font-bold absolute top-4 right-2 text-sm text-[var(--foreground)] w-6 h-6 flex items-center justify-center border-[1.5px] border-[var(--foreground)]"
                  onClick={() => removeFromCart(item.id)}
                >
                  X
                </button>
                <div className="flex flex-col gap-4 sm:grid sm:grid-cols-5 sm:gap-4 sm:items-center">
                  <div>
                    <Image
                      src={item.image || "/default.jpg"}
                      alt="Product Image"
                      height={240}
                      width={140}
                      className="rounded-sm"
                    />
                  </div>

                  <div className={`text-xl`}>{item.title}</div>

                  <div
                    className={`text-xl flex flex-col justify-start sm:items-end`}
                  >
                    quantity: {item.quantity}
                  </div>
                  <div
                    className={`text-xl flex flex-col justify-start sm:items-end`}
                  >
                    £{item.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="max-w-[600px] pt-6 mt-6 flex justify-between">
            <span className={`text-xl`}>Subtotal</span>
            <span className={`text-xl`}>£{total.toFixed(2)}</span>
          </div>
          <div className="italic">Shipping will be added at checkout. It will be £5 unless your order contains only pins and/or buttons, and then shipping is free!</div>

          <div className="pt-8 max-w-[600px] flex justify-center md:justify-end">
            <CheckoutButton />
          </div>
        </>
      )}
    </div>
  );
}
