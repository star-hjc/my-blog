<template>

    <el-scrollbar ref="scrollbarDOM" height="100vh" class="page-box" @scroll="onPageScroll">
        <headerNav :headerNavBgColor="headerNavBgColor" />

        <div class="home">
            <div class="home-content">
                <div class="left-box" style="height: 70vh;width: 100%;">
                    <div style="width:100%;height: 34vh;text-align: center;line-height: 34vh;font-size: 3rem;overflow: hidden;
    white-space: nowrap;">
                        Welcome to my website !
                    </div>
                    <div style="width:100%;height: 34vh;margin-top: 2vh;">
                        <GlassCard width="70%" height="50%" :isAction="false">

                        </GlassCard>

                        <div style="margin-top:5vh;display: flex;justify-content:flex-start;">
                            <GlassCard v-for="i in 6" width="8vh" height="8vh"
                                style="text-align: center;line-height:11vh;margin-right: 1vw;">
                                <el-icon class="iconfont icon-prompt" size="3rem" />
                            </GlassCard>
                        </div>
                    </div>
                </div>
                <div class="rigth-box">
                    <div class="rigth-box-top">
                        <GlassCard width="100%" height="100%">
                            <WeatherCard />
                        </GlassCard>
                        <GlassCard width="100%" height="100%" class="my-flex-c-c">
                            <TimeCard />
                        </GlassCard>
                    </div>
                    <div class="rigth-box-bottom">
                        <h2>
                            <el-icon class="iconfont icon-connectdevice" />
                            <span style="font-size:1.3rem;">网站列表</span>
                        </h2>
                        <el-scrollbar height="35vh;">
                            <div class="link-box" :style="{
                                'grid-template-rows': `repeat(${2},${1 <= 2 ? '1fr' : '43%'})`,
                            }">
                                <GlassCard v-for="i in 6">{{ i }}</GlassCard>
                            </div>
                        </el-scrollbar>
                    </div>
                </div>
                <!-- <div class="bor"></div>
                <div class="bor"></div>
                <div class="bor"></div> -->
                <!-- 
                <GlassCard>
                    <WeatherCard/>
                </GlassCard> -->

                <!-- <NumFlop v-slot="{ num }" :num="111" :time="100" :delays="1000">
                    {{ num }}
                </NumFlop> -->

            </div>
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
                    <el-icon class="iconfont icon-home" size="25px" @click="toPageTop" />
                </router-link>
            </div>
            <div class="nav" title="设置">
                <a>
                    <el-icon class="iconfont icon-setting is-loading" size="25px"
                        @click="ElMessage.warning('设置功能暂未开放...')" />
                </a>
            </div>
            <div class="nav" title="回到顶部">
                <a>
                    <el-icon class="iconfont icon-course" size="25px" @click="toPageTop" />
                </a>
            </div>
        </div>
    </transition>

</template>

<script setup>
import HeaderNav from './HeaderNav.vue'
import { ElMessage } from 'element-plus'
import { ref, toRaw } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const headerNavBgColor = ref('')
const scrollbarDOM = ref(null)
const isShowRigthsideFlot = ref(false)
const scrollbarDOMisScrollTop = ref(0)

const toPageTop = () => {
    scrollbarLode('.el-scrollbar__wrap', () => {
        scrollbarDOM.value.setScrollTop(0)
    })
}

const onPageScroll = ({ scrollTop }) => {
    scrollbarDOMisScrollTop.value = scrollTop
    isShowRigthsideFlot.value = scrollbarDOMisScrollTop.value > 0
    headerNavBgColor.value = document.body.clientHeight - scrollTop <= 60 ? 'rgba(0,0,0,0.3)' : ''
}

const onToNextBegin = () => {
    console.log(toRaw(router).currentRoute.value)
    scrollbarLode('.el-scrollbar__wrap', () => {
        const clientHeight = document.body.clientHeight
        scrollbarDOM.value.setScrollTop(clientHeight)
        scrollbarDOMisScrollTop.value = clientHeight
    })
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
        padding-top: 50px;
        background: url('@/assets/img/bg/bg-home.jpg') 50%/cover no-repeat;
        background-color: #163549;
        background-attachment: fixed;
        position: relative;

        .home-content {
            display: flex;
            height: 90vh;
            padding: 0 5vw;
            margin-top: 1vh;
            align-items: center;

            .left-box {
                box-sizing: border-box;
                padding: 10px;
            }

            .rigth-box {
                height: 70vh;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                .rigth-box-top {
                    height: 22vh;
                    display: flex;
                    flex-direction: row;
                    gap: 1rem;
                    justify-content: space-around;
                }

                .rigth-box-bottom {
                    height: 44vh;

                    .link-box {
                        min-width: 35vh;
                        display: grid;
                        grid-gap: 2vh;
                        padding: 3vh;
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            }
        }

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

        .icon-course {
            transform: rotate(-90deg);
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

// .el-scrollbar :deep(.el-scrollbar__wrap) {
//     scroll-behavior: smooth;
// }
</style>
