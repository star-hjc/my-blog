<template>
    <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider>
</template>

<script setup>
import device from 'current-device'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { useAppStore } from '@/store'

const appStore = useAppStore()
const locale = ref(zhCn)

onMounted(() => {
    /** 关闭加载动画 */
    openLode(true, 2000)
    appStore.setData({
        /** 获取设备 */
        equipment: device.type,
        /** 获取操作系统 */
        os: device.os
    })
})
</script>

<style lang="scss">

</style>
