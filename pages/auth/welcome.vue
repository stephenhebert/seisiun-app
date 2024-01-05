<script setup lang="ts">
import { useUser } from 'vue-clerk';
import { ref } from 'vue'

definePageMeta({
  middleware: ['auth'],
});

const { user } = useUser();
const router = useRouter();

console.log({user})

// TODO: await
const name = ref(user.value?.fullName);

async function createUser() {
  // error handling?
  const response = await fetch('/api/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: name.value })
  })
  if (response.ok) {
    // TODO: go back to returnUrl
    router.push('/')
  }
}

</script>

<template>
  <form @submit.prevent="createUser">

    <h1 class="text-3xl font-semibold">
      Your name:
    </h1>
    <div class="grid lg:grid-cols-3 gap-4">
      <input type="text" name="name" class="text-black" v-model="name" required />
    </div>
    <button type="submit" class="py-2 px-4 rounded bg-primary">Update</button>
  </form>
</template>