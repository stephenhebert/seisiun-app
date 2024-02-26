import prisma from '~/data/prisma'

export async function createSession({ 
  name, 
  userId,  
}) {
  return await prisma.session.create({
    include: {},
    data: { 
      name, 
      createdBy: userId,
      members: {
        create: {
          user: {
            connect: {
              id: userId
            }
          }
        }
      }
    }
  })
}