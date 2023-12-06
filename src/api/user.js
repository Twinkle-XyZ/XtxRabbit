import instance from '@/utils/request.js'

// 获取用户名账户和密码
export const loginAPI = ({ account, password }) =>
  instance.post('/login', { account, password })
