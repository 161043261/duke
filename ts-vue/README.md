# ts-vue

### Project Setup

```sh
npm create vue@latest
cd ts-vue || exit
npm install
npm install vite-plugin-vue-setup-extend -D
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
npm install tslib @types/node axios nanoid pinia vue-router mitt
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
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

* Iosevka SS04 Menlo Style
* Iosevka SS06 Liberation Mono Style
* Sarasa Mono SC
