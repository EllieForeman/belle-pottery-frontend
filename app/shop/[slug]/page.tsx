import Image from "next/image";
import { notFound } from "next/navigation";

type Product = {
  id: number;
  attributes: {
    title: string;
    price: number;
    productImages: {
      data: {
        attributes: {
          url: string;
        };
      }[];
    };
    careInstructions?: string;
  };
};

// Mock products (same as in your shop page)
// Mock product data
const mockProducts: Product[] = [
  {
    id: 1,
    attributes: {
      title: "Grump Cup 1",
      price: 40,
      productImages: {
        data: [
          {
            attributes: {
              url: "/Grump.png", // Ensure placeholder images exist in `public/images/`
            },
          },
        ],
      },
      careInstructions:
        "Dishwasher safe, although hand washing is recommended.",
    },
  },
  {
    id: 2,
    attributes: {
      title: "Grump Cup 2",
      price: 40,
      productImages: {
        data: [
          {
            attributes: {
              url: "/Grump.png",
            },
          },
        ],
      },
      careInstructions:
        "Dishwasher safe, although hand washing is recommended.",
    },
  },
  {
    id: 3,
    attributes: {
      title: "Grump Cup 3",
      price: 40,
      productImages: {
        data: [
          {
            attributes: {
              url: "/Grump.png",
            },
          },
        ],
      },
      careInstructions:
        "Dishwasher safe, although hand washing is recommended.",
    },
  },

  {
    id: 4,
    attributes: {
      title: "Grump Cup 4",
      price: 40,
      productImages: {
        data: [
          {
            attributes: {
              url: "/Grump.png",
            },
          },
        ],
      },
      careInstructions:
        "Dishwasher safe, although hand washing is recommended.",
    },
  },
  {
    id: 5,
    attributes: {
      title: "Grump Cup 5",
      price: 40,
      productImages: {
        data: [
          {
            attributes: {
              url: "/Grump.png",
            },
          },
        ],
      },
      careInstructions:
        "Dishwasher safe, although hand washing is recommended.",
    },
  },
  {
    id: 6,
    attributes: {
      title: "Grump Cup 6",
      price: 40,
      productImages: {
        data: [
          {
            attributes: {
              url: "/Grump.png",
            },
          },
        ],
      },
      careInstructions:
        "Dishwasher safe, although hand washing is recommended.",
    },
  },
  {
    id: 7,
    attributes: {
      title: "Grump Cup 7",
      price: 40,
      productImages: {
        data: [
          {
            attributes: {
              url: "/Grump.png",
            },
          },
        ],
      },
      careInstructions:
        "Dishwasher safe, although hand washing is recommended.",
    },
  },
];


// Helper to extract product ID from slug
function getProductIdFromSlug(slug: string): number | null {
  const idPart = slug.split("-").pop();
  return idPart && !isNaN(Number(idPart)) ? Number(idPart) : null;
}

// Fetch product data based on slug
async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const productId = getProductIdFromSlug(slug);
  if (!productId) return undefined;
  return mockProducts.find((product) => product.id === productId);
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound(); // Handle invalid slugs
  }

  const { attributes } = product!;
  const { title, price, productImages, careInstructions } = attributes;

  const imageUrl =
    productImages?.data?.[0]?.attributes?.url || "/placeholder-image.jpg";

  return (
    <div className="container mx-auto py-10 flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
      {/* Product Image */}
      <div className="w-full md:w-1/2">
        <Image
          src={imageUrl}
          alt={title}
          width={500}
          height={500}
          className="rounded shadow"
        />
      </div>

      {/* Product Details */}
      <div className="w-full md:w-1/2 text-left">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-4">£{price}</p>
        {careInstructions && (
          <p className="text-gray-500 mb-6">{careInstructions}</p>
        )}
        <button className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-500">
          Add to Basket
        </button>
      </div>
    </div>
  );
}
