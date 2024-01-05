<script setup>
import { ref, watch } from 'vue'
// import { search } from '@/external/thesessionDataProvider'
import { watchDebounced } from '@vueuse/core'
import { theSessionDotOrgTuneToTuneCard } from '@/utils/mappers/thesessionDotOrgTuneToTuneCard'

definePageMeta({
  middleware: ['auth'],
})

// const databaseOptions = [
//   // { 'TheSession.org': 'https://thesession.org/tunes' },
//   // { 'The Fiddler’s Companion': 'https://tunearch.org/wiki/TTA' },
//   // { 'The Fiddler’s Fakebook': 'https://www.fiddlefakebook.com/' }
//   { label: 'TheSession.org', value: 0 },

//   // 'The Fiddler’s Companion',
//   // 'The Fiddler’s Fakebook'
// ]
const database = ref(0)
const isLoading = ref(false)

async function search() {
  isLoading.value = true
  const provider = databaseSearchProviders[database.value]
  const queryUrl = provider.url + `&q=${encodeURIComponent(tuneQuery.value)}` + `&page=${currentPage.value}`
  const response = await fetch(queryUrl)
  const json = await response.json()
  isLoading.value = false
  return provider.parse(json)
}

const databaseSearchProviders = [
  {
    label: 'TheSession.org',
    url: 'https://thesession.org/tunes/search?format=json&perpage=50',
    parse: (response) => {
      return response.tunes.map(theSessionDotOrgTuneToTuneCard)
    }
  }
]
const databaseOptions = databaseSearchProviders.map((provider, index) => ({
  label: provider.label,
  value: index
}))

const tunes = ref([])
const tuneQuery = ref('')

const currentPage = ref(1)

// TODO: request cancellation, combobox serializer

watchDebounced(
  () => [database.value, tuneQuery.value],
  async ([, tuneQuery]) => {
    tunes.value = []
    currentPage.value = 1
    if (!tuneQuery.length) return
    tunes.value = await search()
  },
  { debounce: 500 }
)

watch(
  currentPage,
  async () => {
    if (currentPage.value === 1) return
    tunes.value.concat(await search())
  }
)
</script>

<template>
  <Section>
    <SectionHeader>
      Add Tune from Database
    </SectionHeader>

    <!-- Search Form -->
    <div class="flex flex-col flex-gap-y-6">
      <fieldset>
        <legend class="label">
          Database
        </legend>
        <div
          v-for="option in databaseOptions"
          class="ml-1 flex items-center flex-gap-x-1"
        >
          <input
            class="ml-1 mr-2"
            type="radio"
            name="database"
            :value="option.value"
            v-model.number="database"
          >
          <label class="font-serif">{{ option.label }}</label>
        </div>
      </fieldset>
      <fieldset>
        <legend class="label">
          Query
        </legend>
        <input
          class="input"
          type="text"
          v-model="tuneQuery"
        >
      </fieldset>
    </div>
    <hr>
    <!-- Results -->
    <div v-if="tunes.length">
      <h3 class="mb-4 h3">
        Results
      </h3>
      <DatabaseTuneList :tunes="tunes" />
    </div>
  </Section>
</template>