<script setup>
import { ref } from 'vue'
const showLoader = ref(false)
const finishedLoading = ref(true)

function onPending() {
  console.log('pending')
  showLoader.value = true
  finishedLoading.value = false
}

async function onResolve() {
  console.log('resolve')
  finishedLoading.value = true
  setTimeout(() => {
    showLoader.value = false
  }, 500)
}

</script>

<template>
  <Transition mode="out-in">
    <KeepAlive>
      <Suspense
        @pending="onPending"
        @resolve="onResolve"
      >
        <slot />
      </Suspense>
    </KeepAlive>
  </Transition>
  <Transition>
    <PintLoader
      v-if="showLoader"
      :complete="finishedLoading"
    />
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity .5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>