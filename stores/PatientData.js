import { defineStore } from "pinia"

export const usePatientData = defineStore("patientData", {
  state: () => ({
    dataCategories: [
      {
        name: "Información basica",
        items: [
          {
            name: "Sexo",
            options: ["Masculino", "Femenino"],
            value: null,
          },
          {
            name: "Edad",
            value: null,
          },
          {
            name: "Talla",
            value: null,
          },
          {
            name: "Peso",
            value: null,
          },
        ],
      },
      {
        name: "Pliegues cutaneos",
        items: [
          {
            name: "Tricipital",
            value: null,
          },
          {
            name: "Subescapular",
            value: null,
          },
          {
            name: "Suprailíaco",
            value: null,
          },
          {
            name: "Bicipital",
            value: null,
          },
        ],
      },
      {
        name: "Diámetros",
        items: [
          {
            name: "de Muñeca",
            value: null,
          },
          {
            name: "de Femúr",
          },
        ],
      },
      {
        name: "Circunferencias",
        items: [
          {
            name: "de Brazo",
            value: null,
          },
        ],
      },
    ],
  }),
  getters: {
    densidadCorporal(state) {
      let sexo = state.dataCategories[0].items[0].value
      let edad = state.dataCategories[0].items[1].value
      let mathLog10 = Math.log10(
        state.dataCategories[1].items[0].value +
          state.dataCategories[1].items[1].value +
          state.dataCategories[1].items[2].value +
          state.dataCategories[1].items[3].value
      )

      if (sexo == "Masculino") {
        if (edad >= 17 && edad <= 19) {
          return mathLog10 > 0 ? 1.162 - 0.063 * mathLog10 : null
        } else if (edad >= 20 && edad <= 29) {
          return mathLog10 > 0 ? 1.1631 - 0.0632 * mathLog10 : null
        } else if (edad >= 30 && edad <= 39) {
          return mathLog10 > 0 ? 1.1422 - 0.0544 * mathLog10 : null
        } else if (edad >= 40 && edad <= 49) {
          return mathLog10 > 0 ? 1.162 - 0.07 * mathLog10 : null
        } else if (edad >= 50) {
          return mathLog10 > 0 ? 1.1715 - 0.0779 * mathLog10 : null
        } else {
          return null
        }
      } else if (sexo == "Femenino") {
        if (edad >= 17 && edad <= 19) {
          return mathLog10 > 0 ? 1.1549 - 0.0678 * mathLog10 : null
        } else if (edad >= 20 && edad <= 29) {
          return mathLog10 > 0 ? 1.1599 - 0.0717 * mathLog10 : null
        } else if (edad >= 30 && edad <= 39) {
          return mathLog10 > 0 ? 1.1423 - 0.0632 * mathLog10 : null
        } else if (edad >= 40 && edad <= 49) {
          return mathLog10 > 0 ? 1.1333 - 0.0612 * mathLog10 : null
        } else if (edad >= 50) {
          return mathLog10 > 0 ? 1.1339 - 0.0645 * mathLog10 : null
        } else {
          return null
        }
      } else {
        return null
      }
    },
    porcentajeGrasa(state) {
      return state.densidadCorporal > 0
        ? 495 / state.densidadCorporal - 450
        : null
    },
    masaGrasa(state) {
      return (
        (state.porcentajeGrasa * state.dataCategories[0].items[3].value) / 100
      )
    },
    percentilporcentageMassaGrasa(state) {
      let edad = state.dataCategories[0].items[1].value
      let sexo = state.dataCategories[0].items[0].value

      let ageLine = []

      let percentiles = [5, 10, 15, 25, 50, 75, 85, 90, 95]

      let percentilesTable = {
        Masculino: [
          [8, 9, 10, 12, 16, 20, 23, 25, 28],
          [9, 10, 11, 13, 18, 23, 25, 26, 29],
          [16, 17, 18, 20, 23, 26, 27, 28, 30],
          [15, 17, 18, 20, 23, 25, 27, 27, 29],
          [14, 16, 18, 21, 26, 30, 32, 34, 36],
          [15, 17, 19, 21, 26, 30, 32, 34, 36],
          [15, 17, 19, 22, 27, 31, 33, 35, 37],
          [15, 18, 20, 22, 27, 31, 33, 35, 37],
          [16, 18, 20, 22, 27, 31, 33, 35, 37],
          [13, 16, 18, 21, 26, 30, 33, 35, 37],
          [13, 16, 18, 21, 26, 30, 33, 34, 36],
        ],
        Femenino: [
          [17, 19, 21, 23, 27, 33, 35, 37, 40],
          [18, 20, 21, 24, 29, 34, 37, 39, 41],
          [21, 23, 25, 27, 31, 36, 38, 40, 42],
          [22, 24, 25, 28, 32, 37, 39, 40, 42],
          [25, 28, 29, 31, 35, 39, 41, 42, 43],
          [26, 28, 29, 32, 36, 39, 41, 42, 44],
          [27, 30, 32, 35, 39, 43, 46, 47, 48],
          [27, 30, 32, 35, 39, 44, 45, 47, 49],
          [28, 31, 32, 35, 40, 43, 45, 46, 48],
          [27, 30, 32, 34, 38, 42, 44, 46, 47],
          [26, 29, 31, 34, 38, 42, 44, 45, 47],
        ],
      }

      if (edad >= 18 && edad < 25) {
        ageLine.push(...percentilesTable[sexo][0])
      }
      if (edad >= 25 && edad < 30) {
        ageLine.push(...percentilesTable[sexo][1])
      }
      if (edad >= 30 && edad < 35) {
        ageLine.push(...percentilesTable[sexo][2])
      }
      if (edad >= 35 && edad < 40) {
        ageLine.push(...percentilesTable[sexo][3])
      }
      if (edad >= 40 && edad < 45) {
        ageLine.push(...percentilesTable[sexo][4])
      }
      if (edad >= 45 && edad < 50) {
        ageLine.push(...percentilesTable[sexo][5])
      }
      if (edad >= 50 && edad < 55) {
        ageLine.push(...percentilesTable[sexo][6])
      }
      if (edad >= 55 && edad < 60) {
        ageLine.push(...percentilesTable[sexo][7])
      }
      if (edad >= 60 && edad < 65) {
        ageLine.push(...percentilesTable[sexo][8])
      }
      if (edad >= 65 && edad < 70) {
        ageLine.push(...percentilesTable[sexo][9])
      }
      if (edad >= 70 && edad < 75) {
        ageLine.push(...percentilesTable[sexo][10])
      }

      let percentile = null

      if (state.masaGrasa > 0) {
        for (let i = 0; i < percentiles.length; i++) {
          if (i == 0) {
            if (state.masaGrasa < ageLine[i]) {
              percentile = percentiles[i]
              return percentile
            }
          } else if (i >= 1) {
            if (
              state.masaGrasa >= ageLine[i - 1] &&
              state.masaGrasa < ageLine[i]
            ) {
              percentile = percentiles[i]
              return percentile
            }
          }
        }
      }
    },
    masaResidual(state) {
      let sexo = state.dataCategories[0].items[0].value
      let peso = state.dataCategories[0].items[3].value
      if (sexo == "Masculino") {
        return peso > 0 ? peso * 0.241 : null
      }
      if (sexo == "Femenino") {
        return peso > 0 ? peso * 0.209 : null
      }
    },
    masaOsea(state) {
      let talla = state.dataCategories[0].items[2].value
      let munieca = state.dataCategories[2].items[0].value
      let femur = state.dataCategories[2].items[1].value
      return talla > 0 && munieca > 0 && femur > 0
        ? 3.02 * (talla ** 2 * (munieca / 100) * (femur / 100) * 400) ** 0.712
        : null
    },
    masaMuscular(state) {
      let peso = state.dataCategories[0].items[3].value
      let masaGrasa = state.masaGrasa
      let masaOsea = state.masaOsea
      let masaResidual = state.masaResidual

      return peso > 0 && masaGrasa > 0 && masaOsea > 0 && masaResidual > 0
        ? peso - masaGrasa - masaOsea - masaResidual
        : null
    },
    masaMuscularDelBrazo(state) {
      let edad = state.dataCategories[0].items[1].value
      let circBrazo = state.dataCategories[3].items[0].value
      let tricipital = state.dataCategories[1].items[0].value
      let sexo = state.dataCategories[0].items[0].value

      if (edad < 18) {
        return circBrazo > 0 && tricipital > 0
          ? (circBrazo - tricipital * Math.PI) ** 2 / (4 * Math.PI)
          : null
      } else {
        if (sexo == "Masculino") {
          return circBrazo > 0 && tricipital > 0
            ? (circBrazo - tricipital * Math.PI) ** 2 / (4 * Math.PI) - 10
            : null
        } else if (sexo == "Femenino") {
          return circBrazo > 0 && tricipital > 0
            ? (circBrazo - tricipital * Math.PI) ** 2 / (4 * Math.PI) - 6.5
            : null
        }
      }
    },
    percentiloMasaMuscularDelBrazo(state) {
      let percentiles = [5, 10, 15, 25, 50, 75, 85, 90, 95]
      let percentilesTable = {
        Masculino: [
          [9.7, 10.4, 10.8, 11.6, 13, 14.6, 15.4, 16.3, 17.2],
          [10.1, 10.9, 11.3, 12.4, 13.9, 15.6, 16.4, 16.9, 18.4],
          [11.2, 12, 12.6, 13.5, 15, 16.4, 17.4, 18.3, 19.5],
          [12, 12.9, 13.5, 14.5, 16.2, 17.9, 18.8, 19.8, 20.9],
          [13.2, 14.2, 14.7, 15.7, 17.6, 19.5, 20.7, 21.7, 23.2],
          [14.4, 15.3, 15.8, 16.8, 18.7, 21.3, 22.9, 23.8, 25.7],
          [15.1, 16.2, 17, 18.5, 20.6, 22.6, 24.5, 25.2, 28.6],
          [16.3, 17.8, 18.5, 19.5, 21.6, 24, 25.5, 26.6, 29],
          [18.2, 19.3, 20.3, 21.7, 23.5, 26.7, 28.7, 30.4, 32.9],
          [19.6, 20.7, 21.6, 23, 25.7, 29, 32.2, 34, 37.1],
          [21, 22, 23, 24.8, 27.7, 31.6, 33.6, 36.1, 40.3],
          [22.6, 24.1, 25.3, 26.9, 30.4, 35.9, 39.3, 40.9, 44.9],
          [24.5, 26.7, 28.1, 30.4, 35.7, 41.3, 45.3, 48.1, 52.5],
          [28.3, 31.3, 33.1, 36.1, 41.9, 47.4, 51.3, 54, 57.5],
          [31.9, 34.9, 36.9, 40.3, 46.3, 53.1, 56.3, 57.7, 63],
          [37, 40.9, 42.4, 45.9, 51.9, 57.8, 63.6, 66.2, 70.5],
          [39.6, 42.6, 44.8, 48, 53.4, 60.4, 64.3, 67.9, 73.1],
          [34.2, 37.3, 39.6, 42.7, 49.4, 57.1, 61.8, 65, 72], //18
          [34.2, 37.3, 39.6, 42.7, 49.4, 57.1, 61.8, 65, 72],
          [34.2, 37.3, 39.6, 42.7, 49.4, 57.1, 61.8, 65, 72],
          [34.2, 37.3, 39.6, 42.7, 49.4, 57.1, 61.8, 65, 72],
          [34.2, 37.3, 39.6, 42.7, 49.4, 57.1, 61.8, 65, 72],
          [34.2, 37.3, 39.6, 42.7, 49.4, 57.1, 61.8, 65, 72],
          [34.2, 37.3, 39.6, 42.7, 49.4, 57.1, 61.8, 65, 72],
          [36.6, 39.9, 42.4, 46, 53, 61.4, 66.1, 68.9, 74.5],
          [36.6, 39.9, 42.4, 46, 53, 61.4, 66.1, 68.9, 74.5],
          [36.6, 39.9, 42.4, 46, 53, 61.4, 66.1, 68.9, 74.5],
          [36.6, 39.9, 42.4, 46, 53, 61.4, 66.1, 68.9, 74.5],
          [36.6, 39.9, 42.4, 46, 53, 61.4, 66.1, 68.9, 74.5],
          [37.9, 40.9, 43.4, 47.3, 54.4, 63.2, 67.6, 70.8, 76.1],
          [37.9, 40.9, 43.4, 47.3, 54.4, 63.2, 67.6, 70.8, 76.1],
          [37.9, 40.9, 43.4, 47.3, 54.4, 63.2, 67.6, 70.8, 76.1],
          [37.9, 40.9, 43.4, 47.3, 54.4, 63.2, 67.6, 70.8, 76.1],
          [37.9, 40.9, 43.4, 47.3, 54.4, 63.2, 67.6, 70.8, 76.1],
          [38.5, 42.6, 44.6, 47.9, 55.3, 64, 69.1, 72.7, 77.6],
          [38.5, 42.6, 44.6, 47.9, 55.3, 64, 69.1, 72.7, 77.6],
          [38.5, 42.6, 44.6, 47.9, 55.3, 64, 69.1, 72.7, 77.6],
          [38.5, 42.6, 44.6, 47.9, 55.3, 64, 69.1, 72.7, 77.6],
          [38.5, 42.6, 44.6, 47.9, 55.3, 64, 69.1, 72.7, 77.6],
          [38.4, 42.1, 45.1, 48.7, 56, 64, 68.5, 71.6, 77],
          [38.4, 42.1, 45.1, 48.7, 56, 64, 68.5, 71.6, 77],
          [38.4, 42.1, 45.1, 48.7, 56, 64, 68.5, 71.6, 77],
          [38.4, 42.1, 45.1, 48.7, 56, 64, 68.5, 71.6, 77],
          [38.4, 42.1, 45.1, 48.7, 56, 64, 68.5, 71.6, 77],
          [37.7, 41.3, 43.7, 47.9, 55.2, 63.3, 68.4, 72.2, 76.2],
          [37.7, 41.3, 43.7, 47.9, 55.2, 63.3, 68.4, 72.2, 76.2],
          [37.7, 41.3, 43.7, 47.9, 55.2, 63.3, 68.4, 72.2, 76.2],
          [37.7, 41.3, 43.7, 47.9, 55.2, 63.3, 68.4, 72.2, 76.2],
          [37.7, 41.3, 43.7, 47.9, 55.2, 63.3, 68.4, 72.2, 76.2],
          [36, 40, 42.7, 46.6, 54, 62.7, 67, 70.4, 77.4],
          [36, 40, 42.7, 46.6, 54, 62.7, 67, 70.4, 77.4],
          [36, 40, 42.7, 46.6, 54, 62.7, 67, 70.4, 77.4],
          [36, 40, 42.7, 46.6, 54, 62.7, 67, 70.4, 77.4],
          [36, 40, 42.7, 46.6, 54, 62.7, 67, 70.4, 77.4],
          [36.5, 40.8, 42.7, 46.7, 54.3, 61.9, 66.4, 69.6, 75.1],
          [36.5, 40.8, 42.7, 46.7, 54.3, 61.9, 66.4, 69.6, 75.1],
          [36.5, 40.8, 42.7, 46.7, 54.3, 61.9, 66.4, 69.6, 75.1],
          [36.5, 40.8, 42.7, 46.7, 54.3, 61.9, 66.4, 69.6, 75.1],
          [36.5, 40.8, 42.7, 46.7, 54.3, 61.9, 66.4, 69.6, 75.1],
          [34.5, 38.7, 41.2, 44.9, 52.1, 60, 64.8, 67.5, 71.6],
          [34.5, 38.7, 41.2, 44.9, 52.1, 60, 64.8, 67.5, 71.6],
          [34.5, 38.7, 41.2, 44.9, 52.1, 60, 64.8, 67.5, 71.6],
          [34.5, 38.7, 41.2, 44.9, 52.1, 60, 64.8, 67.5, 71.6],
          [34.5, 38.7, 41.2, 44.9, 52.1, 60, 64.8, 67.5, 71.6],
          [31.4, 35.8, 38.4, 42.3, 49.1, 57.3, 61.2, 64.3, 69.4],
          [31.4, 35.8, 38.4, 42.3, 49.1, 57.3, 61.2, 64.3, 69.4],
          [31.4, 35.8, 38.4, 42.3, 49.1, 57.3, 61.2, 64.3, 69.4],
          [31.4, 35.8, 38.4, 42.3, 49.1, 57.3, 61.2, 64.3, 69.4],
          [31.4, 35.8, 38.4, 42.3, 49.1, 57.3, 61.2, 64.3, 69.4],
          [29.7, 33.8, 36.1, 40.2, 47, 54.6, 59.1, 62.1, 67.3],
        ],
        Femenino: [
          [8.9, 9.7, 10.1, 10.8, 12.3, 13.8, 14.6, 15.3, 16.2],
          [10.1, 10.6, 10.9, 11.8, 13.2, 14.7, 15.6, 16.4, 17.3],
          [10.8, 11.4, 11.8, 12.6, 14.3, 15.8, 16.7, 17.4, 18.8],
          [11.2, 12.2, 12.7, 13.6, 15.3, 17, 18, 18.6, 19.8],
          [12.4, 13.2, 13.9, 14.8, 16.4, 18.3, 19.4, 20.6, 22.1],
          [13.5, 14.1, 14.6, 15.6, 17.4, 19.5, 21, 22, 24.2],
          [14.4, 15.2, 15.8, 16.7, 18.9, 21.2, 22.6, 23.9, 25.3],
          [15.2, 16, 16.8, 18.2, 20.8, 23.2, 24.6, 26.5, 28],
          [17, 17.9, 18.7, 19.8, 21.9, 25.4, 27.2, 28.3, 31.1],
          [17.6, 18.5, 19.3, 20.9, 23.8, 27, 29.1, 31, 33.1],
          [19.5, 21, 21.7, 23.2, 26.4, 30.7, 33.5, 35.7, 39.2],
          [20.4, 21.8, 23.1, 25.5, 29, 33.2, 36.3, 37.8, 40.5],
          [22.8, 24.5, 25.4, 27.1, 30.8, 35.3, 38.1, 39.6, 43.7],
          [24, 26.2, 27.1, 29, 32.8, 36.9, 39.8, 42.3, 47.5],
          [24.4, 25.8, 27.5, 29.2, 33, 37.3, 40.2, 41.7, 45.9],
          [25.2, 26.8, 28.2, 30, 33.6, 38, 40.2, 43.7, 48.3],
          [25.9, 27.5, 28.9, 30.7, 34.3, 39.6, 43.4, 46.2, 50.8],
          [19.5, 21.5, 22.8, 24.5, 28.3, 33.1, 36.4, 39, 44.2], // 18
          [19.5, 21.5, 22.8, 24.5, 28.3, 33.1, 36.4, 39, 44.2],
          [19.5, 21.5, 22.8, 24.5, 28.3, 33.1, 36.4, 39, 44.2],
          [19.5, 21.5, 22.8, 24.5, 28.3, 33.1, 36.4, 39, 44.2],
          [19.5, 21.5, 22.8, 24.5, 28.3, 33.1, 36.4, 39, 44.2],
          [19.5, 21.5, 22.8, 24.5, 28.3, 33.1, 36.4, 39, 44.2],
          [19.5, 21.5, 22.8, 24.5, 28.3, 33.1, 36.4, 39, 44.2],
          [20.5, 21.9, 23.1, 25.2, 29.4, 34.9, 38.5, 41.9, 47.8],
          [20.5, 21.9, 23.1, 25.2, 29.4, 34.9, 38.5, 41.9, 47.8],
          [20.5, 21.9, 23.1, 25.2, 29.4, 34.9, 38.5, 41.9, 47.8],
          [20.5, 21.9, 23.1, 25.2, 29.4, 34.9, 38.5, 41.9, 47.8],
          [20.5, 21.9, 23.1, 25.2, 29.4, 34.9, 38.5, 41.9, 47.8],
          [21.1, 23, 24.2, 26.3, 30.9, 36.8, 41.2, 44.7, 51.3],
          [21.1, 23, 24.2, 26.3, 30.9, 36.8, 41.2, 44.7, 51.3],
          [21.1, 23, 24.2, 26.3, 30.9, 36.8, 41.2, 44.7, 51.3],
          [21.1, 23, 24.2, 26.3, 30.9, 36.8, 41.2, 44.7, 51.3],
          [21.1, 23, 24.2, 26.3, 30.9, 36.8, 41.2, 44.7, 51.3],
          [21.1, 23.4, 24.7, 27.3, 31.8, 38.7, 43.1, 46.1, 54.2],
          [21.1, 23.4, 24.7, 27.3, 31.8, 38.7, 43.1, 46.1, 54.2],
          [21.1, 23.4, 24.7, 27.3, 31.8, 38.7, 43.1, 46.1, 54.2],
          [21.1, 23.4, 24.7, 27.3, 31.8, 38.7, 43.1, 46.1, 54.2],
          [21.1, 23.4, 24.7, 27.3, 31.8, 38.7, 43.1, 46.1, 54.2],
          [21.3, 23.4, 25.5, 27.5, 32.3, 39.8, 45.8, 49.5, 55.8],
          [21.3, 23.4, 25.5, 27.5, 32.3, 39.8, 45.8, 49.5, 55.8],
          [21.3, 23.4, 25.5, 27.5, 32.3, 39.8, 45.8, 49.5, 55.8],
          [21.3, 23.4, 25.5, 27.5, 32.3, 39.8, 45.8, 49.5, 55.8],
          [21.3, 23.4, 25.5, 27.5, 32.3, 39.8, 45.8, 49.5, 55.8],
          [21.6, 23.1, 24.8, 27.4, 32.5, 39.5, 44.7, 48.4, 56.1],
          [21.6, 23.1, 24.8, 27.4, 32.5, 39.5, 44.7, 48.4, 56.1],
          [21.6, 23.1, 24.8, 27.4, 32.5, 39.5, 44.7, 48.4, 56.1],
          [21.6, 23.1, 24.8, 27.4, 32.5, 39.5, 44.7, 48.4, 56.1],
          [21.6, 23.1, 24.8, 27.4, 32.5, 39.5, 44.7, 48.4, 56.1],
          [22.2, 24.6, 25.7, 28.3, 33.4, 40.4, 46.1, 49.6, 55.6],
          [22.2, 24.6, 25.7, 28.3, 33.4, 40.4, 46.1, 49.6, 55.6],
          [22.2, 24.6, 25.7, 28.3, 33.4, 40.4, 46.1, 49.6, 55.6],
          [22.2, 24.6, 25.7, 28.3, 33.4, 40.4, 46.1, 49.6, 55.6],
          [22.2, 24.6, 25.7, 28.3, 33.4, 40.4, 46.1, 49.6, 55.6],
          [22.8, 24.8, 26.5, 28.7, 33.7, 42.3, 47.3, 52.1, 58.8],
          [22.8, 24.8, 26.5, 28.7, 33.7, 42.3, 47.3, 52.1, 58.8],
          [22.8, 24.8, 26.5, 28.7, 33.7, 42.3, 47.3, 52.1, 58.8],
          [22.8, 24.8, 26.5, 28.7, 33.7, 42.3, 47.3, 52.1, 58.8],
          [22.8, 24.8, 26.5, 28.7, 33.7, 42.3, 47.3, 52.1, 58.8],
          [22.4, 24.5, 26.3, 29.2, 34.5, 41.1, 45.6, 49.1, 55.1],
          [22.4, 24.5, 26.3, 29.2, 34.5, 41.1, 45.6, 49.1, 55.1],
          [22.4, 24.5, 26.3, 29.2, 34.5, 41.1, 45.6, 49.1, 55.1],
          [22.4, 24.5, 26.3, 29.2, 34.5, 41.1, 45.6, 49.1, 55.1],
          [22.4, 24.5, 26.3, 29.2, 34.5, 41.1, 45.6, 49.1, 55.1],
          [21.9, 24.5, 26.2, 28.9, 34.6, 41.6, 46.3, 49.6, 56.5],
          [21.9, 24.5, 26.2, 28.9, 34.6, 41.6, 46.3, 49.6, 56.5],
          [21.9, 24.5, 26.2, 28.9, 34.6, 41.6, 46.3, 49.6, 56.5],
          [21.9, 24.5, 26.2, 28.9, 34.6, 41.6, 46.3, 49.6, 56.5],
          [21.9, 24.5, 26.2, 28.9, 34.6, 41.6, 46.3, 49.6, 56.5],
          [22.2, 24.4, 26, 28.8, 34.3, 41.8, 46.4, 49.2, 54.6],
        ],
      }

      let sexo = state.dataCategories[0].items[0].value
      let edad = state.dataCategories[0].items[1].value

      if (sexo && edad > 0 && state.masaMuscularDelBrazo > 0) {
        let ageLine = percentilesTable[sexo][edad]

        for (let i = 0; i < ageLine.length; i++) {
          if (i == 0) {
            if (state.masaMuscularDelBrazo < ageLine[i]) {
              return percentiles[i]
            }
          } else if (i > 0) {
            if (
              state.masaMuscularDelBrazo >= ageLine[i - 1] &&
              state.masaMuscularDelBrazo < ageLine[i]
            ) {
              return percentiles[i]
            }
          }
        }
      }
    },
    imc(state) {
      let peso = state.dataCategories[0].items[3].value
      let talla = state.dataCategories[0].items[2].value

      return peso && talla ? peso / talla ** 2 : null
    },
  },
})
