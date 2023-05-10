import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id }, //id of stream
    session: { user },
  } = req;
  const cleanId = Number(id);

  const stream = await client.stream.findUnique({
    where: {
      id: cleanId,
    },
    include: {
      messages: {
        select: {
          id: true,
          message: true,
          user: {
            select: {
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  //censor key and url if not owner
  const isOwner = stream?.userId == user?.id;

  if (stream && !isOwner) {
    stream.cloudflareKey = "xxxxx";
    stream.cloudflareUrl = "xxxxx";
  }

  if (!stream)
    return res.status(404).json({ ok: false, error: "Stream Not Found." });

  res.json({
    ok: true,
    stream,
    isOwner,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
