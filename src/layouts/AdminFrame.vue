<template>
  <div class="admin-frame">
    <el-container>
      <el-header class="admin-header">
        <div class="logo-box">Star Blog</div>
        <ul class="nav-box">
          <li class="nav">搜索</li>
          <li class="nav">主题</li>
          <li class="nav">通知</li>
          <li class="nav">全屏</li>
          <li class="nav">设置</li>
          <li class="nav">我的</li>
        </ul>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu :default-active="menuActive" :ellipsis="false">
            <el-menu-item index="0">工作台</el-menu-item>
            <el-menu-item index="1">Processing Center</el-menu-item>
            <el-sub-menu index="2">
              <template #title>Workspace</template>
              <el-menu-item index="2-1">item one</el-menu-item>
              <el-menu-item index="2-2">item two</el-menu-item>
              <el-menu-item index="2-3">item three</el-menu-item>
              <el-sub-menu index="2-4">
                <template #title>item four</template>
                <el-menu-item index="2-4-1">item one</el-menu-item>
                <el-menu-item index="2-4-2">item two</el-menu-item>
                <el-menu-item index="2-4-3">item three</el-menu-item>
              </el-sub-menu>
            </el-sub-menu>
          </el-menu>
        </el-aside>

        <el-main>
          <div style="height: 86vh;width: 100%;">

          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>

const menuActive = ref('1')
onMounted(() => {

})
</script>

<style lang='scss' scoped>
.admin-frame {
  background: var(--admin-bg);

  .admin-header {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border: 1px solid #e5e6eb;

    .logo-box {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .nav-box {
      display: flex;
      justify-content: end;
      align-items: center;
      min-width: 66%;

      .nav {
        margin-left: 10px;
      }
    }
  }

  height: 100vh;
  overflow: hidden;
}</style>
