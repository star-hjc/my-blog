<template>
    <DefCard class="catalog-model">
        <IconLayout :iconClass="`iconfont icon-bookresource`" size="1.5rem">
            <span>目录</span>
        </IconLayout>
        <el-tree ref="treeDOM" :data="catalogData" node-key="id" :props="{ children: 'children', label: 'label' }">
            <template #default="{ data: { label } }">
                <a :href="`#${label}`">{{ label }}</a>
            </template>
        </el-tree>
    </DefCard>
</template>

<script setup>

const prop = defineProps({
    catalog: String
})

defineExpose({ setCurrentKey })

const treeDOM = ref('')
const catalogData = computed(() => JSON.parse(prop.catalog || '[]'))

function setCurrentKey (key = 0) {
    const treeNodesMap = treeDOM.value.store.nodesMap
    for (const i in treeNodesMap) {
        treeDOM.value.store.nodesMap[i].expanded = (i === key)
    }
    treeDOM.value.setCurrentKey(key, true)
}

</script>

<style lang='scss' scoped>
.catalog-model {
    padding: 20px;

    :deep(.el-tree::-webkit-scrollbar) {
        width: 0 !important
    }

    :deep(.el-tree) {
        max-height: 50vh;
        overflow: hidden;
        overflow-y: auto;
        background: var(--card-color);
        transition: all 0.8s;
        -ms-overflow-style: none;
        --el-tree-node-hover-bg-color: var(--float-color);
        overflow: -moz-scrollbars-none;

        .el-tree-node__content {
            a {
                display: block;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }
}

.title {
    padding: 5px 0;
}

.title:hover {
    a {
        color: var(--float-color);
    }

    .children {
        display: block;
    }
}

.children {
    padding-top: 5px;
    margin-left: 10px;
    display: none;
}
</style>
