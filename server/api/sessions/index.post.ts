import { createSession } from '../../services/createSession'
import { retrieve } from '~/data/repositories/sessions'

export default defineAuthorizedEventHandler(async (event, userId) => {
  const { 
    name,
  } = await readBody(event)

  const existingSession = await retrieve({
    where: {
      name,
    }
  })

  if (existingSession) {
    throw createError({
      statusCode: 400,
      statusMessage: 'A session with that name already exists. Please choose a different name.'
    })
  }

  const session = await createSession({
    name,
    userId,
  })

  return session
})