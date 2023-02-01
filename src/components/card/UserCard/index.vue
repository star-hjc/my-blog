<template>
  <DefCard class="user-card">
    <div class="portrait-box">
      <img src="https://unsplash.it/100/100?image=295" @error="imgErr($event)"/>
    </div>
    <span class="user-name">UserName</span>
    <span class="signature">个性签名</span>
    <div class="my-info">
      <router-link to="/" :title="toValue(blogNum)">
        <div>文章</div>
        <div :class="{ overstep: isOverstep(blogNum) }">
          {{ toValue(blogNum) }}
        </div>
      </router-link>
      <router-link to="/" :title="toValue(tagNum)">
        <div>标签</div>
        <div :class="{ overstep: isOverstep(tagNum) }">
          {{ toValue(tagNum) }}
        </div>
      </router-link>
      <router-link to="/" :title="toValue(classNum)">
        <div>分类</div>
        <div :class="{ overstep: isOverstep(classNum) }">
          {{ toValue(classNum) }}
        </div>
      </router-link>
    </div>
  </DefCard>
</template>

<script setup>

import { computed } from 'vue'

const prop = defineProps({
  blogNum: {
    type: Number,
    default: 0
  },
  tagNum: {
    type: Number,
    default: 0
  },
  classNum: {
    type: Number,
    default: 0
  },
  maxNum: {
    type: Number,
    default: 999
  }
})

const isOverstep = computed(() => {
  return (value) => {
    return value > prop.maxNum
  }
})

const toValue = computed(() => {
  return (value) => {
    return value > prop.maxNum ? prop.maxNum : value
  }
})

const imgErr = (e) => {
  const imgDOM = e.srcElement
  imgDOM.src = new URL('../../../assets/img/bg/bg-home.jpg', import.meta.url).href
  imgDOM.onerror = null
}

</script>

<style lang='scss' scoped>
.user-card {
  display: flex;
  flex-direction: column;
  padding: 10% 5%;
  align-items: center;

  .portrait-box {
    margin-top: 5px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      transform: rotate(0deg);
      transition: transform 0.8s;
    }

    img:hover {
      transform: rotate(360deg);
      transition: transform 0.8s;
    }
  }

  .user-name {
    font-weight: bold;
    margin-top: 20px;
    font-size: 1.2em;
  }

  .signature {
    margin-top: 5px;
    font-size: 0.8em;
  }

  .my-info {
    width: 100%;
    margin-top: 10%;
    text-align: center;

    a {
      display: inline-block;
      box-sizing: border-box;
      width: 33.33%;
      font-weight: bold;
      color: var(--font-color);

      .overstep {
        position: relative;
      }

      .overstep::after {
        position: absolute;
        z-index: 999;
        content: '+';
      }

      div:nth-child(1) {
        font-size: 1.1em;
      }

      div:nth-child(2) {
        font-size: 0.95em;
        margin-top: 5px;
        overflow: hidden;
      }
    }

    a:hover div:nth-child(1) {
      color: var(--float-title-color);
    }

    a:hover div:nth-child(2) {
      color: var(--float-color);
    }
  }
}
</style>