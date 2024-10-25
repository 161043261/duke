// createApp: 创建 VueApp 对象
import { createApp } from 'vue'

// 导入根组件 App
import App from './App.vue'

// reset 默认样式
import '@/style/reset.scss'

// 导入全局组件
import HospitalTop from '@/components/hospital_top/index.vue'

// 创建 VueApp 对象 app
const app = createApp(App)

// 注册全局组件 HospitalTop
app.component("HospitalTop", HospitalTop)

// 将 app 对象挂载到 ../index.html
// <div id="app"></div>
app.mount('#app')
