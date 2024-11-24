import {Prisma, PrismaClient} from '../prisma/prisma-client'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()

const colors = [
    'Red',
    'Blue',
    'Green',
    'Yellow'
]

async function main() {
    // Seed Collections
    const collections = await Promise.all(
      Array.from({ length: 5 }).map(() =>
        prisma.collection.create({
          data: {
            name: faker.commerce.department(),
            description: faker.lorem.sentence(),
          },
        })
      )
    );
  
    // Seed Products
    const products = await Promise.all(
      Array.from({ length: 5 }).map(() =>
        prisma.product.create({
          data: {
            name: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            image: faker.image.imageUrl(),
            collections: {
              connect: collections.map((collection) => ({ id: collection.id })),
            },
          },
        })
      )
    );
  
    // Seed Options
    const options = await Promise.all(
      Array.from({ length: 5 }).map(() =>
        prisma.option.create({
          data: {
            productId: faker.helpers.arrayElement(products).id,
            name: faker.commerce.productMaterial(),
          },
        })
      )
    );
  
    // Seed OptionValues
    const optionValues = await Promise.all(
      Array.from({ length: 5 }).map(() =>
        prisma.optionValue.create({
          data: {
            optionId: faker.helpers.arrayElement(options).id,
            value: faker.helpers.arrayElement(colors),
          },
        })
      )
    );
  
    // Seed Variants
    await Promise.all(
      Array.from({ length: 5 }).map(() =>
        prisma.variant.create({
          data: {
            productId: faker.helpers.arrayElement(products).id,
            name: faker.commerce.productAdjective(),
            description: faker.lorem.sentence(),
            image: faker.image.imageUrl(),
            sku: faker.datatype.uuid(),
            price: faker.datatype.number({ min: 1000, max: 100000 }),
            stock: faker.datatype.number({ min: 1, max: 500 }),
            optionValues: {
              connect: faker.helpers.arrayElements(optionValues).map((ov) => ({ id: ov.id })),
            },
          },
        })
      )
    );
  
    console.log('Database seeded successfully!');
  }
  
  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });