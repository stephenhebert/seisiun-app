import { defineConfig, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'
import theme from './theme'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        title: 'Julius Sans One',
        heading: 'Arvo',
        serif: 'Bitter',
        sans: 'Open Sans',
      },
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme,
  shortcuts: {
    'text-md': 'text-16px',
    'label': 'mb-1 text-sm text-gray-800 fw-600 font-sans',
    'input': 'border-1 border-gray-600 rounded p-2 font-serif',
    'heading': 'font-heading text-gray-700 fw-700',
    'h1': 'heading lt-sm:text-3xl sm:text-4xl',
    'h2': 'heading lt-sm:text-2xl sm:text-3xl',
    'h3': 'heading lt-sm:text-xl sm:text-2xl',
    'h4': 'heading lt-sm:text-lg sm:text-xl',
    'h5': 'heading sm:text-lg',
    'btn': 'bg-gray-700 text-white rounded px-4 p-2',
    'btn-sm': 'btn lt-sm:text-xs sm:text-sm ',
    'btn-md': 'btn lt-sm:text-sm sm:text-md',
    'btn-lg': 'btn lt-sm:text-md sm:text-lg',
  }
})