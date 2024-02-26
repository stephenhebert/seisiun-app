import { retrieve } from '~/data/repositories/users'
import { addTuneFromDatabase } from '../../services/addTuneFromDatabase'
import { retrieveTune } from '~/data/repositories/tunes'

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

  const { 
    databaseId,
    databaseTuneId,
    names,
    tags,
    isFavorite,
    status,
    url,
  } = await readBody(event)

  // TODO: error handling

  const userTune = await addTuneFromDatabase({
    userId,
    userTuneIsFavorite: isFavorite,
    userTuneStatus: status,
    tuneNames: names,
    tuneTags: tags,
    databaseId,
    databaseTuneId,
    databaseTuneUrl: url,
  })

  const tune = await retrieveTune({ where: { id: userTune.tuneId } })

  return {
    ...userTune,
    tune,
  }

})