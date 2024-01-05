<script setup>
// TODO: sorting, filtering?
defineProps(['tunes'])
</script>

<template>
  <div class="flex flex-col flex-gap-y-4">
    <DatabaseTuneCard
      v-for="tune in tunes"
      :key="tune.databaseTuneId"
      v-bind="{...tune}"
    />
  </div>
</template>