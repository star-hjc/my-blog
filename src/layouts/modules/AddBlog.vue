<!-- 添加博客 -->
<template>
  <div class="add">
    <el-dialog v-model="isShowAddBlog" title="添加博客" width="90%" :before-close="handleClose">
      <!-- 内容体 -->
      <el-form :model="form" label-width="120px">
        <el-form-item label="标题">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="form.content" type="textarea" />
        </el-form-item>
        <!-- 图片上传 -->
        <!-- <el-upload class="avatar-uploader" :show-file-list="false">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload> -->
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShowAddBlog = false">取消</el-button>
          <el-button type="primary" @click="isShowAddBlog = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useAppStore } from '@/store'
import { ElMessageBox } from 'element-plus'
const appStore = useAppStore()
const { isShowAddBlog } = storeToRefs(appStore)

const form = reactive({
    title: '',
    content: ''
})
const handleClose = () => {
    ElMessageBox.confirm('确定要关闭弹窗吗?')
        .then(() => {
            // 确定关闭弹窗不保存
            isShowAddBlog.value = false
        })
        .catch(() => {
            // catch error
        })
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
  border: 1px solid red;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
