<!-- Optional -->
<script lang="ts">
export default {
  name: 'HomeIndex',
}
</script>

<script setup lang="ts">
// 导入走马灯
import Carousel from './carousel.vue'
import Search from './search.vue'
</script>

<template>
  <div>
    <Carousel />
    <Search />
  </div>
</template>

<style lang="scss" scoped></style>
