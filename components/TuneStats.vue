<script setup>
defineProps({
  tune: {
    type: Object,
    required: true
  }
})
import toSimpleNumber from '~/utils/toSimpleNumber'
</script>

<template>
  <div class="flex grow flex-row flex-gap-x-4">
    <div class="flex flex-row items-center gap-1 text-gray-400">
      <div
        class="i-fa6-solid-heart text-xs"
      />  
      <span class="text-sm">{{ toSimpleNumber(tune.favorites) }}</span>
    </div>
    <div class="flex flex-row items-center gap-1 text-gray-400">
      <div
        class="i-fa6-solid-book text-xs"
      />
      <span class="text-sm">{{ toSimpleNumber(tune.plays) }}</span>
    </div>
    <div class="flex flex-row items-center gap-1 text-gray-400">
      <div
        class="i-fa6-solid-book-open text-xs"
      />
      <span class="text-sm">{{ toSimpleNumber(tune.wantsToPlay) }}</span>
    </div>
  </div>
</template>