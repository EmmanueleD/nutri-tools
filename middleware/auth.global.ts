export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  if (to.path === "/auth/magic-link" && user.value) {
    return navigateTo("/")
  } else if (to.path !== "/auth/magic-link" && !user.value) {
    return navigateTo("/auth/magic-link")
  }
})
