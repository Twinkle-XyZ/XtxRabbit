<script setup>
import { ref, computed } from 'vue'
import { fetchHotGoodsAPI } from '@/api/detail'
import { useRoute } from 'vue-router'

const props = defineProps({
  type: {
    type: Number,
    default: 1
  }
})
// 基础列表
const goodList = ref([])
const route = useRoute()
const getHotList = async () => {
  const res = await fetchHotGoodsAPI({
    id: route.params.id,
    type: props.type
  })
  goodList.value = res.result
  // console.log(goodList.value)
}
getHotList()

// 可变部分
const TYPEMAP = {
  1: '24小时热度榜单',
  2: '周热榜单'
}
const title = computed(() => TYPEMAP[props.type])
</script>

<template>
  <div class="goods-hot">
    <h3>{{ title }}</h3>
    <!-- 商品区块 -->
    <RouterLink
      to="/"
      class="goods-item"
      v-for="item in goodList"
      :key="item.id"
    >
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

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
}
</style>
