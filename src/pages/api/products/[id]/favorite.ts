import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id }, //id of product
    session: { user },
  } = req;
  const cleanId = Number(id);

  //Check if product exists
  const product = await client.product.findUnique({
    where: {
      id: cleanId,
    },
    select: {
      id: true,
    },
  });

  if (!product)
    res.status(404).json({ ok: false, error: "The product doesn't exist." });

  const alreadyExist = await client.record.findFirst({
    where: {
      kind: "Favorite",
      productId: cleanId,
      userId: user?.id,
    },
  });
  if (alreadyExist) {
    await client.record.delete({
      where: {
        id: alreadyExist.id,
      },
    });
  } else {
    await client.record.create({
      data: {
        kind: "Favorite",
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: cleanId,
          },
        },
      },
    });
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
