import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"
import { randomUUID } from "crypto";
import dayjs from 'dayjs';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  const entryid = req.query.entryid as string
    if (req.method === 'GET') {
      const selectEntry = await prisma.entry.findUnique({
        where: {
          id: entryid ,
        },
      })
      return res.status(200).json(selectEntry)
    } else if (req.method === 'POST') {
      const body = await req.body
      const answerid = randomUUID()
      if (session) {
        await prisma.answer.create({
          data: {
            id: answerid,
            userid: session["user"]["id"],
            entryid: entryid,
            insertat: dayjs().add(1, 'day').toDate(),
          },
        })
      } else {
        await prisma.answer.create({
          data: {
            id: answerid,
            entryid: entryid,
          },
        })
      }
      Object.keys(body).forEach(async function (key) {
        const choice = await prisma.choise.findFirst({
          where: {
            id: body[key],
            entryid: entryid,
          },
        })
        if(!choice) return res.status(404).json({ message: "choice not found" })
        const answerdetail = await prisma.answerDetail.create({
          data: {
            id: randomUUID(),
            answerid: answerid,
            section: choice.section,
            sequence: choice.sequence,
            answer: choice.id,
            value: choice.answer,
            insertat: dayjs().add(1, 'day').toDate(),
          }
        })
        return res.status(200).json(answerid)
      });
    } else if (req.method === 'GET') {
      const user = await getAllUser();
      return res.status(200).json(user)  
    }
}
async function getAllUser() {
  const user = await prisma.user.findMany();
  return user;
}