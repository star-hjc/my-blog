<template>
  <div class="login-model" v-if="isShowLoginModel">
    <el-dialog v-model="isShowLoginModel">
      <div class="form-container">
        <div class="img-box"></div>
        <div class="form-box">
          <h2>{{ title[type] }}</h2>
          <el-form ref="formDOM" :model="formData" :rules="rules">
            <el-form-item prop="user" v-if="type === 0">
              <el-input v-model="formData.user" :placeholder="`请输入邮箱/手机号...`" />
            </el-form-item>

            <el-form-item prop="mail" v-else>
              <el-input v-model="formData.mail" :placeholder="`请输入邮箱...`" />
            </el-form-item>

            <el-form-item v-if="type !== 0" prop="validcode">
              <el-input v-model="formData.validcode" placeholder="请输入验证码 ...">
                <template #append>
                  <el-button type="primary" @click="getCode">{{ getCodeBtnTxt }}</el-button>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item prop="pwd">
              <el-input v-model="formData.pwd" placeholder="请输入密码 ..." :show-password="type !== 2" />
            </el-form-item>

            <el-form-item>
              <el-button style="width: 100%;" type="primary" @click="onEnter(formDOM)" @keyup.enter="onEnter(formDOM)">{{
                type === 0 ? '登录'
                : '确定' }}</el-button>
            </el-form-item>
          </el-form>

          <div class="form--footer" v-if="type === 0">
            <div class="forget-register">
              <a @click="onToType(2)">忘记密码?</a>
              <a @click="onToType(1)">立即注册</a>
            </div>
            <div class="other-login">
              <el-divider>其他方式登录</el-divider>
              <div class="login-method">
                <el-icon class="iconfont icon-QQ txt-float" size="1.8em" title="QQ登录"
                  @click="ElMessage.warning('暂未开发...')" />
                <el-icon class="iconfont icon-wechat-fill txt-float" size="1.8em" title="微信登录"
                  @click="ElMessage.warning('暂未开发...')" />
              </div>
            </div>
          </div>

          <div v-else class="to-login txt-float" @click="onToType(0)">已有账号?点击登录</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store'
import { login, getValidcode } from '@/api/user'

const appStore = useAppStore()

const { isShowLoginModel } = storeToRefs(appStore)

const title = ref({
    0: '登录',
    1: '注册',
    2: '找回'
})

/** 0:登录,1:注册,2:找回 */
const type = ref(0)

const getCodeBtnTxt = ref('获取验证码')

const isDelay = ref()
const formDOM = ref(null)

const formData = reactive({
    user: '',
    mail: '',
    pwd: '',
    validcode: ''
})

const rules = reactive({
    user: [
        { required: true, message: '账号不能为空...', trigger: 'blur' },
        { pattern: /^(1[3-9]\d{9})|((([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})))|([1-9]\d{8,9})$/, message: '账号应该为手机号/邮箱/个人ID...', trigger: 'blur' }
    ],
    mail: [
        { required: true, message: '邮箱不能为空...', trigger: 'blur' },
        { type: 'email', message: '邮箱格式不正确...', trigger: 'blur' }
    ],
    pwd: [{ required: true, message: '密码不能为空...', trigger: 'blur' }],
    validcode: [{ required: true, message: '验证码不能为空...', trigger: 'blur' }]
})

const onToType = (val) => {
    type.value = val
}

onMounted(() => {

})

async function onEnter (form) {
    form.validate((valid) => {
        if (!valid) return
        const { user, mail, pwd, validcode } = formData
        login({ user: type.value > 0 ? mail : user, pwd, validcode, type: type.value }).then(({ data, message }) => {
            if (data) {
                ElMessage.success(message)
                if (data.token) {
                    const oldToken = localStorage.getItem('TOKEN')
                    localStorage.setItem('TOKEN', data.token)
                    if (!oldToken) window.location.href = '/'
                    appStore.onShowLoginModel(false)
                }
                formData.user = type.value > 0 ? mail : user
                formData.validcode = ''
                type.value = 0
            }
        })
    })
}

async function getCode () {
    if (isDelay.value) return
    isDelay.value = true
    getValidcode({ type: type.value, user: formData.mail }).then(({ data, message }) => {
        if (data) {
            getCodeBtnTxt.value = 60
            const time = setInterval(() => {
                getCodeBtnTxt.value--
                if (getCodeBtnTxt.value === 0) {
                    clearInterval(time)
                    getCodeBtnTxt.value = '获取验证码'
                    isDelay.value = false
                }
            }, 1000)
            return
        }
        isDelay.value = false
    })
}
</script>

<style lang='scss' scoped>
.login-model {
  --model-width: 600px;
  --model-min-width: 230px;
  --model-height: 400px;

  .form-container {
    position: relative;
    width: var(--model-width);
    height: var(--model-height);
    color: var(--font-color);
    background: var(--global-bg);
    display: flex;

    .img-box {
      width: 40%;
      max-width: 40%;
      height: 400px;
      overflow: hidden;
      background: url('https://upload.linkstarted.top/cloudfile/anya.jpg') center no-repeat;
      background-size: cover;
    }

    .form-box {
      min-width: var(--model-min-width);
      width: 60%;
      padding: 15px;

      .form--footer {
        .forget-register {
          display: flex;
          justify-content: space-between;

          a {
            color: var(--font-color);
          }

          a:hover {
            color: var(--float-color);
          }
        }

        .other-login {
          .login-method {
            display: flex;
            justify-content: center;
            gap: 15px;

            .iconfont:hover {
              color: var(--float-color);
            }
          }
        }
      }

      .to-login {
        text-align: center;
      }

      .to-login:hover {
        color: var(--float-color);
      }

      h2 {
        text-align: center;
      }
    }
  }

  .form-container::before {
    content: '';
    z-index: 999;
    position: absolute;
    width: var(--model-width);
    height: var(--model-height);
    background: rgba(0, 0, 0, 0.35);
    pointer-events: none;
  }

  & :deep(.el-dialog) {
    border-radius: 5px;
    overflow: hidden;
    background: var(--global-bg);
    width: var(--model-width);

    header {
      display: none;
    }

    .el-dialog__body {
      min-width: var(--model-min-width);
      padding: 0;
    }
    .el-divider__text{
      background: var(--global-bg);
    color: var(--font-color);
    }
  }
}

@media (max-width:768px) {
  .login-model {
    --model-width: 90vw;

    .form-container {
      justify-content: center;

      .img-box {
        display: none;
      }
    }

  }
}

html[data-theme='light'] .form-container::before {
  content: '';
  background: rgba(0, 0, 0, 0);
}
</style>
