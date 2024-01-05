import { useStorage } from '@vueuse/core'
import { useUser } from 'vue-clerk'

export function useProfile() {
  const profile = useStorage(
    'profile', 
    null, 
    sessionStorage,
    {
      serializer: {
        read: (v: any) => (v ? JSON.parse(v) : null),
        write: (v: any) => JSON.stringify(v),
      },
    }
  )

  if (!profile.value) {
    const { user } = useUser()
    const clerkId = user.value?.id

    if (!clerkId) {
      return null
    }

    const response = fetch('/api/profile')
      .then(response => response.ok && response.json())
      .then(data => {
        if (!data) {
          const router = useRouter()
          router.push('/auth/welcome')
        } else {
          profile.value = data
        }
      })
  }

  return profile
}