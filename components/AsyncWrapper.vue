<script setup>
import { ref } from 'vue'
const showLoader = ref(false)
const isLoading = ref(false)

function onPending() {
  showLoader.value = true
  isLoading.value = true
}

async function onResolve() {
  isLoading.value = false
  setTimeout(() => {
    showLoader.value = false
  }, 500)
}
</script>

<template>
  <!-- <Transition mode="out-in"> -->
  <!-- <KeepAlive> -->
  <Suspense
    :timeout="500"
    @pending="onPending"
    @resolve="onResolve"
  >
    <slot />
  </Suspense>
  <!-- </KeepAlive> -->
  <!-- </Transition> -->
  <Transition>
    <PintLoader
      v-if="showLoader"
      :complete="!isLoading"
    />
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity .3s ease-in-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>