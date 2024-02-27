<script setup>
import { ref } from 'vue'
const { updateTuneFavorite, updateTuneStatus, removeTune } = useMyTunesStore()
import getUrlLabel from '~/utils/getUrlLabel'

const props = defineProps(['isFavorite', 'status', 'tune', 'tuneId'])

const isDeleting = ref(false)

async function onDelete() {
  await removeTune({ tuneId: props.tuneId })
  isDeleting.value = false
}
</script>

<template>
  <div class="flex flex-row items-center gap-2">
    <div class="relative flex grow flex-row items-stretch justify-between flex-gap-x-2 overflow-hidden border-1 border-zinc-400 rounded-3 bg-white shadow">
      <div
        v-if="isDeleting"
        class="absolute inset-0 z-10 flex items-center justify-center bg-gray-500/80"
      >
        <span class="text-4xl text-white fw-600 font-heading">Remove?</span>
      </div>
      <div
        class="flex flex-col justify-between flex-gap-y-2 overflow-hidden p-4 pr-0"
        :class="{'opacity-20': isDeleting}"
      >
        <div class="grow">
          <router-link
            :to="`/tunes/${tuneId}`"
            class="link font-bold font-serif lt-sm:text-lg sm:text-xl"
          >
            {{ tune.tuneNames?.[0] }}
          </router-link>
          <span
            v-if="tune.tuneNames?.[1]"
            class="text-gray-400 font-serif lt-sm:text-xs sm:text-sm"
          > ({{ [...tune.tuneNames ].splice(1).join(', ') }})</span>
        </div>
        <a 
          v-for="databaseTune in tune.databaseTunes"
          :key="databaseTune.id"
          :href="databaseTune.url"
          target="_blank"
          class="link flex items-center gap-1 text-gray-400 font-sans lt-sm:text-xs sm:text-sm"
        >
          <span class="i-uil-external-link-alt shrink-0" />
          <span class="truncate">{{ getUrlLabel(databaseTune.url) }}</span>
        </a>
        <TuneStats 
          :tune="props.tune"
        />
      </div>

      <div class="flex flex-col flex-gap-y-4 p-4 pl-0">
        <div class="flex grow justify-between flex-gap-4 sm:flex-row-reverse lt-sm:flex-col lt-sm:items-end sm:items-center sm:gap-4">
          <FavoriteToggleButton
            class="text-xl"
            :model-value="isFavorite"
            @update:model-value="(isFavorite) => updateTuneFavorite({ tuneId, isFavorite })"
          />
          <StatusToggleButton
            :model-value="status"
            @update:model-value="(status) => updateTuneStatus({ tuneId, status })"
          />
        </div>
      </div>
    </div>
    <div>
      <button
        v-if="!isDeleting"
        class="p-1 text-gray-300 hover:text-gray-500"
        @click="isDeleting = true"
      >
        <div class="i-uil-trash-alt text-3xl" />
        <span class="sr-only">Delete</span>
      </button>
      <div
        class="flex flex-col"
        v-else
      >
        <button
          class="p-1 text-gray-300 hover:text-red-500"
          @click="onDelete"
        >
          <div class="i-uil-check text-4xl" />
          <span class="sr-only">Confirm</span>
        </button>
        <button
          class="p-1 text-gray-300 hover:text-gray-500"
          @click="isDeleting = false"
        >
          <div class="i-uil-times text-4xl" />
          <span class="sr-only">Cancel</span>
        </button>
      </div>
    </div>
  </div>
</template>
