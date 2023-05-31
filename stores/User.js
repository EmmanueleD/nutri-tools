import { defineStore } from "pinia"
import { USER_STATUS } from "~/utils/constants.js"

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userStatus: USER_STATUS.LOGGED_OUT,
    userData: null,
  }),
  actions: {
    setUserStatus(status) {
      this.userStatus = status
    },
    setUserData(data) {
      this.userData = data
    },
  },
})
