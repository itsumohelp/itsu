import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if(!session) return res.status(404).json([])
  const userid = req.query.userid as string
    if (req.method === 'GET') {
      const selectAnswer = await prisma.answer.findMany({
        where: {
          userid: session["user"]["id"],
        },
        orderBy: {
          insertat: 'asc',
        }
      })
      return res.status(200).json(selectAnswer)
    } else if (req.method === 'POST') {
      return res.status(404).json([])
    }
}