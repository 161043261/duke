<script lang="ts">
export default {
  name: 'HospitalCard',
}
</script>

<script setup lang="ts">
import type { IHospContent } from '@/type'
import { useRouter } from 'vue-router'
import { Star, Timer } from '@element-plus/icons-vue'

//! 子组件使用 defineProps 从父组件接收数据
const props = defineProps(['hospitalContent'])
const router = useRouter()

function goDetail() {
  console.log(props.hospitalContent.hospCode)
  // 等价于 router.push({ path: '/hospital/register' })
  router.push('/hospital/register')
}
</script>

<template>
  <el-card shadow="hover" @click="goDetail">
    <div class="content">
      <div class="left">
        <div>{{ (hospitalContent as IHospContent).hospName }}</div>
        <div class="tip">
          <div class="type">
            <el-icon>
              <Star />
            </el-icon>
            <span>{{
              (hospitalContent as IHospContent).level
              }}</span>
          </div>
          <div class="time">
            <el-icon>
              <Timer />
            </el-icon>
            <span>每天
              {{ (hospitalContent as IHospContent).openTime }}
              放号</span>
          </div>
        </div>
      </div>
      <div class="right">
        <img :src="(hospitalContent as IHospContent).logoData == '' ?
          `data:image/jpeg;base64,${((hospitalContent as IHospContent).logoData)}`
          : '@/assets/qiqi.webp'"
          alt="logoData" />
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;

  .left {
    width: 70%;

    .tip {
      color: #7f7f7f;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;

      .type,
      .time {
        display: flex;
        align-items: center;

        span {
          margin-left: 5px;
        }
      }
    }
  }

  .right {
    img {
      width: 50px;
      height: 50px;
    }
  }
}
</style>
