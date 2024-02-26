import { useClerk, useClerkProvide } from 'vue-clerk'
import { until } from '@vueuse/core'

export default defineNuxtRouteMiddleware(async() => {
  const clerk = useClerk()
  const { isClerkLoaded } = useClerkProvide()

  // On client, wait for clerk to be loaded and 
  // redirect to sign-in if user is not logged in
  if (process.client) {
    await until(isClerkLoaded).toBe(true)
    if (!clerk.user?.id) return navigateTo('/auth/sign-in')
  }
})
