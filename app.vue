<template>
  <div v-if="user">
    <NuxtLayout :name="layoutName">
      <NuxtPage />
    </NuxtLayout>
  </div>
  <Auth v-else />
</template>

<script setup>
const user = useSupabaseUser()
const { isMobileOrTablet } = useDevice()
const layoutName = isMobileOrTablet ? "mobile" : "desktop"
</script>
