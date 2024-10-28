<!-- <script lang="ts">
export default {
  name: 'HospitalType',
}
</script> -->

<script setup lang="ts">
import { reqHosTypeAndAddr } from '@/api/home'
import type { IHosTypeAndAddr, IHosTypeAndAddrRespData } from '@/type'
import { onMounted, ref } from 'vue'

const hosTypes = ref<IHosTypeAndAddr[]>()

onMounted(() => {
  getHosTypes()
})

async function getHosTypes() {
  const promiseIns = reqHosTypeAndAddr('HosType')
  // console.log(result)
  promiseIns.then(
    (resp: IHosTypeAndAddrRespData) => {
      hosTypes.value = resp.data
    },
    reason => {
      console.log(reason)
    },
  )
}

const flag = ref<string>('')
function changeValue(value: string) {
  flag.value = value
}
</script>

<template>
  <div class="type">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <ul>
        <li :class="{ highlight: flag == '' }" @click="changeValue('')">
          全部
        </li>
        <li
          :class="{ highlight: flag == hosType.value }"
          v-for="hosType in hosTypes"
          :key="hosType.value"
          @click="changeValue(hosType.value)"
        >
          {{ hosType.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.type {
  color: #7f7f7f;

  h1 {
    font-weight: 800;
    // 上下 10px, 左右 0
    margin: 10px 0;
  }

  .content {
    // 弹性盒子
    display: flex;

    .left {
      margin-right: 10px;
    }

    ul {
      //弹性盒子
      display: flex;
      // 默认不换行

      li {
        margin-right: 10px;
        margin-bottom: 10px;

        &.highlight {
          color: #ff0000;
        }
      }

      li:hover {
        color: #3178c6;
        cursor: pointer; // 手
      }
    }
  }
}
</style>
