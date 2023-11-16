import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { authOptions } from '../auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions) || ''
    if (req.method === 'GET') {
      let selectAnswer = await prisma.answer.findMany({
        where: {
          userid: session["user"]["id"],
        },
      }) 
w
      for (let i = 0; i < selectAnswer.length; i++) {
        const selectentry = await prisma.entry.findUnique({
          where: {
            id: selectAnswer[i]["entryid"] || ''
          },
        }) || ''
        selectAnswer[i]["name"] = selectentry["name"]
      }
      console.log(selectAnswer)
      if(!selectAnswer) return res.status(404).json({ message: "answer not found" })
      return res.status(200).json(selectAnswer)
    }
}
