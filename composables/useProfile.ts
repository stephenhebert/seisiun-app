import { useStorage } from '@vueuse/core'
import { useUser } from 'vue-clerk'

export function useProfile() {
  const { user } = useUser()
  const clerkId = user.value?.id

  if (!clerkId) {
    return null
  }

  const profile = useStorage(
    `profile-[${clerkId}]`, 
    null, 
    localStorage,
    {
      serializer: {
        read: (v: any) => (v ? JSON.parse(v) : null),
        write: (v: any) => JSON.stringify(v),
      },
    }
  )

  if (!profile.value) {
    fetch('/api/profile')
      .then(response => {
        if (response.status !== 200)
          return navigateTo('/auth/welcome')
        return response.json()
      })
      .then(data => {      
        profile.value = data
      })
  }

  return profile
}