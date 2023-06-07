<template>
    <PageFrame>
        <MainTopBar title="归档" />
        <MainContentBar class="main-content">
            <defCard class="info">
                <h1>归档</h1>
                <el-timeline>
                    <el-timeline-item :timestamp="`标题`" type="primary" :hollow="true" size="large">
                        {{ 1111 }}
                    </el-timeline-item>
                    <el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp"
                        type="primary" :hollow="true" size="normal">
                        {{ activity.content }}
                    </el-timeline-item>
                </el-timeline>
            </defCard>
        </MainContentBar>
    </PageFrame>
</template>

<script setup>
import PageFrame from '@/layouts/PageFrame.vue'
import MainTopBar from '@/layouts/MainTopBar.vue'
import MainContentBar from '@/layouts/MainContentBar.vue'
const activities = [
    {
        content: 'Event start',
        timestamp: '2018-04-15'
    },
    {
        content: 'Approved',
        timestamp: '2018-04-13'
    },
    {
        content: 'Success',
        timestamp: '2018-04-11'
    }
]
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

        :deep(.el-timeline) {
            .el-timeline-item__content {
                color: var(--font-color);
            }
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
