<template>
    <PageFrame>
        <MainTopBar title="标签" />
        <MainContentBar class="main-content">
            <defCard class="info">
                <h1>标签</h1>
                <div class="tags">
                    <span class="tag" v-for="item in labels" :key="item.id">{{ item.name }}</span>
                </div>
            </defCard>
        </MainContentBar>
    </PageFrame>
</template>

<script setup>
import PageFrame from '@/layouts/PageFrame.vue'
import MainTopBar from '@/layouts/MainTopBar.vue'
import MainContentBar from '@/layouts/MainContentBar.vue'
import { useBlogStore } from '@/store'

const blogStore = useBlogStore()
const { labels } = storeToRefs(blogStore)
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

        .tags {
            padding: 0 25px 25px 25px;

            .tag {
                padding: 15px;
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
