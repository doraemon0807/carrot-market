import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const cleanId = Number(id);

  if (id) {
    const product = await client.product.findUnique({
      where: {
        id: cleanId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    const terms = product?.name.split(" ").map((word) => ({
      name: {
        contains: word,
      },
    }));

    const relatedProducts = await client.product.findMany({
      where: {
        OR: terms,
        NOT: {
          id: product?.id,
        },
      },
      take: 6,
    });

    res.json({
      ok: true,
      product,
      relatedProducts,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
