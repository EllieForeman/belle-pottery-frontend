"use client";

import { useCart } from "../context/cartContext";
import { useState } from "react";
import { fetchFromCMS } from "../lib/api";

export default function CheckoutButton() {
const [checkoutError, setCheckoutError] = useState<string | null>(null);
const { cart, removeFromCart } = useCart();

const handleCheckout = async () => {
  if (cart.length === 0) return;

  let validCart = [];
  let issues = [];

  for (let item of cart) {
    const res = await fetchFromCMS("sale-items", `filters[id][$eq]=${item.id}`);
    const product = res?.data?.[0];

    if (!product || product.stock < 1) {
      removeFromCart(item.id);
      issues.push(`"${item.title}" is no longer available.`);
    } else {
      validCart.push(item);
    }
  }

  if (issues.length > 0) {
    setCheckoutError(issues.join(" "));
    return;
  }


  const reserveRes = await fetch("/api/reserve-stock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: validCart }),
  });

   const reserveData = await reserveRes.json().catch(() => ({} as any));

    if (!reserveRes.ok) {
      setCheckoutError(
        reserveData?.error ||
          "Some or all items just sold out while you were checking out."
      );

      // Remove failed items from the cart
      if (Array.isArray(reserveData?.failed)) {
        reserveData.failed.forEach((f: any) => {
          removeFromCart(f.id);
        });
      }
      return;
    }

    const { reservedIds, failed } = reserveData as {
      reservedIds: (number | string)[];
      failed: { id: number | string; title?: string }[];
    };

    // only available items in the cart
    const reservedCart = validCart.filter((item) =>
      reservedIds.includes(item.id)
    );

    if (reservedCart.length === 0) {
      setCheckoutError(
        "All items in your cart were just bought by other customers."
      );
      return;
    }

    if (Array.isArray(failed) && failed.length > 0) {
    failed.forEach((f) => removeFromCart(String(f.id)));

      const failedTitles = failed
        .map((f) => f.title || `item ${f.id}`)
        .join(", ");

      setCheckoutError(
        `While you were checking out, the following items were bought up by someone else and removed from your cart: ${failedTitles}.`
      );
    } else {
      setCheckoutError(null);
    }

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart: reservedCart }),
    });

    const data = await res.json();

    if (data?.url) {
      window.location.href = data.url;
    } else {
      setCheckoutError("Error creating checkout session. Please try again.");
    }
  };


  return (
    <div>
      {checkoutError && (
        <div className="bg-[rgba(69,56,29,0.1)] text-[rgba(69,56,29,1)] border border-[rgba(69,56,29,0.3)] p-3 mb-3 rounded-sm">
          {checkoutError}
        </div>
      )}
      <button
        onClick={handleCheckout}
        className="w-64 mt-4 px-6 py-3 border-2 rounded bg-[var(--foreground)] text-[var(--background)] border-[var(--foreground)] hover:underline hover:underline-offset-4"
      >
        Checkout
      </button>
    </div>

  );
}
