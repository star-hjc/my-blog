<template>
    <div class="page-box">
        <headerNav />
        <div class="home">
            <el-icon class="iconfont icon-down" size="35px" />
        </div>
        <div style="height: 300vh;width: 200vw;background: #fff;">

        </div>
    </div>
</template>

<script setup>
import headerNav from './HeaderNav.vue'

</script>

<style lang="scss" scoped>
.page-box {
    margin: 0;
    padding: 0;
    width: 100vw;
    background: url('@/assets/img/bg/bg-home.jpg') 50%/cover no-repeat;
    background-color: #163549;
    background-attachment: fixed;
    .home {
        height: calc(100vh - 50px);
        width: 100vw;
        position: relative;

        .icon-down {
            font-weight: 700;
            position: absolute;
            left: calc((100vw - 35px) / 2);
            bottom: 20px;
            opacity:0.3;
            animation: mymove 1.5s infinite;
        }
        /* Standard syntax */
        @keyframes mymove {
            50% {
                bottom: 40px;
                opacity:1;
            }
        }
    }
}
</style>
