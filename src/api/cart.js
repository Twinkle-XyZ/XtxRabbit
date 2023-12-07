import instance from '@/utils/request.js'

// 加入购物车
export const insertCartAPI = ({ skuId, count }) =>
  instance.post('/member/cart', { skuId, count })

//   获取购物车列表
export const findNewCartAPI = () => instance.get('/member/cart')

// 删除购物车
export const delCartAPI = (ids) => {
  return instance({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

// 合并购物车
export const mergeCartAPI = (data) => {
  return instance({
    url: '/member/cart/merge',
    method: 'POST',
    data
  })
}
