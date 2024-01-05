<template>
  <main
    class="relative min-h-screen flex flex-col items-center justify-center py-10"
  >
    <a
      href="https://vercel.com"
      class="rounded-full bg-white/30 px-6 py-2 text-sm text-gray-600 font-medium shadow-sm ring-1 ring-gray-900/5 transition-all dark:bg-white/80 dark:text-black active:shadow-sm hover:shadow-lg"
    >
      Deploy your own to Vercel
    </a>
    <h1
      class="from-black via-[#707070] to-[#ffffff] bg-gradient-to-br bg-clip-text pb-8 pt-4 text-center text-4xl text-transparent font-medium tracking-tight dark:from-white md:text-7xl"
    >
      Postgres on Vercel
    </h1>
    <!-- <Table :users="data?.users" :duration="data?.duration" /> -->
    <div
      class="mt-6 max-w-lg w-full text-center text-gray-600 font-light dark:text-gray-300"
    >
      Simple hello world demo of
      <a
        href="https://vercel.com/postgres"
        class="font-medium underline underline-offset-4 transition-colors hover:text-black dark:hover:text-white"
      >
        Vercel Postgres
      </a>
      <div class="my-2 flex items-center justify-center">
        <span>Built with</span>
        <a
          href="https://nuxt.com/docs"
          class="flex items-center font-medium underline underline-offset-4 transition-colors hover:text-black dark:hover:text-white"
        >
          <img
            src="/nuxt.svg"
            class="mx-2 h-6"
          >
          <p>Nuxt</p>
        </a>
        .
      </div>
    </div>
    <div class="flex grow flex-col">
      <a href="https://vercel.com">
        <img
          src="/vercel.svg"
          alt="Vercel Logo"
          class="my-2 text-white dark:text-white"
          width="{100}"
          height="{24}"
        >
      </a>
      <a
        href="https://github.com/vercel/examples/tree/main/storage/postgres-nuxt"
        class="bottom-20 right-20 mt-auto h-8 flex items-center space-x-2"
      >
        <img
          src="/github.svg"
          alt="GitHub Logo"
          class="h-6 dark:invert"
        >
        <p class="font-light">Source</p>
      </a>
    </div>
  </main>
</template>