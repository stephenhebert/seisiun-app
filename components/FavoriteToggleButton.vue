<script setup>
const isFavorite = defineModel()
const isFavoriting = ref(false)

// watch(isFavorite, (newValue, oldValue) => {
//   if (newValue && !oldValue) {

//   }
// })

function toggleFavorite() {
  if (isFavorite.value) {
    isFavorite.value = false
  } else {
  isFavoriting.value = true
    setTimeout(() => {
      isFavorite.value = true
      isFavoriting.value = false
    }, 500)
  }
}
</script>

<template>
  <button @click="toggleFavorite">
    <div
      v-if="!isFavorite && !isFavoriting"
      class="i-fa6-regular-heart text-gray-400"
    />
    <div
      v-else-if="isFavoriting"
      class="relative"
    >
      <div
        class="i-fa6-solid-heart absolute left-0 top-0 animate-ping text-red"
      />
      <div
        class="i-fa6-solid-heart animate-beat text-red"
      />
    </div>
    <div v-else>
      <!-- tada, wobble, head-shake -->
      <div class="i-fa6-solid-heart animate-pulse-alt text-red" />

      <span class="sr-only">Favorite</span>
    </div>
  </button>
</template>

<style scoped>
.animate-beat {
  animation: beat 0.4s ease-in-out;
}

@keyframes beat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
    /* opacity: 0;
    transform: scale(2); */
  }
}
</style>