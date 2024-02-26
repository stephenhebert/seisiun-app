import { list } from '~/data/repositories/userSessions'

export default defineAuthorizedEventHandler(async (event, userId) => {
  const userSessions = await list({ 
    where: {
      user: {
        id: userId
      }
    },
  })

  return userSessions
})