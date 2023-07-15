<template>
  <router-link class="title space" :to="`/articles/${item.blogId}`">
  <DefCard class="posts-card">
    <div class="post-info">
      <p>{{ item.title }}</p>
      <div class="time-info">
        <div class="time">
          <el-icon class="iconfont icon-instruction" size="1.5rem" />
          <span>发布：</span>
          <span>{{ item.releaseTime }}</span>
        </div>
        <div class="time">
          <el-icon class="iconfont icon-clock update-date" size="1.5rem" />
          <span>更新：</span>
          <span>{{ item.updateTime }}</span>
        </div>
      </div>
      <div class="label">
        <el-tag class="tag" v-for="id in item.label" :key="id" type="info">{{ label(id) }}</el-tag>
      </div>
      <div class="label-mobile">
        <el-icon class="iconfont icon-agreement" size="1.5rem" color="var(--font-color)" />
        <span> {{ item.label.map(v => label(v)).join('•') }}</span>
      </div>

      <div class="content space">
        {{ item.content }}
      </div>

      <div class="describe">
        <div class="user-info">
          <div class="portrait-box">
            <img :src="item.portrait || defPortrait" @error="imgErr($event, true)">
          </div>
          <span>{{ item.userName || '用户' }}</span>
        </div>
        <div class="describe-data">
          <el-icon class="iconfont icon-mark" color="#f7cb49" size="1.5rem" />
          <span>{{ item.likes || 0 }}</span>
          <el-icon class="iconfont icon-like" color="#F56C6C" size="1.5rem" />
          <span>{{ item.likes || 0 }}</span>
          <el-icon class="iconfont icon-eye_protection" size="1.5rem" />
          <span>{{ item.watch || 0 }}</span>
        </div>
      </div>
    </div>

    <div class="post-img">
      <img :src="item.postImg || defImg" @error="imgErr($event)">
    </div>
  </DefCard>
</router-link>
</template>

<script setup>
import { useBlogStore } from '@/store'
const blogStore = useBlogStore()
const { labels } = storeToRefs(blogStore)

const defImg = new URL('../../../assets/img/def.jpg', import.meta.url).href
const defPortrait = ref(createPortrait({ txt: '用户', limit: true }))
defineProps({
    item: {
        type: Object,
        required: true
    }
})

const label = computed(() => {
    return (id) => { return labels?.value?.find(v => v.id === id)?.name || '未知' }
})

const imgErr = (e, isPortrait) => {
    const imgDOM = e.srcElement
    imgDOM.src = isPortrait ? defPortrait : defImg
    imgDOM.onerror = null
}
</script>

<style lang='scss' scoped>
  .title {
      width: 100%;
      color: var(--font-color);
      display: inline-block;
      font-size: 1.2em;
      font-weight: bold;
    }

    .title:hover {
      // color: var(--float-title-color);
      transition: color .5s;
    }
.posts-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  height: 260px;
  padding: 20px 40px;
  box-sizing: border-box;

  .post-info {
    min-width: 62%;

    .time-info {
      display: flex;
      justify-content: space-between;

      .time {
        display: flex;
        align-items: center;
        font-size: 0.8em;
        margin: 5px 0;

        .iconfont {
          margin-right: 5px;
        }
      }

      i {
        cursor: url('@/assets/img/cursor/default.cur'), default;
      }
    }

    .label-mobile {
      color: #888888;
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .iconfont {
        margin-right: 5px;
      }

      span {
        font-size: 0.8em;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

    }

    .label {
      margin-bottom: 5px;
      font-size: 0.9em;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px;

      .tag {
        cursor: url('@/assets/img/cursor/link-select.cur'), pointer;
      }

      .tag:hover {
        border: 1px solid var(--float-color);
        color: var(--float-title-color);
      }
    }

    .content {
      width: 100%;
    }

    .space {
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .describe {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      white-space: nowrap;

      .user-info {
        cursor: url('@/assets/img/cursor/link-select.cur'), pointer;
        display: flex;
        align-items: center;
        gap: 20px;

        .portrait-box {
          height: 40px;
          width: 40px;
          overflow: hidden;
          border-radius: 40px;

          img {
            height: 100%;
            width: 100%;
          }
        }
      }

      .describe-data {
        display: flex;
        align-items: center;
        gap: 5px;

        .icon-eye_protection {
          cursor: url('@/assets/img/cursor/default.cur'), default;
        }

        .icon-mark:hover {
          text-shadow: 0 0 5px #FFCA28;
        }
        .icon-like:hover {
          text-shadow: 0 0 5px #FF0000;
        }
      }
    }
  }

  .post-img {
    min-width: 35%;
    height: 80%;
    overflow: hidden;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

@media (max-width:355px) {
  .time-info {
    display: inline !important;
  }
}

@media (max-width:768px) {
  .posts-card {
    padding: 30px 40px !important;

    .post-info .label {
      display: none !important;
    }
  }
}

@media (min-width:769px) {
  .posts-card {
    .post-info {
      .label-mobile {
        display: none !important;
      }
    }
  }
}

@media (max-width:992px) {
  .posts-card .post-img {
    display: none !important;
  }
}
</style>
