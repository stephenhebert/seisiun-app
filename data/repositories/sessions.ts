import prisma from '../prisma'

export async function retrieve({ where } = {}) {
  const session = (
    await prisma.session.findFirst({
      where,
      include: {
        members: true,
      },
    })
  )
    
  return session

}

export async function list({ where } = {}) {
  const sessions = (
    await prisma.session.findMany({ 
      where, 
      include: {
        members: true,
        createdByUser: true,
      },
    })
  ).map(session => ({
    id: session.id,
    name: session.name,
    createdAt: session.createdAt,
    memberCount: session.members.length,
    createdBy: session.createdByUser,
  }))
    
  return sessions
}

export async function create({ data }) {
  const session = await prisma.session.create({
    include: {},
    data
  })

  return session
}