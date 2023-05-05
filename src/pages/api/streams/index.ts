import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, brand, description, price },
    query: { page },
  } = req;

  if (req.method === "GET") {
    //get lists of streams

    const {
      query: { page },
    } = req;

    const offset = 10;

    const streams = await client.stream.findMany({
      take: offset,
      skip: (Number(page) - 1) * offset,
    });

    const streamCount = await client.stream.count();

    res.json({ ok: true, streams, totalPage: Math.ceil(streamCount / offset) });
  }

  if (req.method === "POST") {
    //create stream
    const stream = await client.stream.create({
      data: {
        name,
        brand,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      stream,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
