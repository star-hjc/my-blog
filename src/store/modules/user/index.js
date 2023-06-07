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
            /** 个签 */
            personalSignature: ''
        }
    },
    actions: {
        setData (partial) {
            this.$patch(partial)
        }
    },
    getters: {
        getState: (state) => {
            return (key) => {
                return key ? state[key] : { ...state }
            }
        }
    }
})
