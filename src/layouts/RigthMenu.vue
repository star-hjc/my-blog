<template>
  <div class="rigth-menu">
    <el-drawer v-model="isShowRigthMenu" direction="rtl" size="60%">
      <template #default>
      <div>
        12221
      </div>
    </template>
    </el-drawer>
  </div>

</template>

<script setup>
const isShowRigthMenu = ref(false)

const onShowRigthMenu = () => {
  isShowRigthMenu.value = !isShowRigthMenu.value
}

defineExpose({ onShowRigthMenu })
</script>

<style lang='scss' scoped>
.rigth-menu {
  color: black;

  & :deep(.el-drawer__header) {
    display: none;
  }

  & :deep(.el-drawer__body) {
    padding: 0;
  }
}
</style>