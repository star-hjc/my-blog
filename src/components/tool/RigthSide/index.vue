<template>
    <div class="rigthside">
        <div class="nav" :title="theme === 'dark' ? '明' : '暗'" @click="onSwitchTheme">
            <el-icon :class="['iconfont', themeIcon]" size="25px" />
        </div>
        <div class="nav" title="首页">
            <router-link to="/">
                <el-icon class="iconfont icon-home" size="25px"/>
            </router-link>
        </div>
        <div class="nav" title="设置">
            <a>
                <el-icon class="iconfont icon-setting is-loading" size="25px" @click="ElMessage.warning('设置功能暂未开放...')" />
            </a>
        </div>
        <div class="nav" title="回到顶部">
            <a>
                <el-icon class="iconfont icon-course" size="25px" @click="toPage(0)" />
            </a>
        </div>
    </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { useAppStore } from '@/store'

const { toPageInside } = inject('pageAnchor')

const appStore = useAppStore()

const { theme, themeIcon } = storeToRefs(appStore)

const onSwitchTheme = () => {
    appStore.toggleTheme()
}

const toPage = (value) => {
    toPageInside(value)
}
</script>

<style lang='scss' scoped>
.rigthside {
    position: fixed;
    right: 50px;
    bottom: 70px;
    color: #fff;
    z-index: 997;

    .nav {
        height: 35px;
        width: 35px;
        z-index: 997;
        border-radius: 5px;
        margin-top: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.7);

        .icon-course {
            transform: rotate(-90deg);
        }

        &:hover {
            background: rgba(0, 0, 0, 0.5);
        }

        &:hover,
        a:hover {
            color: var(--float-color);
        }
    }
}
</style>
