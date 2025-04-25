'use client';

import { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import 'keen-slider/keen-slider.min.css';

type Props = {
  productMainImage?: { url: string };
  productImages?: { url: string }[];
  title: string;
};

export function MobileImageSlider({ productMainImage, productImages, title }: Props) {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: 'snap',
  });

  const images = [
    ...(productMainImage ? [productMainImage] : []),
    ...(productImages || []),
  ];

  return (
    <div ref={sliderRef} className="keen-slider h-[75vh] overflow-hidden rounded-sm">
      {images.map((img, idx) => (
        <div key={idx} className="keen-slider__slide flex justify-center items-center">
          <Image
            src={img.url}
            alt={`Product Image ${idx + 1}`}
            width={700}
            height={600}
            className="object-cover w-full h-[75vh]"
          />
        </div>
      ))}
    </div>
  );
}
