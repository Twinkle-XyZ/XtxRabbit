// 封装轮播图
import { ref, onMounted } from 'vue'
import { getBannerAPI } from '@/api/home.js'
export function useBanner() {
  const bannerList = ref([])
  const getBannerList = async (distributionSite) => {
    const res = await getBannerAPI(distributionSite)
    //   console.log(res)
    bannerList.value = res.result
  }
  onMounted(() =>
    getBannerList({
      distributionSite: '2'
    })
  )
  return {
    bannerList
  }
}
