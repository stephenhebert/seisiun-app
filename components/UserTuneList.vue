<script setup>
const myTunesStore = useMyTunesStore()
const { myTunes, isLoading } = storeToRefs(myTunesStore)
const sortBy = ref('name')

function trimName(name) {
  if (name.match(/^(a|the) /i)) {
    return name.replace(/^(a|the) /i, '')
  }
  return name
}

function sortByName(a, b) {
  return trimName(a.tune.tuneNames[0]).localeCompare(trimName(b.tune.tuneNames[0]))
}

const sortFunctions = {
  status: (a, b) => {
    if (a.status === b.status) {
      return sortByName(a, b)
    }
    return a.status - b.status
  },
  name: sortByName,
  favorite: (a, b) => {
    if (a.isFavorite === b.isFavorite) {
      return sortByName(a, b)
    }
    if (a.isFavorite === b.isFavorite )return 0
    if (a.isFavorite)  return -1
    else return 1
  },
  createdAt: (a, b) => {
    if (a.createdAt === b.createdAt) {
      return sortByName(a, b)
    }
    return a.createdAt > b.createdAt ? -1 : 1
  }
}

const tuneQuery = ref('')

const filteredTunes = computed(() => {
  return !tuneQuery.value ? myTunes.value : myTunes.value.filter(tune => {
    return tune.tune.tuneNames.some(name => name.toLowerCase().includes(tuneQuery.value.toLowerCase()))
  })
})

const sortedTunes = computed(() => {
  return filteredTunes.value.sort(sortFunctions[sortBy.value])
})


</script>

<template>
  <Section>
    <SectionHeader>
      Your Tunes
      <template #cta>
        <NuxtLink
          class="btn"
          to="/tunes"
        >
          Add Tunes
        </NuxtLink>
      </template>
    </SectionHeader>
    <template v-if="isLoading">
      <div class="flex justify-center">
        <PintLoader :complete="!isLoading" />
      </div>
    </template>
    <template v-else-if="myTunes.length">
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
        <SortByControl v-model="sortBy" />
      </div>

      <div class="flex flex-col flex-gap-y-3">
        <TransitionGroup name="list">
          <UserTuneCard 
            v-for="userTune in sortedTunes"
            :key="userTune.tuneId"
            v-bind="{...userTune}"
          />
        </TransitionGroup>
      </div>
    </template>
    <EmptyState v-else />
  </Section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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