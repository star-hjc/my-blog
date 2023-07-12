<template>
  <PageFrame ref="pageFrameDOM">
    <MainTopBar ref="mainTopBarDOM" class="main-top" title="我的博客首页" isFull isDynamic>
      <TextSubtitle />
      <div class="icon-box">
        <el-popover v-for="item in homeIconBox" :key="item.id" placement="bottom-start" :title="item.title" :width="200"
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
    <MainContentBar class="main-content">
      <!-- 博客列表 -->
      <template #posts>
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
          <NoticeScrol :content="noticeContent" :speed="0.5" />
        </DefCard>
        <!-- 博客信息卡片 -->
        <PostCard v-for="item in state.bolgList" :key="item.blogId" :item="item" />
      </template>
      <template #aside>
        <!-- 用户信息卡片 -->
        <DefCard>
          <UserCard :blogNum="1111" :tagNum="111" :classNum="222" />
        </DefCard>
      </template>
      <template #aside-affix>
        <!-- 时间信息卡片 -->
        <DefCard style="padding: 20px;">
          <TimeCard color="var(--font-color)" />
        </DefCard>
        <!-- 运行日志卡片 -->
        <RunLogCard />
      </template>
    </MainContentBar>
  </PageFrame>
</template>

<script setup>
import PageFrame from '@/layouts/PageFrame.vue'
import MainTopBar from '@/layouts/MainTopBar.vue'
import MainContentBar from '@/layouts/MainContentBar.vue'
import { useAppStore } from '@/store'
import { useBlogStore } from '@/store'
import { storeToRefs } from 'pinia'
import { getBolgList } from '@/api/blog'
import { onMounted } from 'vue'
const appStore = useAppStore()
// import { useRouter } from 'vue-router';
const blogStore = useBlogStore()
const mainTopBarDOM = ref(null)
const pageFrameDOM = ref(null)

const { notice: noticeContent } = storeToRefs(blogStore)

const state = reactive({
    bolgList: []
})

onMounted(async () => {
    fistview()
    getBolgList().then(({ data }) => {
        state.bolgList = data
    })
})
// 頁面模式存儲
function fistview () {
    const htmlDOM = document.documentElement
    const theme = localStorage.getItem('theme')
    const themeIcon = localStorage.getItem('themeIcon')
    appStore.theme = theme
    appStore.themeIcon = themeIcon
    htmlDOM.setAttribute('data-theme', theme)
}
const homeIconBox = ref([
    { id: 0, icon: 'icon-QQ', title: 'QQ', content: '59476905' },
    { id: 1, icon: 'icon-wechat-fill', title: '微信', content: 'hjc59476905' },
    { id: 2, icon: 'icon-github-fill', title: 'GitHub', content: 'hjc59476905' },
    { id: 3, icon: 'icon-mail-fill', title: '邮箱', content: 'hjc59476905@163.com' }
])

function onToPageInsideContent () {
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
  .posts {
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
}

@media (max-width:768px) {
  .main-content .posts-sort .icon-layout:not(:last-child) {
    display: none !important;
  }
}
</style>
