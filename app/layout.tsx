import type { Metadata } from "next";
import "./globals.css";
import MenuBar from "./components/menuBar";
import { CartProvider } from "./context/cartContext";
import Footer from "./components/footer";

import { Source_Sans_3, Alegreya_Sans } from "next/font/google";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--source-sans",
});

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
    <html lang="en" className={`${sourceSans.variable} antialiased`}>
      <body className="font-sans">
        <CartProvider>
          <MenuBar />
          <div className="w-full sm:w-[95%] max-w-[1800px] mx-auto px-4 sm:px-2 pb-10">
            {children}
          </div>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
