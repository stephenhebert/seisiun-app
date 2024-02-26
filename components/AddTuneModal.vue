<script setup>
const { hide } = useModal()

const myTunesStore = useMyTunesStore()

const props = defineProps(['databaseTuneId', 'names', 'databaseId', 'callback', 'tags', 'url'])
const label = computed(() => `${props.names[0]} ${props.names[1] ? `(${props.names[1]})` : ''}`)

const isFavorite = ref(false)

const statusOptions = [
  'Play',
  'Want to play'
]
const status = ref(0)

async function addTune(resolve) {
  await myTunesStore.addTuneFromDatabase({
    databaseId: props.databaseId,
    databaseTuneId: props.databaseTuneId,
    names: props.names,
    tags: props.tags,
    isFavorite: isFavorite.value,
    status: status.value,
    url: props.url
  })
  resolve()
  hide()
}

</script>

<template>
  <div>
    <BaseModal>
      <template #header>
        <span class="text-gray-400">Add</span> {{ label }}
      </template>
      <!-- <fieldset class="ml-1 flex flex-gap-x-2">
      <input
        type="checkbox"
        id="is_favorite"
        v-model="isFavorite"
      >
      <label
        for="is_favorite"
        class="font-serif"
      >Favorite</label>
    </fieldset>
    <fieldset>
      <legend class="label">
        Status
      </legend>
      <div
        v-for="(label, value) in statusOptions"
        :key="value"
        class="ml-1 flex items-center flex-gap-x-2 flex-gap-y-1 font-serif"
      >
        <input
          type="radio"
          name="status"
          :value="value"
          v-model.number="status"
        >
        <label>{{ label }}</label>
      </div>
    </fieldset> -->
    
      <FormKit
        type="form"
        name="add-tune"
        :actions="false"
        @submit="addTune"
      >
        <FormKit
          type="checkbox"
          name="isFavorite"
          v-model="isFavorite"
        >
          <template #label>
            <span class="sr-only">Favorite</span>
          </template>
          <template #decorator>
            <!-- TODO: make this a component -->
            <div class="text-5xl">
              <!-- <FavoriteIndicator :is-favorite="isFavorite" /> -->
            </div>
          </template>
        </FormKit>
        <!-- <FormKit
          type="radio"
          name="status"
          label="Status"
          :options="statusOptions"
          v-model.number="status"
        /> -->
      </FormKit>
      <div class="text-5xl">
        <StatusToggleButton v-model="status" />
      </div>


      <template #cta>
        <AsyncButton
          class="flex items-center justify-center bg-gray-700 p-4 text-white fw-600"
          @click="addTune"
        >
          <!-- <div class="i-uil-plus mr-1 text-center" /> -->
          Add
        </AsyncButton>
      </template>
    </BaseModal>
  </div>
</template>