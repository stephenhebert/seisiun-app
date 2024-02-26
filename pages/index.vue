<script setup>
definePageMeta({
  title: 'Seisiun',
  description: 'Find and share traditional Irish music sessions.',
  layout: 'landing'
})
</script>

<template>
  <div class="m-4 min-h-[calc(80vh-6em)] flex flex-col items-center justify-center gap-8">
    <div class="flex justify-center">
      <h1 class="text-5xl fw-600 font-title">
        Seisiún
      </h1>
    </div>
    <div class="flex justify-center">
      <p class="mb-2 text-center text-xl text-zinc-500 font-serif">
        A community for traditional music
      </p>
    </div>
    <div class="flex items-center justify-center gap-4 font-serif">
      <NuxtLink to="/sessions">
        <button class="p-4 btn-lg">
          Find a Session
        </button>
      </NuxtLink>
      <NuxtLink to="/tunes">
        <button class="p-4 btn-lg">
          Find a Tune
        </button>
      </NuxtLink>
    </div>
  </div>
</template>