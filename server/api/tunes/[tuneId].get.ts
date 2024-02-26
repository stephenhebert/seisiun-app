import { retrieveTune } from '~/data/repositories/tunes'

export default eventHandler(async (event) => {

  const tuneId = +event.context.params.tuneId
  const tune = await retrieveTune({ where: { id: tuneId } })

  return tune
})