import { create, retrieve } from '~/data/repositories/users'

export default eventHandler(async (event) => {
  const { auth } = event.context

  const clerkId = auth.userId


  if (!clerkId) {
    return createError(403, 'Forbidden')
  }

  // TODO: validation?
  let user = await retrieve({
    where: {
      clerkId
    }
  })
  
  if (!user) {
    const { name } = await readBody(event)
    user = await create({
      clerkId,
      name
    })
  }

  return user 
})