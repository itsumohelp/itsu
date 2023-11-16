import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { randomUUID } from "crypto";
import dayjs from 'dayjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (req.method === 'POST') {
      const body = await req.body
      const entryid = randomUUID()
      await prisma.entry.create({
        data: {
          id: entryid,
          userid: session["user"]["id"],
          name: body["entryName"],
          description: body["explanation"],
          insertat: dayjs().add(1, 'day').toDate(),
        }
      })
      return res.status(200).json(entryid)
    }
}
async function getAllUser() {
  const user = await prisma.user.findMany();
  return user;
}