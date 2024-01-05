<script setup>
defineProps({
  borderless: {
    type: Boolean,
  },
})
</script>

<template>
  <div class="m-auto max-w-1200px">
    <div 
      class="flex flex-col flex-gap-y-6 lt-sm:(m-4) sm:(mx-4 my-6)" 
      :class="{'bg-white rounded-3 shadow-md': !borderless && false}"
    >
      <slot />
    </div>
  </div>
</template>