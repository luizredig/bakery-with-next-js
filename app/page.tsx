import { connectToMongoDB } from "@/helpers/mongodb";
import Section from "./components/section";
import { prismaClient } from "./lib/prisma";

export default async function Home() {
  await connectToMongoDB();
  const cakes = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "bolo",
      },
    },
  });

  return (
    <main>
      <Section title="Bolos inteiros" products={cakes} />
      <Section title="Tortas" products={cakes} />
    </main>
  );
}
