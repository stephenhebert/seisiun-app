<script setup>
import { useModal } from '@/composables/useModal'
import { ref, h } from 'vue'
import AddTuneModal from '@/components/AddTuneModal.vue'

const props = defineProps(['databaseTuneId', 'url', 'tags', 'names', 'databaseId'])


const added = ref(false)

const { show } = useModal()

function addTune() {
  const tuneProps = { 
    databaseId: props.databaseId, 
    databaseTuneId: props.databaseTuneId,
    names: props.names,
    tags: props.tags,
  }
  show(h(AddTuneModal, tuneProps))
}

const label = computed(() => `${props.names[0]} ${props.names[1] ? `(${props.names[1]})` : ''}`)
</script>

<template>
  <div class="flex flex-row items-stretch justify-between flex-gap-x-2 overflow-hidden border-1 border-black rounded bg-white">
    <!-- Info -->
    <div class="flex flex-col flex-gap-y-2 p-4">
      <label
        :href="url"
        class="text-xl font-bold font-serif"
      >{{ label }}</label>
      <div class="text-x flex flex-row flex-gap-x-2 font-sans">
        <span
          v-for="tag in tags"
          :key="tag"
          class="rounded-full bg-gray-200 px-2 py-0.5 text-sm text-gray-600"
        >{{ tag }}</span>
      </div>
      <div>
        <a
          :href="url"
          target="_blank"
          class="flex items-center text-xs text-gray-400 font-sans"
        >
          <div class="i-uil-link mr-1 inline-block text-16px" />
          {{ url }}
        </a>
      </div>
    </div>

    <button
      class="flex items-center bg-gray-600 p-6 text-white"
      @click="addTune"
    >
      <div class="i-uil-plus text-2xl" />
      <span class="sr-only">Add</span>
    </button>
  </div>
</template>