import prisma from '../prisma'

async function main() {
  // insert databases
  await prisma.database.upsert({
    create: { id: 0, name: 'TheSession.org' },
    update: {},
    where: { id: 0 }
  })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })