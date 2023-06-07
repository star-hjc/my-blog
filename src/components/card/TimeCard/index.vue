<template>
    <div class="time-card" :style="{ '--tiem-color': color }">
        <div class="time-year-mouth-date">
            {{ `${time.year || '0000'}年${time.month || '00'}月${time.date || '00'}日` }}
        </div>
        <div class="time-hours-minutes-seconds time-text">
            <div>{{ `${time.hours || '00'}:${time.minutes || '00'}:${time.seconds || '00'}` }}</div>
            <div class="hr"></div>
        </div>
        <div class="time-day">星期{{ dayChat[time.day] || '···' }}</div>
    </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
const time = reactive({})
const dayChat = ref({ 0: '日', 1: '一', 2: '二', 3: '三', 4: '四', 5: '五', 6: '六' })

onMounted(() => {
    getTimeinfo()
})

defineProps({
    color: {
        type: String,
        default: '#fff'
    }
})

const getTimeinfo = () => {
    setInterval(() => {
        const thisTime = new Date()
        time.year = thisTime.getFullYear()
        time.month = (thisTime.getMonth() + 1).toString().padStart(2, 0)
        time.date = (thisTime.getDate()).toString().padStart(2, 0)
        time.hours = (thisTime.getHours()).toString().padStart(2, 0)
        time.minutes = (thisTime.getMinutes()).toString().padStart(2, 0)
        time.seconds = (thisTime.getSeconds()).toString().padStart(2, 0)
        time.day = thisTime.getDay()
    }, 500)
}
</script>

<style lang="scss" scoped>
.time-card {
    color: var(--tiem-color);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .time-year-mouth-date {
        font-size: 1.1rem;
        white-space: nowrap;
    }

    .time-hours-minutes-seconds {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 3rem;
    }

    .hr {
        border-bottom: 2px solid var(--tiem-color);
        width: 115%;
        margin-top: 15px;
    }

    .time-text {
        font-family: Open24DisplaySt !important;
    }

    .time-day {
        margin-top: 10px;
        font-size: 1.1em;
    }

}
</style>
