import { createPinia } from 'pinia'
import useAppStore from './modules/app'
import useBlogStore from './modules/blog'
import useUserStore from './modules/user'

export {
    useAppStore,
    useBlogStore,
    useUserStore
}

export default createPinia()

