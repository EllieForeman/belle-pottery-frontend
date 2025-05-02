import { fetchFromCMS } from "./api";

export async function reduceProductStock(
  productId: number,
  currentStock: number,
) {
  const updatedStock = currentStock - 1;

  const res = await fetch(
    `${process.env.STRAPI_API_URL}/api/sale-items/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          stock: updatedStock,
        },
      }),
    },
  );

  if (!res.ok) {
    console.error("Failed to update stock:", await res.text());
    throw new Error("Stock update failed");
  }

  const result = await res.json();
  return result;
}

export async function getStockFromCMS(
  productId: string | number,
): Promise<number> {
  const res = await fetchFromCMS("sale-items", `filters[id][$eq]=${productId}`);

  const product = res?.data?.[0];
  if (!product || typeof product.stock !== "number") {
    throw new Error(
      `No product found with ID ${productId} or stock is invalid`,
    );
  }

  return product.stock;
}
