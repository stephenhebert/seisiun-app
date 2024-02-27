<script setup>
import { tabs } from './types'
const activeTab = defineModel()
</script>

<template>
  <div class="mb-6 flex items-center justify-center gap-4 b-1 bg-zinc-100 p-4">
    <button
      :class="{ 'fw-700': activeTab === tabs.TUNES }"
      @click="activeTab = tabs.TUNES"    
    >
      <span>Your Tunes</span>
    </button>
    <button 
      :class="{ 'fw-700': activeTab === tabs.SESSIONS }"
      class="flex items-center gap-1"
      @click="activeTab = tabs.SESSIONS"
    >
      <!-- <div class="i-fa6-solid-users text-xs" /> -->
      <span>Your Sessions</span>
    </button>
    <!-- <button
      :class="{ 'fw-600': activeTab === tabs.FOLLOWING }"
      @click="activeTab = tabs.FOLLOWING"
    >
      <span>Following</span>
    </button>
    <button
      :class="{ 'fw-600': activeTab === tabs.FOLLOWERS }"
      @click="activeTab = tabs.FOLLOWERS"
    >
      <span>Followers</span>
    </button> -->
  </div>
</template>