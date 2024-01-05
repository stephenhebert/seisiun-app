<script setup>
definePageMeta({
  middleware: ['auth'],
})

import { useProfile } from '@/composables/useProfile'

// import { ref, h } from 'vue'
// import { useModal } from '@/composables/useModal'


// import ProfileAddTuneModal from '@/components/ProfileAddTuneModal.vue'

// const { modal, show } = useModal()
// function addTune() {
//   show(h(ProfileAddTuneModal, { a: 'prop' }))
// }


const profile = useProfile()

</script>

<template>
  <!-- <Section borderless>
    <div class="font-title text-xl text-center text-heading">
      👋 Hi, <span class="text-3xl text-primary fw-500">{{ profile.name }}</span>
    </div>
  </Section> -->
  <Section>
    <SectionHeader>
      Your Sessions
      <template #cta>
        <NuxtLink>
          <button class="rounded-1/2 bg-primary">
            <div class="i-uil-plus-circle size-32px text-white" />
          </button>
        </NuxtLink>
      </template>
    </SectionHeader>
    <EmptyState />
  </Section>
  <Section>
    <SectionHeader>
      Your Tunes
      <template #cta>
        <NuxtLink>
          <button class="rounded-1/2 bg-primary">
            <div class="i-uil-plus-circle size-32px text-white" />
          </button>
        </NuxtLink>
      </template>
    </SectionHeader>
    <EmptyState />
  </Section>


  <!-- Add Tune Modal -->
  <ModalContainer :modal="modal" />
</template>