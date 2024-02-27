<script setup>
const mySessionsStore = useMySessionsStore()

const emit = defineEmits(['added'])

const props = defineProps({
  id: Number,
  name: String,
  createdAt: String,
})

const step = {
  JOIN: 0,
  SAVING: 1,
  JOINED: 2
}
const currentStep = ref(step.JOIN)

async function onSave() {
  currentStep.value = step.SAVING

  // await myTunesStore.addTune({
  //   id: props.id,
  //   isFavorite: isFavorite.value,
  //   status: status.value,
  // })

  currentStep.value = step.JOINED

  emit('joined')

}

onMounted(() => {
  if (mySessionsStore?.isMember({
    sessionId: props.id
  })) {
    currentStep.value = step.JOINED
  }
})
</script>

<template>
  <CardTemplate>
    <div class="flex flex-col justify-between flex-gap-y-2 p-4">
      <router-link
        :to="`/sessions/${id}`"
        class="link"
      >
        <span
          class="font-bold font-serif lt-sm:text-lg sm:text-xl"
        >{{ name }}</span>
      </router-link>
      <!-- <div class="text-x flex flex-row flex-gap-x-2 font-sans">
        <span
          v-for="tag in tuneTags"
          :key="tag"
          class="rounded-3 bg-gray-200 px-2 py-0.5 text-sm text-gray-600"
        >{{ tag }}</span>
      </div> -->
      <!-- <TuneStats 
        :tune="{ 
          favorites: props.favorites, 
          plays: props.plays,
          wantsToPlay: props.wantsToPlay
        }" 
      /> -->
    </div>

    <template 
      #actions 
      v-if="mySessionsStore"
    >
      <button
        v-if="currentStep === step.JOIN"
        class="flex p-1 text-gray-400 hover:text-green-700"
        @click="onJoin"
      >
        <div class="i-fa6-solid-handshake text-2xl" />
        <span class="sr-only">Join</span>
      </button>

      <div 
        v-else-if="currentStep === step.SAVING"
        class="p-1"
      >
        <div class="i-uil-sync animate-spin-reverse text-3xl" />
        <span class="sr-only">Saving</span>
      </div>

      <button
        v-else-if="currentStep === step.JOINED"
        class="p-1 text-gray-300 hover:text-red-500"
        @click="onLeave"
      >
        <div class="i-fa6-solid-hands text-2xl" />
        <span class="sr-only">Leave</span>
      </button>
    </template>
  </CardTemplate>
</template>
