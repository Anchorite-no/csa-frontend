import { defineStore } from 'pinia'

export const useNavbarStore = defineStore('navbar', {
  state: () => ({
    isCollapsed: false
  }),
  actions: {
    toggleNav() {
      this.isCollapsed = !this.isCollapsed
    },
    setCollapsed(status) {
      this.isCollapsed = status
    }
  }
})