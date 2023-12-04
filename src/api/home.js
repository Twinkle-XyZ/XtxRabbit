import instance from '@/utils/request.js'

// 获取轮播图数据
export function getBannerAPI() {
  return instance({
    url: '/home/banner'
  })
}

//获取新鲜好物
export function getNewAPI() {
  return instance({
    url: '/home/new'
  })
}

//获取人气推荐
export function getHotAPI() {
  return instance({
    url: '/home/hot'
  })
}

//获取人气推荐
export function getGoodsAPI() {
  return instance({
    url: '/home/goods'
  })
}
