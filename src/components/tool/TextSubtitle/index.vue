<template>
    <div class="subtitle">
        <span class="text">{{ subtitle.text }}</span>
        <span class="typed-cursor">|</span>
    </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { delay } from '@/utils/utils.js'
import { getSaying } from '@/api/public'

onMounted(() => {
    subtitleAnimation()
})

const subtitle = reactive({
    text: ''
})

/**
 * 打字机
 * @param {Object<Array<String>>} data 打字数据
 */
const subtitleAnimation = async (data) => {
    if (!data) {
        const { data: sayingData } = await getSaying()
        data = sayingData
    }
    const arr = [
        (data?.hitokoto || '网络未连接，请检查网络状态...').split(''),
        `出自 ${data?.from || '开发者'}`.split('')
    ]
    for (const item of arr) {
        for (let i = 0; i < item.length; i++) {
            await delay(200)
            subtitle.text += item[i]
        }
        await delay(1000)
        for (let i = item.length - 1; i >= 0; i--) {
            await delay(100)
            subtitle.text = subtitle.text.substring(0, i)
        }
        await delay(500)
    }
    subtitleAnimation(data)
}
</script>

<style lang='scss' scoped>
.subtitle {
    color: #fff;
    font-size: 1.2rem;
    z-index: 1;

    .typed-cursor {
        /* 持续时间 */
        animation: cursor-animation .7s infinite;
    }

    @keyframes cursor-animation {
        50% {
            opacity: 0;
        }
    }
}
</style>