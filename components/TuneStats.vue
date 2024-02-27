<script setup>
defineProps({
  tune: {
    type: Object,
    required: true
  }
})
import toSimpleNumber from '~/utils/toSimpleNumber'

const iconClass = 'lt-sm:text-2xs sm:text-xs'
</script>

<template>
  <div class="flex grow flex-row lt-sm:gap-x-2 sm:flex-gap-x-4">
    <div class="flex flex-row items-center text-gray-400 lt-sm:gap-1 sm:gap-2">
      <div
        class="i-fa6-solid-heart"
        :class="iconClass"
      />  
      <span class="text-sm">{{ toSimpleNumber(tune.favorites) }}</span>
    </div>
    <div class="flex flex-row items-center text-gray-400 lt-sm:gap-1 sm:gap-2">
      <div
        class="i-fa6-solid-book"
        :class="iconClass"
      />
      <span class="text-sm">{{ toSimpleNumber(tune.plays) }}</span>
    </div>
    <div class="flex flex-row items-center text-gray-400 lt-sm:gap-1 sm:gap-2">
      <div
        class="i-fa6-solid-book-open"
        :class="iconClass"
      />
      <span class="text-sm">{{ toSimpleNumber(tune.wantsToPlay) }}</span>
    </div>
  </div>
</template>