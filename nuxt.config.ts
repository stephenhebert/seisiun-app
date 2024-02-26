// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/': { prerender: true },
    '/api/**': { ssr: true},
    '/**': { ssr: false },
  },
  css: [
    '@unocss/reset/tailwind.css',
    '~/assets/css/main.scss',
  ],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  modules: [
    '@unocss/nuxt',
    '@headlessui-float/nuxt',
    '@pinia/nuxt',
    '@formkit/nuxt',
  ],
  formkit: {
    autoImport: true
  },
  build: {
    transpile: ['vue-clerk', '@clerk/clerk-js'],
  },
  // watchers: {
  //   chokidar: {
  //     include: [
  //       './formkit.theme.ts'
  //     ]
  //   }
  // },
  runtimeConfig: {
    public: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    },
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
  },
})
