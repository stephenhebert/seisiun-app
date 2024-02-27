import { defineConfig, presetUno, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'
import theme from './theme'

export default defineConfig({
  content: {
    pipeline: {
      include: [
        './**/*.vue',
        './formkit.theme.ts',
      ]
    }
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        title: 'Julius Sans One',
        heading: 'Arvo',
        serif: 'Bitter',
        sans: 'Open Sans:400,600,700',
        // pixel: 'Silkscreen',
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
    'label': 'mb-1 text-sm text-zinc-800 fw-600 font-sans',
    'input': 'border-1 border-zinc-600 rounded p-2 font-serif',
    'heading': 'font-heading text-zinc-700 fw-700',
    'h1': 'heading lt-sm:text-3xl sm:text-4xl',
    'h2': 'heading lt-sm:text-2xl sm:text-3xl',
    'h3': 'heading lt-sm:text-xl sm:text-2xl',
    'h4': 'heading lt-sm:text-lg sm:text-xl',
    'h5': 'heading sm:text-lg',
    'btn-base': 'bg-zinc-700 text-white rounded-3 px-4 py-3 fw-600',
    'btn-sm': 'btn-base lt-sm:text-xs sm:text-sm ',
    'btn': 'btn-base lt-sm:text-sm sm:text-md',
    'btn-md': 'btn',
    'btn-lg': 'btn-base lt-sm:text-md sm:text-lg',
    'rounded-xl': 'rounded-3',
    'link': 'hover:(underline underline-offset-2 text-zinc-700)',
    // 'rounded-full': 'rounded-[9999px]',
  }
})