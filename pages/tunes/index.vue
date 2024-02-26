<script setup>
definePageMeta({
  title: 'Tunes'
})

const profile = useProfile()

const tunes = ref([])
const isLoading = ref(false)

async function fetchTunes() {
  isLoading.value = true
  const response = await fetch('/api/tunes')
  if (response.ok) {
    tunes.value = await response.json()
  }
  isLoading.value = false
}

await fetchTunes()
</script>

<template>
  <Section>
    <SectionHeader>
      Tunes
      <template #cta>
        <NuxtLink
          class="btn"
          v-if="profile"
          to="/tunes/add-from-database"
        >
          Add Tune from Database
        </NuxtLink>
      </template>
    </SectionHeader>
    <EmptyState v-if="!isLoading && !tunes?.length" />
    <div v-else>
      <!-- {{ tunes }} -->
      <TuneList :tunes="tunes" />
    </div>
  </Section>
</template>