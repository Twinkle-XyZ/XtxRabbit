import instance from '@/utils/request.js'

// 加入购物车
export const getOrderAPI = (id) => instance.get(`/member/order/${id}`)
