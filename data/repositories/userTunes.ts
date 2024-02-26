import prisma from '../prisma'
import toTuneCard from '../mappers/tune/card'

export const defaultInclude = {
  tune: {
    include: {
      tuneNames: true,
      tuneTags: {
        include: {
          tag: true
        }
      },
      databaseTunes: true,
      userTunes: true,
    }
  }
}

export const defaultMapper = (userTune) => ({
  ...userTune,
  tune: toTuneCard(userTune.tune)
})

export async function list({ where, include = defaultInclude, mapper = defaultMapper } = {}) {
  const userTunes = (
    await prisma.userTune.findMany({ 
      where, 
      include,
    })
  ).map(mapper)
    
  return userTunes
}

export async function patch({ where, data, include = defaultInclude, mapper = defaultMapper }) {
  const userTune = await prisma.userTune.update({
    where,
    include,
    data
  })

  return mapper(userTune)
}

export async function create({ data, include = defaultInclude, mapper = defaultMapper}) {
  const userTune = await prisma.userTune.create({
    include,
    data
  })

  return mapper(userTune)
}

export async function retrieve({ where, include = defaultInclude, mapper = defaultMapper }) {
  const userTune = (
    await prisma.userTune.findFirst({
      where,
      include,
    })
  )
    
  return userTune ? mapper(userTune) : undefined
}

export async function deleteOne({ where }) {

  const deletedTune = await prisma.userTune.delete({
    where,
    select: {
      tuneId: true,
      tune: {
        select: {
          userTunes: true,
        }
      }
    }
  })

  if (deletedTune.tune.userTunes.length > 1) return ''

  return prisma.$transaction(async (prisma) => {

  // cascade delete to tune names, tags, and database tunes
    await prisma.databaseTune.deleteMany({
      where: {
        tuneId: deletedTune.tuneId
      }
    })

    await prisma.tuneTag.deleteMany({
      where: {
        tuneId: deletedTune.tuneId
      }
    })

    await prisma.tuneName.deleteMany({
      where: {
        tuneId: deletedTune.tuneId
      }
    })

    await prisma.tune.delete({
      where: {
        id: deletedTune.tuneId
      }
    })

  })

}