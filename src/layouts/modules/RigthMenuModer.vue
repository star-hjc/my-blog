<template>
  <div class="rigth-menu-moder" v-if="isShowRigthMenuModer">
    <el-drawer v-model="isShowRigthMenuModer" direction="rtl" size="300px">
      <div class="content">
        <UserCard v-if="code" />
        <div v-else class="login"><span class="text" @click="onToLogin">登录</span></div>
        <el-divider border-style="dashed" />
        <div class="nav">
          <template v-for="item in navData" :key="item.id">
            <router-link :to="item.path" @click="events(item)">
              <IconLayout :iconClass="`iconfont ${item.icon}`" size="1.5rem">
                <span class="icon-title">{{ item.txt }}</span>
              </IconLayout>
            </router-link>
          </template>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { useAppStore, useUserStore } from '@/store'
const { code } = storeToRefs(useUserStore())

const appStore = useAppStore()

const { isShowRigthMenuModer } = storeToRefs(appStore)

/** equipment 0 未知（都显示）1：手机端显示 2：电脑端、平板端显示 */
const navData = reactive([
    { id: 0, icon: 'icon-search', txt: '搜索', path: '', event: 'search' },
    { id: 1, icon: 'icon-home', txt: '首页', path: '/index', event: '' },
    { id: 2, icon: 'icon-agreement', txt: '标签', path: '/tag', event: '' },
    { id: 3, icon: 'icon-mirrorlightctrl', txt: '类别', path: '/category', event: '' },
    { id: 4, icon: 'icon-suggestion', txt: '归档', path: '/archive', event: '' }
])

function events (nav) {
    appStore.onShowRigthMenuModer()
    if (nav.path) return
    switch (nav.event) {
        case 'search':
            appStore.onShowSearchModel()
            break
        default:
            break
    }
}

function onToLogin () {
    appStore.onShowRigthMenuModer()
    appStore.onShowLoginModel()
}
</script>

<style lang='scss' scoped>
.rigth-menu-moder {
  .content {
    .login {
      height: 300px;
      text-align: center;
      line-height: 300px;

      .text {
        font-size: 1.5rem;
        font-weight: bold;
      }

      .text:hover {
        color: var(--float-title-color);
        cursor: url('@/assets/img/cursor/link-select.cur'), pointer;
      }
    }

    .nav {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
    }
  }

  /** 修改分割线大小 */
  & :deep(.el-divider--horizontal) {
    border-top: 3.5px var(--el-border-color) var(--el-border-style);
  }

  & :deep(.el-drawer) {
    --el-drawer-bg-color: var(--global-bg);

    .el-drawer__header {
      display: none;
    }

    .el-drawer__body {
      padding: 0;
    }
  }
}
</style>
