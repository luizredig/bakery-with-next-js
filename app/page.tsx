import { connectToMongoDB } from "@/helpers/mongodb";
import Section from "./components/section";
import { prismaClient } from "./lib/prisma";

export default async function Home() {
  await connectToMongoDB();
  const cakes = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "cakes",
      },
    },
  });

  const pies = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "pies",
      },
    },
  });

  const cupcakes = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "cupcakes",
      },
    },
  });

  const sweets = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "sweets",
      },
    },
  });

  return (
    <div>
      {cakes.length > 0 && <Section title="Cakes" products={cakes} />}

      {pies.length > 0 && <Section title="Pies" products={pies} />}

      {cupcakes.length > 0 && <Section title="Cupcakes" products={cupcakes} />}

      {sweets.length > 0 && <Section title="Sweets" products={sweets} />}
    </div>
  );
}
