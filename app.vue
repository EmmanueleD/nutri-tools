<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const { isMobileOrTablet } = useDevice()

const layoutName = isMobileOrTablet ? "mobile" : "desktop"
</script>
