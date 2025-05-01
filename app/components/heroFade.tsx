"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroFade({ imageUrl }: { imageUrl: string }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const imageTransition = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const imgElement = e.target as HTMLImageElement; // Typecasting to ImageElement
    if (imgElement) {
      imgElement.classList.remove("opacity-100");
      imgElement.classList.add("opacity-0");
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-1000 opacity-100">
          <div className="absolute inset-0 z-40">
            <Image
              src={imageUrl}
              alt="Loading..."
              fill
              priority
              className="object-cover object-[50%_40%] transition-opacity duration-1000 opacity-100"
              onLoad={() => setIsLoading(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
