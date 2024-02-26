<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { getFirstFocusableElement } from '@/utils/DOM/getFirstFocusableElement'
const { hide } = useModal()
const modal = ref(null)
const returnFocusElement = ref(null)

function setFocus() {
  returnFocusElement.value = document.activeElement
  const firstFocusableElement = getFirstFocusableElement(modal)
  if (firstFocusableElement) {
    firstFocusableElement.focus()
  }
}

function returnFocus() {
  returnFocusElement.value.focus()
  returnFocusElement.value = null
}

onMounted(() => {
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    setFocus()
  })

})

onBeforeUnmount(() => {
  document.body.style.overflow = 'auto'
  returnFocus()
})
</script>

<template>
  <BaseModalOverlay
    @click.self="hide"
    @keydown.esc="hide"
    v-kbd-trap
  >
    <div 
      class="flex flex-col overflow-hidden rounded bg-white shadow-xl lt-sm:m-2"
      ref="modal"
    >
      <div class="flex flex-col flex-gap-y-4 p-4">
        <div class="flex items-start justify-between flex-gap-x-4">
          <h3 class="h3">
            <slot name="header" />
          </h3>
          <button @click="hide">
            <div class="i-uil-times text-32px text-gray-600" />
            <span class="sr-only">Close</span>
          </button>
        </div>
        <hr>
        <slot />
      </div>
      <slot name="cta" />
    </div>
  </BaseModalOverlay>
</template>