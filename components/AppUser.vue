<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useUser } from 'vue-clerk'
import { toRef } from 'vue'
const { user } = useUser()

const hasUser = toRef(() => !!user.value)
const hasImage = toRef(() => user.value?.hasImage)
const imageUrl = toRef(() => user.value?.imageUrl)
</script>

<template>
  <Menu
    v-if="hasUser"
    v-slot="{ close }"
  >
    <Float
      placement="bottom-end"
      shift
      flip
      :offset="8"
    >
      <MenuButton>
        <img 
          v-if="hasImage" 
          class="size-32px border-1 border-black rounded-1/2" 
          :src="imageUrl" 
        >
        <div 
          v-else 
          class="i-uil-user-circle text-36px"
        />
      </MenuButton>
      <MenuItems
        class="w-fit flex flex-col flex-gap-y-2 border-1 border-gray-600 rounded bg-white py-2 shadow-lg"
        @click="close"
      >
        <MenuItem
          v-slot="{ active }"
        >
          <NuxtLink to="/profile">
            <div
              class="flex items-center px-4 py-2"
              :class="{'bg-gray-200': active}"
            >
              <div class="i-uil-user mr-2 text-16px" />
              <span>Profile</span>
            </div>
          </NuxtLink>
        </MenuItem>
        <MenuItem 
          v-slot="{ active }"
        >
          <NuxtLink to="/auth/sign-out">
            <div 
              class="flex items-center px-4 py-2"
              :class="{'bg-gray-200': active}"
            >
              <div class="i-uil-sign-out-alt mr-2 text-16px" />
              <span>Sign Out</span>
            </div>
          </NuxtLink>
        </MenuItem>
      </MenuItems>
    </Float>
  </Menu>
  <NuxtLink
    v-else
    to="/auth/sign-in"
  >
    <button class="i-uil-sign-in-alt text-36px">
      <span class="sr-only">Sign In</span>
    </button>
  </NuxtLink>
</template>
