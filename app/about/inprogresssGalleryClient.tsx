"use client";

import "./lightbox-custom.css";
import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

export default function InProgressGalleryClient({ images }: { images: any[] }) {
  const [index, setIndex] = useState<number | null>(null);

  const slides = images.map((image: any) => ({
    src: image.url,
    title: image.caption || "",
  }));

  return (
    <div className="w-full sm:w-[95%] max-w-[1800px] pl-0 sm:px-2 pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 justify-start">
        {images.map((image: any, i: number) => (
          <div
            key={image.id}
            className="relative w-full aspect-[3/4] cursor-pointer"
            onClick={() => setIndex(i)}
          >
            <Image
              src={image.url}
              alt={image.alt || "image of Belle’s work"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {index !== null && (
        <Lightbox
          styles={{
            container: { backgroundColor: "#eeece8" },
            root: {
              "--yarl__button_color": "#45381d",
              "--yarl__button_filter": "none",
              "--yarl__button_background": "transparent",
              "--yarl__button_hover_background": "transparent",
              "--yarl__button_focus_outline": "none",
              "--yarl__button_border": "none",
            },
          }}
          open={index !== null}
          close={() => setIndex(null)}
          slides={slides}
          index={index}
          plugins={[Captions]}
          controller={{
            closeOnBackdropClick: true,
          }}
        />
      )}
    </div>
  );
}
