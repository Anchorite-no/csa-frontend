import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
    'user',
    () => {
        const uid = ref(null)
        const nick = ref(null)
        const access_token = ref(null)
        const expires = ref(new Date().getTime())

        function login(user_access_token, user_uid, user_nick, user_expires) {
            access_token.value = user_access_token
            uid.value = user_uid
            nick.value = user_nick
            expires.value = user_expires
        }

        function logout() {
            uid.value = null
            nick.value = null
            access_token.value = null
            expires.value = new Date().getTime()
        }

        return { uid, access_token, nick, expires, login, logout }
    },
    {
        persist: {
            storage: sessionStorage,
        },
    }
)
