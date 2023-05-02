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

  console.log(req.query);

  const records = await client.record.findMany({
    where: {
      userId: user?.id,
      kind: kind as Kind,
    },
    include: {
      product: true,
    },
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
