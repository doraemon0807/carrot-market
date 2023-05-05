import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const {
      query: { page },
    } = req;

    const offset = 10;

    const products = (
      await client.product.findMany({
        take: offset,
        skip: (Number(page) - 1) * offset,
        include: {
          _count: {
            select: {
              records: {
                where: {
                  kind: "Favorite",
                },
              },
            },
          },
        },
      })
    ).map((product) => {
      return {
        ...product,
        _count: {
          favorite: product._count.records,
        },
      };
    });

    const productCount = await client.product.count();

    res.json({
      ok: true,
      products,
      totalPage: Math.ceil(productCount / offset),
    });
  }

  if (req.method === "POST") {
    const {
      body: { name, price, description, brand },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        brand,
        price,
        description,
        image: "xx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      product,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
