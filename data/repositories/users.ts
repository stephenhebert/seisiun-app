import prisma from '../prisma'
import toTuneCard from '../mappers/tune/card'


export async function list() {
  const users = await prisma.user.findMany()

  return users
}

export async function retrieve({where}) {

  const user = await prisma.user.findUnique({
    where,
    include: {
      userTunes: {
        include: {
          tune: {
            include: {
              tuneNames: true,
              tuneTags: {
                include: {
                  tag: true
                }
              },
              userTunes: true,
              databaseTunes: true,
            }         
          },
        }
      },
      userSessions: {
        include: {
          session: {
            include: {
              members: true,
            }
          },
        }
      },
      followedBy: {
        include: {
          follower: true
        }
      },
      following: {
        include: {
          followed: true
        }
      },
    }
  })

  if (!user) return createError({
    statusCode: 404, 
    statusMessage: 'User not found'
  })

  return {
    ...user,
    userTunes: user.userTunes.map(userTune => ({
      ...userTune,
      tune: toTuneCard(userTune.tune),
    })),
    userSessions: user.userSessions.map(session => ({
      ...session.session,
      userSessions: session,
    }))
  
  }
}

export async function create({data}) {
  const user = await prisma.user.create({
    data
  })

  return user
}