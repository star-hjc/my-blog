import requst from '../request.js'

const baseURL = '/api/user'

/**
 *  登录/注册/找回 接口
 * @returns
 */
export const login = (data) => {
    return requst({
        url: `${baseURL}/login`,
        method: 'post',
        data
    })
}
/**
 *  获取验证码
 * @param {Object} data { ?type: 验证码类型, user: 邮箱 }
 * @returns
 */
export const getValidcode = (data) => {
    return requst({
        url: `${baseURL}/validcode`,
        method: 'post',
        data
    })
}
