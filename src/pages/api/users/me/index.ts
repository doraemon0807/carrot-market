import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });
    res.json({
      ok: true,
      profile,
    });
  }

  if (req.method === "POST") {
    const {
      session: { user }, //id of the current user
      body: { email, phone, name, avatarId },
    } = req;

    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    const error: any = {};

    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        error.emailError = "Email already in use.";
      } else {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            email,
          },
        });
      }
    }

    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        })
      );
      if (alreadyExists) {
        error.phoneError = "Phone number already in use.";
      } else {
        await client.user.update({
          where: {
            id: user?.id,
          },
          data: {
            phone,
          },
        });
      }
    }

    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
    }

    if (avatarId) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          avatar: avatarId,
        },
      });
    }

    return res.json(
      error.emailError && error.phoneError
        ? { ok: false, error: "Both email and phone are already in use." }
        : error.emailError
        ? { ok: false, error: error.emailError }
        : error.phoneError
        ? { ok: false, error: error.phoneError }
        : { ok: true }
    );

    // if (errors.length == 0) {
    //   return res.json({ ok: true });
    // } else if (errors.length == 1) {
    //   return res.json({ ok: false, errors });
    // } else if (errors.length == 2){
    //   return res.json({ ok: false, errors: "Both email and phone are already in use." });
    // }
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
