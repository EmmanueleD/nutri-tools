<template>
  <div
    class="fixed top-0 left-0 h-screen m-0 flex flex-col bg-emerald-900 text-white shadow-lg px-1 py-12 transition-all duration-150 ease-in-out"
    :class="sidebarMenuOpen ? 'w-80' : 'w-14'"
  >
    <div class="flex items-center justify-start">
      <div>
        <Icon
          @click="toggleIsOpen"
          name="fluent:panel-left-expand-16-filled"
          class="sidebar-icon transition-transform duration-500 ease-in-out"
          :class="sidebarMenuOpen ? 'transform rotate-180' : ''"
        ></Icon>
      </div>
    </div>
    <div class="flex items-center justify-start pl-1">
      <Icon
        name="fluent:line-horizontal-1-20-regular"
        class="text-white"
      ></Icon>
    </div>

    <div
      v-for="(tool, index) in tools"
      :key="index"
      class="flex items-center justify-start group cursor-pointer"
      :class="
        sidebarMenuOpen
          ? 'hover:bg-white hover:rounded-xl transition-all duration-150 ease-in-out'
          : ''
      "
    >
      <NuxtLink
        v-tooltip.right="{
          value: sidebarMenuOpen
            ? ``
            : `<p class='text-white text-xs font-bold'>${tool.name}</p>`,
          escape: true,
        }"
        :to="tool.url"
        class="flex items-center"
      >
        <Icon
          :name="tool.icon"
          class="sidebar-icon"
          :class="
            sidebarMenuOpen
              ? 'mr-1 grow group-hover:text-emerald-900 group-hover:bg-white'
              : ''
          "
        />

        <div
          v-if="sidebarMenuOpen"
          class="text-xs text-white group-hover:text-gray-700"
        >
          {{ tool.name }}
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const tools = [
  {
    icon: "mdi:information-variant-circle",
    name: "Información",
    url: "/informacion",
  },
  {
    icon: "material-symbols:measuring-tape-rounded",
    name: "CALCULADORA ANTROPOMETRICA",
    url: "/calculadora-antropometrica",
  },
  {
    icon: "healthicons:weight",
    name: "CALCULADORA IMC",
    url: "/calculadora-imc",
  },
  {
    icon: "bx:bxs-pie-chart-alt-2",
    name: "CALCULADORA DE MACRONUTRIENTES",
    url: "/calculadora-macronutrientes",
  },
  {
    icon: "ic:round-energy-savings-leaf",
    name: "REQUERIMIENTOS ENERGETICOS",
    url: "/calculadora-requerimientos-energeticos",
  },
  {
    icon: "mdi:food-apple",
    name: "LISTA DE ALIMENTOS",
    url: "/lista-alimentos",
  },
]

const sidebarMenuOpen = useSidebarMenuOpen()
function toggleIsOpen() {
  sidebarMenuOpen.value = !sidebarMenuOpen.value
}
</script>
