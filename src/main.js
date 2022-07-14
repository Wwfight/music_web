import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import components from '@/components/index.js'
import 'reseter.css'
import './assets/font/iconfont.css'
import mitt from 'mitt'
import imgPlugin from './utils/directive'

const app = createApp(App)
app.config.globalProperties.$mitt = new mitt();

app.use(store).use(router).use(ElementPlus).use(components).use(imgPlugin).mount('#app')
