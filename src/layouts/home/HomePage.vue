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
</template>

<script setup>
import headerNav from './HeaderNav.vue'
import { ref } from 'vue'
const scrollbarDOM = ref(null)
const onPageScroll = (e) => {
    console.log(e)
    console.log(e.scrollTop)
    console.log(document.body.clientHeight)
}

const onToNextBegin = () => {
    scrollbarDOM.value.setScrollTop(document.body.clientHeight / 2)
}

</script>

<style lang="scss" scoped>
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
    .content{
        height: 200vh;
    }
}
</style>
