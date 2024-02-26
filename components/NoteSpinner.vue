<script setup>
defineProps({
  padded: {
    type: Boolean,
  }
})
</script>

<template>
  <div 
    class="i-uil-music-note animate-rotate" 
    :class="{ 'my-12': padded }"
  />
</template>

<style scoped>
@keyframes rotate {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}
.animate-rotate {
  animation: rotate 1s linear infinite;
}
</style>