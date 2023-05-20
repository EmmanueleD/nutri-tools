<template>
  <div class="px-4 pt-2 pb-20">
    <h1 class="mt-2 mb-4">Calculadora Antropometrica</h1>
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
        <div
          v-for="category in patientData.dataCategories"
          :key="category.name"
        >
          <h3 class="mb-2">{{ category.name }}</h3>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4"
          >
            <div
              v-for="item in category.items"
              :key="item.name"
              class="flex flex-col mb-3"
            >
              <span>{{ item.name }}</span>
              <Dropdown
                v-if="item.options"
                :options="item.options"
                v-model="item.value"
              ></Dropdown>
              <InputNumber
                v-else
                v-model="item.value"
                min-fraction-digits="2"
                max-fraction-digits="2"
              ></InputNumber>
            </div>
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
    label: "Densidad corporal",
    storeKey: "densidadCorporal",
  },
  {
    label: "Porcentaje de masa grasa",
    storeKey: "porcentajeGrasa",
  },
  {
    label: "Masa grasa",
    storeKey: "masaGrasa",
  },
  {
    label: "Percentil del porcentage de masa grasa",
    storeKey: "percentilporcentageMassaGrasa",
  },
  {
    label: "Masa residual",
    storeKey: "masaResidual",
  },
  {
    label: "Masa osea",
    storeKey: "masaOsea",
  },
  {
    label: "Masa Muscular",
    storeKey: "masaMuscular",
  },
  {
    label: "Masa Muscular (Circ. Brazo)",
    storeKey: "masaMuscularDelBrazo",
  },
  {
    label: "Percentilo Masa Muscular (Circ. Brazo)",
    storeKey: "percentiloMasaMuscularDelBrazo",
  },
]
</script>
