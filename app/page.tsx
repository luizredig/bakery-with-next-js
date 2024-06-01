import { connectToMongoDB } from "@/helpers/mongodb";
import Section from "./components/section";
import { prismaClient } from "./lib/prisma";

export default async function Home() {
  await connectToMongoDB();
  const cakes = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "cake",
      },
    },
  });

  const pies = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "pie",
      },
    },
  });

  return (
    <main>
      <Section title="Cakes" products={cakes} />
      <Section title="Pies" products={pies} />
    </main>
  );
}
