<script setup>
import { useUser } from 'vue-clerk'
const mySessionsStore = useMySessionsStore()
const { user } = useUser()

function createSession(form) {
  const session = mySessionsStore.createSession({
    name: form.session_name,
  })

  navigateTo('/sessions')
}
</script>

<template>
  <Section>
    <SectionHeader>Create a Session</SectionHeader>
    <div v-if="!user">
      <p class="text-center">
        Please log in or sign up to create a session
      </p>
    </div>
    <div v-else>
      <FormKit
        type="form"
        name="session-create"
        v-model="form"
        @submit="createSession"
        :actions="false"
      >
        <FormKit
          type="text"
          name="session_name"
          label="Session Name"
          outer-class="mb-4"
        />
        <FormKit
          type="submit"
          class="btn"
          label="Create Session"
        />
      </FormKit>
    </div>
  </Section>
</template>