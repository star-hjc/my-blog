<template>
  <PageFrame @scroll="articesScroll">
    <MainTopBar class="main-top" :title="state.bolgDetails.title || '标题'">
      <div class="details">
        <IconLayout :iconClass="`iconfont icon-instruction`" size="1.5rem">
          <span>发布于：</span>
          <span>{{ state.bolgDetails.releaseTime || '未知' }}</span>
        </IconLayout>
        <IconLayout :iconClass="`iconfont icon-clock`" size="1.5rem">
          <span>更新于：</span>
          <span>{{ state.bolgDetails.releaseTime || '未知' }}</span>
        </IconLayout>
      </div>
      <div class="details">
        <IconLayout :iconClass="`iconfont ${isStar ? 'icon-mark-fill' : 'icon-mark'}`" color="#FFCA28"
          @onIconClick="onStarBlog" size="1.2rem">
          <span>收藏数：</span>
          <span>{{ state.bolgDetails.stars || 0 }}</span>
        </IconLayout>
        <IconLayout :iconClass="`iconfont ${like >= 0 ? 'icon-like-fill' : 'icon-like'}`" color="#F56C6C"
          @onIconClick="onLikeBlog" size="1.2rem">
          <span>喜欢数：</span>
          <span>{{ state.bolgDetails.likes || 0 }}</span>
        </IconLayout>
        <IconLayout :iconClass="`iconfont icon-look`" size="1.2rem">
          <span>观看数：</span>
          <span>{{ state.bolgDetails.watch || 0 }}</span>
        </IconLayout>
      </div>
    </MainTopBar>
    <MainContentBar ref="mainContenDOM" class="main-content">
      <template #posts>
        <a v-if="isExistEditBtn" v-show="isShowEditBtn" class="edit-md" @click="onSwitch">编辑</a>
        <md-editor v-model="content" :preview-theme="'vuepress'" :theme="theme" preview-only />
        <edit-markdown ref="markdownDOM" v-if="isExistEditBtn" v-show="!isShowEditBtn" :editContent="content"
          @onSave="onSave" @onPageFullscreen="onPageFullscreen" />
      </template>
      <template #aside>
        <DefCard style="padding: 20px;">
          <TimeCard color="var(--font-color)" />
        </DefCard>
      </template>
      <template #aside-affix>
        <!-- 时间信息卡片 -->
        <Catalog ref="catalogDom" :catalog="catalogData" />
        <!-- 运行日志卡片 -->
        <RunLogCard />
      </template>
    </MainContentBar>
  </PageFrame>
</template>

<script setup>
import PageFrame from '@/layouts/PageFrame.vue'
import MainContentBar from '@/layouts/MainContentBar.vue'
import MainTopBar from '@/layouts/MainTopBar.vue'
import Catalog from '@/views/articles/modules/CatalogModel.vue'
import EditMarkdown from '@/views/articles/modules/EditMarkdownModel.vue'
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useRoute } from 'vue-router'
import { useAppStore, useUserStore, useBlogStore } from '@/store'
import { getBolgDetails, setBolgDetails, getStarAndLike, starBlog, likeBlog } from '@/api/blog'
import { getVisits } from '@/api/global'
import { onBeforeRouteUpdate } from 'vue-router'

const appStore = useAppStore()
const userStore = useUserStore()

const { theme } = storeToRefs(appStore)
const { userId } = storeToRefs(userStore)

const state = reactive({
    bolgDetails: {},
    blogId: ''
})

const mainContenDOM = ref(null)
const markdownDOM = ref(null)
const catalogDom = ref(null)
const content = ref('')
const catalogData = ref('')
const isShowEditBtn = ref(true)
const isStar = ref(false)
const starTimer = ref()
const starNum = ref(0)
const like = ref(0)
const likeTimer = ref()
const likeNum = ref(0)

const isExistEditBtn = computed(() => userStore.code === state.bolgDetails.code)

onMounted(async () => {
    const { blogId } = useRoute().params
    init(blogId)
})

