<template>
  <div class="search-model" v-if="isShowSearchModel">
    <!-- 搜索框 -->
    <el-dialog title="本地搜索" v-model="isShowSearchModel">
      <div class="search-box">
        <el-input v-model="searchVal" class="search-input" size="large" placeholder="请输入文章标题或内容..."
          @keyup.enter="onSearch">
          <!-- <template #prefix>
            <el-icon style="text-align: center;" class="iconfont icon-search" @click="onSearch" />
          </template> -->
        </el-input>
        <el-button @click="onSearch" style="height: auto;width: 45px; border-radius: 0px 30px 30px 0px;" :icon="Search"
          class="iconfont icon-search " circle />
      </div>
      <el-divider border-style="dashed" />
      <el-scrollbar class="search-wrap" :height="'var(--search-wrap-height)'">
        <div class="content-wrap" @click="showshoweldialog">
          <p class="search-word" v-if="state.bolgList?.length === 0">搜索内容为空</p>
          <p class="search-word" v-if="state.bolgList === null">请输入搜索的内容</p>
          <router-link class="search-item" v-for="item in state.bolgList" :key="item.blogId"
            :to="`/articles/${item.blogId}`">
            <span class="title">{{ item.title }}</span>
            <div class="content">{{ item.content }}</div>
          </router-link>
        </div>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store'
import { getBolgList } from '@/api/blog'

const appStore = useAppStore()

const state = reactive({
    bolgList: null
})

const { isShowSearchModel } = storeToRefs(appStore)
// 点击搜索到的内容关闭弹窗
const showshoweldialog = () => {
    isShowSearchModel.value = false
}
const searchVal = ref('')

async function onSearch () {
    if (!searchVal.value) return ElMessage.warning('输入不能为空...')
    state.bolgList = (await getBolgList(searchVal.value))?.data || []
}

</script>

<style lang="scss" scoped>
.search-model {
  --model-width: 500px;
  --model-min-width: 230px;
  --model-height: 500px;
  --search-wrap-height: calc(var(--model-height) - 115px);

  .search-box {
    display: flex;
    justify-content: center;

    .search-input {
      width: calc(var(--model-width) - 100px);
      border-radius: 50%;
    }
  }

  .search-wrap {
    overflow-x: hidden;
    display: flex;
    justify-content: center;

    .content-wrap {
      display: flex;
      flex-direction: column;

      .search-item {
        display: block;
        position: relative;
        padding: 0 25px 0 35px;
        margin-bottom: 10px;
        color: var(--font-color);

        .title {
          font-size: 0.9rem;
          font-weight: bold;
          display: block;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .content {
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-all;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }

      .search-item:hover {
        .title {
          color: var(--float-title-color);
        }

        .content {
          color: var(--float-color);
        }
      }
    }

    .search-word {
      font-size: 14px;
    }

    .search-item::before {
      content: '';
      position: absolute;
      top: 0.25rem;
      left: 15px;
      width: 0.5em;
      height: 0.5em;
      border: 3px solid #ff7242;
      border-radius: 0.5em;
      background: transparent;
      line-height: 0.5em;
      transition: all 0.2s ease-in-out;
    }

    .search-item:hover::before {
      border: 3px solid var(--float-color);
    }
  }

  /** 搜索框改圆角 */
  & :deep(.el-input__wrapper) {
    --el-input-border-radius: var(--el-component-size-large);
    // --el-input-border-radius: var(--el-component-size-large);
    --el-input-border-radius: 30px 0px 0px 30px;
  }

  /** 修改分割线大小 */
  & :deep(.el-divider--horizontal) {
    border-top: 3.5px var(--el-border-color) var(--el-border-style);
  }

  & :deep(.el-dialog__header .el-dialog__title) {
    color: var(--font-color);
  }

  & :deep(.el-dialog__body) {
    min-width: var(--model-min-width);
    min-height: var(--model-height);
    padding: 0;
  }

  & :deep(.el-dialog) {
    border-radius: 5px;
    overflow: hidden;
    --el-dialog-margin-top: 12vh;
    background: var(--global-bg);
    width: var(--model-width);
  }

  & :deep(.el-divider__text) {
    background: var(--global-bg);
    color: var(--font-color);
  }

  &:deep(.el-overlay-dialog) {
    overflow: hidden;
  }
}

@media (max-width:768px) {
  .search-model {
    --model-width: 90vw;
    --model-height: 80vh;
  }
}
</style>
