<template>
  <div class="my-model">
    <el-dialog ref="dialogDOM" v-model="isShowMyModel" top="10vh" title="个人中心" :modal="false">
      <div class="user-info">
        <div class="portrait-box">
          <img :src="portrait" @error="imgErr($event)" />
        </div>
        <span class="user-name">{{ userName }}</span>
        <span class="user-edit" @click="close">编辑</span>
        <div class="rigth">
          <p class="user-code">用户ID : {{ code }}</p>
          <p class="user-ip">IP : {{ 'xxx' }}</p>
        </div>
        <div class="left">
          <span class="user-detail">{{ 1 }} 粉丝 {{ 1 }} 关注 {{ 1 }} 获赞</span>
        </div>
      </div>
      <!-- 列表 -->
      <el-tabs :tab-position="tabPosition" style="height: 400px" class="demo-tabs">
        <el-tab-pane label="我的喜欢">
          <el-scrollbar height="400px">
            <CollectCard v-for="item in lovelist" :key="item.blogId" :item="item" @click="appStore.onShowMyModel()">
              <div>
                <el-icon class="iconfont icon-like" color="#F56C6C" size="1.5rem" />
                <span style="font-size: 1.2rem;">{{ item.likes || 0 }}</span>
              </div>
            </CollectCard>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="我的收藏">
          <el-scrollbar height="400px">
            <CollectCard v-for="item in starlist" :key="item.blogId" :item="item" @click="appStore.onShowMyModel()">
              <div>
                <el-icon class="iconfont icon-mark" color="#f7cb49" size="1.5rem" />
                <span style="font-size: 1.2rem;">{{ item.stars || 0 }}</span>
              </div>
            </CollectCard>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="浏览历史">
          <div class="historylist">
            <el-scrollbar height="400px">
              <PostCard v-for="item in state.bolgList" :key="item.blogId" :item="item"
                @click="appStore.onShowMyModel()" />
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的文章">我的文章</el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppStore, useUserStore } from '@/store'
import { getBolgList, getloveBlog, getstarBlog } from '@/api/blog'
const appStore = useAppStore()
const userStore = useUserStore()
const { isShowMyModel } = storeToRefs(appStore)
const { portrait, code, userName } = storeToRefs(userStore)

const dialogDOM = ref(null)

const tabPosition = ref('left')

const state = reactive({
    bolgList: []
})
onMounted(async () => {
    getBolgList().then(({ data }) => {
        state.bolgList = data
    })
    // 验证登录状态才获取
    if (code) {
        getmylove()
        getstar()
    }
})
// 喜欢
const lovelist = ref([])
const getmylove = async () => {
    const res = await getloveBlog()
    lovelist.value = res.data
}
// 收藏
const starlist = ref([])
const getstar = async () => {
    const res = await getstarBlog()
    starlist.value = res.data
}
function close () {
    dialogDOM.value.visible = false
}
</script>

<style lang='scss' scoped>
.my-model {
  --model-width: 960px;
  --model-min-width: 230px;

  :deep(.el-dialog) {
    border-radius: 5px;
    background: var(--global-bg);
    width: var(--model-width);

    .posts-card {
      height: 287px;
    }

    .historylist {
      padding: 20px;
      width: auto;
      margin-bottom: 100px;

      .el-scrollbar__view:last-child {
        margin-bottom: 20px;
      }

      .posts-card {
        margin: 10px 10px;
        padding: 20px;
      }
    }

    .content {
      padding-top: 15px;

      .el-menu {
        --el-menu-hover-bg-color: var(--float-color-bg);
        --el-menu-border-color: transparent;
        --el-menu-bg-color: var(--global-bg);
        --el-menu-text-color: var(--font-color)
      }
    }

    .user-info {
      color: var(--font-color);
      height: 110px;

      .user-name {
        position: absolute;
        top: 25px;
        left: calc(88px + 33px + 10px);
        white-space: nowrap;
        font-size: 1.1rem;
      }

      .user-edit {
        position: absolute;
        top: 20px;
        right: 33px;
      }

      .user-edit:hover {
        color: var(--float-color);
      }

      .rigth {
        position: absolute;
        top: 40px;
        left: 40px;
      }

      .user-detail {
        position: absolute;
        top: 110px;
        right: 40px;
      }

    }

    .portrait-box {
      position: absolute;
      top: -45px;
      left: 33px;
      width: 88px;
      height: 88px;
      border-radius: 50%;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    header {
      display: none;
    }

    .el-dialog__title {
      color: var(----font-color);
    }

    .el-dialog__body {
      min-width: var(--model-min-width);
    }
  }

}

@media (max-width:992px) {
  .my-model {
    --model-width: 80vw;
  }
}

@media (max-width:768px) {
  .my-model {
    --model-width: 90vw;

    .form-container {
      justify-content: center;

      .img-box {
        display: none;
      }
    }

  }
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
</style>
