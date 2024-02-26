<script setup lang="ts">
import { SignIn } from 'vue-clerk'

definePageMeta({
  layout: 'centered',
})
</script>

<template>
  <div class="grid h-full place-items-center">
    <SignIn sign-up-url="/auth/sign-up" />
  </div>
</template>