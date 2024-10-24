# ts-proj1

```shell
npm create vue@latest
npm install -g ts-node @types/node
```

[package.json](./package.json) 自动打开默认浏览器

```json
{
  "scripts": {
    "dev": "vite --open"
  }
}
```

src 目录别名

[vite.config.ts](./vite.config.ts)

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import path from 'node:path'
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '@': path.resolve(__dirname, 'src'),
    },
  },
})
```

[tsconfig.app.json](./tsconfig.app.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
