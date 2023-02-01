<template>
  <DefCard class="run-log-card">
    <div class="title">
      <el-icon class="iconfont icon-meeting" :size="25" />
      <span>网站信息</span>
    </div>
    <div class="info-row">
      <span>已运行：</span>
      <span>{{ runDays }} 天</span>
    </div>
    <div class="info-row">
      <span>日访问量：</span>
      <span>{{ visitsByDays }} 次</span>
    </div>
    <div class="info-row">
      <span>总访问量：</span>
      <span>{{ visits }} 次</span>
    </div>
  </DefCard>
</template>

<script setup>
const prop = defineProps({
  runDays: {
    type: Number,
    default: 0
  },
  visitsByDays: {
    type: Number,
    default: 0
  },
  visits: {
    type: Number,
    default: 0
  }
})
</script>

<style lang='scss' scoped>
.run-log-card {
  padding: 20px;

  .title {
    display: flex;
    align-items: center;
  }

  .info-row {
    margin-top: 10px;
    width: 100%;
    white-space: nowrap;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
  }

}
</style>