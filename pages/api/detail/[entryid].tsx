import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { randomUUID } from "crypto";
const prisma = new PrismaClient();
import dayjs from 'dayjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const entryid = req.query.entryid !== undefined ? req.query.entryid as string : ""
    if (req.method === 'GET') {
      const selectEntry = await prisma.detail.findMany({
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
      const session = await getServerSession(req, res, authOptions)
      const entryid = req.query.entryid as string
      const body = await req.body
      Object.keys(body).forEach(async function (key) {
        console.log(body[key])
        await prisma.detail.create({
          data: {
            id: randomUUID(),
            entryid: entryid,
            section: 1,
            sequence: body[key]["sq"],
            value:  body[key]["entryValue"],
            type: 1
          }
        })
        Object.keys(body[key]["choise"]).forEach(async function (innerkey) {
          const choiseid = randomUUID()
          await prisma.choise.create({
            data: {
              id: choiseid,
              entryid: entryid,
              section: 1,
              sequence: body[key]["sq"],
              answer: body[key]["choise"][innerkey],
              insertat: dayjs().add(1, 'day').toDate(),
            }
          })

          Object.keys(body[key]["correct"]).forEach(async function (deptkey) {
            if (body[key]["choise"][innerkey] == body[key]["correct"][deptkey]) {
              await prisma.correct.create({
                data: {
                  id: randomUUID(),
                  entryid: entryid,
                  section: 1,
                  sequence: body[key]["sq"],
                  value: choiseid,
                  correct: body[key]["correct"][deptkey],
                  insertat: dayjs().add(1, 'day').toDate(),
                }
              })
            }
          })
        })
      })


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