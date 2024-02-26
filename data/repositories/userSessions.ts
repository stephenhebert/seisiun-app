import prisma from '../prisma'

export async function list({ where } = {}) {
  const userSessions = (
    await prisma.userSession.findMany({ 
      where, 
      include: {
        session: true,
      },
    })
  )
    
  return userSessions
}

export async function create({ data }) {
  const userSession = await prisma.userSession.create({
    data,
    include: {
      session: true,
    },
  })

  return userSession
}

export async function retrieve({ where }) {
  const userSession = (
    await prisma.userSession.findFirst({
      where,
      include: {
        session: true,
      },
    })
  )
    
  return userSession
}

// export async function deleteOne({ where }) {

//   const deletedTune = await prisma.userTune.delete({
//     where,
//     select: {
//       tuneId: true,
//       tune: {
//         select: {
//           userTunes: true,
//         }
//       }
//     }
//   })

//   if (deletedTune.tune.userTunes.length > 1) return ''

//   return prisma.$transaction(async (prisma) => {

//   // cascade delete to tune names, tags, and database tunes
//     await prisma.databaseTune.deleteMany({
//       where: {
//         tuneId: deletedTune.tuneId
//       }
//     })

//     await prisma.tuneTag.deleteMany({
//       where: {
//         tuneId: deletedTune.tuneId
//       }
//     })

//     await prisma.tuneName.deleteMany({
//       where: {
//         tuneId: deletedTune.tuneId
//       }
//     })

//     await prisma.tune.delete({
//       where: {
//         id: deletedTune.tuneId
//       }
//     })

//   })

// }