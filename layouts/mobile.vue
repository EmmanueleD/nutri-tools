<template>
  <div
    class="fixed top-0 flex flex-col h-screen justify-between bg-hero-pattern"
  >
    <header
      class="header z-10 h-12 w-full flex justify-between px-3 py-2 bg-emerald-700 text-white"
    >
      <NuxtLink to="/" class="flex items-center hover:cursor-pointer">
        <img
          class="h-full"
          src="../assets/images/logo.png"
          alt="logo nutri-tools"
        />
        <span class="ml-4">NUTRI-TOOLS</span>
      </NuxtLink>
    </header>

    <SidebarMenu></SidebarMenu>
    <div
      class="content mb-auto p-2 mt-12 fixed top-0 right-0 min-h-full max-h-full overflow-y-scroll"
      :style="{
        width: sidebarMenuOpen ? 'calc(100% - 20rem)' : 'calc(100% - 3.5rem)',
      }"
    >
      <slot />
    </div>

    <footer
      class="footer fixed bottom-0 z-10 h-12 w-full flex justify-between p-2 bg-emerald-700 text-white text-xs"
    >
      <div class="flex items-center">
        <span>© 2023 Nutri-tools</span>
      </div>
      <div class="flex items-center">
        <span>Powered by</span>
        <img
          @click="goto('https://www.emmd.dev')"
          class="h-3/5 ml-2 hover:cursor-pointer"
          src="../assets/images/emmd-d-logo.png"
          alt="logo nutri-tools"
        />
      </div>
    </footer>
  </div>
</template>

<script setup>
function goto(url) {
  window.open(url, "_blank")
}

const sidebarMenuOpen = useSidebarMenuOpen()
</script>
