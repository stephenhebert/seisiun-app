<script setup>
import { ref } from 'vue'
const emit = defineEmits(['click'])

const isDisabled = ref(false)

function enableCallback() {
  isDisabled.value = false
}

function onClick() {
  isDisabled.value = true
  emit('click', enableCallback)
  setTimeout(() => {
    isDisabled.value = false
  }, 5 * 1000)
}
</script>

<template>
  <button
    @click.stop="onClick"
    :disabled="isDisabled"
    class="relative"
  >
    <div
      v-if="isDisabled"
      class="absolute inset-0 flex items-center justify-center"
    >
      <div
        class="i-uil-spinner animate-spin"
      />
    </div>
    <div
      :class="{'invisible': isDisabled}"
    >
      <slot />
    </div>
  </button>
</template>