import { retrieve } from '~/data/repositories/users'
import { deleteOne } from '~/data/repositories/userTunes'

export default eventHandler(async (event) => {
  const { auth } = event.context
  const clerkId = auth.userId

  const { 
    'seisiun-user-id': headerUserId,
    'seisiun-clerk-id': headerClerkId,
  } = event.req.headers

  // validate clerkId
  if (!clerkId || clerkId !== headerClerkId) {
    setResponseStatus(event, 403)
    return ''
  }

  // validate userId 
  const { id: userId } = await retrieve({ clerkId })
  if (!userId || userId !== +headerUserId) {
    setResponseStatus(event, 403)
    return ''
  }

  const tuneId = +event.context.params.tuneId

  // TODO: error handling
  return await deleteOne({
    where: {
      id: {
        userId,
        tuneId,
      }
    }
  })

  

})