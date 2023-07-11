<template>
  <router-link class="title space" :to="`/articles/${item.blogId}`">
  <div class="collect">
      <el-card shadow="hover" class="collectcart "> {{ item.title }} </el-card>
  </div>
</router-link>
</template>

<script setup>
import { onMounted } from 'vue'
defineProps({
    item: {
        type: Object,
        required: true
    }
})
onMounted(() => {

})
</script>

<style lang='scss' scoped>
.collect {
  .collectcart {
    margin: 10px;
    border-radius: 10px;
    background: var(--card-color);
    transition: all 0.8s;
    color: rgb(83, 83, 83);
    border: 0px solid #000;

    &:hover {
      box-shadow: 0 0 20px var(--float-color);
      transition: box-shadow 0.3s;
    }
  }
}
</style>
