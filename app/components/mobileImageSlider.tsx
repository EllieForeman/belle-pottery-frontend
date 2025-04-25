'use client';

import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import { useState } from 'react';
import 'keen-slider/keen-slider.min.css';

type Props = {
  productMainImage?: { url: string };
  productImages?: { url: string }[];
  title: string;
};

export function MobileImageSlider({ productMainImage, productImages, title }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const images = [
    ...(productMainImage ? [productMainImage] : []),
    ...(productImages || []),
  ];

  return (
    <div className="relative">
      {/* Carousel */}
      <div
        ref={sliderRef}
        className="keen-slider h-[75vh] overflow-hidden rounded-sm"
      >
        {images.map((img, idx) => (
          <div
            key={idx}
            className="keen-slider__slide flex justify-center items-center"
          >
            <Image
              src={img.url}
              alt={`Product Image ${idx + 1}`}
              width={700}
              height={600}
              className="object-cover w-full h-[75vh] block"
            />
          </div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-2 h-2 rounded-full ${
              currentSlide === idx ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
