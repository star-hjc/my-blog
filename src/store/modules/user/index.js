export default defineStore({
    /** id必填，且需要唯一 */
    id: 'user',
    state: () => {
        return {
            userId: '',
            userName: '用户',
            code: '',
            portrait: createPortrait({ txt: '用户', limit: true }),
            WeChat: '',
            QQ: '',
            mali: '',
            /** 个签 */
            personalSignature: ''
        }
    },
    actions: {
        setData (partial) {
            if (Object.keys(partial).includes('userName')) {
                partial.portrait = createPortrait({ txt: partial.userName, limit: true })
            }
            this.$patch(partial)
        }
    },
    getters: {
        getState: (state) => {
            return (key) => {
                return state[key] ? state[key] : { ...state }
            }
        }
    }
})
