"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type CartItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_KEY = "cart";
const CART_TIMESTAMP_KEY = "cartTimestamp";
const CART_EXPIRY_WEEKS = 3;

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart on first render with expiry check
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    const storedTimestamp = localStorage.getItem(CART_TIMESTAMP_KEY);

    if (storedCart && storedTimestamp) {
      const now = Date.now();
      const savedTime = parseInt(storedTimestamp, 10);
      const weeksOld = (now - savedTime) / (1000 * 60 * 60 * 24 * 7);

      if (weeksOld < CART_EXPIRY_WEEKS) {
        try {
          setCart(JSON.parse(storedCart));
        } catch (e) {
          console.warn("Failed to parse stored cart JSON:", e);
          setCart([]);
        }
      } else {
        // Expired cart – clear storage
        localStorage.removeItem(CART_KEY);
        localStorage.removeItem(CART_TIMESTAMP_KEY);
      }
    }
  }, []);

  // Sync cart to localStorage on change + update timestamp
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem(CART_TIMESTAMP_KEY, Date.now().toString());
  }, [cart]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_KEY);
    localStorage.removeItem(CART_TIMESTAMP_KEY);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
