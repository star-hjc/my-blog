<template>
  <div class="write-page">
    <md-editor :toolbars="toolbars" v-model="txt" @onSave="onSave" />
  </div>
</template>

<script setup>
import MdEditor from 'md-editor-v3'
import { useRoute } from 'vue-router'
import 'md-editor-v3/lib/style.css'
import { setBolgDetails } from '@/api/blog'
const toolbars = ref()

const txt = ref('')
const blogId = ref('')

onMounted(() => {
    blogId.value = useRoute().params?.blogId || ''
})

function onSave (content) {
    ElMessageBox.confirm('是否保存文档?', '保存')
        .then(() => {
            if (blogId.value) {
                openLode()
                setBolgDetails({
                    blogId: blogId.value,
                    content
                }).then(({ data, message }) => {
                    openLode(false)
                    if (data) return ElMessage.success(message)
                })
            }
        })
        .catch(() => {

        })
}
</script>

<style lang='scss' scoped>
.write-page {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;

  :deep(.md-editor) {
    z-index: 998;
    height: 100%;
  }
}

@media (max-width:992px) {
  .write-page {
    &:deep(.md-editor-content) {
      scrollbar-width: none;
      flex-direction: column-reverse;
      // background: var(--card-color);

      .md-editor-input-wrapper {
        // color: var(--font-color);
        border-top: 1px solid black;
      }

      .md-editor-toolbar {
        overflow-y: auto;
        overflow-x: hidden;
        min-width: 0px;
        flex-direction: row-reverse;
      }
    }
  }
}
</style>
