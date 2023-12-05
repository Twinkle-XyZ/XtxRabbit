<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/api/category.js'
import GoodsItem from '@/views/Home/components/GoodItem.vue'

const route = useRoute()
const categoryFilterList = ref({})
const getCategoryFilterList = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryFilterList.value = res.result
}
onMounted(() => {
  getCategoryFilterList()
})

const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const subCategoryList = ref([])
const getsubCategoryList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  subCategoryList.value = res.result.items
}
onMounted(() => {
  getsubCategoryList()
})
const tabChange = () => {
  reqData.value.page = 1
  getsubCategoryList()
}

// 无限加载
const disabled = ref(false)
const load = async () => {
  // 获取下一页数据
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  //   数组拼接
  subCategoryList.value = [...subCategoryList.value, ...res.result.items]
  //   记载完毕，停止监听
  if (res.result.items.length === 0) {
    disabled.value = true
  }
}
</script>

<template>
  <div class="container">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: `/category/${categoryFilterList.parentId}` }"
          >{{ categoryFilterList.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryFilterList.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div
        class="body"
        v-infinite-scroll="load"
        :infinite-scroll-disabled="disabled"
      >
        <!-- 商品列表-->
        <GoodsItem
          v-for="item in subCategoryList"
          :good="item"
          :key="item.id"
        ></GoodsItem>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>
