<template>
  <div>
    <div class="mb-4 flex items-end justify-between flex-gap-4">
      <h2 class="h2">
        <slot />
      </h2>
      <div v-if="$slots.cta">
        <slot name="cta" />
      </div>
    </div>
    <hr>
  </div>
</template>