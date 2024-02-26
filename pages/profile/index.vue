<script setup>
import { useProfile } from '@/composables/useProfile'
// import { useUser } from 'vue-clerk'
import { tabs } from '~/components/ProfileTabBar/types'

definePageMeta({
  middleware: ['auth'],
})

const profile = useProfile()
// const { modal } = useModal()
// TODO: tabs 
// TODO: copy my profile link (tooltip)

const activeTab = ref(tabs.SESSIONS)
</script>

<template>
  <Section>
    <div class="text-heading my-4 text-center text-xl font-serif">
      👋 Hi, <span class="text-primary text-3xl fw-500">{{ profile?.name }}</span>
    </div>
  </Section>
  <ProfileTabBar v-model="activeTab" />

  <Transition
    name="slidefade"
    mode="out-in"
  >
    <UserSessionList v-if="activeTab === tabs.SESSIONS" />
    <UserTuneList v-else-if="activeTab === tabs.TUNES" />
  </Transition>
  

  <!-- Add Tune Modal -->
  <!-- <ModalContainer :modal="modal" /> -->
</template>