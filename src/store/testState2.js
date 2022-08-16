import { ref } from 'vue'
import { defineStore } from 'pinia'

/** 方法1 */
export const adminStore = defineStore('admin', () => {
    const name = ref('管理员')
    function updateName(adminName) {
        name.value = adminName
    }
    function fullName() {
        return name.value + '01'
    }
    return { name, updateName, fullName }
})
