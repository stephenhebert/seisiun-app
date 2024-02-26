import { list } from '~/data/repositories/sessions'

export default eventHandler(async () => {
  const sessions = await list()

  return sessions
})