<template>
  <NuxtLayout :name="layoutName">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useUserStore } from "./stores/User"
import { USER_STATUS } from "./utils/constants"

const userStore = useUserStore()
const user = useSupabaseUser()

const { isMobileOrTablet } = useDevice()

const layoutName = ref("naked")

if (user.value) {
  userStore.setUserStatus(USER_STATUS.LOGGED_IN)
  userStore.setUserData(user.value)
  isMobileOrTablet
    ? (layoutName.value = "mobile")
    : (layoutName.value = "desktop")
} else if (userStore.userStatus != USER_STATUS.MAGIC_LINK_SENT) {
  layoutName.value = "naked"
  userStore.setUserStatus(USER_STATUS.LOGGED_OUT)
} else {
  layoutName.value = "naked"
}
</script>
