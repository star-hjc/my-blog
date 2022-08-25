import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'index',
            component: () => import('@/layouts/home/HomePage.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/login',
            name: 'login',
            // component: () => import('@/layouts/LoginPage.vue'),
            meta: {
                title: '登录'
            }
        }
    ]
})

router.beforeEach((to) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    if (to.name !== 'login' && !localStorage.getItem('TOKEN')) {
        // router.push({ path: './login' })
        ElMessage.warning('登录超时，请重新登录...')
    }
})

export default router
