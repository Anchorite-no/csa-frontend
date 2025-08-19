<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const items = ref([
    {
        label: '数据管理',
        items: [
            {
                label: '新闻管理',
                icon: 'pi pi-file-edit',
                command: () => {
                    router.push({ name: 'admin-news' })
                },
            },
            {
                label: '活动管理',
                icon: 'pi pi-calendar',
                command: () => {
                    router.push({ name: 'admin-event' })
                },
            }
        ],
    },
    {
        label: '用户管理',
        items: [
            {
                label: '用户管理',
                icon: 'pi pi-user',
                command: () => {
                    router.push({ name: 'admin-users' })
                },
            },
            {
                label: '纳新管理',
                icon: 'pi pi-user',
                command: () => {
                    router.push({ name: 'admin-recruit' })
                },
            }
        ],
    }
])
</script>

<template>
    <div class="flex">
        <div class="grow-0">
            <div class="card flex justify-center m-4 lg:m-8">
                <Menu :model="items" />
            </div>
        </div>
        <div class="grow min-w-0 my-16">
            <router-view />
        </div>
    </div>
</template>
