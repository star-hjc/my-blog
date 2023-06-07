<template>
  <div class="def-card">
    <slot />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {

})
</script>

<style lang='scss' scoped>
.def-card {
  border-radius: 10px;
  background: var(--card-color);
  transition: all 0.8s;

  &:hover {
    box-shadow: 0 0 20px var(--float-color);
    transition: box-shadow 0.3s;
  }
}
</style>
