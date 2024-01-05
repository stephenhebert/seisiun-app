<script setup>
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

let asyncComponent = {
  async setup() {
    await delay(5 * 1000)
  },
  render() { return '' },
}
</script>

<template>
  <div class="h-100vh w-full bg-black">
    <div class="text-white">
      Here is some example async content
    </div>
    <AsyncWrapper>
      <component :is="asyncComponent" />
    </AsyncWrapper>
  </div>
</template>
