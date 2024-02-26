<script setup>
const mySessionsStore = useMySessionsStore()
const { mySessions, isLoading } = storeToRefs(mySessionsStore)

const mySessionSessions = computed(() => mySessions.value.map(session => session.session))
</script>

<template>
  <Section>
    <SectionHeader>
      Your Sessions
      <template #cta>
        <NuxtLink
          class="btn"
          to="/sessions"
        >
          Join Sessions
        </NuxtLink>
      </template>
    </SectionHeader>
    <template v-if="isLoading">
      <div class="flex justify-center">
        <PintLoader :complete="!isLoading" />
      </div>
    </template>
    <template v-else-if="mySessions.length">
      <div class="flex flex-col flex-gap-y-3">
        <!-- {{ mySessions }} -->
        <TransitionGroup name="list">
          <SessionCard 
            v-for="session in mySessionSessions"
            :key="session.id"
            v-bind="{...session}"
          />
        </TransitionGroup>
      </div>
    </template>
    <EmptyState v-else />
  </Section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>