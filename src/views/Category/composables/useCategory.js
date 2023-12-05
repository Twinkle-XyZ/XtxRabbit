import { ref, onMounted } from 'vue'
// 组件内部获取路由参数
import { useRoute } from 'vue-router'
import { onBeforeRouteUpdate } from 'vue-router'
import { getCategoryAPI } from '@/api/category.js'

export function useCategory() {
  const route = useRoute()

  // 获取分类数据
  const categoryList = ref({})
  const getCategoryList = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    //   console.log(res)
    categoryList.value = res.result
  }
  onMounted(() => getCategoryList())

  //   路由参数变化时，可以把分类数据重新发送
  onBeforeRouteUpdate((to) => getCategoryList(to.params.id))
  return {
    categoryList
  }
}
