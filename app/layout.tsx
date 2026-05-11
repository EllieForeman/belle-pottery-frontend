import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "./context/cartContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Source_Sans_3 } from "next/font/google";
import MenuBarWrapper from "./components/menuBarWrapper";
import ShowFooter from "./components/showFooter";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--source-sans",
});

export const metadata: Metadata = {
  title: "Isabelle Proffitt Pottery",
  description: "Isabelle Proffitt makes wood-fired, salt-glazed ceramics driven by process, material curiosity, and playful making.",
  openGraph: {
    title: "Isabelle Proffitt Pottery",
    description: "Isabelle Proffitt makes wood-fired, salt-glazed ceramics driven by process, material curiosity, and playful making.",
    images: [
      {
        url: "../public/headshot1.png",
        width: 1200,
        height: 630,
        alt: "Headshot of Belle"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Isabelle Proffitt makes wood-fired, salt-glazed ceramics driven by process, material curiosity, and playful making.",
    description: "Isabelle's website includes ",
    images: ["../public/headshot1.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} antialiased`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/dxf1yme.css" />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <CartProvider>
          <MenuBarWrapper />
          
          <main className="flex-1">
            {children}
          </main>

          <ShowFooter />

          <SpeedInsights />
          <Analytics />
        </CartProvider>
      </body>
    </html>
  );
}
