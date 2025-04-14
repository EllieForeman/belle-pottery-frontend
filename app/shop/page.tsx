import Image from "next/image";
import Link from "next/link";
import { fetchFromCMS } from "../lib/api";

type Product = {
  id: number;
  title: string;
  price: number;
  productMainImage?: {
    url: string;
  };
};

export default async function ShopPage() {
  const shopData = await fetchFromCMS("sale-items");

  console.log("Fetched Sale Items:", shopData); // Debugging

  if (!shopData || !shopData.data) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading sale items. Please check the API response.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {shopData.data.map((product: any) => {
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
                <div
                  className="w-full relative"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  <Image
                    src={mainImage}
                    alt={product.title || "Product Image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover rounded-sm"
                  />
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
    </div>
  );
}
