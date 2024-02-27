import { useLocalStorage } from '@vueuse/core'
import { useUser } from 'vue-clerk'

const sessionsStores = new Map()

function defineSessionsStore(clerkId: string) {
  return defineStore(
    `my-sessions-[${clerkId}]`,
    () => {
      const mySessions = useLocalStorage(`my-sessions-[${clerkId}]`, [])
      const isLoading = ref(false)
      const error = ref(null)
      const loadedAt = ref(null)
      const profile = useProfile()

      const load = async (force = false) => {
        if (loadedAt.value && !force) {
          return
        }
        isLoading.value = true
        try {
          const response = await fetch('/api/my/sessions',
          {
            headers: {
              'Seisiun-User-Id': profile.value?.id,
              'Seisiun-Clerk-Id': profile.value?.clerkId,
            }
          })
          mySessions.value = await response.json()
          loadedAt.value = Date.now()
        }
        catch (err) {
          error.value = err
        }
        finally {
          isLoading.value = false
        }
      }
  
      const createSession = async ({
        name,
      }) => {
        const response = await fetch('/api/sessions', {
          method: 'POST',
          headers: {
            'Seisiun-User-Id': profile.value.id,
            'Seisiun-Clerk-Id': profile.value.clerkId,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
          })
        })
        if (response.ok) {
          const newSession = await response.json()
          mySessions.value.push(newSession)
        }
      }
  
      // const addTune = async ({
      //   id,
      //   isFavorite,
      //   status,
      // }) => {
      //   const response = await fetch('/api/my-tunes', {
      //     method: 'POST',
      //     headers: {
      //       'Seisiun-User-Id': profile.value.id,
      //       'Seisiun-Clerk-Id': profile.value.clerkId,
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({
      //       id,
      //       isFavorite,
      //       status,
      //     })
      //   })
      //   if (response.ok) {
      //     const newUserTune = await response.json()
      //     myTunes.value.push(newUserTune)
      //   }
      // }
  
      // const removeTune = async ({ tuneId }) => {
      //   const response = await fetch(`/api/my-tunes/${tuneId}`, {
      //     method: 'DELETE',
      //     headers: {
      //       'Seisiun-User-Id': profile.value.id,
      //       'Seisiun-Clerk-Id': profile.value.clerkId,
      //       'Content-Type': 'application/json'
      //     },
      //   })
      //   if (response.ok)
      //     myTunes.value = myTunes.value.filter(userTune => userTune.tuneId !== tuneId)
      // }
  
      // const updateTuneStatus = async ({ tuneId, status }) => {
      //   const response = await fetch(`/api/my-tunes/${tuneId}`, {
      //     method: 'PATCH',
      //     headers: {
      //       'Seisiun-User-Id': profile.value.id,
      //       'Seisiun-Clerk-Id': profile.value.clerkId,
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ status })
      //   })
      //   if (response.ok) {
      //     const updatedUserTune = await response.json()
      //     myTunes.value = myTunes.value.map(userTune => userTune.tuneId === updatedUserTune.tuneId ? updatedUserTune : userTune)
      //   }
      // }
  
      // const updateTuneFavorite = async ({ tuneId, isFavorite }) => {
      //   const response = await fetch(`/api/my-tunes/${tuneId}`, {
      //     method: 'PATCH',
      //     headers: {
      //       'Seisiun-User-Id': profile.value.id,
      //       'Seisiun-Clerk-Id': profile.value.clerkId,
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({ isFavorite })
      //   })
      //   if (response.ok) {
      //     const updatedUserTune = await response.json()
      //     myTunes.value = myTunes.value.map(userTune => userTune.tuneId === updatedUserTune.tuneId ? updatedUserTune : userTune)
      //   }
      // }
  
      // const isInLibrary = ({ tuneId, databaseId, databaseTuneId }) => {
      //   console.log('isInLibrary', tuneId, databaseId, databaseTuneId)
      //   return myTunes.value.some(userTune =>
      //     userTune.tuneId === tuneId
      //     || (userTune.tune.databaseTunes.some(databaseTune => databaseId === databaseTune.databaseId && databaseTune.databaseTuneId === databaseTuneId))
      //   )
      // }

      const isMember = ({ sessionId }) => {
        return mySessions.value.some(userSession =>
          userSession.sessionId === sessionId
        )
      }
  
      if (mySessions.value?.length === 0) {
        load()
      }
  
      return {
        profile,
        mySessions,
        isLoading,
        loadedAt,
        error,
        load,
        createSession,
        isMember,
        // addTuneFromDatabase,
        // addTune,
        // removeTune,
        // updateTuneStatus,
        // updateTuneFavorite,
        // isInLibrary,
      }
    }
  )
}

export function useMySessionsStore() {
  const { user } = useUser()
  const clerkId = user.value?.id

  if (!clerkId) {
    return null
  }

  if (!sessionsStores.has(clerkId)) {
    sessionsStores.set(clerkId, defineSessionsStore(clerkId))
  }

  const initializeStore = sessionsStores.get(clerkId)
  return initializeStore()
}
