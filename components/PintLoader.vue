<script setup>
import { useFakeProgress } from '@/composables/useFakeProgress'

const props = defineProps({
  complete: {
    type: Boolean,
  },
})

const {
  randomProgress,
} = useFakeProgress()

const progress = computed(() => props.complete ? 1 : randomProgress.value)
</script>

<template>
  <div class="absolute inset-0 flex items-center justify-center from-white to-gray-200 bg-gradient-to-b">
    <PintGlass
      class="w-[max(150px,17vw)]"
      :fill-scalar="progress"
    />
  </div>
</template>