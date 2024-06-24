import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_: any, { params }: any) {
  const { id } = params;

  await prismaClient.product.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json({ status: 200 });
}
