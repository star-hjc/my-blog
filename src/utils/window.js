/**
 *
 * @param {Boolean} open    开关
 * @param {Number} timeout  关闭时间
 * @returns 打开加载动画
 */
function openLode(open = true, timeout = undefined) {
    const pageLode = document.getElementById('page-lode')
    if (timeout && open) {
        pageLode.style.display = ''
        const lode = setTimeout(() => {
            pageLode.style.display = 'none'
            clearTimeout(lode)
        }, timeout)
        return
    }
    pageLode.style.display = open ? '' : 'none'
}

/**
 *
 * @param {Number} el  元素
 * @param {Function} fn 函数
 * @returns 滚动条动画
 */
function scrollbarLode(el = '', fn) {
    if (!el) console.error('错误：', '没有传入元素名，无法执行自定义滚动条方法...')
    const lode = document.querySelector(el)
    lode.style.scrollBehavior = 'smooth'
    fn && fn()
    lode.style.scrollBehavior = 'auto'
}

/** 挂载的方法 */
const fns = { openLode, scrollbarLode }

Object.entries(fns).forEach(([key, fn]) => {
    /** 挂载window实例 */
    self[key] = fn
})
