<!-- eslint-disable no-undef -->
<template>
  <div class="icon-layout">
    <el-icon :size="size" :color="color" :class="iconClass" :style="iconStyle"/>
    <slot />
  </div>

</template>

<script setup>
defineOptions({ name: 'IconLayout' })
defineProps({
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
    }
})
</script>

<style lang="scss" scoped>
.icon-layout {
  display: inline-flex;
  flex-direction:row;
  align-items: center;
  cursor: url('@/assets/img/cursor/link-select.cur'), pointer;
}
</style>
