"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FilterControls({ products }: { products: any[] }) {
  const allFilters = products
    .flatMap(
      (product) =>
        product.filters?.map((f: { filter: string }) => f.filter) || [],
    )
    .filter(Boolean);

  const uniqueFilters = [...new Set(allFilters)];
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const filtered = selectedFilter
    ? products.filter((product) =>
        product.filters?.some(
          (f: { filter: string }) => f.filter === selectedFilter,
        ),
      )
    : products;

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedFilter(null)}
          className={`px-4 py-2 text-sm transition ${
            selectedFilter === null
              ? "text-[var(--foreground)] underline underline-offset-4 decoration-1 "
              : "text-[var(--foreground)]"
          }`}
        >
          All
        </button>

        {uniqueFilters.map((filter) => (
          <button
            key={filter}
            onClick={() =>
              setSelectedFilter(filter === selectedFilter ? null : filter)
            }
            className={`px-4 py-2 text-sm transition ${
              selectedFilter === filter
                ? "text-[var(--foreground)] underline underline-offset-4 decoration-1 "
                : "text-[var(--foreground)]"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filtered.map((product) => {
          const mainImage = product.productMainImage?.url || "/placeholder.png";
          const formattedTitle = product.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "");

          return (
            <Link
              key={product.id}
              href={`/shop/${product.id}/${formattedTitle}`}
              className="block text-center"
            >
              <div className="flex flex-col items-center">
                <div className="relative w-full aspect-[3/4] overflow-hidden group">
                  <Image
                    src={mainImage}
                    alt={product.title || "Product Image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover rounded-sm transition-transform duration-300 ${product.stock < 1 ? "opacity-100" : ""}`}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[rgba(69,56,29,0)] group-hover:bg-[rgba(69,56,29,0.2)] transition duration-300 rounded-sm" />

                  {/* Out of stock overlay */}
                  {product.stock < 1 && (
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-[rgba(69,56,29,0.8)] flex items-center justify-center rounded-t-sm z-10">
                      <span className="text-white text-lg font-semibold">Out of stock</span>
                    </div>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  {product.title || "Item Name"}
                </h3>
                <p className="text-gray-600">£{product.price ?? 0}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
