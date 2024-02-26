<script setup>
import { ref } from 'vue'
const myTunesStore = useMyTunesStore()

const emit = defineEmits(['added'])

const props = defineProps(['databaseTuneId', 'url', 'tags', 'names', 'databaseId'])

const step = {
  ADD: 0,
  EDIT: 1,
  SAVING: 2,
  SAVED: 3
}
const currentStep = ref(step.ADD)

const status = ref(0)
const isFavorite = ref(false)

async function onSave() {
  currentStep.value = step.SAVING

  await myTunesStore.addTuneFromDatabase({
    databaseId: props.databaseId,
    databaseTuneId: props.databaseTuneId,
    names: props.names,
    tags: props.tags,
    isFavorite: isFavorite.value,
    status: status.value,
    url: props.url
  })

  currentStep.value = step.SAVED

  emit('added')

}

onMounted(() => {
  if (myTunesStore.isInLibrary({
    databaseId: props.databaseId,
    databaseTuneId: props.databaseTuneId
  })) {
    currentStep.value = step.SAVED
  }
})
</script>

<template>
  <CardTemplate>
    <div class="flex flex-col justify-between flex-gap-y-2 p-4">
      <a 
        :href="url"
        target="_blank"
      >
        <div
          class="i-uil-external-link-alt mr-1 inline-block shrink-0 text-md text-gray-400 font-sans"
        >
          <span class="sr-only">Open in new tab</span>
        </div>
        <span
          class="font-bold font-serif lt-sm:text-lg sm:text-xl"
        >{{ names[0] }}</span>
        <span
          v-if="names[1]"
          class="text-gray-400 font-serif lt-sm:text-xs sm:text-sm"
        > ({{ [...names ].splice(1).join(', ') }})</span>
      </a>
      <div class="text-x flex flex-row flex-gap-x-2 font-sans">
        <span
          v-for="tag in tags"
          :key="tag"
          class="rounded-3 bg-gray-200 px-2 py-0.5 text-sm text-gray-600"
        >{{ tag }}</span>
      </div>
    </div>

    <Transition
      name="slide"
      mode="out-in"
    >
      <template v-if="currentStep === step.EDIT">
        <div class="flex flex-col flex-gap-y-4 p-4 pl-0">
          <div class="flex grow justify-between flex-gap-4 sm:flex-row-reverse lt-sm:flex-col lt-sm:items-end sm:items-center sm:gap-4">
            <FavoriteToggleButton
              class="text-xl"
              v-model="isFavorite"
              :model-value="isFavorite"
            />
            <StatusToggleButton
              v-model="status"
            />
          </div>
        </div>
      </template>
    </Transition>

    <template #actions>
      <button
        v-if="currentStep === step.ADD"
        class="flex p-1 text-gray-400 hover:text-gray-700"
        @click="currentStep = step.EDIT"
      >
        <div class="i-uil-plus text-4xl" />
        <span class="sr-only">Delete</span>
      </button>

      <div
        v-else-if="currentStep === step.EDIT"
        class="flex flex-col"
      >
        <button
          class="p-1 text-gray-300 hover:text-green-500"
          @click="onSave"
        >
          <div class="i-uil-check text-4xl" />
          <span class="sr-only">Confirm</span>
        </button>
        <button
          class="p-1 text-gray-300 hover:text-gray-500"
          @click="currentStep = step.ADD"
        >
          <div class="i-uil-times text-4xl" />
          <span class="sr-only">Cancel</span>
        </button>
      </div>

      <div v-if="[step.SAVING,step.SAVED].includes(currentStep)">
        <Transition
          mode="out-in"
          name="fade"
        >
          <div
            v-if="currentStep === step.SAVING"
            class="p-1"
          >
            <div class="i-uil-sync animate-spin-reverse text-3xl" />
            <span class="sr-only">Saving</span>
          </div>

          <div
            v-else
            class="p-1"
          >
            <div class="i-uil-check-circle text-4xl text-green-400" />
            <span class="sr-only">Saved</span>
          </div>
        </Transition>
      </div>
    </template>
  </CardTemplate>
</template>
