import { en } from '@formkit/i18n'
import { defineFormKitConfig } from '@formkit/vue'
import { rootClasses } from './formkit.theme'
import { icons } from '@iconify-json/uil'

export default defineFormKitConfig({
  locales: { en },
  locale: 'en',
  config: {
    rootClasses
  },
  icons: {
    square: icons.square,
    circle: icons.circle,
    'check-square': icons['check-square'],
    'check-circle': icons['check-circle'],
  }
})