import { createUser } from '~/data/repositories/users'

export default eventHandler(async (event) => {
  const { auth } = event.context

  const clerkId = auth.userId


  if (!clerkId) {
    setResponseStatus(event, 403)
    return ''
  }

  const { name } = await readBody(event)

  // TODO: validation?
  
  const user = await createUser({
      clerkId,
      name
  })

  return user 
})