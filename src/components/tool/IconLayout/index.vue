<template>
  <div class="icon-layout">
    <el-icon :size="size" :color="color" :class="iconClass" :style="iconStyle"/>
    <slot />
  </div>

</template>

<script setup>
const prop = defineProps({
  iconClass: {
    type: String,
    required: true
  },
  size: {
    type: String,
    default: ''
  },
  color: {
    type: String,
    default: ''
  },
  iconStyle: {
    type: String,
    default: ''
  },
})
</script>

<style lang="scss" scoped>
.icon-layout {
  display: inline-flex;
  align-items: center;
  cursor: url('@/assets/img/cursor/link-select.cur'), default;
}
</style>