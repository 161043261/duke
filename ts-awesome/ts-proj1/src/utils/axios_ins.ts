// 封装 axios
import axios, { type AxiosInstance } from 'axios'
import { ElMessage } from 'element-plus'

const axiosIns: AxiosInstance = axios.create({
  baseURL: '/api', // 请求 URL 前缀
  timeout: 10_000, // 超时时间 10s, 超时 10s 请求失败
})

// 请求拦截器
axiosIns.interceptors.request.use(
  /* onFulfilled */ config => {
    //! 必须返回 config
    return config
  } /* onRejected, option */,
)

// 响应拦截器
axiosIns.interceptors.response.use(
  /* onFulfilled */ response => {
    // console.log(response)
    return response.data
  },
  /* onRejected */ error => {
    console.error(error)
    const status = error.response.status
    // console.log('status:', status)

    switch (status % 100) {
      case 4:
        ElMessage({
          type: 'error',
          message: '客户端错误, 请求失败',
        })
        break

      case 5:
        ElMessage({
          type: 'error',
          message: '服务器错误, 请求失败',
        })
        break
    }
    return Promise.reject(new Error(error.message))
  } /* option */,
)

// 导出 axiosIns
export default axiosIns
