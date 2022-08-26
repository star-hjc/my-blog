<template>

    <el-scrollbar ref="scrollbarDOM" height="100vh" class="page-box" @scroll="onPageScroll">
        <headerNav :headerNavBgColor="headerNavBgColor"/>

        <div class="home">
            <a>
                <el-icon class="iconfont icon-down" size="35px" @click="onToNextBegin" />
            </a>
        </div>

        <div class="content">

        </div>
    </el-scrollbar>

    <transition name="animate__animated animate__bounce" enter-active-class="animate__backInRight"
        leave-active-class="animate__backOutRight" appear>
        <div v-show="isShowRigthsideFlot" class="rigthside-flot">
            <div class="nav" title="首页">
                <router-link to="/">
                    <el-icon class="iconfont icon-home" size="25px" @click="toPageTop"/>
                </router-link>
            </div>
            <div class="nav" title="设置">
                <a>
                    <el-icon class="iconfont icon-setting is-loading" size="25px" @click="ElMessage.warning('设置功能暂未开放...')"/>
                </a>
            </div>
            <div class="nav" title="回到顶部">
                <a>
                    <el-icon class="iconfont icon-course" size="25px" @click="toPageTop"/>
                </a>
            </div>
        </div>
    </transition>

</template>

<script setup>
import headerNav from './HeaderNav.vue'
import { ElMessage } from 'element-plus'
import { ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const headerNavBgColor = ref('')
const scrollbarDOM = ref(null)
const isShowRigthsideFlot = ref(false)
const scrollbarDOMisScrollTop = ref(0)

const toPageTop = () => {
    scrollbarDOM.value.setScrollTop(0)
}

const onPageScroll = ({ scrollTop }) => {
    console.log(toRaw(router).currentRoute.value)
    scrollbarDOMisScrollTop.value = scrollTop
    isShowRigthsideFlot.value = scrollbarDOMisScrollTop.value > 0
    headerNavBgColor.value = document.body.clientHeight - scrollTop <= 60 ? 'rgba(0,0,0,0.3)' : ''
}

const onToNextBegin = () => {
    const clientHeight = document.body.clientHeight / 2
    scrollbarDOM.value.setScrollTop(clientHeight)
    scrollbarDOMisScrollTop.value = clientHeight
}

</script>

<style lang="scss" scoped>
.page-box {
    overflow-y: auto;
    background: url('@/assets/img/bg/bg-all.jpg') 50%/cover no-repeat;
    background-color: #163549;
    background-attachment: fixed;
    position: relative;

    .home {
        height: 100vh;
        width: 100vw;
        background: url('@/assets/img/bg/bg-home.jpg') 50%/cover no-repeat;
        background-color: #163549;
        background-attachment: fixed;
        position: relative;

        .icon-down {
            font-weight: 700;
            position: absolute;
            left: calc((100vw - 35px) / 2);
            bottom: 0px;
            opacity: 0.3;
            animation: mymove 1.5s infinite;
        }

        /* Standard syntax */
        @keyframes mymove {
            50% {
                bottom: 20px;
                opacity: 0.5;
            }
        }
    }

    .content {
        height: 1500vh;
    }
}

.rigthside-flot {
    position: fixed;
    right: 50px;
    bottom: 70px;

    .nav {
        height: 35px;
        width: 35px;
        border-radius: 5px;
        margin-top: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.7);
        .icon-course{
            transform:rotate(-90deg);
        }

        &:hover {
            background: rgba(0, 0, 0, 0.5);
            color: var(--def-color);
        }

        &:hover a {
            color: var(--def-color);
        }
    }
}

.el-scrollbar :deep(.el-scrollbar__wrap) {
    scroll-behavior: smooth;
}
</style>
