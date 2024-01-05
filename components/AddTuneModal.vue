<script setup>
const { hide } = useModal()

const profile = useProfile()

const props = defineProps(['databaseTuneId', 'names', 'databaseId', 'callback', 'tags'])
const label = computed(() => `${props.names[0]} ${props.names[1] ? `(${props.names[1]})` : ''}`)

const databaseOptions = [
  // { 'TheSession.org': 'https://thesession.org/tunes' },
  // { 'The Fiddler’s Companion': 'https://tunearch.org/wiki/TTA' },
  // { 'The Fiddler’s Fakebook': 'https://www.fiddlefakebook.com/' }
  { label: 'TheSession.org', value: 0 },

  // 'The Fiddler’s Companion',
  // 'The Fiddler’s Fakebook'
]

const isFavorite = ref(false)

const statusOptions = [
  'Play',
  'Want to play'
]
const status = ref(0)

async function addTune() {
  console.log({
    databaseId: props.databaseId,
    databaseTuneId: props.databaseTuneId,
    names: props.names,
    tags: props.tags,
    isFavorite: isFavorite.value,
    status: status.value
  })
  await fetch('/api/tunes', {
    method: 'POST',
    headers: {
      'Seisiun-User-Id': profile.value.id,
      'Seisiun-Clerk-Id': profile.value.clerkId,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      databaseId: props.databaseId,
      databaseTuneId: props.databaseTuneId,
      names: props.names,
      tags: props.tags,
      isFavorite: isFavorite.value,
      status: status.value
    })
  })
}
</script>

<template>
  <BaseModal>
    <template #header>
      <span class="text-gray-400">Add</span> {{ label }}
    </template>
    <fieldset class="ml-1 flex flex-gap-x-2">
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
    </fieldset>
    <template #cta>
      <button
        class="flex items-center justify-center bg-gray-700 p-4 text-white fw-600"
        @click="addTune"
      >
        <!-- <div class="i-uil-plus mr-1 text-center" /> -->
        Add
      </button>
    </template>
  </BaseModal>
</template>