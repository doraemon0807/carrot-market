import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";
import mail from "@emailjs/nodejs";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { phone, email } = req.body;
  const user = phone ? { phone: +phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  /*   //Check if user exists already
  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      console.log("Found it!");
    }
    //If user doesn't exist: create a new user
    if (!user) {
      console.log("Did not find. Will create");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
    console.log(user);
  }

  //Check if user exists already
  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone: +phone,
      },
    });

    if (user) {
      console.log("Found it!");
    }
    //If user doesn't exist: create a new user
    if (!user) {
      console.log("Did not find. Will create");
      user = await client.user.create({
        data: {
          name: "Anonymous",
          phone: +phone,
        },
      });
    }
    console.log(user);
  } */

  if (phone) {
    const message = await twilioClient.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.PHONE_NUMBER!,
      body: `Your login token is ${payload}.`,
    });
    console.log(message);
  } else if (email) {
    const email = await mail.send(
      process.env.EMALIJS_SID!,
      process.env.EMALIJS_TEMPID!,
      {
        to_name: req.body.email,
        subject: "Carrot Market Verification Code",
        html: `<strong>Your verification code is ${payload}.</strong>`,
      },
      {
        publicKey: process.env.EMAILJS_PUBKEY!,
        privateKey: process.env.EMALJS_PRIVATEKEY!,
      }
    );
    console.log(email);
  }

  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
