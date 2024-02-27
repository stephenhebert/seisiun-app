<script setup>
import { useProfile } from '@/composables/useProfile'
// import { useUser } from 'vue-clerk'
import { tabs } from '~/components/ProfileTabBar/types'
import { useClipboard } from '@vueuse/core'

definePageMeta({
  middleware: ['auth'],
})

const profile = useProfile()
// const { modal } = useModal()

const { copy, copied } = useClipboard()

const activeTab = ref(tabs.TUNES)
const profileUrl = computed(() => window.location.origin + `/users/${profile.value?.id}`)
</script>

<template>
  <Section>
    <div class="text-heading mt-4 flex items-center justify-center gap-2 font-serif">
      <span class="lt-sm:text-lg sm:text-xl">👋 Hi,</span> 
      <span class="text-primary fw-500 lt-sm:text-xl sm:text-3xl">{{ profile?.name }}</span>
      <button
        class="relative"
        @click="copy(profileUrl)"
      >
        <div 
          class="i-fa6-solid-link text-zinc-200 hover:bg-zinc-700 lt-sm:text-lg sm:text-xl"
        />
        <div 
          v-if="copied"
          class="absolute left-1/2 top-0 rounded-3 p-1 text-sm text-zinc-700 -translate-x-1/2 -translate-y-100%"
        >
          Copied!
        </div>
        <span class="sr-only">Copy link to profile</span>
      </button>
    </div>
  </Section>
  <ProfileTabBar v-model="activeTab" />

  <Transition
    name="slidefade"
    mode="out-in"
  >
    <UserTuneList v-if="activeTab === tabs.TUNES" />
    <UserSessionList v-else-if="activeTab === tabs.SESSIONS" />
  </Transition>
  

  <!-- Add Tune Modal -->
  <!-- <ModalContainer :modal="modal" /> -->
</template>