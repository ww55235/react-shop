import axios from 'axios'

const baseURL = 'https://api-hmugo-web.itheima.net/api/public/v1/'

const http = axios.create({
  baseURL,
})
// 添加请求拦截器
http.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// 添加响应拦截器
http.interceptors.response.use(
  response => {
    //debugger
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default http
