import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function createPosts() {
  [...Array.from(Array(50).keys())].forEach(async (item) => {
    const post = await client.post.create({
      data: {
        question: String(item),
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
    console.log(`${item}/50`);
  });
}

// async function createStream() {
//   [...Array.from(Array(50).keys())].forEach(async (item) => {
//     const stream = await client.stream.create({
//       data: {
//         name: String(item),
//         description: String(item),
//         price: item,
//         brand: String(item),
//         user: {
//           connect: {
//             id: 1,
//           },
//         },
//       },
//     });
//     console.log(`${item}/50`);
//   });
// }

// async function createProduct() {
//   [...Array.from(Array(50).keys())].forEach(async (item) => {
//     const product = await client.product.create({
//       data: {
//         name: String(item),
//         image: String(item),
//         description: String(item),
//         price: item,
//         brand: String(item),
//         user: {
//           connect: {
//             id: 1,
//           },
//         },
//       },
//     });
//     console.log(`${item}/50`);
//   });
// }

createPosts()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
