import requst from '../request.js'

/**
 *
 * @returns 获取博客全局状态（博客浏览数据、博客标签、博客数量）
 */
export const getState = () => {
    return requst('/api/global/state')
}

/**
 *
 * @returns 获取博客浏览数据
 */
export const getVisits = () => {
    return requst('/api/global/visits')
}
