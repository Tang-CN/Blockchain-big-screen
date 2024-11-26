import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'lib-flexible/flexible.js'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { ChainName, ChainTitle } from './config'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.config.globalProperties.$ChainName = ChainName
app.config.globalProperties.$ChainTitle = ChainTitle

app.use(Antd).mount('#app')
