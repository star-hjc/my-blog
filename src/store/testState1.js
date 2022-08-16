import { defineStore } from 'pinia'

/** 方法1 */
export const useStore = defineStore({
    /** id必填，且需要唯一 */
    id: 'user',
    state: () => {
        return {
            name: '用户'
        }
    },
    actions: {
        updateName(name) {
            this.name = name
        }
    },
    getters: {
        fullName: (state) => {
            return state.name + '01'
        }
    }
})
