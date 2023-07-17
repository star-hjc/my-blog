<template>
    <div class="topbar">
        <TopBar />
    </div>
    <div class="message-root">
        <div class="content">
            <div class="top">聊天界面</div>
            <div class="content">
                <el-scrollbar height="400px">
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                    <p>内容</p>
                </el-scrollbar>
            </div>
            <div class="footer">
                <el-input v-model="input" placeholder="请输入聊天内容" />
            </div>
        </div>
    </div>
    <div style=""></div>
</template>

<script setup>
import { ref } from 'vue'
import TopBar from '@/layouts/TopBar.vue'
onMounted(() => {

})
const input = ref()
</script>

<style lang="scss" scoped>
.topbar {
    height: 50px;
    background: rgb(126, 126, 126);
}

.message-root {
    width: 100%;
    background: var(--global-bg);
    box-sizing: border-box;

    .content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: auto;
        width: auto;
        background-color: var(--card-color);
        color: black;
        border-radius: 10px;
        color: var(--font-color);

        .top {
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: green;
        }
        .ffooter {
            height: 30px;
        }
    }
}
</style>
