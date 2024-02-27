<script setup>
import { format } from '@formkit/tempo'
import { tabs } from '~/components/ProfileTabBar/types'
const route = useRoute()

const user = ref()
const activeTab = ref(tabs.TUNES)

async function fetchUser() {
  const response = await fetch(`/api/users/${route.params.id}`)
  if (response.ok) {
    user.value = await response.json()
  }
}

await fetchUser()
</script>

<template>
  <div>
    <div class="my-6 flex flex-col items-center text-2xl font-heading">
      <div>{{ user.name }}</div>
      <div class="text-sm text-zinc-500">
        <span class="text-xs">Member since:</span>
        {{ format(user.createdAt, { date: 'long' }) }}
      </div>
    </div>
    <ProfileTabBar v-model="activeTab" />
    <div class="m-4">
      <Transition
        name="slidefade"
        mode="out-in"
      >
        <TuneList
          v-if="activeTab === tabs.TUNES"
          :tunes="user.userTunes.map(userTune => userTune.tune)"
        />
        <SessionList
          v-else-if="activeTab === tabs.SESSIONS"
          :sessions="user.userSessions"
        />
      </Transition>
    </div>
  </div>
</template>