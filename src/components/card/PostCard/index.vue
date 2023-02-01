<template>
  <DefCard class="posts-card">
    <div class="post-info">
      <a class="title space" href="#">{{ cardData.title }}</a>

      <div class="time-info">
        <div class="time">
          <el-icon class="iconfont icon-instruction" size="1.5rem" />
          <span>发布：</span>
          <span>{{ cardData.releaseTime }}</span>
        </div>
        <div class="time">
          <el-icon class="iconfont icon-clock update-date" size="1.5rem" />
          <span>更新：</span>
          <span>{{ cardData.releaseTime }}</span>
        </div>
      </div>

      <div class="label">
        <el-tag class="tag" v-for="item in cardData.label" type="info">{{ item }}</el-tag>
      </div>
      <div class="label-mobile">
        <el-icon class="iconfont icon-agreement" size="1.5rem" color="var(--font-color)" />
        <span> {{ cardData.label.join('•') }}</span>
      </div>

      <div class="content space">
        协议实现协议实现协议实现协议议实现协议实现实现协议实现协议实现协议实现协议实现协议实现协议实现协议实现协议实现协议实现协议实现协议实现协议实现协议实现
      </div>

      <div class="describe">

        <div class="user-info">
          <div class="portrait-box">
            <img :src="cardData.portrait" @error="imgErr($event, true)">
          </div>
          <span>userInfo</span>
        </div>

        <div class="describe-data">
          <el-icon class="iconfont icon-eye_protection" size="1.5rem" />
          <span>{{ new Date().getSeconds() }}</span>
          <el-icon class="iconfont icon-like" color="#F56C6C" size="1.5rem" />
          <span>{{ new Date().getDate() }}</span>
        </div>
      </div>
    </div>

    <div class="post-img">
      <img :src="cardData.postImg" @error="imgErr($event)">
    </div>
  </DefCard>
</template>

<script setup>
defineProps({
  cardData: {
    type: Object,
    required: true
  }
})

const imgErr = (e, isPortrait) => {
  const imgDOM = e.srcElement
  const defImg = new URL('../../../assets/img/bg/bg-home.jpg', import.meta.url).href
  const defPortrait = createPortrait({ txt: '用户', limit: true })
  imgDOM.src = isPortrait ? defPortrait : defImg
  imgDOM.onerror = null
}
</script>

<style lang='scss' scoped>
.posts-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
  height: 260px;
  padding: 20px 40px;
  box-sizing: border-box;

  .post-info {
    min-width: 65%;

    .title {
      width: 100%;
      color: var(--font-color);
      display: inline-block;
      font-size: 1.2em;
      font-weight: bold;
    }

    .title:hover {
      color: var(--float-title-color);
      transition: color .5s;
    }

    .time-info {
      display: flex;
      gap: 5px;

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
        cursor: url('@/assets/img/cursor/common.cur'), auto;
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
        cursor: url('@/assets/img/cursor/link-select.cur'), default;
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
        cursor: url('@/assets/img/cursor/link-select.cur'), default;
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
          cursor: url('@/assets/img/cursor/common.cur'), auto;
        }

        .icon-like:hover {
          text-shadow: 1px 1px 5px var(--float-title-color)
        }
      }
    }
  }

  .post-img {
    width: 100%;
    height: 80%;
    overflow: hidden;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

@media (max-width:335px) {
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