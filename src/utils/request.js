import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user.js'
import router from '@/router'
// 创建axios实例
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios请求拦截器
instance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    // 获取Pinia数据
    const token = userStore.userInfo.token
    // 按照后端接口拼接token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (e) => Promise.reject(e)
)

// axios响应式拦截器
instance.interceptors.response.use(
  (res) => res.data,
  (e) => {
    const userStore = useUserStore()
    // 统一的错误提示
    ElMessage({
      type: 'warning',
      message: e.response.data.msg
    })
    // 401token失败
    // 1.清除本地  2.跳转登录
    if (e.response.status === 401) {
      userStore.setUserInfo({})
      router.push('/login')
    }
    return Promise.reject(e)
  }
)

export default instance
