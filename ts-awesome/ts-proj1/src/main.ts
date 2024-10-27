//! createApp: 用于创建 VueApp 对象
import { createApp } from 'vue'
//! reset default style
import '@/style/reset.scss'
//! 导入根组件 App
import App from './App.vue'
//! 完整导入 element-plus 组件库
// import ElementPlus from 'element-plus'
//! element-plus 国际化
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
//! 导入 element-plus 样式表
import 'element-plus/dist/index.css'
//! 导入全局组件
import HospitalBottom from '@/components/hospital_bottom.vue'
import HospitalTop from '@/components/hospital_top.vue'
//! 导入路由器对象 router
import router from '@/router'

//! 创建 VueApp 对象 app
const app = createApp(App)

//! 注册全局组件 HospitalTop
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)

//! 使用路由器对象 router
app.use(router)
//! 完整使用 element-plus 组件库
// app.use(ElementPlus, { locale: zhCn })

//! 将 app 挂载到 ../index.html
// <div id="app">
//   <!-- Object 'app' is mounted here -->
// </div>
app.mount('#app')
