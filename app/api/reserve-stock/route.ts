import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { cart } = await req.json();

    if (!Array.isArray(cart) || cart.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    const reservedIds: Array<number | string> = [];
    const failed: { id: number | string; title?: string }[] = [];

    for (const item of cart) {
      const res = await fetch(
        `${process.env.STRAPI_URL}/api/sale-items/reserve`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            id: item.id,
            quantity: 1, // 1-of-1 items
          }),
        }
      );

      if (res.ok) {
        reservedIds.push(item.id);
      } else {
        failed.push({ id: item.id, title: item.title });
      }
    }

    if (reservedIds.length === 0) {
      return NextResponse.json(
        {
          error: "All items in your cart were just sold to other customers.",
          reservedIds,
          failed,
        },
        { status: 409 }
      );
    }

    return NextResponse.json({
      reservedIds,
      failed,
    });
  } catch (err) {
    console.error("Reserve stock error", err);
    return NextResponse.json(
      { error: "Failed to reserve stock" },
      { status: 500 }
    );
  }
}
