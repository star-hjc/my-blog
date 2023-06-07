<template>
    <PageFrame>
        <MainTopBar title="类别" />
        <MainContentBar class="main-content">
            <defCard class="info">
                <h1>类别</h1>
            </defCard>
        </MainContentBar>
    </PageFrame>
</template>

<script setup>
import PageFrame from '@/layouts/PageFrame.vue'
import MainTopBar from '@/layouts/MainTopBar.vue'
import MainContentBar from '@/layouts/MainContentBar.vue'
</script>

<style lang='scss' scoped>
.main-content {
    .info {
        width: 100%;
        box-sizing: border-box;
        padding: 15px;

        h1 {
            text-align: center;
        }
    }
}

@media (max-width: 768px) {
    .main-content {
        .info {
            width: 95%;
        }
    }
}
</style>
