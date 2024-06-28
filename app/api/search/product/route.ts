import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

const generateSearchQuery = (
  text: string,
  budget?: string | null,
  categoryId?: string | null,
  discount?: string | null,
) => {
  let searchQuery: any = {
    AND: [
      {
        name: {
          contains: text,
          mode: "insensitive",
        },
      },
    ],
  };

  if (categoryId !== "undefined" && categoryId !== "null") {
    searchQuery = {
      AND: [
        ...searchQuery.AND,
        {
          categoryId: {
            equals: categoryId,
          },
        },
      ],
    };
  }

  if (
    discount !== "undefined" &&
    discount !== "null" &&
    !Number.isNaN(Number(discount))
  ) {
    searchQuery = {
      AND: [
        ...searchQuery.AND,
        {
          discountPercentage: {
            lte: Number(discount),
          },
        },
      ],
    };
  }

  if (
    budget !== "undefined" &&
    budget !== "null" &&
    !Number.isNaN(Number(budget))
  ) {
    searchQuery = {
      AND: [
        ...searchQuery.AND,
        {
          basePrice: {
            lte: Number(budget),
          },
        },
      ],
    };
  }

  return searchQuery;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");
  const budget = searchParams.get("budget");
  const discount = searchParams.get("discount");
  const categoryId = searchParams.get("category");

  if (!text) {
    return new NextResponse(
      JSON.stringify({
        message: "Missing text parameter",
      }),
      { status: 400 },
    );
  }

  const products = await prismaClient.product.findMany({
    where: generateSearchQuery(text, budget, categoryId, discount),
  });

  return NextResponse.json({ products, status: 200 });
}
