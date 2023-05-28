<template>
  <Toast position="bottom-center"></Toast>
  <div
    class="min-h-screen -min-w-screen flex justify-center items-start text-white bg-gray-800 py-32"
  >
    <div
      class="w-4/5 md:w-2/3 max-w-2xl flex flex-col items-center bg-slate-900 px-6 pt-12 pb-24 rounded-lg"
    >
      <h1>ENTRA A NUTRIHERR</h1>

      <div class="w-40 h-40 my-8">
        <img class="w-full h-full" src="~/assets/images/logo.png" alt="" />
      </div>

      <div v-if="!magicLinkSent">
        <p class="text-white text-center mb-2">
          Ingresar a tu cuenta NUTRIHERR es muy facil!
        </p>

        <p class="text-white text-center mb-6">
          Solo tienes que escribir tu mail y recibiras un
          <span class="font-bold">magic-link</span> que te permitirá el ingreso
          a la plataforma
        </p>
      </div>
      <div v-else>
        <p class="text-white text-center mb-2">
          Revisa tu casilla de correo, te enviamos un
          <span class="font-bold">magic-link</span> que te permitirá el ingreso
          a la plataforma
        </p>
      </div>

      <div
        v-if="!magicLinkSent"
        class="w-full flex flex-col justify-center items-center gap-4 px-6"
      >
        <InputText
          type="email"
          placeholder="Tu email"
          v-model="email"
          class="w-full"
        ></InputText>

        <Button
          @click="sendMagicLink"
          :loading="loading"
          style="background-color: #1f9339 !important"
          label="Envia el Magic Link"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "primevue/usetoast"
const toast = useToast()
const supabase = useSupabaseClient()

const loading = ref(false)
const magicLinkSent = ref(false)

const email = ref("")

async function sendMagicLink() {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })

    if (error) {
      throw error
    } else {
      magicLinkSent.value = true
      toast.add({
        severity: "success",
        summary: "Magic link enviado",
        detail:
          "Se envio un mail a tu casilla de correo, revisa tu bandeja de entrada para ingresar a tu cuenta",
        life: 10000,
      })
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: error.message,
      life: 10000,
    })
  } finally {
    loading.value = false
  }
}
</script>
