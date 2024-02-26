<script setup>
const value = defineModel()
const props = defineProps({
  size: {
    type: String,
    default: 'md'
  }
})

const sizeClassOptions = {
  sm: 'p-2 text-sm',
  md: 'p-3 text-md',
  lg: 'p-4 text-lg',
}

const sizeClass = computed(() => sizeClassOptions[props.size])

// waiting, cloud, headphones, headphones-simple, eye, gears (working on it), spinner, crosshairs, lightbulb, drool, wet, book open, book-bookmark
const wantToPlayIconClassOptions = ref([
  'i-fa6-solid-book-open',
  // 'i-fa6-solid-hourglass',
  // 'i-fa6-solid-spinner',
  // 'i-fa6-solid-headphones',
  // 'i-fa6-solid-headphones-simple',
  // 'i-fa6-solid-eye',
  // 'i-fa6-solid-gears',
  // 'i-fa6-solid-crosshairs',
  // 'i-fa6-solid-lightbulb',
  // 'i-fa6-solid-droplet',
  // 'i-fa6-solid-book-bookmark',
  // 'i-fa6-solid-battery-half',
  // 'i-fa6-solid-circle-half-stroke',
])
const wantToPlayIconClassIndex = ref(0)
const wantToPlayIconClass = computed(() => wantToPlayIconClassOptions.value[wantToPlayIconClassIndex.value])

const playIconClassOptions = ref([
  'i-fa6-solid-book',
  // 'i-fa6-solid-check',
  // 'i-fa6-solid-play',
  // 'i-fa6-solid-hand-fist',
  // 'i-fa6-solid-hand',
  // 'i-fa6-solid-thumbs-up',
  // 'i-fa6-solid-brain',
  // 'i-fa6-solid-battery-full',
  // 'i-fa6-solid-circle',
  // 'i-fa6-solid-guitar',
])
const playIconClassIndex = ref(0)
const playIconClass = computed(() => playIconClassOptions.value[playIconClassIndex.value])
</script>

<template>
  <div class="w-fit flex items-center">
    <button
      class="rounded-l-3 bg-gray-100"
      :class="{ 
        'bg-gray-600 text-white': value === 1,
        'bg-gray-100 text-gray-400': value === 0,
        [sizeClass]: true

      }"
      @click="value = 1"
      title="Want to play"
    >
      <div
        :class="wantToPlayIconClass"
      />
      <span class="sr-only">Want to play</span>
    </button>
    <button
      class="rounded-r-3"
      :class="{ 
        'bg-gray-600 text-white': value === 0,
        'bg-gray-100 text-gray-400': value === 1,
        [sizeClass]: true
      }"
      @click="value = 0"
      title="Play"
    >
      <div
        :class="playIconClass"
      />
      <span class="sr-only">Play</span>
    </button>
  </div>
</template>


