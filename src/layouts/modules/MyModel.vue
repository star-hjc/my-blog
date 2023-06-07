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
      <div class="content">
        <el-container style="height: 400px">
          <el-aside width="200px">
            <el-scrollbar>
              <el-menu default-active="2">
                <el-sub-menu index="1">
                  <template #title>
                    <el-icon>
                      <location />
                    </el-icon>
                    <span>Navigator One</span>
                  </template>
                  <el-menu-item-group title="Group One">
                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item two</el-menu-item>
                  </el-menu-item-group>
                  <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                  </el-menu-item-group>
                  <el-sub-menu index="1-4">
                    <template #title>item four</template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                  </el-sub-menu>
                </el-sub-menu>
                <el-menu-item index="2">
                  <el-icon><icon-menu /></el-icon>
                  <span>Navigator Two</span>
                </el-menu-item>
                <el-menu-item index="3" disabled>
                  <el-icon>
                    <document />
                  </el-icon>
                  <span>Navigator Three</span>
                </el-menu-item>
                <el-menu-item index="4">
                  <el-icon>
                    <setting />
                  </el-icon>
                  <span>Navigator Four</span>
                </el-menu-item>
              </el-menu>
            </el-scrollbar>
          </el-aside>
          <el-main>Main</el-main>
        </el-container>

      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useAppStore, useUserStore } from '@/store'
const appStore = useAppStore()
const userStore = useUserStore()
const { isShowMyModel } = storeToRefs(appStore)
const { portrait, code, userName } = storeToRefs(userStore)

const dialogDOM = ref(null)

onMounted(() => {
})

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

    .content {
      padding-top: 15px;

      .el-menu {
        --el-menu-hover-bg-color:var(--float-color-bg);
        --el-menu-border-color: transparent;
        --el-menu-bg-color: var( --global-bg);
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
</style>
