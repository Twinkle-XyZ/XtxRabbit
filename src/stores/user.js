import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/api/user'
import { useCartStore } from './cart'
import { mergeCartAPI } from '@/api/cart.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref({})
    const cartStore = useCartStore()
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
      // 合并购物车操作
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          // console.log(1111)
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
      )
      cartStore.updateNewList()
    }
    const setUserInfo = ({ account, password }) => {
      userInfo.value = { account, password }
      // 清除购物车
      cartStore.clearCart()
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
