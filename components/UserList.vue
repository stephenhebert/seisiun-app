<script setup>

// const myTunesStore = useMyTunesStore()
// const { myTunes, isLoading } = storeToRefs(myTunesStore)
// const sortBy = ref('name')

// function trimName(name) {
//   if (name.match(/^(a|the) /i)) {
//     return name.replace(/^(a|the) /i, '')
//   }
//   return name
// }

// function sortByName(a, b) {
//   return trimName(a.tune.tuneNames[0]).localeCompare(trimName(b.tune.tuneNames[0]))
// }

// const sortFunctions = {
//   status: (a, b) => {
//     if (a.status === b.status) {
//       return sortByName(a, b)
//     }
//     return a.status - b.status
//   },
//   name: sortByName,
//   favorite: (a, b) => {
//     if (a.isFavorite === b.isFavorite) {
//       return sortByName(a, b)
//     }
//     if (a.isFavorite === b.isFavorite )return 0
//     if (a.isFavorite)  return -1
//     else return 1
//   },
//   createdAt: (a, b) => {
//     if (a.createdAt === b.createdAt) {
//       return sortByName(a, b)
//     }
//     return a.createdAt > b.createdAt ? -1 : 1
//   }
// }

// const sortedTunes = computed(() => {
//   return myTunes.value.sort(sortFunctions[sortBy.value])
// })


// TODO: sorting, filtering?

// sort, filter, search
defineProps({
  users: Array,
})
</script>

<template>
  <div class="flex flex-col flex-gap-y-3">
    <UserCard
      v-for="user in users"
      :key="user.id"
      v-bind="{...user}"
    />
  </div>
</template>