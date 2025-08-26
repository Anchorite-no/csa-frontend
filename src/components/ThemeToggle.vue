<template>
  <button 
    @click="toggleTheme" 
    class="theme-toggle"
    :title="isDark ? '切换到浅色模式' : '切换到深色模式'"
  >
    <i v-if="isDark" class="pi pi-sun"></i>
    <i v-else class="pi pi-moon"></i>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../stores/theme'

const themeStore = useThemeStore()

const isDark = computed(() => themeStore.isDark)

const toggleTheme = () => {
  themeStore.toggleTheme()
}
</script>

<style scoped>
.theme-toggle {
  width: 48px;
  height: 48px;
}

.theme-toggle i {
  font-size: 1.2rem;
}

/* 深色模式下的特殊样式 */
.dark .theme-toggle {
  background: var(--bg-surface);
  color: var(--text-primary);
}

/* 浅色模式下的特殊样式 */
:root .theme-toggle {
  background: var(--bg-surface);
  color: var(--text-primary);
}
</style>
