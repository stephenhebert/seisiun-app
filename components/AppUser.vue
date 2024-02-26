<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { SignOutButton, useUser } from 'vue-clerk'
import { toRef } from 'vue'
const { user } = useUser()

const hasUser = toRef(() => !!user.value)
const hasImage = toRef(() => user.value?.hasImage)
const imageUrl = toRef(() => user.value?.imageUrl)

function onSignOut() {
  navigateTo('/')
}
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
        class="w-fit flex flex-col flex-gap-y-2 border-1 border-gray-600 rounded bg-white py-2 text-gray-500 shadow-xl"
        @click="close"
      >
        <MenuItem
          v-slot="{ active }"
        >
          <NuxtLink to="/profile">
            <div
              class="flex items-center px-4 py-2"
              :class="{'bg-zinc-100 text-gray-900': active}"
            >
              <div class="i-uil-user mr-2 text-16px" />
              <span>Profile</span>
            </div>
          </NuxtLink>
        </MenuItem>
        <MenuItem 
          v-slot="{ active }"
        >
          <SignOutButton @click="onSignOut">
            <div 
              class="flex items-center px-4 py-2"
              :class="{'bg-zinc-100 text-gray-900': active}"
            >
              <div class="i-uil-sign-out-alt mr-2 text-16px" />
              <span>Sign Out</span>
            </div>
          </SignOutButton>
        </MenuItem>
      </MenuItems>
    </Float>
  </Menu>
  <a
    v-else
    href="/auth/sign-in"
  >
    <button class="i-uil-sign-in-alt text-36px">
      <span class="sr-only">Sign In</span>
    </button>
  </a>
</template>
