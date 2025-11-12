"use client";

import { useCart } from "../context/cartContext";
import { useState } from "react";

type Props = {
  product: {
    id: string | number;
    title: string;
    price: number;
    image?: string;
    stock: number;
    type: string;
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addToCart, cart } = useCart();
  const [added, setAdded] = useState(false);

  const itemInCart = cart.find((item) => item.id === product.id.toString());
  const quantity = itemInCart?.quantity || 0;

  const inCartQuantity = itemInCart?.quantity || 0;
  const availableStock = product.stock;

  const outOfStock = availableStock === 0;
  const isMaxedOut = inCartQuantity >= availableStock;

  const handleClick = () => {
    addToCart({
      id: product.id.toString(),
      title: product.title,
      price: product.price,
      image: product.image,
      type: product.type,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mt-6 space-y-2">
      <button
        onClick={handleClick}
        disabled={outOfStock || isMaxedOut}
        className={`w-64 px-6 py-3 border-2 rounded transition-all duration-300 ${
          outOfStock || isMaxedOut
            ? "bg-[#45381d]/30 text-[var(--foreground)] cursor-not-allowed"
            : "bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--background)] hover:text-[var(--foreground)] border-[var(--foreground)]"
        }`}
      >
        {outOfStock
          ? "Out of Stock"
          : isMaxedOut
            ? "All items in basket"
            : added
              ? "✔ Added!"
              : "Add to basket"}
      </button>

      {quantity > 0 && (
        <p className="text-sm text-gray-500">You have {quantity} in your basket</p>
      )}
    </div>
  );
}
