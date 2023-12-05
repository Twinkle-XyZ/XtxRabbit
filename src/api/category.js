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
