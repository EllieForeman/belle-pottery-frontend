'use client';

import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { fetchFromCMS } from "@/app/lib/api";
import AddToCartButton from "@/app/components/addToCartButton";
import CheckoutButton from "@/app/components/checkoutButton";
import { MobileImageSlider } from "@/app/components/mobileImageSlider";

type Product = {
  id: number;
  title: string;
  price: number;
  itemDescription?: string;
  productMainImage?: { url: string };
  productImages?: { url: string }[];
  careInstructions?: string;
  deliveryDetails?: string;
  stock: number;
  filter: string;
};

export const dynamic = "force-dynamic";

async function getProductById(id: string): Promise<Product | null> {
  const data = await fetchFromCMS("sale-items", `filters[id][$eq]=${id}`);
  if (!data || !data.data || data.data.length === 0) return null;
  return data.data[0];
}

type Params = { id: string; slug: string };

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const imageScrollRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const handleWheel = (e: WheelEvent) => {
    const imageScroll = imageScrollRef.current;
    if (!imageScroll) return;

    const scrollingDown = e.deltaY > 0;
    const scrollingUp = e.deltaY < 0;

    const imageAtBottom =
      imageScroll.scrollTop + imageScroll.clientHeight >= imageScroll.scrollHeight;
    const imageAtTop = imageScroll.scrollTop <= 0;

    const pageScrolledToBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;

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


  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    params.then(async ({ id }) => {
      const data = await getProductById(id);
      setProductData(data);
    });
  }, [params]);

  if (!productData) {
  return (
    <div className="w-full sm:w-[95%] max-w-[1800px] mx-auto px-4 sm:px-2 xl:pl-[0px] pb-6">
      <div className="h-[88vh] w-full flex items-center justify-center animate-pulse rounded">
        <p>pots loading...</p>
      </div>
    </div>
  );
}

  const {
    title,
    price,
    itemDescription,
    productMainImage,
    productImages,
    careInstructions,
    deliveryDetails,
  } = productData;

  
  return (
    
    <div className="w-full sm:w-[95%] max-w-[1800px] mx-auto px-4 sm:px-2 xl:pl-[0px] pb-6">
      <div className="mx-auto sm:py-10 md:py-0 grid grid-cols-1 md:grid-cols-[60%_40%] lg:grid-cols-[60%_50%] xl:grid-cols-[50%_50%] gap-4 lg:gap-10">

        {/* Mobile Slider */}
        <div className="block lg:hidden">
          <div className="mb-4">
            <span className="text-sm">
              <Link href="/shop" className="hover:underline">
                Shop
              </Link>{" "}
              &gt; {title}
            </span>
          </div>
          <MobileImageSlider
            productMainImage={productMainImage}
            productImages={productImages}
            title={title}
          />
        </div>

        <div
          ref={imageScrollRef}
          className="relative hidden lg:block h-[88vh] overflow-y-scroll"
        >
          <div className="flex flex-col gap-4">
            {/* Main image – intentionally shorter */}
            {productMainImage && (
              <div className="w-full relative max-h-[80vh] overflow-hidden">
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

            {/* Additional images – full natural aspect ratio */}
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



        {/* Product Details */}
        <div className="sticky top-20 max-w-[520px]">
          <span className="text-sm hidden lg:block">
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>{" "}
            &gt; {title}
          </span>

          <h1 className="text-xl sm:mt-5 mb-6">{title}</h1>
          <p className="text-xl mt-2 mb-4 sm:mb-12">£{price}</p>

          <p className="sm:mt-4 text-md">
            {itemDescription || "No description available."}
          </p>

          <form className="mt-12 mb-12">
            <AddToCartButton
              product={{
                id: productData.id,
                title: productData.title,
                price: productData.price,
                image: productData.productMainImage?.url,
                stock: productData.stock,
              }}
            />
            <CheckoutButton />
          </form>

          {deliveryDetails && (
            <>
              <h2 className="text-lg leading-spacey mb-2">Shipping</h2>
              <p>{deliveryDetails}</p>
            </>
          )}
          {careInstructions && (
            <>
              <h2 className="text-lg leading-spacey mb-2 mt-6">Care Instructions</h2>
              <p>{careInstructions}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
