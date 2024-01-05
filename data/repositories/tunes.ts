import prisma from '../prisma'

// export async function getUsers() {
//   const users = await prisma.user.findMany()

//   return users
// }

// export async function getUser(where) {

//   const user = await prisma.user.findUnique({
//     where
//   })

//   return user
// }

export async function createTune({include, data}) {
  const tune = await prisma.tune.create({
    include,
    data
  })

  return tune
}