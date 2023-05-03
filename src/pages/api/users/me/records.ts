import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";
import { Kind } from "@prisma/client";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    query: { kind },
  } = req;

  const records = (
    await client.record.findMany({
      where: {
        userId: user?.id,
        kind: kind as Kind,
      },
      include: {
        product: {
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
        },
      },
    })
  ).map((record) => {
    return {
      ...record,
      product: {
        ...record.product,
        _count: {
          favorite: record.product._count.records,
        },
      },
    };
  });

  res.json({
    ok: true,
    records,
    kind,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
