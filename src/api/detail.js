import instance from '@/utils/request.js'

// 获取商品详情
export const getDetail = (id) => {
  return instance({
    url: '/goods',
    params: {
      id
    }
  })
}

// 获取热榜商品
export const fetchHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return instance({
    url: '/goods/hot',
    params: {
      id,
      type,
      limit
    }
  })
}
