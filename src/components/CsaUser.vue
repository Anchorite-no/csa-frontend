<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()

const op = ref()

const members = computed(() => {
    if (userStore.isAdmin) {
        return [
            {
                name: '后台管理',
                icon: 'pi pi-cog',
                action: () => router.push({ name: 'admin' }),
            },
            {
                name: '登出',
                icon: 'pi pi-sign-out',
                action: () => {
                    userStore.logout()
                    router.push({ name: 'home' })
                },
            },
        ]
    }

    return [
        {
            name: '用户后台',
            icon: 'pi pi-user',
            action: () => router.push({ name: 'user' }),
        },
        {
            name: '登出',
            icon: 'pi pi-sign-out',
            action: () => {
                userStore.logout()
                router.push({ name: 'home' })
            },
        },
    ]
})

const displayNick = computed(() => {
    if (!userStore.nick) return ''
    return userStore.nick.substring(0, 4)
})

const toggle = event => {
    op.value.toggle(event)
}

const selectMember = member => {
    member.action()
    op.value.hide()
}
</script>

<template>
    <div v-if="userStore.uid" class="user-menu">
        <Button
            type="button"
            :label="displayNick"
            severity="secondary"
            @click="toggle"
            class="user-trigger"
        />

        <Popover ref="op" class="user-popover">
            <ul class="user-menu-list">
                <li
                    v-for="member in members"
                    :key="member.name"
                    class="user-menu-item"
                    @click="selectMember(member)"
                >
                    <i :class="member.icon"></i>
                    <span>{{ member.name }}</span>
                </li>
            </ul>
        </Popover>
    </div>
</template>

<style scoped>
.user-menu {
    display: inline-flex;
    align-items: center;
}

.user-menu-list {
    list-style: none;
    margin: 0;
    padding: 0;
    min-width: 140px;
}

.user-menu-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
}

.user-menu-item:hover {
    background: rgba(102, 126, 234, 0.08);
    color: var(--accent-color);
}

:deep(.user-trigger.p-button) {
    min-width: 10rem;
    min-height: 2.75rem;
    padding: 0 1.25rem;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
}

:deep(.user-trigger .p-button-label) {
    font-weight: 600;
    white-space: nowrap;
}

:deep(.user-popover .p-popover-content) {
    padding: 0.5rem;
}
</style>
