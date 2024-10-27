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
import Card from './card.vue'

import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { ref } from 'vue'

const currentPage = ref<number>(1);
const sizePerPage = ref<number>(10);
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

        <!-- 卡片组件 -->
        <div class="cards">
          <Card v-for="idx in 10" :key="idx" class="item" />
        </div>

        <!-- element-plus 国际化 -->
        <el-config-provider :locale="zhCn">
          <!-- 分页器 -->
          <!-- layout
            total: 共 400 条
            sizes: 10 条/页, 20 条/页, 30 条/页, 40 条/页
            prev: 上一页
            pager: 分页
            next: 下一页
            jumper: 前往 ? 页
            -->
          <el-pagination v-model:current-page="currentPage" v-model:page-size="sizePerPage"
            :page-sizes="[10, 20, 30, 40]" :background="true" layout="prev, pager, next, jumper, ->, sizes, total"
            :total="400" />
        </el-config-provider>
      </el-col>
      <el-col :span="4">
        <!-- 该列 4 分栏 -->
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .item {
    width: 48%;
    margin: 10px 0;
  }
}
</style>
