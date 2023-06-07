import requst from '../request.js'

/**
 *
 * @returns 获取博客列表
 */
export const getBolgList = (val) => {
    return requst({
        url: `/api/blog/list`,
        method: 'get',
        params: { val }
    })
}

/**
 *
 * @returns 获取博客详情
 */
export const getBolgDetails = (blogId) => {
    return requst({
        url: `/api/blog/details`,
        method: 'get',
        params: { blogId }
    })
}

/**
 *
 * @returns 写入博客
 */
export const addBolgDetails = (data) => {
    return requst({
        url: `/api/blog/add`,
        method: 'get',
        params: { data }
    })
}

/**
 *
 * @returns 修改博客
 */
export const setBolgDetails = (data) => {
    return requst({
        url: `/api/blog/set`,
        method: 'post',
        data
    })
}
