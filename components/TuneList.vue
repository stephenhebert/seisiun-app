<script setup>
const { tunes } = defineProps(['tunes'])

// const myTunesStore = useMyTunesStore()
// const { myTunes, isLoading } = storeToRefs(myTunesStore)
const sortBy = ref('name')

function trimName(name) {
  if (name.match(/^(a|the) /i)) {
    return name.replace(/^(a|the) /i, '')
  }
  return name
}

function score(tune) {
  return (tune.plays * 2) + tune.wantsToPlay
}

function sortByName(a, b) {
  return trimName(a.tuneNames[0]).localeCompare(trimName(b.tuneNames[0]))
}

const sortFunctions = {
  name: sortByName,
  status: (a, b) => {
    const aScore = score(a)
    const bScore = score(b)
    if (aScore === bScore) {
      return sortByName(a, b)
    }
    return bScore - aScore
  },
  favorite: (a, b) => {
    if (a.favorites === b.favorites) {
      return sortByName(a, b)
    }
    return b.favorites - a.favorites
  },
}

const tuneQuery = ref('')

const filteredTunes = computed(() => {
  return !tuneQuery.value ? tunes : tunes.filter(tune => {
    return tune.tuneNames.some(name => name.toLowerCase().includes(tuneQuery.value.toLowerCase()))
  })
})

const sortedTunes = computed(() => {
  return filteredTunes.value.sort(sortFunctions[sortBy.value])
})


const newTuneAdded = ref(false)

function onAdded() {
  newTuneAdded.value = true
}
</script>

<template>
  <div class="flex flex-col flex-gap-y-3">
    <!-- TODO: make this a toast -->
    <div
      v-if="newTuneAdded"
      class="mb-4 text-gray-400"
    >
      You've just added some tunes to your repertoire! These will now be visible in your 
      <router-link
        to="/profile"
        class="link"
      >
        <span>profile</span>
      </router-link>.
    </div>
    <template v-if="tunes.length">
      <div class="flex justify-between flex-gap-4 lt-sm:(flex-col) sm:(items-center)">
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
        <SortByControl
          hide-created-at
          v-model="sortBy"
        />
      </div>

      <TransitionGroup name="list">
        <TuneCard
          v-for="tune in sortedTunes"
          :key="tune.id"
          v-bind="{...tune}"
          @added="onAdded"
        />
      </TransitionGroup>
    </template>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>