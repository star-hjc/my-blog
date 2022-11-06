<template>
    <div class="num-flop">
        <slot :num="number.val"></slot>
    </div>

</template>

<script setup>
import { onMounted, reactive } from 'vue'
import { delay } from '@/utils/utils.js'
const number = reactive({ val: 0 })

const props = defineProps({
    num: {
        type: Number,
        default: 100
    },
    time: {
        type: Number,
        default: 100
    },
    delays: {
        type: Number,
        default: 2000
    }
})

onMounted(() => {
    digital(props.time, props.delays, props.num + '')
})
/**
 * 
 * @param {Number} time 每次计数的延迟（毫秒）
 * @param {Number} delays 计数动画的总持续时间
 */
const digital = async (time = 100, delays = 2000, num) => {
    // console.log(time, delays, num)
    let ss = 0
    const divisions = delays / time
    const isComma = /[0-9]+,[0-9]+/.test(num)
    num = num.replace(/,/g, '')
    const decimalPlaces = (num.split('.')[1] || []).length
    const isTime = /[0-9]+:[0-9]+:[0-9]+/.test(num)
    if (isTime) {
        const [h, m, s] = num.splice(':')
        ss = h * 3600 + m * 60 + s
    }

    for (let i = 1; i <= divisions; i++) {
        if (i) await delay(time)
        const newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);

        if (isComma && newNum.length > 3) {
            while (/(\d+)(\d{3})/.test(newNum)) {
                newNum = newNum.replace(/(\d+)(\d{3})/, '$1' + ',' + '$2')
            }
        }

        if (isTime) {
            newNum = parseInt(ss / divisions * i);
            const hours = (parseInt(newNum / 3600) % 24 + '').padStart(2, 0)
            const minutes = (parseInt(newNum / 60) % 60 + '').padStart(2, 0)
            const seconds = (parseInt(newNum % 60, 10) + '').padStart(2, 0)
            newNum = `${hours}:${minutes}:${seconds}`
        }

        number.val = newNum
    }
}
</script>

<style lang="scss">
.num-flop {
    height: inherit;
    width: inherit;
    display: inline-block;
    padding: 5px;
}
</style>
