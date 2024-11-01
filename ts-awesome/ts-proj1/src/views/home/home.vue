<script lang="ts">
export default {
  name: 'HomeIndex',
}
</script>

<script setup lang="ts">
// 导入组件
import HospitalDistrict from './district.vue'
import Card from './card.vue'
import HomeCarousel from './HomeCarousel.vue'
import HospitalLevel from './hospital_level.vue'
import SearchForm from './search.vue'

import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { reqHospContent } from '@/api/home'
import type { IHospContent, IHospContentRespData } from '@/type'
import { onMounted, ref } from 'vue'

import RightTips from './right_tips.vue'

const currPage = ref<number>(1) // -> curr
const sizeLimit = ref<number>(4) // -> limit
const content = ref<Array<IHospContent>>([])
const totalHosp = ref<number>(0)
const level = ref<string>('')
const districtName = ref<string>('')

// 组件挂载后, 发送 AJAX 请求
onMounted(() => {
  getHospitalContent()
})

async function getHospitalContent() {
  const respData: IHospContentRespData = await reqHospContent(
    currPage.value,
    sizeLimit.value,
    level.value,
    districtName.value,
  )
  if (respData.code == 200) {
    content.value = respData.data.content
    totalHosp.value = respData.data.totalHosp
  }
  // console.log(respData)
}

// 父组件使用自定义事件, 从子组件接收数据
function getLevel(args: string) {
  console.log(`Receive ${args} from ./hospital_level.vue`)
  level.value = args
  getHospitalContent()
}

// 父组件使用自定义事件, 从子组件接收数据
function getHospDistrict(args: string) {
  console.log(`Receive ${args} from ./district.vue`)
  districtName.value = args
  getHospitalContent()
}
</script>

<template>
  <div>
    <!-- 走马灯组件 -->
    <HomeCarousel />
    <!-- 搜索表单组件 -->
    <SearchForm />

    <!-- 1 行 -->
    <!-- :gutter="20" 设置 padding-left = padding-right = 10px -->
    <el-row :gutter="20">
      <!-- 1 行 24 分栏 -->

      <!-- 该列 20 分栏-->
      <el-col :span="20">
        <!-- 等级组件 -->

        <!-- 自定义事件 send-level -->
        <HospitalLevel @send-hosp-level="getLevel" />
        <!-- 地区组件 -->
        <HospitalDistrict @send-district="getHospDistrict" />

        <!-- 卡片组件 -->
        <!--! 父组件使用 v-bind: 向子组件发送数据 -->
        <div class="cards" v-if="content.length > 0">
          <Card
            class="item"
            v-for="(item, idx) in content"
            :key="item.id + '-' + idx"
            v-bind:hospitalContent="item"
          />
        </div>

        <el-empty v-else description="暂无数据"></el-empty>

        <!-- element-plus 国际化 -->
        <el-config-provider :locale="zhCn">
          <!-- 分页器 -->
          <!-- current-page 当前页号 -->
          <!-- page-size 页大小 -->
          <!-- page-sizes 可选的页大小  -->
          <!-- total 总页数 -->
          <!-- @current-change 页号改变时的回调函数 -->
          <!-- @size-change 页大小改变时的回调函数 -->
          <!-- layout 布局
            prev   上一页
            pager  可选的页大小
            next   下一页
            jumper 前往 ? 页
            sizes  ? 条/页
            total  共 ? 条
            -->
          <el-pagination
            v-model:current-page="currPage"
            v-model:page-size="sizeLimit"
            :page-sizes="[2, 4, 6, 8]"
            :background="true"
            layout="prev, pager, next, jumper, ->, sizes, total"
            :total="totalHosp"
            @current-change="getHospitalContent()"
            @size-change="
              () => {
                currPage = 1
                getHospitalContent()
              }
            "
          />
        </el-config-provider>
      </el-col>
      <el-col :span="4">
        <!-- 该列 4 分栏 -->
        <RightTips />
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
