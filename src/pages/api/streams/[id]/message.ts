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
    body,
    session: { user }, //current user info
  } = req;

  const streamId = Number(id);

  const message = await client.message.create({
    data: {
      message: body.message,
      user: {
        connect: {
          id: user?.id,
        },
      },
      stream: {
        connect: {
          id: streamId,
        },
      },
    },
  });

  res.json({
    ok: true,
    message,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
