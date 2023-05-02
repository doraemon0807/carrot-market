import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const products = (
      await client.product.findMany({
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

    res.json({
      ok: true,
      products,
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
        price: +price,
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
