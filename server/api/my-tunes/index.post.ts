import { addTuneFromDatabase } from '../../services/addTuneFromDatabase'
import { retrieveTune } from '~/data/repositories/tunes'

export default defineAuthorizedEventHandler(async (event, userId) => {
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