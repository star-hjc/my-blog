/**
 *
 * @param {Boolean |Number} openOrTimeout  开关 | 关闭时间
 * @returns 开关加载动画
 */
function openLode (openOrTimeout = true) {
    const pageLode = document.getElementById('page-lode')
    if (typeof openOrTimeout === 'number') {
        const lode = setTimeout(() => {
            pageLode.style.display = 'none'
            clearTimeout(lode)
        }, openOrTimeout)

        return
    }
    pageLode.style.display = openOrTimeout ? '' : 'none'
}

/**
 * 生成头像
 * @param {Object} 'txt|color|size|fontSize|type|limit'
 */
const createPortrait = ({ txt, color, size, fontSize, type, limit }) => {
    const [bgColor, fontColor] = color || []
    const width = size?.[0] || 110
    const height = size?.[1] || 110
    fontSize = fontSize || 30
    if (!limit && txt.length !== 1) txt = txt.split('')[txt.length - 1]
    if (!limit && fontSize > width / 2) fontSize = width / 2
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    /** 背景颜色 */
    ctx.fillStyle = bgColor || '#5b89fe'
    ctx.fillRect(0, 0, width, height)
    // ctx.font = `bold  ${fontSize}px Arial`
    ctx.font = `${fontSize}px MiSans`
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
