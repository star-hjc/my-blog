import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/tab-bar/HomePage.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('@/views/tab-bar/HomePage.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/category',
            name: 'category',
            component: () => import('@/views/tab-bar/CategoryPage.vue'),
            meta: {
                title: '首页'
            }
        }
    ]
})

router.beforeEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    // if (to.name !== 'login' && !localStorage.getItem('TOKEN')) {
    //     ElMessage.warning('登录超时，请重新登录...')
    // }
})

export default router