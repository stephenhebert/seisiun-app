import type { EventHandler, EventHandlerRequest, H3Event } from 'h3'
import { retrieve } from '~/data/repositories/users'

interface AuthorizedEventHandler extends EventHandler {
  (event: H3Event, userId: number): Promise<any>
}


export const defineAuthorizedEventHandler = <T extends EventHandlerRequest, D> (
  handler: AuthorizedEventHandler
): EventHandler<T, D> =>
  defineEventHandler<T>(async (event) => {
    // try {
      // do something before the route handler
      const { auth } = event.context
      const clerkId = auth.userId
    
      const { 
        'seisiun-user-id': headerUserId,
        'seisiun-clerk-id': headerClerkId,
      } = event.req.headers
    
      // validate clerkId
      if (!clerkId || clerkId !== headerClerkId) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Unauthorized'
        })
      }
    
      // validate userId 
      const { id: userId } = await retrieve({ clerkId })
      if (!userId || userId !== +headerUserId) {
        throw createError({
          statusCode: 403,
          statusMessage: 'Unauthorized'
        })
      }


      const response = await handler(event, userId)
      // do something after the route handler
      return response
    // } catch (err) {
    //   // Error handling
    //   return err
    // }
  })