import { createRouter, createWebHistory } from 'vue-router'
import { useAppStore } from '@/store'
import ArticlesPage from '@/views/articles/ArticlesPage.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/Error/404.vue')
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/layouts/AdminFrame.vue'),
            meta: {
                title: '管理'
            }
        },
        {
            path: '/',
            name: 'index',
            component: () => import('@/views/home/HomePage.vue'),
            meta: {
                title: '博客'
            }
        },
        {
            path: '/index',
            name: 'home',
            component: () => import('@/views/home/HomePage.vue')
        },
        {
            path: '/category',
            name: 'category',
            component: () => import('@/views/category/CategoryPage.vue')
        },
        {
            path: '/tag',
            name: 'tag',
            component: () => import('@/views/tag/TagPage.vue'),
            meta: {
                auth: true
            }
        },
        {
            path: '/personal',
            name: 'personal',
            component: () => import('@/views/personal/PersonalPage.vue'),
            meta: {
                auth: true
            }
        },
        {
            path: '/articles/:blogId(\\w{8}-\\w{4}-\\w{4}-\\w{4}-\\w{12})?',
            name: 'articles',
            component: ArticlesPage,
            children: [
                {
                    path: '/articles/write/:blogId?',
                    name: 'articles-write',
                    component: () => import('@/views/articles/WritePage.vue')
                }
            ]
        },
        {
            path: '/archive',
            name: 'archive',
            component: () => import('@/views/archive/ArchivePage.vue')
        },
        {
            path: '/mgs',
            name: 'mgs',
            component: () => import('@/views/mgs/MessageRoot.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.auth && !localStorage.getItem('TOKEN')) {
        useAppStore().onShowLoginModel()
        next(from.fullPath)
    } else if (to.hash) {
        next(from.path)
    } else {
        next()
    }
})

router.afterEach((to, from) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
})

// window.addEventListener('popstate', () => {
//     console.log(history)
// })
export default router
