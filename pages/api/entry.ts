import type { NextApiRequest, NextApiResponse } from 'next'
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { getToken } from "next-auth/jwt"
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
      const selectentry = await prisma.entry.findMany({
        where: {
            NOT: {
              id: '1' ,
          }
        },
      })
      return res.status(200).json(selectentry)
    } else if (req.method === 'POST') {
      return res.status(200).json({ message: "Hello World" })
    } else if (req.method === 'GET') {
      const user = await getAllUser();
      return res.status(200).json(user)  
    }
}
async function getAllUser() {
  const user = await prisma.user.findMany();
  return user;
}