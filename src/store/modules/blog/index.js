import { defineStore } from 'pinia'

export default defineStore({
    /** id必填，且需要唯一 */
    id: 'blog',
    state: () => {
        return {
            notice: ['待开发者更新公告...'],
            /** 标签 */
            labels: [],
            blogNum: 0,
            visits: 0,
            visitsByDays: 0,
            /**
            * 主题
            * @value 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'
            */
            previewTheme: 'default',
            editorToolbars: ['pageFullscreen', 'save', 'preview', 'catalog', '-', 'revoke', 'next', '-', 'title', 'code', 'link', 'image', '-', 'bold', 'underline', 'italic', '-', 'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList', 'orderedList', 'task', '-', 'codeRow', 'table', 'katex']
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
