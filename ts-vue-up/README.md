# ts-vue-up

### Project Setup

```sh
pnpm create vue
cd ts-vue-up || exit
pnpm install
pnpm install vite-plugin-vue-setup-extend -D
pnpm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
pnpm install tslib @types/node axios nanoid pinia vue-router mitt
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

### Vue2 Options API

```vue

<script lang="ts">
  export default {
    name: 'Person',
    // data
    data() {
      return {}
    },
    // methods
    methods: {}
  }
</script>
```
