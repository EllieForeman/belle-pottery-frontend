import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  price: number;
  itemDescription?: string;
  productImages?: { url: string }[];
};

// Fetch product based on ID from the slug
async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const [id, title] = slug.split("/"); // Extract ID and title from the slug

    const res = await fetch(
      `https://belle-proffitt-pottery-1ae63963fcee.herokuapp.com/api/sale-items?filters[id][$eq]=${id}&populate=*`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const { data } = await res.json();
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// Product Page Component
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) return notFound(); // Show 404 if product not found

  const { title, price, itemDescription, productImages } = product;

  return (
    <div className="container mx-auto py-10 px-4 md:px-10 flex flex-col lg:flex-row gap-10">
      {/* Left: Product Image */}
      <div className="w-full lg:w-1/2">
        {productImages?.length ? (
          <Image
            src={productImages[0].url}
            alt={title}
            width={600}
            height={600}
            className="rounded-md object-cover"
          />
        ) : (
          <div className="w-full h-96 bg-gray-200 flex items-center justify-center text-gray-600">
            No Image Available
          </div>
        )}
      </div>

      {/* Right: Product Details */}
      <div className="w-full lg:w-1/2">
        <Link href="/shop" className="text-sm text-gray-600 hover:underline">
          Shop &gt; {title}
        </Link>

        <h1 className="text-3xl font-bold mt-4">{title}</h1>
        <p className="text-xl mt-2">£{price}</p>

        <p className="mt-4 text-lg">
          {itemDescription || "No description available."}
        </p>

        <button className="mt-6 px-6 py-3 bg-black text-white rounded hover:bg-gray-800">
          Add to Basket
        </button>
      </div>
    </div>
  );
}
