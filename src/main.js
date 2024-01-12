import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import directives from './directives'

/** 引入动画样式库 */
import 'animate.css'
/** window挂载方法 */
import './utils/window.js'
/** app节点元素样式 */
import './styles/index.css'
/** icon图标 */
import './styles/iconfont.css'
/** font字体 */
import './styles/font.css'
/** element 消息组件样式 */
import 'element-plus/es/components/message/style/css'
import 'element-plus/es/components/message-box/style/css'
/** markdown插件 */
import 'md-editor-v3/lib/style.css'

/** 自定义组件 */
import globalComponents from './components'

const app = createApp(App)
/** 自定义组件注册 */
app.use(globalComponents)
/** 路由 - VueRouter */
app.use(router)
/** 自定义指令 */
app.use(directives)
/** 状态管理器 - Pinia */
app.use(store)
app.mount('#app')

