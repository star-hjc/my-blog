import { defineStore } from 'pinia'

const useBlogStore = defineStore('blog', () => {
  const userName = ref('用户名称')
  const PersonalSignature = ref('个性签名...,**个**.')
  /**
   *  修改State的值
   *  @param {Object} data 修改的数据
   */
  function setData(data) {
    useUserStore.$patch(data)
  }

  return { userName,PersonalSignature, setData }
})

export default useBlogStore