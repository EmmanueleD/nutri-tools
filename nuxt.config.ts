// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: "NUTRI-TOOLS",
      meta: [
        {
          name: "description",
          content:
            "NUTRI-TOOLS is a web platform that helps you run your nutrition dayly tasks",
        },
      ],
    },
  },
  modules: [
    "@nuxtjs/device",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    "nuxt-icon",
    "@pinia/nuxt",
  ],
  device: {
    refreshOnResize: true,
  },
  css: [
    "~/assets/css/main.css",
    "primevue/resources/themes/lara-light-blue/theme.css",
    "primevue/resources/primevue.css",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  googleFonts: {
    families: {
      Lexend: true,
    },
    download: true,
    display: "swap",
    subsets: "latin",
  },
  build: {
    transpile: ["primevue"],
  },
})
