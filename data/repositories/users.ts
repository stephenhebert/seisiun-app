import prisma from '../prisma'

export async function list() {
  const users = await prisma.user.findMany()

  return users
}

export async function retrieve({where}) {

  const user = await prisma.user.findUnique({
    where
  })

  return user
}

export async function create({data}) {
  const user = await prisma.user.create({
    data
  })

  return user
}