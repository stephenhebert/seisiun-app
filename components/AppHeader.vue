<script setup>

</script>

<template>
  <div class="sticky top-0 z-100 min-w-320px w-full border-b-1 border-black bg-white shadow-md">
    <div class="m-auto max-w-1200px flex items-center justify-between sm:p-4 lt-sm:(px-4 py-2)">
      <div class="fw-900 font-title lt-sm:text-lg sm:text-2xl">
        seisiún
      </div>
      <ul class="flex flex-row font-title divide-x lt-sm:text-xs">
        <li class="px-2">
          <NuxtLink to="/tunes">
            <span class="text-gray-600 hover:text-black">Tunes</span>
          </NuxtLink>
        </li>
        <li class="px-2">
          <span class="text-gray-600 hover:text-black">Sessions</span>
        </li>
        <li class="px-2">
          <span class="text-gray-600 hover:text-black">Users</span>
        </li>
      </ul>
      <div>
        <AppUser />
      </div>
    </div>
  </div>
</template>