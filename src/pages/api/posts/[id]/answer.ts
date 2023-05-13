import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id }, //id of the post
    session: { user },
    body: { answer },
  } = req;

  const cleanId = Number(id);

  //Check if post exists
  const post = await client.post.findUnique({
    where: {
      id: cleanId,
    },
    select: {
      id: true,
    },
  });

  if (!post)
    res.status(404).json({ ok: false, error: "The post doesn't exist." });

  const newAnswer = await client.answer.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      post: {
        connect: {
          id: cleanId,
        },
      },
      answer,
    },
  });

  await res.revalidate(`/community/${cleanId}`);

  res.json({
    ok: true,
    answer: newAnswer,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
