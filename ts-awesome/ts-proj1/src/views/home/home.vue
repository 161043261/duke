<!-- Optional -->
<script lang="ts">
export default {
  name: 'HomeIndex',
}
</script>

<script setup lang="ts">
// 导入组件
import Carousel from './carousel.vue'
import Search from './search.vue'
import Level from './level.vue'
import Region from './region.vue'
</script>

<template>
  <div>
    <!-- 走马灯组件 -->
    <Carousel />
    <!-- 搜索表单组件 -->
    <Search />

    <!-- 1 行 -->
    <!-- :gutter="20" 设置 padding-left = padding-right = 10px -->
    <el-row :gutter="20">
      <!-- 1 行 24 分栏 -->

      <!-- 该列 20 分栏-->
      <el-col :span="20">
        <!-- 等级组件 -->
        <Level />
        <!-- 地区组件-->
        <Region />
      </el-col>
      <el-col :span="4">
        <!-- 该列 4 分栏 -->
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped></style>
