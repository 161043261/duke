// createRouter 函数: 用于创建路由器对象
// 路由器对象可以管理多个路由
import { createRouter, createWebHistory } from 'vue-router'

// 导出路由器对象
export default createRouter({
  // 路由器模式: 哈希模式 (hash mode) 和历史模式 (history mode)
  // 哈希模式: 路由以 '#' 开头, 兼容性较好 例: http://example.com/#/home
  // 路由模式: 兼容性较差, 例: http://example.com/home
  history: createWebHistory(),
  // 管理多个路由
  routes: [
    {
      path: '/home',
      // 路由懒加载: 访问 /home 路由时，才加载 *.vue 组件
      component: () => import('@/views/home/home.vue'),
    },
    {
      path: '/hospital',
      component: () => import('@/views/hospital/hospital.vue'),
    },
    {
      path: '/',
      redirect: '/home',
    },
  ],

  // 设置滚动行为
  // 从旧页面路由到新页面时, 通过设置 scrollBehavior 滚动行为
  // 可以保证: 新页面不是停在旧页面的滚动位置, 而是从指定位置 savedPosition 开始, 加载新页面
  scrollBehavior: async (to, from, savedPosition) => {
    console.log(to, from)
    console.log(savedPosition)
    return {
      left: 0,
      top: 0,
    }
  },
})
