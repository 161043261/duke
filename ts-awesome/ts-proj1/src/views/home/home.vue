<!-- Optional -->
<script lang="ts">
export default {
  name: 'HomeIndex',
}
</script>

<script setup lang="ts">
// 导入组件
import Card from './card.vue'
import Carousel from './carousel.vue'
import Level from './level.vue'
import Region from './region.vue'
import Search from './search.vue'

import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { reqHospitalInfo } from '@/api/home'
import type { IHospitalInfo, IRespData } from '@/type'
import { onMounted, ref } from 'vue'

const currentPage = ref<number>(1)
const pageSize = ref<number>(4)

const content = ref<Array<IHospitalInfo>>([])
const totalElements = ref<number>(0)

// 组件挂载后, 发送 AJAX 请求
onMounted(() => {
  getHospitalInfo()
})

async function getHospitalInfo() {
  const respData: IRespData = await reqHospitalInfo(
    currentPage.value,
    pageSize.value,
  )
  if (respData.code == 200) {
    content.value = respData.data.content
    totalElements.value = respData.data.totalElements
  }
}
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
        <!--! 父组件使用 v-bind: 向子组件发送数据 -->
        <div class="cards">
          <Card
            class="item"
            v-for="(item, idx) in content"
            :key="item.id + '-' + idx"
            :hospitalInfo="item"
          />
        </div>

        <!-- element-plus 国际化 -->
        <el-config-provider :locale="zhCn">
          <!-- 分页器 -->
          <!-- layout
           current-page 当前页号
            page-sizes
            prev            上一页
            pager           分页栏
            next            下一页
            jumper          前往 ? 页
            sizes           ? 条/页
            total           共 ? 条
            @current-change 页号改变时的回调函数
            @size-change    页大小改变时的回调函数
            -->
          <el-pagination
            v-model:current-page="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[2, 4, 6, 8, 10]"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="totalElements"
            @current-change="getHospitalInfo()"
            @size-change="
              currentPage = 1
              getHospitalInfo()
            "
          />
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
