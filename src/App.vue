<template>
    <router-view />
</template>

<script setup>

import { onMounted } from 'vue'

onMounted(() => {
    /** 关闭加载动画 */
    openLode(true, 2000)
})
</script>
