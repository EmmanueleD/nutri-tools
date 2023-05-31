<template>
  <div class="px-4 pt-2 pb-20">
    <h1 class="mt-2 mb-4">Calculadora IMC</h1>
    <div class="grid grid-cols-1 md:grid-cols-3">
      <div>
        <div
          v-for="resultado in resultados"
          :key="resultado.label"
          class="flex flex-col mb-4"
        >
          <span>{{ resultado.label }}</span>
          <span v-if="patientData[resultado.storeKey]" class="font-bold">{{
            patientData[resultado.storeKey].toPrecision(5)
          }}</span
          ><span v-else> - </span>
        </div>
      </div>
      <div class="col-span-2">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <div class="flex flex-col mb-3">
            <span>Talla</span>
            <InputNumber
              v-model="patientData.dataCategories[0].items[2].value"
              :min-fraction-digits="2"
              :max-fraction-digits="2"
            ></InputNumber>
          </div>
          <div class="flex flex-col mb-3">
            <span>Peso</span>
            <InputNumber
              v-model="patientData.dataCategories[0].items[3].value"
              :min-fraction-digits="2"
              :max-fraction-digits="2"
            ></InputNumber>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePatientData } from "@/stores/PatientData"
const patientData = usePatientData()

const resultados = [
  {
    label: "Indice de Masa Corporal",
    storeKey: "imc",
  },
]
</script>