async function init (blogId) {
    state.blogId = blogId
    const { data } = await getBolgDetails(blogId)
    if (!data) return
    state.bolgDetails = data
    catalogData.value = data.catalog
    content.value = data.content
    getVisits().then(({ data }) => {
        if (!data) return
        useBlogStore().setData({ ...data })
    })
    if (userId) {
        getStarAndLike(blogId).then(({ data }) => {
            isStar.value = data.star
            like.value = data.like
        })
    }
}

onBeforeRouteUpdate((to) => {
    const { blogId } = to.params
    init(blogId)
})

function onSwitch () {
    setPostsZindex()
}

function onStarBlog () {
    isStar.value = !isStar.value
    isStar.value ? state.bolgDetails.stars++ : state.bolgDetails.stars--
    starNum.value++
    if (starTimer.value) clearTimeout(starTimer.value)
    starTimer.value = setTimeout(() => {
        if (starNum.value % 2 !== 0) {
            starBlog(state.blogId).then(({ message, data: { state, type } }) => {
                if (state) ElMessage(message)
                isStar.value = type === 1
            })
            starNum.value = 0
        }
    }, 1000)
}

function onLikeBlog () {
    if (like.value === 0) ElMessage('今天的点赞数已满')
    likeNum.value++
    if (likeNum.value < like.value) state.bolgDetails.likes++
    if (likeTimer.value) clearTimeout(likeTimer.value)
    likeTimer.value = setTimeout(() => {
        likeBlog(state.blogId, likeNum.value).then(({ message, data }) => {
            ElMessage(message)
        })
        likeNum.value = 0
    }, 1000)
}

function onSave (text, catalog) {
    ElMessageBox.confirm('是否保存文档?', '保存')
        .then(async () => {
            openLode()
            await setBolgDetails({ blogId: state.blogId, content: text, catalog }).then(({ data, message }) => {
                openLode(false)
                if (data) {
                    ElMessage.success(message)
                    content.value = markdownDOM.value.content
                    catalogData.value = catalog
                }
                setPostsZindex()
            })
        })
        .catch(() => {
            setPostsZindex()
        })
}

function onPageFullscreen (status) {
    if (!status) setPostsZindex()
    markdownDOM.value.togglePageFullscreen(true)
}

function setPostsZindex () {
    isShowEditBtn.value = !isShowEditBtn.value
    mainContenDOM.value.$el.querySelector('.posts').style.zIndex = isShowEditBtn.value ? '1' : '998'
}

function articesScroll () {
    const select = getFirstVisualElemnet()
    catalogDom.value.setCurrentKey(select?.i || 0)
}

/** 获取可视的第一个标题 */
function getFirstVisualElemnet () {
    const allLink = [...document.querySelector('#md-editor-v3-preview').querySelectorAll('a')].map((v, i) => {
        const offset = v.getBoundingClientRect()
        return { text: v.innerText || '', bottom: offset.bottom, top: offset.top, i }
    })
    if (!allLink) return {}
    const { text, i } = allLink.find(v => v.top <= window.innerHeight && v.bottom >= 0) || {}
    return {
        text: text || allLink[0].text,
        i: i || 0
    }
}
</script>

<style lang='scss' scoped>
.main-top {
  .details {
    color: #fff;
    z-index: 1;
    display: flex;
    gap: 10px;
    align-items: center;

    .icon-layout {
      white-space: nowrap;
    }
  }
}

.main-content {
  :deep(.posts) {
    position: relative;
    padding: 20px !important;
    box-sizing: border-box;
    background: var(--card-color);
    border-radius: 10px;
    z-index: 1;

    .edit-md {
      color: var(--font-color);
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 999;
    }

    .edit-md:hover {
      color: var(--float-color);
    }

    .md-editor {
      z-index: 998;
      user-select: text;
      transition: all 0.8s;
      --md-bk-color: var(--card-color);
    }

    .md-editor-dark {
      --md-bk-color: var(--card-color);
    }

  }
}

@media (max-width:768px) {
  .main-top {
    gap: 10px;

    .details {
      flex-direction: column;
    }
  }
}

@media (max-width:992px) {
  .main-content {
    &:deep(.md-editor-content) {
      scrollbar-width: none;
      flex-direction: column-reverse;

      .md-editor-input-wrapper {
        color: var(--font-color);
        border-top: 1px solid var(--font-color);
      }
    }
  }
}
</style>
