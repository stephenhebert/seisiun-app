<script setup>
import { tabs } from './types'
const activeTab = defineModel()

const activeClasses = 'fw-700 text-lg'
</script>

<template>
  <div class="mb-6 flex items-center justify-center gap-4 b-1 bg-zinc-100 p-4">
    <button
      :class="{ [activeClasses]: activeTab === tabs.TUNES }"
      @click="activeTab = tabs.TUNES"    
    >
      <span>Tunes</span>
    </button>
    <button 
      :class="{ [activeClasses]: activeTab === tabs.SESSIONS }"
      class="flex items-center gap-1"
      @click="activeTab = tabs.SESSIONS"
    >
      <!-- <div class="i-fa6-solid-users text-xs" /> -->
      <span>Sessions</span>
    </button>
    <button
      :class="{ [activeClasses]: activeTab === tabs.FOLLOWING }"
      @click="activeTab = tabs.FOLLOWING"
    >
      <span>Following</span>
    </button>
    <button
      :class="{ [activeClasses]: activeTab === tabs.FOLLOWERS }"
      @click="activeTab = tabs.FOLLOWERS"
    >
      <span>Followers</span>
    </button>
  </div>
</template>