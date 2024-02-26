<script setup>
definePageMeta({
  title: 'Sessions'
})

const profile = useProfile()

const sessions = ref([])
const isLoading = ref(false)

async function fetchSessions() {
  isLoading.value = true
  const response = await fetch('/api/sessions')
  if (response.ok) {
    sessions.value = await response.json()
  }
  isLoading.value = false
}

await fetchSessions()
</script>

<template>
  <Section>
    <SectionHeader>
      Sessions
      <template #cta>
        <NuxtLink
          class="btn"
          v-if="profile"
          to="/sessions/create"
        >
          Create Session
        </NuxtLink>
      </template>
    </SectionHeader>
    <EmptyState v-if="!isLoading && !sessions?.length" />
    <div v-else>
      <!-- {{ sessions }} -->
      <SessionList :sessions="sessions" />
    </div>
  </Section>
</template>