/** 定时器是否存在 */
let timer = 0
/** 防抖函数是否第一次运行 */
let throttleIsOne = true

/**
 * deounce(fn.bind(this,$event),2000)
 * @param {Function} fn 函数
 * @param {Number} delayTime 延时时间
 * @param {Boolean} immediate 是否立即执行
 * @returns 防抖函数
 */
export function deounce(fn, delayTime = 1000, immediate = false) {
    if (timer) clearTimeout(timer)

    if (immediate && !timer && throttleIsOne) {
        fn && fn()
        throttleIsOne = false
        return
    }

    timer = setTimeout(() => {
        fn && fn()
    }, delayTime)
}

/**
 * throttle(fn.bind(this,$event),2000)
 * @param {Function} fn 函数
 * @param {Number} delayTime 延时时间
 * @returns 节流函数
 */
export function throttle(fn, delayTime = 1000) {
    if (timer) return

    timer = setTimeout(() => {
        clearTimeout(timer)
        fn && fn()
    }, delayTime)
}

/**
 *
 * @param {Number} timeout 延时结束时间
 * @returns 延时函数
 */
export function delay(timeout = 1000) {
    let time = null
    return new Promise(resolve => {
        time = setTimeout(() => { resolve() }, timeout)
    }).then(() => { clearTimeout(time) })
}

/**
 * 是否是空数组
 * @param {Array} val 值
 * @returns 空的数组 ? false : true
 */
export function isArrAndNotEmpty(val) {
    return Array.isArray(val) && val.length !== 0
}

/**
 * 是否是空对象
 * @param {Object} val 值
 * @returns 空的对象 ? false : true
 */
export function isObjAndNotEmpty(val) {
    return Object.keys(val).length > 0
}

/**
 *
 * @param {Array} arrAll 数组
 * @param {Array} arr 被包含的数组
 * @param {Boolean} strict 开启严格模式
 * @returns arrAll包含arr[Booler]
 */
export function arrIncludesArr(arrAll, arr, strict = false) {
    for (const item of arr) {
        if (!strict && !arrAll.join().includes(item)) return false
        if (strict && !arrAll.includes(item)) return false
    }
    return true
}

/**
 *
 * @param {Object} obj 对象
 * @returns 深拷贝
 */
export const copyObj = (obj) => {
    let newobj = null
    if (!obj || typeof (obj) !== 'object') {
        newobj = obj
        return newobj
    }
    newobj = Array.isArray(obj) ? [] : {}
    for (const i in obj) {
        newobj[i] = copyObj(obj[i])
    }
    return newobj
}

/**
 *
 * @param {Object} obj 对象
 * @returns 对象转URLSearchParams类型
 */
export const objToURLSearchParams = (obj) => {
    if (Object.keys(obj).length === 0) return ''
    const data = new URLSearchParams()
    Object.entries(obj).forEach(([key, value]) => {
        data.append(key, value)
    })
    return data
}
