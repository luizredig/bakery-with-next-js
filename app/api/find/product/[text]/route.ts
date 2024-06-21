import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: any, { params }: any) {
  const { text } = params;

  const products = await prismaClient.product.findMany({
    where: {
      name: {
        contains: text,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json({ products });
}
