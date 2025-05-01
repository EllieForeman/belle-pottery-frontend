"use client";

import { usePathname } from "next/navigation";
import MenuBar from "./menuBar";

export default function MenuBarWrapper() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return <MenuBar isHome={isHome} />;
}
