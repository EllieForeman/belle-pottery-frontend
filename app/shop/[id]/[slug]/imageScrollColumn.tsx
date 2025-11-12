"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ImageScrollColumn({
  title,
  productMainImage,
  productImages,
}: {
  title: string;
  productMainImage?: { url: string };
  productImages?: { url: string }[];
}) {
  const imageScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const imageScroll = imageScrollRef.current;
      if (!imageScroll) return;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      const imageAtBottom =
        imageScroll.scrollTop + imageScroll.clientHeight >=
        imageScroll.scrollHeight;
      const imageAtTop = imageScroll.scrollTop <= 0;

      const pageScrolledToTop = window.scrollY <= 0;

      const shouldScrollImageColumn =
        (scrollingDown && !imageAtBottom) ||
        (scrollingUp && pageScrolledToTop && !imageAtTop);

      if (shouldScrollImageColumn) {
        e.preventDefault();
        imageScroll.scrollTop += e.deltaY;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={imageScrollRef}
      className="relative hidden lg:block h-[88vh] overflow-y-scroll"
    >
      <div className="flex flex-col gap-4">
        {productMainImage && (
          <div className="w-full relative overflow-hidden">
            <Image
              src={productMainImage.url}
              alt={title}
              width={800}
              height={800}
              className="w-full h-auto"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
        )}

        {productImages?.map((img, index) => (
          <div key={index} className="w-full relative">
            <Image
              src={img.url}
              alt={`Product Image ${index + 1}`}
              width={800}
              height={800}
              className="w-full h-auto"
              sizes="(min-width: 1024px) 40vw, 100vw"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
