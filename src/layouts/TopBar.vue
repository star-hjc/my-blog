<template>
    <header class="top-bar" :style="{ 'background': topBarBgColor }">
        <div class="logo">
            Star is Blog
        </div>
        <ul class="nav">
            <li class="nav-item" :class="{ 'no-mobile': nav.equipment === 2, 'mobile': nav.equipment === 1 }"
                v-for="nav in navData" :key="nav.id" @click="events(nav)">
                <router-link :to="nav.path">
                    <IconLayout :iconClass="`iconfont ${nav.icon}`" size="1.5rem">
                        <span class="nav-txt">{{ nav.txt }}</span>
                    </IconLayout>
                </router-link>
            </li>
            <li v-if="!userStore.code" class="nav-item no-mobile" @click="appStore.onShowLoginModel()">
                <IconLayout :iconClass="`iconfont icon-nickname`" size="1.5rem">
                    <span class="nav-txt">登录</span>
                </IconLayout>
            </li>
            <li v-else class="no-mobile">
                <el-dropdown class="item">
                    <img class="portrait" :src="userStore.portrait" />
                    <template #dropdown>
                        <el-dropdown-item>
                            <IconLayout :iconClass="`iconfont icon-nickname`" size="1rem">
                                <span v-loading.fullscreen.lock="fullscreenLoading" @click="appStore.onShowMyModel()">个人信息</span>
                            </IconLayout>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <IconLayout :iconClass="`iconfont icon-nickname`" size="1rem">
                                <span v-loading.fullscreen.lock="fullscreenLoading" @click="appStore.OnShowAddBlog()">添加博客</span>
                            </IconLayout>
                        </el-dropdown-item>
                        <!-- <el-dropdown-item>
                            <IconLayout :iconClass="`iconfont icon-respond`" size="1rem">
                                <span>消息中心</span>
                            </IconLayout>
                        </el-dropdown-item> -->
                        <el-dropdown-item @click="onSignOut">
                            <IconLayout :iconClass="`iconfont icon-getout`" size="1rem">
                                <span>退出登录</span>
                            </IconLayout>
                        </el-dropdown-item>
                    </template>
                </el-dropdown>
            </li>
        </ul>
    </header>
</template>

<script setup>
import { useAppStore, useUserStore } from '@/store'
import { onMounted } from 'vue'
const appStore = useAppStore()
const userStore = useUserStore()
const fullscreenLoading = ref(false) // 个人信息卡顿加载动画

defineProps({
    topBarBgColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0)'
    }
})

/** equipment 0 未知（都显示）1：手机端显示 2：电脑端、平板端显示 */
const navData = reactive([
    { id: 0, icon: 'icon-search', txt: '搜索', path: '', event: 'search', equipment: 0 },
    { id: 1, icon: 'icon-home', txt: '首页', path: '/index', event: '', equipment: 2 },
    { id: 2, icon: 'icon-message', txt: '聊天室', path: '/mgs', event: '', equipment: 2 },
    { id: 3, icon: 'icon-agreement', txt: '标签', path: '/tag', event: '', equipment: 2 },
    { id: 4, icon: 'icon-mirrorlightctrl', txt: '类别', path: '/category', event: '', equipment: 2 },
    { id: 5, icon: 'icon-suggestion', txt: '归档', path: '/archive', event: '', equipment: 2 },
    { id: 6, icon: 'icon-menu', txt: '菜单', path: '', event: 'menu', equipment: 1 }
])

onMounted(() => {
})

function events (nav) {
    if (nav.path) return
    switch (nav.event) {
        case 'menu':
            appStore.onShowRigthMenuModer()
            break
        case 'search':
            appStore.onShowSearchModel()
            break
        default:
            break
    }
}

function onSignOut () {
    localStorage.removeItem('TOKEN')
    userStore.$reset()
}
</script>

<style lang="scss" scoped>
.top-bar {
    width: 100vw;
    height: 50px;
    color: #fff;
    position: fixed;
    z-index: 996;
    box-sizing: border-box;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    white-space: nowrap;

    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav {
        display: flex;
        align-items: center;

        .nav-item {
            list-style: none;
            margin-right: 15px;
            position: relative;

            &:hover {
                color: var(--float-color);
            }

            &::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 0;
                height: 4px;
                width: 0px;
                z-index: 999;
                background-color: var(--float-color);
                border-radius: 2px;
                transition: width 0.5s;
            }

            &:hover::after {
                width: calc(100%);
            }
        }

        .portrait {
            border-radius: 100%;
            height: 35px;
        }
    }
}

@media (max-width:768px) {
    .top-bar {
        padding-right: 0;

        .no-mobile {
            display: none;
        }

        .nav-txt {
            display: none;
        }
    }
}

@media (min-width:769px) {
    .top-bar {
        .mobile {
            display: none;
        }
    }
}
</style>
