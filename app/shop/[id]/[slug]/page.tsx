import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
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

// **Fetch product from Strapi by ID**
async function getProductById(id: string): Promise<Product | null> {
  const data = await fetchFromCMS("sale-items", `filters[id][$eq]=${id}`);

  if (!data || !data.data || data.data.length === 0) return null;
  return data.data[0];
}

type Params = { id: string; slug: string };

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const { id, slug } = await params;

  const product = await getProductById(id);

  if (!product) return notFound();

  const {
    title,
    price,
    itemDescription,
    productMainImage,
    productImages,
    careInstructions,
    deliveryDetails,
    filter,
  } = product;

  return (
    <div className="w-full sm:w-[95%] max-w-[1800px] mx-auto px-4 sm:px-2 pb-10">
      <div className="mx-auto sm:py-10 sm:px-4 md:px-10 grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10">
        <div className="block md:hidden">
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

        {/* Left: Scrollable Image Column */}
        <div className="hidden md:block h-[80vh] overflow-y-auto no-scrollbar">
          <div className="flex flex-col gap-4">
            {/* Main Image */}
            {productMainImage && (
              <Image
                src={productMainImage.url}
                alt={title}
                width={600}
                height={800}
                className="object-cover w-full h-[75vh]"
              />
            )}

            {/* Additional Product Images */}
            {productImages &&
              productImages.length > 0 &&
              productImages.map((img, index) => (
                <Image
                  key={index}
                  src={img.url}
                  alt={`Product Image ${index + 1}`}
                  width={600}
                  height={800}
                  className="object-cover w-full h-[75vh]"
                />
              ))}
          </div>
        </div>

        {/* Right: Product Details */}
        <div className="sticky top-20">
          <span className="text-sm hidden md:block">
            <Link href="/shop" className="hover:underline">
              Shop
            </Link>{" "}
            &gt; {title}
          </span>

          <h1 className="text-xl sm:mt-5 mb-6">{title}</h1>
          <p className="text-xl mt-2 mb-4 sm:mb-12">£{price}</p>

          <p className="sm:mt-4 text-lg">
            {itemDescription || "No description available."}
          </p>

          <form className="mt-12 mb-12">
            <input type="hidden" name="title" value={title} />
            <input
              type="hidden"
              name="description"
              value={itemDescription || ""}
            />
            <input type="hidden" name="price" value={price} />

            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.productMainImage?.url,
                stock: product.stock,
              }}
            />

            <CheckoutButton />
          </form>

          {deliveryDetails && (
            <>
              <h2 className="text-lg leading-spacey mb-2">Shipping</h2>
              <p>
                {deliveryDetails ||
                  "Orders will be dispatched within 2-4 working days. Please ensure your delivery address is correct when checking out."}
              </p>
            </>
          )}
          {careInstructions && (
            <>
              <h2 className="text-lg leading-spacey mb-2 mt-6">
                Care Instructions
              </h2>
              <p>{careInstructions}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
