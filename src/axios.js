import ax from 'axios'
import { useUserStore } from './stores/user'
import router from './router/index'

const instance = ax.create({
    baseURL: '/api',
    timeout: 10000,
})

instance.interceptors.request.use(
    config => {
        const userStore = useUserStore()

        let access_token = userStore.access_token

        if (access_token) {
            if (userStore.expires <= new Date().getTime()) {
                userStore.logout()
            } else {
                config.headers.Authorization = 'Bearer ' + access_token
            }
        }

        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.response?.status === 401) {
            window.notyf.error('登录已过期，请重新登录')
            const userStore = useUserStore()
            userStore.logout()
            router.push({ name: 'login' })
        } else if (typeof error.response?.data?.detail === 'string') {
            window.notyf.error(error.response.data.detail)
        } else {
            window.notyf.error('未知错误')
        }
        return Promise.reject(error)
    }
)

export const AxiosPlugin = {
    install: app => {
        app.provide('axios', instance)
    },
}

export const axios = instance
