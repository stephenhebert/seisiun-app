<script setup lang="ts">
import { SignUp } from 'vue-clerk'

definePageMeta({
  layout: 'centered',
})
</script>

<template>
  <div class="grid h-full place-items-center">
    <SignUp sign-in-url="/auth/sign-in" />
  </div>
</template>