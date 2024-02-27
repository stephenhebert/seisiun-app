<script setup>
const props = defineProps({
  hideCreatedAt: Boolean,
})

const sortBy = defineModel()

const sortByOptions = computed(() => [
  {
    label: 'Name',
    value: 'name',
    icon: 'i-fa6-solid-a',
  },
  {
    label: 'Favorites',
    value: 'favorite',
    icon: 'i-fa6-solid-heart',
  },
  {
    label: 'Status',
    value: 'status',
    icon: 'i-fa6-solid-book',
  },
  ...(!props.hideCreatedAt ? [{
    label: 'Date',
    value: 'createdAt',
    icon: 'i-fa6-solid-clock',
  }] : []),
])
</script>

<template>
  <div class="flex flex-row items-center gap-4">
    <div class="text-sm text-gray-500">
      Sort by:
    </div>
    <div class="flex flex-row gap-2">
      <button
        v-for="option in sortByOptions"
        :key="option.value"
        class="b-1 rounded p-3 hover:(bg-gray-200 text-gray-600)"
        :class="[
          sortBy === option.value ? 'text-gray-600 bg-gray-200' : 'text-gray-500',
        ]"
        @click="sortBy = option.value"
      >
        <div
          :class="[option.icon]" 
          class="text-sm"
        />
        <span class="sr-only">{{ option.label }}</span>
      </button>
    </div>
  </div>
</template>