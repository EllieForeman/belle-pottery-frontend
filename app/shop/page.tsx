import Image from "next/image";
import Link from 'next/link';

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

export default function ShopPage() {
  const products: Product[] = mockProducts;

  function generateSlug(title: string, id: number): string {
    return `${title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${id}`;
  }
  
  return (
    <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const { id, attributes } = product;
        const { title, price, productImages, careInstructions } = attributes;

        const imageUrl =
          productImages?.data?.[0]?.attributes?.url || "/placeholder-image.jpg";

        return (
          <Link href={`/shop/${generateSlug(product.attributes.title, product.id)}`} key={id}>
          <div className="cursor-pointer">
            {/* Product Image */}
            <div>
              <Image
                src={imageUrl}
                alt={title}
                width={300}
                height={300}
                className="mx-auto object-fill"
              />
            </div>
            <div className="text-center p-1">
              {/* Product Info */}
              <h2 className="text-lg font-bold mt-4">{title}</h2>
              <p className="text-gray-500">£{price}</p>
            </div>
          </div>
          </Link>
        );
      })}
    </div>
  );
}

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
