import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const entryid = req.query.entryid !== undefined ? req.query.entryid as string : ""
    if (req.method === 'GET') {
      console.log(entryid)
      const selectEntry = await prisma.choise.findMany({
        where: {
          entryid: entryid
        },
        orderBy: [
          {section: 'asc'},
          {sequence: 'asc'},     
        ],
      })
      return res.status(200).json(selectEntry)
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