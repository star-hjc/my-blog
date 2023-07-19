<template>
    <div class="topbar">
        <TopBar />
    </div>
    <div class="message-root">
        <div class="content">
            <div class="top">聊天界面</div>
            <div class="chat">
                <el-scrollbar height="75vh" ref="scrollbarRef">
                    <ul class="talk_list" ref="innerRef">
                        <li v-for="(item, index) in contentlist" :key="index"
                            :class="item.direction === 0 ? 'content-left' : 'content-right'">
                            <img :src="item.pisrc" class="imgwh">
                            <span>{{ item.content }}</span>
                        </li>
                    </ul>
                </el-scrollbar>
            </div>
            <div class="footer">
                <el-input v-model="input" @keyup.enter="send()" placeholder="请输入聊天内容" ref="ipref" class="inputel"
                    clearable />
                <el-button @click="send" style="height: 40px;">发送</el-button>
            </div>
        </div>
    </div>
    <div style=""></div>
</template>

<script setup>
import { ref } from 'vue'
import TopBar from '@/layouts/TopBar.vue'
const innerRef = ref()
const scrollbarRef = ref()
const contentlist = ref([
    {
        id: 594203,
        direction: 0, // 0 代表别人的信息 1 代表自己的
        pisrc: '/src/picture/person01.png',
        content: '你好呀！'
    },
    {
        id: 594204,
        direction: 1,
        pisrc: '/src/picture/person02.png',
        content: '我很好'
    },
    {
        id: 594205,
        direction: 0,
        pisrc: '/src/picture/person01.png',
        content: '最近怎么样'
    },
    {
        id: 594205,
        direction: 1,
        pisrc: '/src/picture/person02.png',
        content: '最近好的不得了'
    }
])
onMounted(() => {
    ipref.value.focus()
})
// const showInfo = () => {
//     console.log('ll')
// }
const input = ref()
const ipref = ref()
const send = () => {
    if (input.value == '' | !input.value) {
        ElMessage({
            message: '请输入内容！',
            type: 'warning'
        })
        return
    } else {
        contentlist.value.push(
            {
                id: 594206,
                direction: 1, // 0 代表别人的信息 1 代表自己的
                pisrc: '/src/picture/person02.png',
                content: input.value
            }
        )
        input.value = ''
        ipref.value.focus()
        // 滚动到底部
        scrollbarRef.value.setScrollTop(innerRef.value.scrollHeight)
    }
}
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
        background-color: var(--card-color);
        color: black;
        border-radius: 10px;
        color: var(--font-color);

        .chat {
            ul {
                margin: 0px;
                padding-left: 0px;
                font-weight: 600;
                box-sizing: border-box;
                .content-left {
                    margin-bottom: 10px;
                    margin-left: 10px;
                    span {
                        position: relative;
                        padding: 10px;
                        background: #fe9697;
                        border-radius: 5px;
                        margin-left: 10px;
                    }

                    span::after {
                        content: "";
                        position: absolute;
                        left: -12px;
                        top: 7px;
                        width: 0;
                        height: 0;
                        border: 6px solid transparent;
                        border-right: 9px solid #fe9697;
                    }

                }

                .content-right {
                    margin-top: 18px;
                    margin-right: 20px;
                    display: flex;
                    flex-flow: row-reverse;

                    span {
                        position: relative;

                        padding: 10px;
                        background: #409eff;
                        border-radius: 5px;
                        margin-right: 10px;
                        float: left;
                        transform: translateY(10px);

                    }
                    span::after {
                        content: "";
                        position: absolute;
                        right: -14px;
                        top: 7px;
                        width: 0;
                        height: 0;
                        border: 6px solid transparent;
                        border-left: 9px solid #409eff;
                    }
                }

                .imgwh {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
            }
        }

        .top {
            height: 50px;
            line-height: 50px;
            text-align: center;
            background: linear-gradient(90deg, rgba(206, 43, 40, 0.756), rgba(0, 42, 254, 0.6));
            color: azure;
        }

        .footer {
            height: 40px;
            display: flex;
           padding: 10px;
           padding-top: 15px;
           border: 1px solid #e2e2e2;
           border-radius: 10px;
           background: #ffffff;
        }
    }
}
</style>
