<template>
    <div class="topbar">
        <TopBar />
    </div>
    <div class="message-root">
        <div class="content">
            <p>dd</p>
            <p>dd</p>
            <p>dd</p>
        </div>
    </div>
</template>

<script setup>
import TopBar from '@/layouts/TopBar.vue'
onMounted(() => {

})
</script>

<style lang="scss" scoped>
.topbar {
    height: 50px;
}
.message-root {
    width: 100%;
    height: auto;
    background-color: #fff;

    .content {
        width: auto;
        height: 90vh;
        padding: 50px;
        background: white;
        color: black;
        border-radius: 10px;
    }
}
</style>
