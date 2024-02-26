import { useClerkProvide } from 'vue-clerk'
import { until } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async() => {
  // const nuxtApp = useNuxtApp()
  // const clerk = useClerk()
  const { isClerkLoaded } = useClerkProvide()
  
  // On server, check if the user is authenticated
  // and redirect to /profile.
  // if (
  //   process.server
  //   && nuxtApp.ssrContext?.event.context.auth?.userId
  // )
  //   return navigateTo('/profile')

  // On client, check if clerk is loaded and if user is authenticated
  // and redirect to /profile.
  // if (process.client && clerk.loaded && clerk.user?.id)
  //   return navigateTo('/profile')

    // On client, wait for clerk to be loaded and 
  // redirect to sign-in if user is not logged in
  if (process.client) {
    await until(isClerkLoaded).toBe(true)
    // if (!clerk.user?.id) return navigateTo('/auth/sign-in')
  }
})