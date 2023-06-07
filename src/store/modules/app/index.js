import { defineStore } from 'pinia'

export default defineStore({
    /** id必填，且需要唯一 */
    id: 'app',
    state: () => {
        return {
            /** 0:未知,1:移动设备,2:平板,3:PC设备 */
            equipments: { 'unknown': 0, 'mobile': 1, 'tablet': 2, 'desktop': 3 },
            equipment: 'unknown',
            /** 0:未知,1:移动设备,2:平板,3:PC设备 */
            knownOs: { 'unknown': 0, 'ios': 1, 'iphone': 2, 'ipad': 3, 'ipod': 4, 'android': 5, 'blackberry': 6, 'windows': 7, 'macos': 8, 'fxos': 9, 'meego': 10, 'television': 11 },
            os: 'unknown',
            /** 微信浏览器打开 */
            isWeChat: navigator?.userAgent?.toLowerCase()?.indexOf('micromessenger') !== -1,
            /** 主题 */
            theme: 'dark',
            themeIcon: 'icon-brightness',
            /** 静态壁纸 */
            wallpaper: new URL('../../../assets/img/bg/bg-home.jpg', import.meta.url).href,
            /** 动态壁纸 */
            dynamicWallpaper: [
                { url: new URL('../../../assets/mp4/dynamic.mp4', import.meta.url).href, type: 'video/mp4' }
            ],
            /** 显示登录模块 */
            isShowLoginModel: false,
            /** 显示查询模块 */
            isShowSearchModel: false,
            /** 显示右侧菜单 */
            isShowRigthMenuModer: false,
            /** 显示个人中心 */
            isShowMyModel: false
        }
    },
    actions: {
        setData (partial) {
            this.$patch(partial)
        },
        onShowMyModel (isShow) {
            if (isShow === undefined) {
                this.isShowMyModel = !this.isShowMyModel
            } else {
                this.isShowMyModel = isShow
            }
        },
        onShowLoginModel (isShow) {
            if (isShow === undefined) {
                this.isShowLoginModel = !this.isShowLoginModel
            } else {
                this.isShowLoginModel = isShow
            }
        },
        onShowSearchModel (isShow) {
            if (isShow === undefined) {
                this.isShowSearchModel = !this.isShowSearchModel
            } else {
                this.isShowSearchModel = isShow
            }
        },
        onShowRigthMenuModer (isShow) {
            if (isShow === undefined) {
                this.isShowRigthMenuModer = !this.isShowRigthMenuModer
            } else {
                this.isShowRigthMenuModer = isShow
            }
        },
        toggleTheme () {
            const htmlDOM = document.documentElement
            if (htmlDOM.getAttribute('data-theme')) {
                this.theme = 'dark'
                this.themeIcon = 'icon-brightness'
                htmlDOM.removeAttribute('data-theme')
                return
            }
            this.theme = 'light'
            this.themeIcon = 'icon-DND_mode'
            htmlDOM.setAttribute('data-theme', 'light')
        }
    },
    getters: {
        /** 应用当前设置 */
        getState: (state) => {
            return (key) => {
                return key ? state[key] : { ...state }
            }
        },
        /** 获取设备类型 */
        getEquipment (state) {
            return () => {
                return state.equipments[state.equipment] || 0
            }
        },
        /** 获取系统 */
        getOS (state) {
            return () => {
                return state.knownOs[state.os] || 0
            }
        }
    }
})
