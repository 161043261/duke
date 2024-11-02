<script lang="ts">
export default {
  name: 'HospitalCard',
}
</script>

<script setup lang="ts">
import type { IHosp } from '@/type'
import { useRouter } from 'vue-router'
import { Star, Timer } from '@element-plus/icons-vue'

//! 子组件使用 defineProps 从父组件 ./home.vue 接收数据
// v-bind:hospBind="hosp"
const props = defineProps(['hospBind'])
const router = useRouter()

function goDetail() {
  console.log(props.hospBind.hospCode)
  // 等价于 router.push({ path: '/hospital/register' })
  router.push('/hospital/register')
}

function getImgSrc(logoData: string): string {
  // console.log(logoData)
  if (logoData.length > 0) {
    return `data:image/jpeg;base64,${logoData}`
  }
  return '@/assets/qiqi.webp'
}
</script>

<template>
  <el-card shadow="hover" @click="goDetail">
    <div class="content">
      <div class="left">
        <div>{{ (hospBind as IHosp).hospName }}</div>
        <div class="tip">
          <div class="type">
            <el-icon>
              <Star />
            </el-icon>
            <span>{{ (hospBind as IHosp).level }}</span>
          </div>
          <div class="time">
            <el-icon>
              <Timer />
            </el-icon>
            <span
              >每天
              {{ (hospBind as IHosp).openTime }}
              放号</span
            >
          </div>
        </div>
      </div>
      <div class="right">
        <img :src="getImgSrc((hospBind as IHosp).logoData)" alt="logoData" />
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
