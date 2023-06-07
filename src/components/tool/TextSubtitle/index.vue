<template>
    <div class="subtitle">
        <span class="text">{{ typerOption.output }}</span>
        <span class="typed-cursor">|</span>
    </div>
</template>

<script setup>
import EasyTyper from 'easy-typer-js'
import { getSaying } from '@/api/public'

const typerOption = reactive({
    output: '',
    isEnd: false,
    speed: 200,
    singleBack: false,
    sleep: 1000,
    type: 'rollback',
    backSpeed: 100,
    sentencePause: false
})

onMounted(() => {
    carateTyper()
})

/** 实例化打字机 */
async function carateTyper (isNew) {
    const instance = await getInput()
    new EasyTyper(typerOption, [...instance], async (e) => {
        e.input = isNew ? await getInput() : [...instance]
        e.play()
    })
}

/** 获取打字机输出内容 */
async function getInput () {
    const saying = await getSaying()
    const form = `出自 ${saying?.from || '开发者'}`
    const hitokoto = saying?.hitokoto || '网络未连接，请检查网络状态...'
    return [hitokoto, form]
}
</script>

<style lang='scss' scoped>
.subtitle {
    max-width: 100vw;
    padding: 40px;
    box-sizing: border-box;
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
