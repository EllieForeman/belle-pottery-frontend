"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function HeroFade({ imageUrl }: { imageUrl: string }) {
  const [visible, setVisible] = useState(true);   
  const [fading, setFading] = useState(false);    

  useEffect(() => {
    const startFade = setTimeout(() => {
      setFading(true);
      const remove = setTimeout(() => setVisible(false), 1000); 
      return () => clearTimeout(remove);
    }, 1000);

    return () => clearTimeout(startFade);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`hidden md:block fixed inset-0 z-50 bg-[var(--foreground)] transition-opacity duration-[2000ms] ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src={imageUrl}
        alt="Hero intro"
        fill
        priority
        className="object-cover object-[50%_40%]"
      />
    </div>
  );
}
