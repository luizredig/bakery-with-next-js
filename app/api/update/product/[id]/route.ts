import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  const body = await request.json();
  const { basePrice, categoryId, discountPercentage, name } = body;

  const lowercased = name.toLowerCase();
  const slug = lowercased.replace(/\s+/g, "-");

  const product = await prismaClient.product.findUnique({
    where: { id: params.id },
  });

  await prismaClient.product.update({
    where: { id: params.id },
    data: {
      basePrice,
      categoryId,
      discountPercentage,
      name,
      slug,
      imageUrls: product?.imageUrls,
    },
  });

  return NextResponse.json({ status: 200 });
}
