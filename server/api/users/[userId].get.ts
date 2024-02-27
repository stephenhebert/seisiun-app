import { retrieve } from '~/data/repositories/users'

export default eventHandler(async (event) => {

  const userId = +event.context.params.userId
  const user = await retrieve({ where: { id: userId } })

  return user
})