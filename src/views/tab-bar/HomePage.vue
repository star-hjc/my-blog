<template>
  <PageFrame ref="pageFrameDOM">
    <main>
      <MainTopBar ref="mainTopBarDOM" class="main-top" title="我的博客首页" isFull isDynamic>
        <TextSubtitle />
        <div class="icon-box">
          <el-popover v-for="item in homeIconBox" placement="bottom-start" :title="item.title" :width="200"
            trigger="hover">
            <template #reference>
              <el-icon :class="['iconfont', item.icon]" size="25px" />
            </template>
            <span class="content">{{ item.content }}</span>
          </el-popover>
        </div>
        <a>
          <el-icon class="iconfont icon-down" size="35px" @click="onToPageInsideContent" />
        </a>
      </MainTopBar>

      <div class="main-content">
        <!-- 博客列表 -->
        <div class="posts-content">
          <!-- 博客公告 -->
          <DefCard class="tool-card">
            <div class="posts-sort">
              <IconLayout iconClass="iconfont icon-clock" size="1.5rem">
                <span class="icon-title">时间优先</span>
              </IconLayout>
              <IconLayout iconClass="iconfont icon-eye_protection" size="1.5rem">
                <span class="icon-title">热度优先</span>
              </IconLayout>
              <IconLayout iconClass="iconfont icon-like" color="#F56C6C" size="1.5rem">
                <span class="icon-title">点赞优先</span>
              </IconLayout>
              <IconLayout iconClass="iconfont icon-volume" size="1.5rem">
                <span>公告：</span>
              </IconLayout>
            </div>
            <NoticeScrol :content="['哈萨克来得及啊是觉得拉', 'ashdjasdsahj']" :speed="0.5" />
          </DefCard>
          <!-- 博客信息卡片 -->
          <PostCard :cardData="{
            title: '给 Hexo 博客加上 PubSubHubbub 协议实现 RSS 实时推送',
            releaseTime: new Date().toLocaleDateString() + ' 00:00:00',
            updateTime: new Date().toLocaleDateString() + ' 00:00:00',
            label: ['Fiddler', 'Android', 'HTTPS', 'FGO', 'mitmproxy'],
            portrait: 'https://unsplash.it/100/100?image=295',
            postImg: 'https://unsplash.it/800/450?image=765'
          }" />
          <PostCard style="flex-direction: row-reverse" :cardData="{
            title: '给 Hexo 博客加上 PubSubHubbub 协议实现 RSS 实时推送222222',
            releaseTime: new Date().toLocaleDateString() + ' 00:00:00',
            updateTime: new Date().toLocaleDateString() + ' 00:00:00',
            label: ['Fiddler', 'Android', 'HTTPS', 'FGO', 'mitmproxy'],
            portrait: 'https://unsplash.it/800/450?image=765',
            postImg: 'https://unsplash.it/100/100?image=295'
          }" />
          <PostCard :cardData="{
            title: '给 Hexo 博客加上 PubSubHubbub 协议实现 RSS 实时推送',
            releaseTime: new Date().toLocaleDateString() + ' 00:00:00',
            updateTime: new Date().toLocaleDateString() + ' 00:00:00',
            label: ['Fiddler', 'Android', 'HTTPS', 'FGO', 'mitmproxy'],
            portrait: 'https://unsplash.it/100/100?image=295',
            postImg: 'https://unsplash.it/800/450?image=765'
          }" />
        </div>
        <div class="aside-content">

          <DefCard class="tiem-card">
            <TimeCard color="var(--font-color)" />
          </DefCard>
          <!-- 用户信息卡片 -->
          <UserCard :blogNum="1111" :tagNum="111" :classNum="222" />
          <!-- 运行日志卡片 -->
          <RunLogCard />
        </div>
      </div>
      
    </main>
  </PageFrame>
</template>

<script setup>
import PageFrame from '@/layouts/PageFrame.vue'
import MainTopBar from '@/layouts/MainTopBar.vue'
// import { useRouter } from 'vue-router';

const pageFrameDOM = ref(null)
const mainTopBarDOM = ref(null)
const isShowLoginBox = ref(null)

// onUpdated(() => {
//   isShowLoginBox.value = useRouter().currentRoute.value.name === 'login'
// })

const homeIconBox = ref([
  { icon: 'icon-QQ', title: 'QQ', content: '59476905' },
  { icon: 'icon-wechat-fill', title: '微信', content: 'hjc59476905' },
  { icon: 'icon-github-fill', title: 'GitHub', content: 'hjc59476905' },
  { icon: 'icon-mail-fill', title: '邮箱', content: 'hjc59476905@163.com' }
])

function onToPageInsideContent() {
  pageFrameDOM.value.toPageInsideContent(mainTopBarDOM.value.$el.offsetHeight)
}

</script>

<style lang='scss' scoped>
.main-top {
  .icon-box {
    .el-icon {
      z-index: 1;
      margin: 10px;
    }

    .content {
      user-select: text;
    }
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

.main-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 15px;
  box-sizing: border-box;
  gap: 15px;
  display: flex;
  justify-content: center;

  .posts-content {
    z-index: 1;
    width: 74%;
    display: flex;
    flex-direction: column;
    gap: 15px;

    .tool-card {
      padding: 15px;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: center;

      .posts-sort {
        display: flex;
        align-items: center;
        gap: 10px;
        justify-content: space-around;
        white-space: nowrap;

        .icon-title:hover {
          color: var(--float-color);
          transition: color 0.5s;
        }
      }
    }
  }

  .aside-content {
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 1;
    width: 26%;

    .tiem-card {
      padding: 20px;
    }

    .glass-card:hover {
      box-shadow: 0 0 20px var(--float-color);
      transition: box-shadow 0.3s;
    }

    .glass-card {
      height: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

@media (max-width:768px) {
  .main-content {
    padding: 40px 0;
  }

  .main-content .posts-content {
    width: 95%;

  }

  .main-content .aside-content {
    display: none;
  }

  .main-content .posts-sort .icon-layout:not(:last-child) {
    display: none;
  }
}
</style>