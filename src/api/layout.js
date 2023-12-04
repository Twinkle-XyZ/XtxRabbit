import instance from '@/utils/request.js'

// 获取全部分类
export function getCategoryAPI() {
  return instance({
    url: 'home/category/head'
  })
}
