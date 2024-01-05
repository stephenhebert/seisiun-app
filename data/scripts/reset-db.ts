import prisma from '../prisma'

async function main() {
  await prisma.tuneTag.deleteMany()
  await prisma.tuneName.deleteMany()
  await prisma.userTune.deleteMany()
  await prisma.databaseTune.deleteMany()
  await prisma.tune.deleteMany()
  await prisma.tag.deleteMany()
// await prisma.user.deleteMany()
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })