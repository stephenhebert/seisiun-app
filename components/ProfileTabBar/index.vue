<script setup>
import { tabs } from './types'
const activeTab = defineModel()

const buttonClasses = 'lt-sm:text-sm'
const activeButtonClasses = 'fw-700 sm:text-lg'
</script>

<template>
  <div class="mb-6 flex items-center justify-center gap-4 b-1 bg-zinc-100 p-4">
    <button
      :class="[ activeTab === tabs.TUNES ? activeButtonClasses : buttonClasses ]"
      @click="activeTab = tabs.TUNES"    
    >
      <span>Tunes</span>
    </button>
    <button 
      :class="[ activeTab === tabs.SESSIONS ? activeButtonClasses : buttonClasses ]"
      class="flex items-center gap-1"
      @click="activeTab = tabs.SESSIONS"
    >
      <!-- <div class="i-fa6-solid-users text-xs" /> -->
      <span>Sessions</span>
    </button>
    <button
      :class="[ activeTab === tabs.FOLLOWING ? activeButtonClasses : buttonClasses ]"
      @click="activeTab = tabs.FOLLOWING"
    >
      <span>Following</span>
    </button>
    <button
      :class="[ activeTab === tabs.FOLLOWERS ? activeButtonClasses : buttonClasses ]"
      @click="activeTab = tabs.FOLLOWERS"
    >
      <span>Followers</span>
    </button>
  </div>
</template>