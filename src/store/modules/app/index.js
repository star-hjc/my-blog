import { defineStore } from 'pinia';

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
      isWeChat: navigator?.userAgent?.toLowerCase()?.indexOf('micromessenger') !== -1,
      theme: 'dark',
      themeIcon: 'icon-brightness'
    }
  },
  actions: {
    setData(partial) {
      this.$patch(partial);
    },

    toggleTheme() {
      const htmlDOM = document.documentElement
      if (htmlDOM.getAttribute('data-theme')) {
        this.theme = 'dark';
        this.themeIcon = 'icon-brightness'
        htmlDOM.removeAttribute('data-theme')
        return
      }
      this.theme = 'light';
      this.themeIcon = 'icon-DND_mode'
      htmlDOM.setAttribute('data-theme', 'light')
    },
  },
  getters: {
    /** 应用当前设置 */
    appCurrentSetting: (state) => {
      return { ...state }
    },
    /** 获取设备类型 */
    getEquipment(state) {
      return (equipment) => {
        return state.equipments[equipment] || 0
      }
    },
    /** 获取系统 */
    getOS(state) {
      return (os) => {
        return state.knownOs[os] || 0
      }
    }
  }
})