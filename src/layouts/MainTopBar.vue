<template>
  <div class="main-top-bar" :class="{ full: isFull }" :style="`background: url(${wallpaper}) 50%/cover no-repeat;`">
    <div v-if="isDynamic" class="dynamic-wallpaper">
      <video ref="dynamicWallpaperDOM" :muted="String(isOpenMuted)" autoplay loop>
        <source v-for="item, index in dynamicWallpaper" :key="index" :src="item.url" :type="item.type" />
      </video>
    </div>
    <h1 class="title">{{ title }}</h1>
    <slot />
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus'
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/store'

const appStore = useAppStore()

const prop = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  /** 是否一开始占全屏 */
  isFull: {
    type: Boolean,
    default: false
  },
  /** 静态壁纸 */
  wallpaper: {
    type: [String, Array],
    default: new URL('../assets/img/bg/bg-home.jpg', import.meta.url).href
  },
  /** 动态壁纸 */
  dynamicWallpaper: {
    type: Array,
    default: [
      { url: new URL('../assets/mp4/xxx.mp4', import.meta.url).href, type: 'video/mp4' }
    ]
  },
  /** 开启动态壁纸 */
  isDynamic: {
    type: Boolean,
    default: false
  },
  /** 打开动态壁纸音频 */
  isOpenMuted: {
    type: Boolean,
    default: false
  }
})

const dynamicWallpaperDOM = ref(null)

onMounted(() => {
  const { equipment, os, getEquipment } = appStore
  if (getEquipment(equipment) === 1 && prop.isDynamic) return message(os)
})

const message = (title = '') => {
  ElMessageBox.confirm('是否加载动态壁纸?', title.toUpperCase())
    .then(() => {
      dynamicWallpaperDOM.value.play()
    })
    .catch(() => {

    })
}
</script>

<style lang='scss' scoped>
.full {
  height: 100vh !important;
}

.main-top-bar {
  .dynamic-wallpaper {
    width: 100%;
    transition: width 1s;
    overflow: hidden;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;

    video {
      height: 100vh;
    }
  }

  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  background-color: #163549;
  background-attachment: fixed;
  position: relative;

  & .title {
    z-index: 1;
  }

  .icon-box .el-icon {
    z-index: 1;
    margin: 10px;
  }

  .icon-down {
    z-index: 1;
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
</style>