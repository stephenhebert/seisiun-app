<script setup>
const { text } = defineProps({
  text: {
    type: String,
    default: 'Nothing to show here yet.'
  }
})
</script>

<template>
  <div class="my-16 w-full text-center text-gray font-serif">
    <slot>
      {{ text }}
    </slot>
  </div>
</template>