import requst from '../request.js'

/**
 *
 * @returns 获取博客列表
 */
export const getBlogList = () => {
    return requst({
        url: `http://localhost:8888/api/blogList`
    })
}
