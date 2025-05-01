"use client";

import Image from "next/image";
import { useCart } from "../context/cartContext";
import { Lusitana } from "next/font/google";
import CheckoutButton from "../components/checkoutButton";

const lusitana = Lusitana({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-10">
      <h1 className={`${lusitana.className} text-2xl pb-6`}>Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
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

                  <div className={`${lusitana.className} text-xl`}>
                    {item.title}
                  </div>

                  <div
                    className={`${lusitana.className} text-xl flex flex-col justify-start sm:items-end`}
                  >
                    quantity: {item.quantity}
                  </div>
                  <div
                    className={`${lusitana.className} text-xl flex flex-col justify-start sm:items-end`}
                  >
                    £{item.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="max-w-[600px] pt-6 mt-6 flex justify-between">
            <span className={`${lusitana.className} text-xl`}>Subtotal</span>
            <span className={`${lusitana.className} text-xl`}>
              £{total.toFixed(2)}
            </span>
          </div>
          <div className="pt-8 max-w-[600px] flex justify-end">
            <CheckoutButton />
          </div>
        </>
      )}
    </div>
  );
}
