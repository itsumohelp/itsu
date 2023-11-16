import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { authOptions } from 'pages/api/auth/[...nextauth]'
import { getServerSession } from "next-auth/next"

const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  const answerid = req.query.answerid as string
    if (req.method === 'GET') {
      const selectAnswer = await prisma.answer.findUnique({
        where: {
          id: answerid ,
        },
      })
      if(!selectAnswer) return res.status(404)
      const selectCorrect = await prisma.correct.findMany({
        where: {
          entryid: selectAnswer.entryid || "",
        },
        orderBy: [
          {section: 'asc'},
          {sequence: 'asc'},     
        ]
      })

      const selectAnswerDetail = await prisma.answerDetail.findMany({
        where: {
          answerid: answerid,
        },
        orderBy: [
          {section: 'asc'},
          {sequence: 'asc'},     
        ]
      })

      type resultSet = {
        sequence: number,
        rate: number,
        correct: string,
        input: string,
        result: string,
      }
      let resultList :resultSet[] = [];
      let questCnt = 0;
      let correctCnt = 0;
      selectCorrect.forEach(function (correctValue) {
        let answervalue:resultSet = {
          sequence: correctValue.sequence || 0,
          rate: 0,
          correct: correctValue.correct || "",
          input: "",
          result: "",          
        }
        questCnt += 1
        selectAnswerDetail.forEach(function (answerDetailValue) {
          if(correctValue.section == answerDetailValue.section
             && correctValue.sequence == answerDetailValue.sequence) {
              answervalue.input = answerDetailValue.value || "";
              if(correctValue.correct == answerDetailValue.value) {
                answervalue.result = "⚪︎"
                correctCnt += 1
              } else {
                answervalue.result = "×"
              }
          }
        })
        resultList.push(answervalue)
      })
      const rate = correctCnt / questCnt * 100
      await prisma.answer.update({
        where: {
          id: answerid,
          entryid: selectAnswer.entryid
        },
        data: {
          rate: rate,
        },
      })
      return res.status(200).json({"rate":rate, "list": resultList})
    } else if (req.method === 'POST') {
      return res.status(404).json([])
    }
}