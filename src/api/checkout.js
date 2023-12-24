import instance from '@/utils/request.js'

// 获取订单详情
export const getCheckoutInfoAPI = () => instance.get('/member/order/pre')

// 创建订单详细
export const createOrderAPI = (data) => {
  return instance({
    url: '/member/order',
    method: 'POST',
    data
  })
}
