<template>
    <!-- <div :class="[ 'top-bar', 'animate__animated', headerNavBgColor && 'animate__fadeInDown' ]" -->
    <header class="top-bar" :style="{ 'background': topBarBgColor }">
        <div class="logo">
            My-Bolg
        </div>
        <ul class="nav">
            <li class="nav-item" v-for="nav in navData" :key="nav.id" @click="nav.event">
                <router-link :to="nav.path">
                    <IconLayout :iconClass="`iconfont ${nav.icon}`" size="1.5rem">
                        <span>{{ nav.txt }}</span>
                    </IconLayout>
                </router-link>
            </li>
        </ul>
        <ul class="nav-mobile">
            <li class="nav-item" v-for="nav in navMobileData" :key="nav.id" @click="nav.event">
                <router-link :to="nav.path">
                    <IconLayout :iconClass="`iconfont ${nav.icon}`" size="1.5rem" />
                </router-link>
            </li>
        </ul>
    </header>
</template>

<script setup>
import { onMounted, reactive } from 'vue'

const prop = defineProps({
    topBarBgColor: {
        type: String,
        default: 'rgba(0, 0, 0, 0)'
    },
    events: {
        type: Object,
        required: true
    }
})

const navMobileData = reactive([
    { id: 0, icon: 'icon-search', txt: '搜索', path: '' },
    { id: 1, icon: 'icon-menu', txt: '菜单', path: '',event:prop.events.onShowRigthMenu }
])

const navData = reactive([
    { id: 0, icon: 'icon-search', txt: '搜索', path: '' },
    { id: 1, icon: 'icon-home', txt: '首页', path: '/home' },
    {
        id: 2, icon: 'icon-mirrorlightctrl', txt: '类别', path: '/category',
        children: [
            { id: 0, icon: '', txt: '类别1', path: '', disabled: false, divided: false },
            { id: 1, icon: '', txt: '类别2', path: '', disabled: false, divided: false },
            { id: 2, icon: '', txt: '类别3', path: '', disabled: true, divided: true },
            { id: 3, icon: '', txt: '类别4', path: '', disabled: false, divided: false }
        ]
    },
    { id: 3, icon: 'icon-nickname', txt: '我的', path: '/', event: prop.events.onShowLoginBox }
])



onMounted(() => {

})

</script>

<style lang="scss" scoped>
.top-bar {
    width: 100vw;
    height: 50px;
    color: #fff;
    position: fixed;
    z-index: 998;
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

    .nav,
    .nav-mobile {
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
    }
}


@media (max-width:768px) {
    .top-bar {
        padding-right: 0;

        .nav {
            display: none;
        }
    }
}

@media (min-width:769px) {

    .top-bar {
        .nav-mobile {
            display: none;
        }
    }
}
</style>
