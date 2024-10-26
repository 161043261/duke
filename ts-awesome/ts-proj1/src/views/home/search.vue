<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
// 导入 element-plus 图标
import { Search } from '@element-plus/icons-vue'
</script>

<template>
  <div class="search">
    <el-autocomplete clearable placeholder="请输入医院名" class="" />
    <el-button type="primary" :icon="Search">搜索</el-button>
  </div>
</template>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 50px;
  // background-color: red;
  // 弹性盒子
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
</style>
