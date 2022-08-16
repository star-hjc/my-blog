/** axios封装 */
import axios from 'axios'
import { ElMessage } from 'element-plus'
const { VITE_REQUIST_URL } = import.meta.env
const axiosInstance = axios.create({
    baseURL: VITE_REQUIST_URL,
    withCredentials: false,
    timeout: 15000
})
/**
 * request封装
 */
axiosInstance.interceptors.request.use(
    config => {
        const Token = localStorage.getItem('TOKEN')
        if (Token) {
            config.headers = {
                'token': Token,
                'Content-Type': 'application/json'
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

/**
 * response封装
 */
axiosInstance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        console.log('[网络出错日志]', error)
        if (error && error.response) {
            const errMessage = {
                400: '错误请求', 401: '未授权，请重新登录',
                403: '拒绝访问',
                404: '请求错误,未找到该资源',
                405: '请求方法未允许',
                408: '请求超时',
                500: '服务器端出错',
                501: '网络未实现',
                502: '网络错误',
                503: '服务不可用',
                504: '网络超时',
                505: 'http版本不支持该请求'
            }
            ElMessage.error(errMessage[error.response.status] || '连接错误')
        }
        return error
    }
)

export default axiosInstance
