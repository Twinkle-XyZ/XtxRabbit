import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategoryAPI } from '@/api/layout.js'

//导航列表的数据
export const useCategoryStore = defineStore('category', () => {
  // state数据列表
  const categoryList = ref([])
  // action获取导航的方法
  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.result
  }

  return {
    categoryList,
    getCategory
  }
})
