import instance from '@/utils/request.js'

// 获取分类数据
export function getCategoryAPI(id) {
  return instance({
    url: '/category',
    params: {
      id
    }
  })
}

// 获取二级分类列表数据
export const getCategoryFilterAPI = (id) => {
  return instance({
    url: '/category/sub/filter',
    params: {
      id
    }
  })
}
// 获取商品列表
export const getSubCategoryAPI = (data) => {
  return instance({
    url: '/category/goods/temporary',
    method: 'POST',
    data
  })
}
