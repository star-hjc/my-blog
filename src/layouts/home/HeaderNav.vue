<template>
    <div class="header-nav">
        <div class="logo">
            My-Bolg
        </div>
        <div class="nav">
            <div class="nav-item" v-for="nav in navData" :key="nav.id">
                <el-icon :class="['iconfont', nav.icon]" :size="20" />
                <span>{{ nav.txt }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
const navData = reactive([
    { id: 0, icon: 'icon-play', txt: '搜索', path: '' },
    { id: 1, icon: 'icon-play', txt: '首页', path: '' },
    {
        id: 2, icon: 'icon-play', txt: '类别', path: '',
        children: [
            { id: 0, icon: '', txt: '类别1', path: '', disabled: false, divided: false },
            { id: 1, icon: '', txt: '类别2', path: '', disabled: false, divided: false },
            { id: 2, icon: '', txt: '类别3', path: '', disabled: true, divided: true },
            { id: 3, icon: 'icon-play', txt: '类别4', path: '', disabled: false, divided: false }
        ]
    },
    { id: 3, icon: 'icon-play', txt: '我的', path: '' }

])
onMounted(() => {

})

/** 路由跳转 */
// const onToNav = () => {

// }
</script>

<style lang="scss" scoped>
.header-nav {
    width: 100vw;
    height: 50px;
    box-sizing: border-box;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;

    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav {
        display: flex;
        align-items: center;
        .nav-item {
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin-right: 15px;
            position: relative;

            &:hover {
                color: var(--def-color);
                cursor: url('@/assets/img/cursor/link-select.cur'), auto;
            }

            &::after {
                content: '';
                position: absolute;
                bottom: -4px;
                left: 5px;
                height: 4px;
                width: 0px;
                background-color: var(--def-color);
                border-radius: 2px;
                transition: width 0.5s;
            }

            &:hover::after {
                width: calc(100% - 5px);
            }
        }
    }
}
</style>
