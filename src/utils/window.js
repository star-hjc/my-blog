import { openLode } from './utils'

/** 挂载的方法 */
const fns = {openLode}

Object.entries(fns).forEach(([key,fn]) => {
    /** 挂载window实例 */
    self[key] = fn
})