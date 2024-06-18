import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  const {
    basePrice,
    categoryId,
    discountPercentage,
    imageUrls = [],
    name,
  } = await req.json();

  const lowercased = name.toLowerCase();

  const slug = lowercased.replace(/\s+/g, "-");

  const product = await prismaClient.product.create({
    data: {
      basePrice,
      categoryId,
      discountPercentage,
      imageUrls: [imageUrls],
      name,
      slug,
    },
  });

  return NextResponse.json({ status: 200 });
}
