import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const product = await prismaClient.product.findUnique({
    where: { id: params.id },
  });

  return NextResponse.json({ product });
}
