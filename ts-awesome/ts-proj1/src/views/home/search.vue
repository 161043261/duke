<script lang="ts">
export default {
  name: 'SearchForm',
}
</script>

<script setup lang="ts">
// 导入 element-plus 图标
import { reqHospContentArr } from '@/api/home'
import type { IHospContentArrRespData } from '@/type'
import { Search } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// v-model 双向绑定
const hospName = ref<string>('')

async function fetchData(hospName: string, cb: (arr: Array<unknown>) => object) {
  // console.log("queryString:", hospName)
  const respData: IHospContentArrRespData = await reqHospContentArr(hospName)
  // console.log(respData.data)
  cb(
    respData.data.map(item => {
      return {
        value: item.hospName, // 医院名
        hospCode: item.hospCode, // 医院编号
      }
    }),
  )
}

function goHospDetail(item: { value: string; hospCode: string }) {
  // console.log(item)
  // 等价于 router.push('/hospital/register')
  router.push({ path: '/hospital/register' })
}
</script>

<template>
  <div class="search">
    <el-autocomplete
      clearable
      placeholder="请输入医院名"
      v-model="hospName"
      :fetch-suggestions="fetchData"
      :trigger-on-focus="false"
      @select="goHospDetail"
    />
    <el-button type="primary" size="default" :icon="Search">搜索</el-button>
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
  // 上下 10px, 左右 0
  margin: 10px 0;

  // 深度选择器
  // css  >>>
  // less /deep/
  // sass :deep()

  // deprecated
  // ::v-deep .el-autocomplete {
  //   width: 600px;
  // }
  :deep(.el-autocomplete) {
    width: 600px;
  }
}
</style>
