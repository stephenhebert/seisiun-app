import { list } from '~/data/repositories/users'

export default eventHandler(async () => {
  const users = await list()

  return users
})