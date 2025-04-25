import type { Metadata } from "next";
import "./globals.css";
import MenuBar from "./components/menuBar";
import { CartProvider } from "./context/cartContext";
import Footer from "./components/footer";

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
          <div className="w-full sm:w-[95%] max-w-[1800px] mx-auto px-2 sm:px-6 md:px-8 pb-10">
          {children}
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
