import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { email, name, referralCode } = req.body;

    // Ensure email isn't already in the waitlist
    const existingUser = await prisma.waitlist.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "You're already on the waitlist!" });
    }

    // Add user to the waitlist
    const newUser = await prisma.waitlist.create({
      data: { email, name, referralCode },
    });

    return res.status(201).json({ message: "You're on the waitlist!", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong." });
  }
}
