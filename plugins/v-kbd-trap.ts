// https://github.com/pdanpdan/vue-keyboard-trap
import { VueKeyboardTrapDirectiveFactory } from '@pdanpdan/vue-keyboard-trap'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { name, directive } = VueKeyboardTrapDirectiveFactory()
  nuxtApp.vueApp.directive(name, directive)
})