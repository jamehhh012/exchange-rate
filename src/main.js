// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)
import { createMemoryHistory, createRouter } from 'vue-router'

import payMent from '@/pages/payMent'

const routes = [
    { path: '/', component: payMent },
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})
app.use(ElementPlus)
app.use(router)
app.mount('#app')
