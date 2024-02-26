<script setup lang="ts">
import theme from '@/theme'

const { modal } = useModal()

const route = useRoute()
const computedTitle = computed(() => {
  const title = route.meta?.title
  return title ? `${title} | Seisiún` : 'Seisiún'
})

useHead({
  title: computedTitle,
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ThemeProvider :theme="theme" />
    <ModalContainer :modal="modal" />
  </div>
</template>
