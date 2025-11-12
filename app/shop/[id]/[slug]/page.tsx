"use client";

import Link from "next/link";
import { fetchFromCMS } from "@/app/lib/api";
import AddToCartButton from "@/app/components/addToCartButton";
import { MobileImageSlider } from "@/app/components/mobileImageSlider";
import ImageScrollColumn from "./imageScrollColumn";
import { useEffect, useRef, useState } from "react";

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
  filters?: { id: number; filter: string }[];
};

export const dynamic = "force-dynamic";

const deriveType = (filters?: { filter: string }[]) => {
  const names = (filters ?? []).map(f => f.filter).filter(Boolean);
  if (names.length === 0) return "unknown";
  const brooch = names.find(n => /brooch/i.test(n));
  return (brooch ?? names[0]).toLowerCase();
};

async function getProductById(id: string): Promise<Product | null> {
  const data = await fetchFromCMS("sale-items", `filters[id][$eq]=${id}`);
  if (!data || !data.data || data.data.length === 0) return null;
  return data.data[0];
}

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
      <div className="mx-auto sm:py-10 md:py-0 grid grid-cols-1 md:grid-cols-[60%_40%] lg:grid-cols-[60%_40%] xl:grid-cols-[45%_55%] gap-4 lg:gap-10">
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

       <ImageScrollColumn
        title={title}
        productMainImage={productMainImage}
        productImages={productImages}
      />

        {/* Product Details */}
        <div className="sticky top-20 max-w-[520px]">
          <span className="text-sm hidden lg:block">
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>{" "}
            &gt; {title}
          </span>

          <h1 className="text-xl sm:mt-5 mb-6">{title}</h1>
          <p className="text-xl ">£{price}</p>

          <p className="sm:mt-4 text-md">
            {itemDescription || "No description available."}
          </p>

          <form className="mt-8 mb-12">
            <AddToCartButton
              product={{
                id: productData.id,
                title: productData.title,
                price: productData.price,
                image: productData.productMainImage?.url,
                stock: productData.stock,
                type: deriveType(productData.filters),
              }}
            />
          </form>

          {deliveryDetails && (
            <>
              <h2 className="text-lg leading-spacey mb-2">Shipping</h2>
              <p className="text-sm">{deliveryDetails}</p>
            </>
          )}
          {careInstructions && (
            <>
              <h2 className="text-lg leading-spacey mb-2 mt-6">
                Care Instructions
              </h2>
              <p className="text-sm">{careInstructions}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
