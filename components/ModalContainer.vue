<script setup>
const { modal } = defineProps(['modal'])
</script>

<template>
  <Teleport v-if="modal" to="body">
    <component :is="modal" />
  </Teleport>
</template>