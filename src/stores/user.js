import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/api/user'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
    }
    const setUserInfo = ({ account, password }) => {
      userInfo.value = { account, password }
    }
    return {
      userInfo,
      getUserInfo,
      setUserInfo
    }
  },
  {
    persist: true
  }
)
