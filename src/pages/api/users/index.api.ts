import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const { name, username } = req.body

  const isUserExistis = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (isUserExistis) {
    return res.status(400).json({
      message: 'Nome de usuário já existe',
    })
  }

  const user = await prisma.user.create({
    data: {
      name,
      username,
    },
  })

  return res.status(201).json(user)
}
