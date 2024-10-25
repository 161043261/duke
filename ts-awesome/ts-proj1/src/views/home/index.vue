<!-- Optional -->
<script lang="ts">
export default {
  name: 'HomeIndex',
}
</script>

<script setup lang="ts">
// 导入首页 carousel 走马灯
import Carousel from './carousel/index.vue'

</script>

<template>
  <div>
    <Carousel />
  </div>
</template>

<style lang="scss" scoped></style>
