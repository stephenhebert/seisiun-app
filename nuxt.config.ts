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
    '~/assets/css/main.css',
  ],
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  modules: [
    '@unocss/nuxt',
    '@headlessui-float/nuxt'
  ],
  build: {
    transpile: ['vue-clerk', '@clerk/clerk-js'],
  },
  runtimeConfig: {
    public: {
      clerkPublishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    },
    clerkSecretKey: process.env.CLERK_SECRET_KEY,
  },
})
