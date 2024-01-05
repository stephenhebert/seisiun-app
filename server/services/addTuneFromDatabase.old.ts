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

  // TODO: db checks in parallel
  return prisma.$transaction(async (prisma) => {
    // check tags
    // const checkedTuneTags = tuneTags.map(async name =>  ({
    //   id: await prisma.tag.findUnique({ where: { name } })?.id || 0,
    //   name  
    // }))

    // // check databaseTune
    // const databaseTune = {

    // }

    // await prisma.databaseTune.findUnique({
    //   where: {
    //     databaseId_databaseTuneId: {
    //       databaseId,
    //       databaseTuneId,
    //     }
    //   }
    // })

  // create userTune

  // Object.entries({
  //     userId,
  //     userTuneIsFavorite,
  //     userTuneStatus,
  //     tuneNames,
  //     tuneTags,
  //     databaseId,
  //     databaseTuneId
  // }).forEach(([key, value]) => {
  //   console.log(`[${key}]: ${value} (${typeof value}) `)
  // })


  // check databaseTunes
  // const databaseTuneEntity = await prisma.databaseTune.upsert({
  //   create: {
  //     databaseId,
  //     databaseTuneId,
  //   },
  //   update: {},
  //   where: {
  //     databaseId_databaseTuneId: {
  //       databaseId,
  //       databaseTuneId,
  //     }
  //   }
  // })


  await prisma.tune.create({
    include: {
      tuneNames: true,
      userTunes: true,
      tuneTags: {
        include: {
          tag: true
        }
      },
      databaseTunes: true,
    },
    data: {
      userTunes: {
        create: [
          {
            userId,
            isFavorite: userTuneIsFavorite,
            status: userTuneStatus,
            createdAt: new Date(),
          }
        ]
      },
      tuneNames: {
        connectOrCreate : {
          where: {
            name: tuneNames[0]
          },
          create: {
            name: tuneNames[0]
          }
        }
        // create: [
        //   ...tuneNames.map(name => ({ name })),
        // ]
      },
      tuneTags: {
        create: [
          ...tuneTags.map(tag => ({
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
          })),
        ]
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

})

}