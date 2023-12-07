import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'
import { insertCartAPI, findNewCartAPI, delCartAPI } from '@/api/cart.js'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])
    const userStore = useUserStore()
    const isLogin = computed(() => userStore.userInfo.token)

    //获取最新购物车列表
    const updateNewList = async () => {
      const res = await findNewCartAPI()
      cartList.value = res.result
    }

    const addCart = async (goods) => {
      // 登录后
      if (isLogin.value) {
        const { skuId, count } = goods
        await insertCartAPI({ skuId, count })
        updateNewList()
      }
      // 未登录
      else {
        // 已添加过
        const item = cartList.value.find((item) => goods.skuId === item.skuId)
        if (item) {
          item.count += goods.count
        } else {
          // 未添加过
          cartList.value.push(goods)
        }
      }
    }
    // 购物车统计
    // 总数量
    const allCount = computed(() =>
      cartList.value.reduce((sum, item) => sum + item.count, 0)
    )
    // 总价格
    const allPrice = computed(() =>
      cartList.value.reduce((sum, item) => sum + item.count * item.price, 0)
    )
    // 删除购物车
    const delCart = async (skuId) => {
      if (isLogin.value) {
        console.log(11111)
        await delCartAPI([skuId])
        updateNewList()
      } else
        cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }
    //   const delCart = async (skuId) => {
    //     // 思路：
    //     // 1. 找到要删除项的下标值 - splice
    //     // 2. 使用数组的过滤方法 - filter
    //     const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    //     cartList.value.splice(idx, 1)
    // }

    // 清空购物车
    const clearCart = () => {
      cartList.value = []
    }

    // 单选功能
    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }

    // 是否全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))
    // 全选功能
    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }

    // 已选择商品数量合计
    const selecteCount = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.count, 0)
    )
    // 已选择商品价格合计
    const selectePrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.count * item.price, 0)
    )
    return {
      cartList,
      addCart,
      delCart,
      clearCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck,
      selecteCount,
      selectePrice,
      updateNewList
    }
  },
  {
    persist: true
  }
)
