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
  },
  // {
  //   label: 'The Fiddler’s Companion',
  //   url: 'https://tunearch.org/wiki/TTA',
  //   parse: (response) => {
  //     return response.tunes.map(theSessionDotOrgTuneToTuneCard)
  //   }
  // },
  // {
  //   label: 'The Fiddler’s Fakebook',
  //   url: 'https://www.fiddlefakebook.com/',
  //   parse: (response) => {
  //     return response.tunes.map(theSessionDotOrgTuneToTuneCard)
  //   }
  // }
]
const databaseOptions = databaseSearchProviders.map((provider, index) => ({
  label: provider.label,
  value: index
}))

const tunes = ref([])
const tuneQuery = ref('')

const currentPage = ref(1)

watch(
  () => [database.value, tuneQuery.value],
  ([, tuneQuery]) => {
    tunes.value = []
    currentPage.value = 1
    if (!tuneQuery.length) isLoading.value = false
    else isLoading.value = true
  }
)

watchDebounced(
  () => [database.value, tuneQuery.value],
  async ([, tuneQuery]) => {
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

const form = ref({})
</script>

<template>
  <Section>
    <SectionHeader>
      Database Search
    </SectionHeader>


    <!-- <div class="flex flex-col flex-gap-y-6"> -->
    <FormKit
      type="form"
      name="tune-search"
      :actions="false"
      v-model="form"
      @submit="search"
    >
      <FormKit
        type="radio"
        name="database"
        :options="databaseOptions"
        v-model.number="database"
      >
        <template #legend>
          <span class="sr-only">
            Database
          </span>
        </template>
      </FormKit>
      <FormKit
        type="text"
        name="query"
        v-model="tuneQuery"
      >
        <template #label>
          <span class="sr-only">
            Query
          </span>
        </template>
        <template #prefixIcon>
          <div class="mr-4">
            <div class="i-uil-search" />
          </div>
        </template>
      </FormKit>
    </FormKit>
    <!-- </div>   -->
    <hr>
    <div>
      <h3 class="mb-4 h3">
        Tunes
      </h3>
      <div v-if="isLoading">
        <div class="mt-16 flex items-center justify-center text-4em text-zinc-300">
          <NoteSpinner padded />
        </div>  
      </div>
      <DatabaseTuneList
        v-else-if="tunes.length"
        :tunes="tunes"
      />
      <EmptyState
        v-else
        :text="tuneQuery ? `No tunes found for '${tuneQuery}'` : 'Enter a search query to find tunes'"
      />
    </div>
  </Section>
</template>