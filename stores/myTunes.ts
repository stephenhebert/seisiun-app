import { useLocalStorage } from '@vueuse/core'
import { useUser } from 'vue-clerk'

const tunesStores = new Map()

function defineTunesStore(clerkId: string) {
  return defineStore(
    `my-tunes-[${clerkId}]`,
    () => {
      const myTunes = useLocalStorage(`my-tunes-[${clerkId}]`, [])
      const myTuneIds = computed(() => myTunes.value.map(tune => tune.id))
      const myFavoriteTuneIds = computed(() => myTunes.value.filter(tune => tune.isFavorite).map(tune => tune.id))
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
          const response = await fetch('/api/my-tunes',
          {
            headers: {
              'Seisiun-User-Id': profile.value?.id,
              'Seisiun-Clerk-Id': profile.value?.clerkId,
            }
          })
          myTunes.value = await response.json()
          loadedAt.value = Date.now()
        }
        catch (err) {
          error.value = err
        }
        finally {
          isLoading.value = false
        }
      }

      const addTuneFromDatabase = async ({
        databaseId,
        databaseTuneId,
        names,
        tags,
        isFavorite,
        status,
        url,
      }) => {
        const response = await fetch('/api/my-tunes', {
          method: 'POST',
          headers: {
            'Seisiun-User-Id': profile.value.id,
            'Seisiun-Clerk-Id': profile.value.clerkId,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            databaseId,
            databaseTuneId,
            names,
            tags,
            isFavorite,
            status,
            url,
          })
        })
        if (response.ok) {
          const newUserTune = await response.json()
          myTunes.value.push(newUserTune)
        }
      }

      const addTune = async ({
        id,
        isFavorite,
        status,
      }) => {
        const response = await fetch('/api/my-tunes', {
          method: 'POST',
          headers: {
            'Seisiun-User-Id': profile.value.id,
            'Seisiun-Clerk-Id': profile.value.clerkId,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id,
            isFavorite,
            status,
          })
        })
        if (response.ok) {
          const newUserTune = await response.json()
          myTunes.value.push(newUserTune)
        }
      }

      const removeTune = async ({ tuneId }) => {
        const response = await fetch(`/api/my-tunes/${tuneId}`, {
          method: 'DELETE',
          headers: {
            'Seisiun-User-Id': profile.value.id,
            'Seisiun-Clerk-Id': profile.value.clerkId,
            'Content-Type': 'application/json'
          },
        })
        if (response.ok)
          myTunes.value = myTunes.value.filter(userTune => userTune.tuneId !== tuneId)
      }

      const updateTuneStatus = async ({ tuneId, status }) => {
        const response = await fetch(`/api/my-tunes/${tuneId}`, {
          method: 'PATCH',
          headers: {
            'Seisiun-User-Id': profile.value.id,
            'Seisiun-Clerk-Id': profile.value.clerkId,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ status })
        })
        if (response.ok) {
          const updatedUserTune = await response.json()
          myTunes.value = myTunes.value.map(userTune => userTune.tuneId === updatedUserTune.tuneId ? updatedUserTune : userTune)
        }
      }

      const updateTuneFavorite = async ({ tuneId, isFavorite }) => {
        const response = await fetch(`/api/my-tunes/${tuneId}`, {
          method: 'PATCH',
          headers: {
            'Seisiun-User-Id': profile.value.id,
            'Seisiun-Clerk-Id': profile.value.clerkId,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isFavorite })
        })
        if (response.ok) {
          const updatedUserTune = await response.json()
          myTunes.value = myTunes.value.map(userTune => userTune.tuneId === updatedUserTune.tuneId ? updatedUserTune : userTune)
        }
      }

      const isInLibrary = ({ tuneId, databaseId, databaseTuneId }) => {
        return myTunes.value.some(userTune =>
          userTune.tuneId === tuneId
          || (userTune.tune.databaseTunes.some(databaseTune => databaseId === databaseTune.databaseId && databaseTune.databaseTuneId === databaseTuneId))
        )
      }

      if (myTunes.value?.length === 0) {
        load()
      }

      return {
        profile,
        myTunes,
        myTuneIds,
        myFavoriteTuneIds,
        isLoading,
        loadedAt,
        error,
        load,
        addTuneFromDatabase,
        addTune,
        removeTune,
        updateTuneStatus,
        updateTuneFavorite,
        isInLibrary,
      }
    }
  )
}

export function useMyTunesStore() {
  const { user } = useUser()
  const clerkId = user.value?.id

  if (!clerkId) {
    return null
  }

  if (!tunesStores.has(clerkId)) {
    tunesStores.set(clerkId, defineTunesStore(clerkId)())
  }

  const store = tunesStores.get(clerkId)

  return store
}