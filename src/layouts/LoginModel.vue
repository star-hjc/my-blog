<template>
  <div class="login-model">
    <el-dialog v-model="isShowLoginBox">
      <div class="form-container">
        <div class="img-box">

        </div>
        <div class="form-box">
          <h2>{{ title[type]}}</h2>

          <el-form :model="formData">
            <el-form-item>
              <el-input v-model="formData.user" placeholder="请输入邮箱/手机号 ..." />
            </el-form-item>

            <el-form-item v-if="type !== 0">
              <el-input v-model="formData.validcode" placeholder="请输入验证码 ...">
                <template #append>
                  <el-button type="primary">获取验证码</el-button>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-input v-model="formData.password" placeholder="请输入密码 ..." />
            </el-form-item>

            <el-form-item>
              <el-button style="width: 100%;" type="primary">登录</el-button>
            </el-form-item>
          </el-form>

          <div class="form--footer" v-if="type === 0">
            <div class="forget-register">
              <a @click="onToType(1)">忘记密码?</a>
              <a @click="onToType(2)">立即注册</a>
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
import { ElMessage } from 'element-plus'
const title = ref({
  0: '登录',
  1: '注册',
  2: '找回',
})

/** 0:登录,1:注册,2:找回 */
const type = ref(0)


const isShowLoginBox = ref(false)

const formData = reactive({
  user: '',
  password: '',
  validcode: ''
})

const onToType = (val) => {
  type.value = val
}


onMounted(() => {

})

const onShowLoginBox = () => {
  isShowLoginBox.value = !isShowLoginBox.value
}

defineExpose({ onShowLoginBox })
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

  & :deep(.el-dialog__header) {
    display: none;
  }

  & :deep(.el-dialog__body) {
    min-width: var(--model-min-width);


    padding: 0;
  }

  & :deep(.el-dialog) {
    border-radius: 5px;
    overflow: hidden;
    background: var(--global-bg);
    width: var(--model-width);
  }

  & :deep(.el-divider__text) {
    background: var(--global-bg);
    color: var(--font-color);
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