<script setup>
// const { id } = defineProps(['id'])

const route = useRoute()

const tune = ref()
const isLoading = ref(false)

async function fetchTune() {
  isLoading.value = true
  const response = await fetch(`/api/tunes/${route.params.id}`)
  if (response.ok) {
    tune.value = await response.json()
  }
  isLoading.value = false
}

await fetchTune()

// TODO: page title
// definePageMeta({
//   title: tune.value ? tune.value.name : '...'
// })
</script>

<template>
  <Section>
    <SectionHeader>
      {{ tune?.tuneNames?.[0] }}
    </SectionHeader>
    <TuneCard v-bind="{...tune}" />
  </Section>
</template>