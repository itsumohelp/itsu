import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userid = req.query.userid as string
    if (req.method === 'GET') {
      const selectEntry = await prisma.entry.findMany({
        where: {
          userid: userid ,
        },
      }) 
      if(!selectEntry) return res.status(404).json({ message: "entry not found" })
      return res.status(200).json(selectEntry)
    }
}
