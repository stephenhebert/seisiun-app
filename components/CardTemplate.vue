<template>
  <div class="flex flex-row items-center gap-2">
    <div class="flex grow flex-row items-stretch justify-between flex-gap-x-2 overflow-hidden border-1 border-zinc-400 rounded-3 bg-white">
      <slot />
    </div>
    <div
      v-if="$slots.actions"
      class="flex flex-col"
    >
      <slot name="actions" />
    </div>
  </div>
</template>