<template>
  <div ref="noticeDOM" class="notice-scrol">
    <div ref="contentDOM" class="notice-content"
      :style="`--notice-width:${noticeWidth}px;--notice-duration:${duration}s`">
      <div v-for="item, index in newContent" :key="index">{{ item }}</div>
    </div>
  </div>
</template>

<script setup>
const prop = defineProps({
    content: {
        type: [String, Array],
        required: true
    },
    speed: {
        type: Number,
        default: 0.5,
        validator (value) {
            const bool = value <= 1 && value >= 0
            // eslint-disable-next-line no-console
            if (!bool) console.warn('speed值应大于0小于1')
            return bool
        }
    }
})

const noticeDOM = ref(null)
const contentDOM = ref(null)
const noticeWidth = ref(0)
const duration = ref(13)
const newContent = computed(() => (Array.isArray(prop.content) ? prop.content : [prop.content]))

onMounted(() => {
    noticeWidth.value = noticeDOM.value.offsetWidth
    window.onresize = () => {
        if (!noticeDOM.value || !noticeWidth.value) return
        noticeWidth.value = noticeDOM.value.offsetWidth
        const newSpeed = prop.speed >= 1 ? 100 : prop.speed * 100
        duration.value = contentDOM.value.offsetWidth / newSpeed
    }
})

</script>

<style lang='scss' scoped>
.notice-scrol {
  width: 100%;
  display: flex;
  overflow: hidden;

  .notice-content {
    white-space: nowrap;
    box-sizing: border-box;
    display: flex;
    animation-name: font-scrol;
    animation-duration: var(--notice-duration);
    animation-timing-function: linear;
    animation-iteration-count: infinite;

    div {
      margin-right: var(--notice-width);
    }
  }

  @keyframes font-scrol {
    from {
      transform: translateX(var(--notice-width))
    }

    to {
      transform: translateX(-100%)
    }
  }
}
</style>
