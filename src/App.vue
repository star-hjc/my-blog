<template>
    <el-config-provider :locale="locale">
        <router-view />
    </el-config-provider>
</template>

<script setup>
import device from 'current-device'
import jwtDecode from 'jwt-decode'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { getState } from '@/api/global'
import { useAppStore, useBlogStore, useUserStore } from '@/store'

const appStore = useAppStore()
const userStore = useUserStore()
const blogStore = useBlogStore()
const locale = ref(zhCn)

onMounted(async () => {
    /** 持久主题缓存判断 */
    if (localStorage.getItem('theme') === 'light') appStore.toggleTheme()
    appStore.setData({
        /** 获取设备 */
        equipment: device.type,
        /** 获取操作系统 */
        os: device.os
    })
    getState().then(({ data }) => {
        if (!data) return
        blogStore.setData({ ...data })
    })
    const token = localStorage.getItem('TOKEN')
    if (token) {
        const { code, userId } = jwtDecode(token)
        userStore.setData({ code, userId })
    }
    /** 关闭加载动画 */
    openLode(3000)
})
</script>

<style lang="scss"></style>
