const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient();
async function main() {
  try {
    const cakesCategory = await prismaClient.category.create({
      data: {
        name: "Cakes",
        slug: "cakes",
      },
    });

    const cakes = [
      {
        name: "Dark chocolate cake",
        slug: "dark-chocolate-cake",
        basePrice: 23.87,
        categoryId: cakesCategory.id,
        discountPercentage: 10,
        imageUrls: [
          "https://utfs.io/f/9c12db82-b11a-4b59-aab7-3bdfe2e80df2-wp4fvk.webp",
        ],
      },
      {
        name: "Strawberry cake",
        slug: "strawberry-cake",
        basePrice: 32.55,
        categoryId: cakesCategory.id,
        discountPercentage: 10,
        imageUrls: [
          "https://utfs.io/f/a1855475-fa4a-455f-a1f0-e2ecd08e1ac0-lmby8a.webp",
        ],
      },
      {
        name: "Red velvet cake",
        slug: "red-velvet-cake",
        basePrice: 28.67,
        categoryId: cakesCategory.id,
        discountPercentage: 5,
        imageUrls: [
          "https://utfs.io/f/ad17b55f-d369-45ee-a6d5-68b0bb566cbd-ia5npb.webp",
        ],
      },
      {
        name: "Pineapple cake",
        slug: "pineapple-cake",
        basePrice: 25.9,
        categoryId: cakesCategory.id,
        discountPercentage: 0,
        imageUrls: [
          "https://utfs.io/f/6ab0af4b-67e8-460c-85aa-3f441c9d8382-ul8erp.webp",
        ],
      },
      {
        name: "Dulce de leche cake",
        slug: "dulce-de-leche-cake",
        basePrice: 26.87,
        categoryId: cakesCategory.id,
        discountPercentage: 0,
        imageUrls: [
          "https://utfs.io/f/76c9d4f9-775b-46c0-80cc-017bf4745de1-96dw2u.webp",
        ],
      },
    ];

    await prismaClient.product.createMany({
      data: cakes,
    });

    const cupcakesCategory = await prismaClient.category.create({
      data: {
        name: "Cupcakes",
        slug: "cupcakes",
      },
    });

    const cupcakes = [
      {
        name: "White chocolate cupcake",
        slug: "white-chocolate-cupcake",
        imageUrls: [
          "https://utfs.io/f/23cc7442-f99b-4c0e-8c82-a9da08815be3-7wwmgv.webp",
        ],
        basePrice: 15.57,
        categoryId: cupcakesCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Chocolate cupcake",
        slug: "chocolate-cupcake",
        imageUrls: [
          "https://utfs.io/f/23882e59-6eb9-41fe-9974-b832e87211de-4y75ej.webp",
        ],
        basePrice: 15.57,
        categoryId: cupcakesCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Strawberry cupcake",
        slug: "strawberry-cupcake",
        imageUrls: [
          "https://utfs.io/f/ed363075-d8d2-4343-8698-216ea4a6ecf6-qhejg8.webp",
        ],
        basePrice: 15.57,
        categoryId: cupcakesCategory.id,
        discountPercentage: 10,
      },
      {
        name: "Pistachio cupcake",
        slug: "pistachio-cupcake",
        imageUrls: [
          "https://utfs.io/f/dc3b961d-10d3-4e01-ad12-94f28c754856-prodff.webp",
        ],
        basePrice: 19.57,
        categoryId: cupcakesCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Vanilla cupcake with sprinkles",
        slug: "vanilla-cupcake-with-sprinkles",
        imageUrls: [
          "https://utfs.io/f/5b65e81b-e5a8-476b-b3fe-b79270227eb9-j1k1lh.webp",
        ],
        basePrice: 12.57,
        categoryId: cupcakesCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Lemon cupcake",
        slug: "lemon-cupcake",
        imageUrls: [
          "https://utfs.io/f/30e86378-6663-4680-834e-faeeec36ba96-elfs0s.webp",
        ],
        basePrice: 13.9,
        categoryId: cupcakesCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Blueberry cupcake",
        slug: "blueberry-cupcake",
        imageUrls: [
          "https://utfs.io/f/653a73dd-e0bf-4969-a71d-a5aa0c718279-hs9qqt.webp",
        ],
        basePrice: 16.33,
        categoryId: cupcakesCategory.id,
        discountPercentage: 0,
      },
    ];

    await prismaClient.product.createMany({
      data: cupcakes,
    });

    const piesCategory = await prismaClient.category.create({
      data: {
        name: "Pies",
        slug: "pies",
      },
    });

    const pies = [
      {
        name: "Apple pie",
        slug: "apple-pie",
        imageUrls: [
          "https://utfs.io/f/7167f4d7-3169-4948-9e2c-067dbeb8e1a1-ynhbhj.webp",
        ],
        basePrice: 31.3,
        categoryId: piesCategory.id,
        discountPercentage: 5,
      },
      {
        name: "Pumpkin pie",
        slug: "pumpkin-pie",
        imageUrls: [
          "https://utfs.io/f/462a23e8-62df-4679-abe3-ddb5662d92a8-e3m7c7.webp",
        ],
        basePrice: 29.8,
        categoryId: piesCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Blueberry pie",
        slug: "blueberry-pie",
        imageUrls: [
          "https://utfs.io/f/475749bd-c071-4069-b04d-579decda545e-4k82m3.webp",
        ],
        basePrice: 31.4,
        categoryId: piesCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Strawberry pie",
        slug: "strawberry-pie",
        imageUrls: [
          "https://utfs.io/f/97690188-d207-4bc5-9bb0-5c3d0ed13bb0-1ldyby.webp",
        ],
        basePrice: 37.99,
        categoryId: piesCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Banana pie",
        slug: "banana-pie",
        imageUrls: [
          "https://utfs.io/f/326558c6-e30d-4ae5-b560-3d2e2d782cd2-97bbqc.webp",
        ],
        basePrice: 37.99,
        categoryId: piesCategory.id,
        discountPercentage: 0,
      },
    ];

    await prismaClient.product.createMany({
      data: pies,
    });

    const sweetsCategory = await prismaClient.category.create({
      data: {
        name: "Sweets",
        slug: "sweets",
      },
    });

    const sweets = [
      {
        name: "Chocolate sweet",
        slug: "chocolate-sweet",
        imageUrls: [
          "https://utfs.io/f/094a69c8-4a34-4098-81c1-64d383d4ded4-2kh0bl.webp",
        ],
        basePrice: 5.89,
        categoryId: sweetsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "White chocolate sweet",
        slug: "white-chocolate-sweet",
        imageUrls: [
          "https://utfs.io/f/991fb270-fe4d-4712-bfff-9371d438c785-cp4i2t.webp",
        ],
        basePrice: 5.89,
        categoryId: sweetsCategory.id,
        discountPercentage: 0,
      },
      {
        name: "Grape surprise sweet",
        slug: "grape-surprise-sweet",
        imageUrls: [
          "https://utfs.io/f/058e76c6-81a9-44b5-b587-9e546b2fbb0c-bit4xe.webp",
        ],
        basePrice: 8.59,
        categoryId: sweetsCategory.id,
        discountPercentage: 0,
      },
    ];

    await prismaClient.product.createMany({
      data: sweets,
    });

    console.log("Seed completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prismaClient.$disconnect();
  }
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
