<template>
  <div>
    <h1>Pinia演示对比</h1>
    {{userStore.fullName}}
    <div>{{`结构对比1：${fullName}`}}</div>
    <div>{{`结构对比2：${fullNameJg}`}}</div>
    <el-button type="primary">Primary</el-button>
    <div>{{name}}</div>
    <div>{{fullNameaJg()}}</div>
    <div>{{fullNameaJg()}}</div>
    <!-- <div>{{`结构对比1：${adminsStore.fullName}`}}</div>
    <div>{{`结构对比2：${fullNameaJg}`}}</div> -->
  </div>
</template>

<script setup>
import { useStore } from './store/testState1.js'
import { adminStore } from './store/testState2.js'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
const userStore = useStore()
const adminsStore = adminStore()

onMounted(() => {
    openLode(false)
})
const { name } = storeToRefs(adminsStore)
const { fullName: fullNameaJg, updateName } = adminsStore
updateName('admin管理员')

const { fullName: fullNameJg } = userStore
const { fullName } = storeToRefs(userStore)
userStore.updateName('乖乖')

</script>

<style scoped>
</style>
