<template>
  <div class="main-content-bar">
    <slot />
    <!-- 博客列表 -->
    <div v-if="!slots['default'] && slots['posts']" class="posts">
      <slot name="posts" />
    </div>

    <div v-if="!slots['default'] && (slots['aside'] || slots['aside-affix'])" class="aside">
      <slot name="aside" />
      <el-affix class="affix" v-if="slots['aside-affix']" target=".aside" :offset="15">
        <slot name="aside-affix" />
      </el-affix>
    </div>
  </div>
</template>

<script setup>
const slots = useSlots()
</script>

<style lang='scss' scoped>
.main-content-bar {
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 25px;
  box-sizing: border-box;
  gap: 15px;
  display: flex;
  justify-content: center;

  .posts {
    z-index: 1;
    min-width: 74%;
    display: flex;
    flex-direction: column;
    gap: 15px;
    transition: all 0.8s;
  }

  :deep(.aside) {
    display: flex;
    flex-direction: column;
    gap: 15px;
    z-index: 1;
    min-width: 26%;

    .affix > div:first-child{
      display: flex;
      flex-direction: column;
      gap: 15px;
      z-index: 1;
    }
  }

  .no-show {
    display: none !important;
  }
}

@media (max-width:768px) {
  .main-content-bar {
    padding: 40px 0;

    .posts {
      width: 95%;
    }

    .aside {
      display: none !important;
    }
  }
}
</style>
