import type { Metadata } from "next";
import "./globals.css";
import MenuBar from "./components/menuBar";

export const metadata: Metadata = {
  title: "Belle Proffitt Pottery",
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
        <MenuBar />
        {children}
      </body>
    </html>
  );
}
