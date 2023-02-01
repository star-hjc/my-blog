<template>
    <el-scrollbar ref="scrollbarDOM" height="100vh" class="page-frame" @scroll="onPageScroll">
        <!-- 头部 -->
        <transition name="animate__animated animate__bounce" enter-active-class="animate__fadeInDown"
            leave-active-class="animate__fadeOutUp" appear>
            <TopBar v-show="isShowTopBar" :topBarBgColor="topBarBgColor" :events="{ onShowLoginBox,onShowRigthMenu }" />
        </transition>
        <!-- 主要内容 -->
        <slot :toPageInside="toPageInside" :toPageInsideContent="toPageInsideContent" />
        <!-- 底部 -->
        <FootBar />
    </el-scrollbar>
    <!-- 登录 -->
    <LoginModel ref="loginModelDOM" />
    <!-- 右侧菜单 -->
    <RigthMenu ref="rigthMenuDOM" />
    <!-- 右下角菜单 -->
    <transition name="animate__animated animate__bounce" enter-active-class="animate__backInRight"
        leave-active-class="animate__backOutRight" appear>
        <RigthSide v-show="isShowRigthside" />
    </transition>
</template>

<script setup scoped>
import TopBar from './TopBar.vue'
import FootBar from './FootBar.vue'
import RigthMenu from './RigthMenu.vue'
import LoginModel from './LoginModel.vue'
import { ref, provide, onMounted } from 'vue'
import { useAppStore } from '@/store'
const appStore = useAppStore()

const topBarBgColor = ref('')
const scrollbarDOM = ref(null)
const loginModelDOM = ref(null)
const rigthMenuDOM = ref(null)
const isShowRigthside = ref(false)
const isShowTopBar = ref(true)
const scrollbarDOMisScrollTop = ref(0)

defineExpose({ toPageInside, toPageInsideContent })

provide('pageAnchor', { toPageInside })

onMounted(() => {
    const { equipments, equipment } = appStore
    if (equipments[equipment] === 1) {
        const vertical = scrollbarDOM.value.$el.querySelector('.el-scrollbar__bar.is-vertical')
        vertical.style.display = 'none'
    }
})

/** 登录页面显示控制 */
function onShowLoginBox() {
    loginModelDOM.value.onShowLoginBox()
}

/** 右侧菜单显示控制 */
function onShowRigthMenu() {
    rigthMenuDOM.value.onShowRigthMenu()
}

/**
 * 页面滚动
 * @param {Number} scrollTop 鼠标滚动距离
 */
function onPageScroll({ scrollTop }) {
    /** 向下滚动距离 */
    const distance = scrollTop - scrollbarDOMisScrollTop.value
    /** 是否向下滚动 */
    const isSlideDown = distance > 0
    /** 是否完全滚动屏幕到博客信息列表 */
    const isShowBlogPage = document.body.clientHeight - scrollTop <= 60
    /** 控制导航栏显示 */
    isShowTopBar.value = scrollTop <= 60 || (!isSlideDown)
    /** 存储滚动距离 */
    scrollbarDOMisScrollTop.value = scrollTop
    /** 控制右下角菜单显示 */
    isShowRigthside.value = scrollTop > 0
    /** 控制页面导航栏背景颜色 */
    topBarBgColor.value = isShowBlogPage ? 'rgba(0,0,0,0.3)' : ''
}

/**
 * 页面锚点跳转
 * @param {Object | Number} heightOrDom 高度 | Dom节点
 * @param {Object} params 
 */
function toPageInside(heightOrDom, params = {}) {
    const type = typeof (heightOrDom)
    if (type === 'object') {
        heightOrDom.scrollIntoView({ behavior: 'smooth', ...params })
        return
    }
    if (type !== 'number') return
    const viewDOM = scrollbarDOM.value.$el.querySelector('.el-scrollbar__wrap')
    /** 滚动条动画 */
    viewDOM.style.scrollBehavior = 'smooth'
    scrollbarDOM.value.setScrollTop(heightOrDom)
    viewDOM.style.scrollBehavior = 'auto'
}

/**
 * 页面滚动到内容部分
 */
function toPageInsideContent(height = 0) {
    scrollbarDOMisScrollTop.value = height
    toPageInside(height)
}
</script>

<style lang="scss" scoped>
.page-frame {
    width: 100%;
    max-width: 100%;
    overflow-y: auto;
    background: url('@/assets/img/bg/bg-all.jpg') 50%/cover no-repeat;
    background-color: #163549;
    background-attachment: fixed;
    position: relative;
    display: flex;
}

/** 设置滑块 */
.el-scrollbar :deep(.el-scrollbar__bar.is-vertical) {
    width: 8px;
}
</style>
