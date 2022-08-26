<template>

    <el-scrollbar ref="scrollbarDOM" height="100vh" class="page-box" @scroll="onPageScroll">
        <headerNav />

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
            <div class="nav">
                <el-icon class="iconfont icon-down" size="20px" />
            </div>
            <div class="nav">
                <el-icon class="iconfont icon-down" size="20px" />
            </div>
        </div>
    </transition>

</template>

<script setup>
import headerNav from './HeaderNav.vue'
import { ref } from 'vue'

const scrollbarDOM = ref(null)
const isShowRigthsideFlot = ref(false)
const scrollbarDOMisScrollTop = ref(0)

const onPageScroll = (e) => {
    scrollbarDOMisScrollTop.value = e.scrollTop
    isShowRigthsideFlot.value = scrollbarDOMisScrollTop.value > 10
}

const onToNextBegin = () => {
    const clientHeight = document.body.clientHeight / 2
    scrollbarDOM.value.setScrollTop(clientHeight)
    scrollbarDOMisScrollTop.value = clientHeight
}

</script>

<style lang="scss" scoped>
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
    }
}

.page-box {
    overflow-y: auto;
    overflow-x: hidden;
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
        height: 200vh;
    }
}
</style>
