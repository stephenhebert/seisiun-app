import prisma from '../prisma'
import toTuneCard from '../mappers/tune/card'

export const defaultInclude = {
  tuneNames: true,
  tuneTags: {
    include: {
      tag: true
    }
  },
  userTunes: true,
  databaseTunes: true,
} 

export const defaultMapper = toTuneCard

export async function retrieveTune({ where, include = defaultInclude, mapper = defaultMapper } = {}) {
  const tune = (
    await prisma.tune.findFirst({
      where,
      include,
    })
  )
    
  return tune ? mapper(tune) : undefined

}

export async function listTunes({ where, include = defaultInclude, mapper = defaultMapper } = {}) {
  const tunes = (
    await prisma.tune.findMany({ 
      where, 
      include,
    })
  ).map(mapper)
    
  return tunes
}

export async function createTune({ data, include = defaultInclude, mapper = defaultMapper}) {
  const tune = await prisma.tune.create({
    include,
    data
  })

  return mapper(tune)
}