// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
    head: {
      title: "NUTRiHERR",
      meta: [
        {
          name: "description",
          content:
            "NUTRIHERR es un compendio online de herramientas utiles para nutricionistas y estudiantes de nutricion",
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
    "@nuxtjs/supabase",
    "@sfxcode/nuxt-primevue",
    "@nuxtjs/color-mode",
  ],

  device: {
    refreshOnResize: true,
  },

  css: [
    "~/assets/css/main.css",
    "~/assets/css/emmd.css",
    "primevue/resources/primevue.css",
    "~/assets/css/theme.css",
    "primeicons/primeicons.css",
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

  colorMode: {
    preference: "light", // default value of $colorMode.preference
    fallback: "light", // fallback value if not system preference found
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },

  build: {
    transpile: ["primevue"],
  },

  devtools: {
    enabled: true,
  },
})
