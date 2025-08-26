import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false
  }),
  
  getters: {
    currentTheme: (state) => state.isDark ? 'dark' : 'light'
  },
  
  actions: {
    // 初始化主题
    initTheme() {
      // 检查本地存储
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.isDark = savedTheme === 'dark'
      } else {
        // 检查系统偏好
        this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      }
      this.applyTheme()
    },
    
    // 切换主题
    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem('theme', this.currentTheme)
    },
    
    // 设置主题
    setTheme(theme) {
      this.isDark = theme === 'dark'
      this.applyTheme()
      localStorage.setItem('theme', this.currentTheme)
    },
    
    // 应用主题到DOM
    applyTheme() {
      const html = document.documentElement
      if (this.isDark) {
        html.classList.add('dark')
      } else {
        html.classList.remove('dark')
      }
    }
  },
  
  persist: true
})
