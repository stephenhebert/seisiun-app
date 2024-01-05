<script setup lang="ts">
import theme from '@/theme'

useHead({
  title: 'Seisiún',
})

const { modal } = useModal()
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
