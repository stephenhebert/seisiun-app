// import { createTune } from '~/data/repositories/tunes'
import prisma from '~/data/prisma'


export async function addTuneFromDatabase({
  userId,
  userTuneIsFavorite,
  userTuneStatus,
  tuneNames,
  tuneTags,
  databaseId,
  databaseTuneId
}) {

  return prisma.$transaction(async (prisma) => {

    let tuneEntity = await prisma.tune.findFirst({
      where: {
        databaseTunes: {
          some: {
            databaseId,
            databaseTuneId
          }
        }
      }
    })

    if (!tuneEntity) {
      tuneEntity = await prisma.tune.create({
        data: {
          tuneNames: {
            create: tuneNames.map(name => ({ name }))
          },
          tuneTags: {
            create: tuneTags.map(tag => ({
              tag: {
                connectOrCreate: {
                  where: {
                    name: tag
                  },
                  create: {
                    name: tag
                  }
                }
              }
            }))
          },
          databaseTunes: {
            connectOrCreate: {
              where: {
                id: {
                  databaseId,
                  databaseTuneId,
                }
              },
              create: {
                databaseId,
                databaseTuneId,
              }
            }
          }
        }
      })
    }

    return await prisma.userTune.create({
      data: {
        tune: {
          connect: {
            id: tuneEntity.id
          }
        },
        isFavorite: userTuneIsFavorite,
        status: userTuneStatus,
        createdAt: new Date(),
        user: {
          connect: {
            id: userId
          }
        },
      }
    })

  })

}
