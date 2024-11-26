import axios from 'axios'

import { BaseUrl } from '@/config/index.js'

const instance = axios.create({
  // 设置基本的URL和超时时间等配置
  baseURL: BaseUrl,
  timeout: 20000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前做些什么
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做些什么
    return response
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error)
  }
)

export default instance
