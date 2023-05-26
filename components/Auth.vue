<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref("")

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) throw error
    alert("Check your email for the login link!")
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="h-screen w-screen flex justify-center items-center text-white bg-gray-800"
  >
    <form @submit.prevent="handleLogin" class="pb-60">
      <div class="flex flex-col items-center">
        <h1>ENTRA A NUTRIHERR</h1>

        <div class="w-2/5 h-2/5 my-8">
          <img class="w-full h-full" src="~/assets/images/logo.png" alt="" />
        </div>

        <p class="mb-6 text-white">
          Escribe tu email y recibiras un
          <span class="font-bold">magic-link</span> para ingresar a tu cuenta
        </p>

        <div class="p-inputgroup flex-1">
          <InputText
            type="email"
            placeholder="Tu email"
            v-model="email"
          ></InputText>

          <Button
            style="background-color: #1f9339 !important"
            label="Envia el Magic Link"
          />
        </div>
      </div>
    </form>
  </div>
</template>
