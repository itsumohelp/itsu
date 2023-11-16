import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const answerid = req.query.entryid as string
    if (req.method === 'GET') {
      const selectAnswer = await prisma.answer.findUnique({
        where: {
          id: answerid ,
        },
      }) 
      if(!selectAnswer) return res.status(404).json({ message: "answer not found" })
      const selectEntry = await prisma.entry.findUnique({
        where: {
          id: selectAnswer.entryid || "",
        },
      })

      return res.status(200).json(selectEntry)
    }
}
