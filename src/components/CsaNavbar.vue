<script setup>
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'

const route = useRoute()

import { useNavbarStore } from '@/stores/navbar'
const navbarStore = useNavbarStore()
const themeStore = useThemeStore()
const userStore = useUserStore()

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        jump: 'home',
        activeNames: ['home', 'index'],
    },
    {
        label: 'News',
        icon: 'pi pi-book',
        jump: 'news_list',
        activeNames: ['news_list', 'news'],
    },
    {
        label: 'Events',
        icon: 'pi pi-star',
        jump: 'event_list',
        activeNames: ['event_list', 'event'],
    },
    {
        label: 'Contact',
        icon: 'pi pi-envelope',
        jump: 'recruit',
        // jump: 'contact'
        activeNames: ['recruit', 'contact'],
    },
    {
        label: 'About',
        icon: 'pi pi-user',
        jump: 'about',
        activeNames: ['about'],
    },
])

const isActiveItem = item => {
    const activeNames = item.activeNames || [item.jump]
    return activeNames.includes(route.name)
}

watch(
    () => route.name,
    () => {
        // 确保导航栏始终展开
        navbarStore.setCollapsed(false)
    },
    { immediate: true }
)
</script>

<template>
    <div class="fixed-nav">
        <Menubar :model="items" class="nav-content">
            <template #start>
                <router-link :to="{ name: 'home' }" class="nav-brand my-3 mx-5 text-xl">
                    ZJUCSA
                </router-link>
            </template>
            <template #item="{ item, props, hasSubmenu, root }">
                <router-link
                    v-ripple
                    :class="['flex items-center nav-link', { 'nav-link-active': isActiveItem(item) }]"
                    v-bind="props.action"
                    :to="{ name: item.jump }"
                    :aria-current="isActiveItem(item) ? 'page' : undefined"
                >
                    <span :class="item.icon" />
                    <span class="ml-2">{{ item.label }}</span>
                    <Badge
                        v-if="item.badge"
                        :class="{ 'ml-auto': !root, 'ml-2': root }"
                        :value="item.badge"
                    />
                    <span
                        v-if="item.shortcut"
                        class="ml-auto border border-surface rounded bg-emphasis text-muted-color text-xs p-1"
                        >{{ item.shortcut }}</span
                    >
                    <i
                        v-if="hasSubmenu"
                        :class="[
                            'pi pi-angle-down',
                            {
                                'pi-angle-down ml-2': root,
                                'pi-angle-right ml-auto': !root,
                            },
                        ]"
                    ></i>
                </router-link>
            </template>
            <template #end>
                <div class="flex items-center gap-2">
                    <button
                        type="button"
                        @click="themeStore.toggleTheme()" 
                        class="theme-toggle-nav"
                        :aria-label="themeStore.isDark ? '切换到浅色模式' : '切换到深色模式'"
                        :title="themeStore.isDark ? '切换到浅色模式' : '切换到深色模式'"
                    >
                        <i v-if="themeStore.isDark" class="pi pi-sun"></i>
                        <i v-else class="pi pi-moon"></i>
                    </button>
                    <!-- 未登录时显示登录按钮 -->
                    <!-- <router-link v-if="!userStore.uid" :to="{ name: 'login' }">
                        <Button label="登录" severity="secondary" class="mx-2 min-w-40" />
                    </router-link> -->
                    <!-- 已登录时显示用户组件 -->
                    <csa-user v-if="userStore.uid" class="ml-auto" />
                </div>
            </template>
        </Menubar>
    </div>
</template>

<style>
.fixed-nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    margin: 0;
    padding: 0;
    border: none;
    --nav-action-height: 2.5rem;
    --nav-action-radius: 10px;
    --nav-action-padding: 0 1rem;
    --nav-action-border: 1px solid var(--border-color);
    --nav-action-bg: transparent;
    --nav-action-bg-hover: var(--bg-secondary);
    --nav-action-color: var(--text-secondary);
    --nav-action-color-hover: var(--text-primary);
}

/* about-nav样式已移除，统一使用fixed-nav */

/* 深色模式下的导航栏样式 */
.dark .fixed-nav {
    background-color: rgba(30, 30, 30, 0.95);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    --nav-action-bg-hover: rgba(255, 255, 255, 0.06);
}

/* 导航栏文字颜色适配主题 */
.fixed-nav .p-menubar {
    color: var(--text-primary);
    transition: color 0.3s ease;
}

/* 导航栏链接颜色适配主题 */
.fixed-nav .p-menubar a {
    color: var(--text-primary);
    transition: color 0.3s ease;
}

.fixed-nav .p-menubar a:hover {
    color: var(--accent-color);
}

/* 导航栏品牌名称颜色 */
.fixed-nav .my-3 {
    color: var(--text-primary);
    font-weight: bold;
    transition: color 0.3s ease;
}

.fixed-nav .nav-brand {
    color: var(--text-primary);
    font-weight: 700;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.2s ease;
}

.fixed-nav .nav-brand:hover {
    color: var(--accent-color);
}

/* 确保PrimeVue组件也适配主题 */
.p-menubar {
    background: transparent !important;
    border: none !important;
    color: var(--text-primary);
    transition: color 0.3s ease;
}

.p-menubar .p-menuitem-link {
    color: var(--text-primary) !important;
    transition: color 0.3s ease;
}

.p-menubar .p-menuitem-link:hover {
    color: var(--accent-color) !important;
    background-color: rgba(102, 126, 234, 0.1) !important;
}

.p-menubar .p-menuitem-link.nav-link-active {
    color: var(--accent-color) !important;
    background-color: rgba(102, 126, 234, 0.12) !important;
    font-weight: 600;
}

.p-menubar .p-menuitem-link.nav-link-active:hover {
    background-color: rgba(102, 126, 234, 0.12) !important;
}

.p-menubar .p-menuitem.p-highlight .p-menuitem-link {
    color: var(--accent-color) !important;
    background-color: rgba(102, 126, 234, 0.1) !important;
}

/*折叠导航栏的按钮*/
.nav-button-container {
    position: fixed;
    right: 1rem;
    top: 1rem;
    z-index: 1001;
}

.nav-toggle-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-surface) !important;
    color: var(--text-primary) !important;
    border: 1px solid var(--border-color) !important;
    transition: all 0.3s ease !important;
    box-shadow: 0 2px 8px var(--shadow-color) !important;
}

.nav-toggle-btn:hover {
    background: var(--bg-secondary) !important;
    transform: scale(1.05);
    box-shadow: 0 4px 12px var(--shadow-color) !important;
}

.nav-collapsed {
    transform: translateY(-100%);
    opacity: 0;
}

/* 导航栏主题切换按钮 */
.theme-toggle-nav {
    width: var(--nav-action-height);
    height: var(--nav-action-height);
    border-radius: var(--nav-action-radius);
    border: var(--nav-action-border);
    background: var(--nav-action-bg);
    color: var(--nav-action-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
    box-shadow: none;
}

.theme-toggle-nav:hover {
    background: var(--nav-action-bg-hover);
    color: var(--nav-action-color-hover);
}

.theme-toggle-nav:focus-visible {
    outline: 2px solid rgba(102, 126, 234, 0.18);
    outline-offset: 2px;
}

.theme-toggle-nav i {
    font-size: 1rem;
}
</style>
