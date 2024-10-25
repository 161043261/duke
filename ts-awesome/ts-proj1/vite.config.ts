import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import path from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    // 按需导入 element-plus 组件库
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      // 设置 src 目录别名
      // '@': path.resolve(__dirname, 'src'),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
