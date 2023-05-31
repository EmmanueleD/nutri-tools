/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/assets/images/hero-pattern.svg')",
        "dark-hero-pattern": "url('/assets/images/dark-hero-pattern.svg')",
      },
    },
    fontFamily: {
      sans: ["Lexend", "sans-serif"],
    },
  },
  plugins: [],
  darkMode: "class",
}
