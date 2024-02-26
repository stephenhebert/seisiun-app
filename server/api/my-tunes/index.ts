import { list } from '~/data/repositories/userTunes'

export default eventHandler(async (event) => {
  const { auth } = event.context

  if (!auth.userId) {
    setResponseStatus(event, 403)
    return ''
  }

  const userTunes = await list({ 
    where: {
      user: {
        clerkId: auth.userId
      }
    }
  })

  return userTunes
})