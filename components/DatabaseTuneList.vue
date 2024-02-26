<script setup>
// TODO: sorting, filtering?
defineProps(['tunes'])

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
    <DatabaseTuneCard
      v-for="tune in tunes"
      :key="tune.databaseTuneId"
      v-bind="{...tune}"
      @added="onAdded"
    />
  </div>
</template>