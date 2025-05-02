"use client";

import { useCart } from "../context/cartContext";

export default function CheckoutButton() {
  const { cart } = useCart();

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    console.log("cart", JSON.stringify({ cart }));
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    } else {
      alert("Error creating checkout session");
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-80 mt-4 px-6 py-3 border-2 rounded bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] hover:underline hover:underline-offset-4"
    >
      Checkout
    </button>
  );
}
