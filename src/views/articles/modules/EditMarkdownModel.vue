<template>
    <md-editor class="editor" ref="editorDOM" v-model="content" :preview-theme="'vuepress'" :theme="theme"
        :toolbars="editorToolbars" :pageFullscreen="true" @onGetCatalog="onGetCatalog" @onSave="onSave" />
</template>

<script setup>
import MdEditor from 'md-editor-v3'
import { useAppStore, useBlogStore } from '@/store'
const { theme } = storeToRefs(useAppStore())
const { editorToolbars } = storeToRefs(useBlogStore())

const emits = defineEmits(['onSave', 'onPageFullscreen'])

const editorDOM = ref(null)
const content = ref('')
const catalogData = ref([])

const prop = defineProps({
    editContent: {
        type: String,
        default: ''
    }
})

onMounted(() => {
    content.value = prop.editContent
    editorDOM.value?.on('pageFullscreen', (status) => {
        emits('onPageFullscreen', status)
    })
})

function togglePageFullscreen (value) {
    editorDOM.value?.togglePageFullscreen(value)
}

function onGetCatalog (catalog) {
    catalogData.value = JSON.stringify(getCataloArr(catalog.map((v, i) => { return { i, ...v } })) || [])
}

function getInitNode (data) {
    const arr = [[], []]
    for (let i = 0; i < data.length; i++) {
        if (data[i].level <= data[0].level) {
            arr[0].push({ text: data[i].text, i: data[i].i })
            arr[1].push(i)
        }
    }
    return arr
}

function getSliceArr (data, indexs) {
    const arr = []
    const length = indexs.length
    for (let i = 1; i < length; i++) {
        arr.push([...data.slice(indexs[i - 1] + 1, indexs[i])])
    }
    arr.push([...data.slice(indexs[length - 1] + 1, data.length)])
    return arr
}

function getCataloArr (data) {
    const [values, indexs] = getInitNode(data)
    const sliceArr = getSliceArr(data, indexs)
    return values.map((v, i) => {
        return {
            label: v.text,
            id: v.i,
            children: sliceArr[i].length ? getCataloArr(sliceArr[i]) : []
        }
    })
}

function onSave (text, html) {
    emits('onSave', text, catalogData.value, html)
}

defineExpose({ togglePageFullscreen, content, catalogData })
</script>

<style lang='scss' scoped>
.editor :deep(.md-editor-toolbar) {
    overflow-y: hidden;
    overflow-x: auto;
    min-width: 0px;
}
</style>
