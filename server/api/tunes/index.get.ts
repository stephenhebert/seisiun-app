import { listTunes } from '~/data/repositories/tunes'

export default eventHandler(async () => {
  const tunes = await listTunes()

  return tunes
})