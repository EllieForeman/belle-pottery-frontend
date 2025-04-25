import type { Metadata } from "next";
import "./globals.css";
import MenuBar from "./components/menuBar";
import { CartProvider } from "./context/cartContext";

export const metadata: Metadata = {
  title: "Isabelle Proffitt Pottery",
  description:
    "Website for Belle Proffitt's pottery, including home, about, her work and online shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">
        <CartProvider>
          <MenuBar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
