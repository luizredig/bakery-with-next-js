import { prismaClient } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: any, res: any) {
  const categories = await prismaClient.category.findMany();

  return NextResponse.json({ categories });
}
