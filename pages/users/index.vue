<script setup>
definePageMeta({
  title: 'Users'
})


const users = ref([])
const isLoading = ref(false)

async function fetchUsers() {
  isLoading.value = true
  const response = await fetch('/api/users')
  if (response.ok) {
    users.value = await response.json()
  }
  isLoading.value = false
}

await fetchUsers()
</script>

<template>
  <Section>
    <SectionHeader>
      Users
    </SectionHeader>
    <EmptyState v-if="!isLoading && !users?.length" />
    <div v-else>
      <!-- {{ users }} -->
      <!-- <SessionList :sessions="sessions" /> -->
      <!-- TODO: user search -->
      <UserList 
        :users="users" 
      />
    </div>
  </Section>
</template>