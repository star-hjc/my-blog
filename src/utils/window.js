import { useDark } from "@vueuse/core"

/**
 *      
 * @param {Boolean} open    开关
 * @param {Number} timeout  关闭时间
 * @returns 打开加载动画
 */
export function openLode(open, timeout = undefined) {
    let pageLode = document.getElementById('page-lode')
    if(timeout && open){
        pageLode.style.display = ''
        const lode = setTimeout(()=>{
            pageLode.style.display = 'none'
            clearTimeout(lode)
        },timeout)
        return
    }
    pageLode.style.display = open ? '' : 'none'
    
}

/** 挂载的方法 */
const fns = {openLode}

Object.entries(fns).forEach(([key,fn]) => {
    /** 挂载window实例 */
    self[key] = fn
})