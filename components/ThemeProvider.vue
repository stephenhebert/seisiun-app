<script setup>
import { computed } from 'vue'
import {flatten} from 'flat'

const props = defineProps({
  theme: { type: Object, required: true },
})

const flatThemeArray = computed(() => {
  if (!props.theme)
    return []
  const flatObj = flatten(props.theme, { safe: true })
  const transformedObj = Object.keys(flatObj).reduce((obj, key) => {
    const newKey = key
      .replaceAll('.', '-')
      .replace('-DEFAULT', '')
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
    obj[newKey] = Array.isArray(flatObj[key]) ? flatObj[key].join(', ') : flatObj[key]
    const hexColorRegex = /^#([A-Za-z0-9]{2})([A-Za-z0-9]{2})([A-Za-z0-9]{2})/
    if (hexColorRegex.test(flatObj[key])) {
      const hex = flatObj[key]
      const matches = hex.match(hexColorRegex)
      const rgb = [matches[1],matches[2],matches[3]].map((v) => parseInt(v, 16))
      obj[`${newKey}-rgb`] = rgb.join(', ')
    }
    return obj
  }, {})
  return Object.entries(transformedObj)
})
</script>

<template>
  <component is="style">
    :root {
    <template v-for="row in flatThemeArray">
      {{ '\r\n\t\t' }}    --{{ row[0] }}: {{ row[1] }};
    </template>
    {{ '\r\n' }} } {{ '\r\n' }}
  </component>
</template>
