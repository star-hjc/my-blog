import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import router from './router'
import store from './store'

import './styles/index.css'
/** ElementPlus组件全局主题配置 */
import './styles/elment-puls.scss'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

/** 路由 - VueRouter */
app.use(router)
/** 状态管理器 - Pinia */
app.use(store)
/** 组件 - ElementPlus(中文) */
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
