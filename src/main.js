import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入样式资源
import '@/styles/common.scss'
// 引入懒加载
import { lazyPlugin } from '@/directives/index.js'

// 注册全局组件
import { componentPlugin } from '@/components/index.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount('#app')
