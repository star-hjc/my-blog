import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import store from './store'

/** 引入动画样式库 */
import 'animate.css'
/** window挂载方法 */
import './utils/window.js'
/** app节点元素样式 */
import './styles/index.css'
/** icon图标 */
import './styles/iconfont.css'
/** element 消息组件样式 */
import 'element-plus/es/components/message/style/css'
/** ElementPlus组件中文包 */
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

/** 路由 - VueRouter */
app.use(router)
/** 状态管理器 - Pinia */
app.use(store)
/** 组件 - ElementPlus(中文) */
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
