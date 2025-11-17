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
    }, 2000);

    return () => clearTimeout(startFade);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-[1000ms] ${
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
