<script setup>
// const myTunesStore = useMyTunesStore()
// const mySocialStore = useMySocialStore()


const props = defineProps({
  id: Number,
  name: String,
  createdAt: String,
})

const isSelf = computed(() => {
  return false
  return mySocialStore.state.user.id === props.id
})
</script>

<template>
  <CardTemplate>
    <div class="flex justify-between flex-gap-y-2 p-4">
      <!-- <a 
        :href="url"
        target="_blank"
      >
        <div
          class="i-uil-external-link-alt mr-1 inline-block shrink-0 text-md text-gray-400 font-sans"
        >
          <span class="sr-only">Open in new tab</span>
        </div> -->
      <router-link
        :to="`/users/${props.id}`"
        class="link"
      >
        <span
          class="font-bold font-serif lt-sm:text-lg sm:text-xl"
        >{{ name }}</span>
      </router-link>
      <!-- <div
        v-if="verbose"
        class="flex flex-row items-center gap-2 text-sm text-gray-400"
      >
        {{ createdAt }}
      </div> -->
      <!-- TODO: following, followers -->
    </div>
  </CardTemplate>
</template>
