import { defineStore } from "pinia"

export const useAppState = defineStore("appState", {
  state: () => ({
    sidebarMenuOpen: false,
    darkMode: false,
  }),
})
