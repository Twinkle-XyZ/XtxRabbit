import instance from '@/utils/request.js'

export const getUserOrder = (params) => {
  return instance({
    url: '/member/order',
    method: 'GET',
    params
  })
}
