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

  const alreadyExists = await client.interest.findFirst({
    where: {
      userId: user?.id,
      postId: cleanId,
    },
    select: {
      id: true,
    },
  });

  const isInterested = Boolean(alreadyExists);

  if (alreadyExists) {
    await client.interest.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.interest.create({
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
      },
    });
  }

  // res.revalidate(`/community/${id}`);

  res.json({
    ok: true,
    isInterested,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
