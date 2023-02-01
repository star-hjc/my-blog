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

function all() {
    return arguments[0]
}


/**
 * 生成头像
 * @param {Object} 'txt|color|size|fontSize|type|limit'
 */
const createPortrait = ({ txt, color, size, fontSize, type, limit }) => {
    const [bgColor, fontColor] = color || []
    const width = size?.[0] || 100
    const height = size?.[1] || 100
    if (!limit && txt.length !== 1) txt = txt.split('')[txt.length - 1]
    if (!limit && fontSize > width / 2) fontSize = width / 2
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    /** 背景颜色 */
    ctx.fillStyle = bgColor || '#5b89fe'
    ctx.fillRect(0, 0, width, height)
    // ctx.font = `bold  ${fontSize || 30}px Arial`
    ctx.font = `${fontSize || 30}px Arial`
    /** 字体颜色 */
    ctx.fillStyle = fontColor || '#FFF'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(txt, width / 2, height / 2)
    ctx.fill()
    const imgURL = canvas.toDataURL(`image/${type || 'png'}`)
    // delete canvas
    return imgURL
}

/** 挂载的方法 */
const fns = { openLode, createPortrait }

Object.keys(fns).forEach((key) => {
    /** 挂载window实例 */
    self[key] = fns[key]
})
