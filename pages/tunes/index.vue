<script setup>
const profile = useProfile()
</script>

<template>
  <Section>
    <SectionHeader>
      Tunes
      <template #cta>
        <NuxtLink
          v-if="profile"
          to="/tunes/add-from-database"
        >
          <button
            class="btn-lg flex items-center rounded"
          >
            <!-- <div class="i-uil-search-plus mr-2 inline-block" /> -->
            <span>Add Tune from Database</span>
          </button>
        </NuxtLink>
      </template>
    </SectionHeader>
    <EmptyState />
  </Section>
</template>