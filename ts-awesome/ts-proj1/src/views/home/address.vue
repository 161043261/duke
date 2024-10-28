<script lang="ts">
export default {
  name: 'HospitalAddress',
}
</script>

<script setup lang="ts">
import { reqHosTypeAndAddr } from '@/api/home'
import type { IHosTypeAndAddr } from '@/type'
import { onMounted, ref } from 'vue'

const hosAddrs = ref<IHosTypeAndAddr[]>()

onMounted(() => {
  getHosAddrs()
})

async function getHosAddrs() {
  const resp = await reqHosTypeAndAddr('Beijin')
  if (resp.code == 200) {
    hosAddrs.value = resp.data
    // console.log(hosAddrs.value)
  } else {
    console.log(resp.message)
  }
}

const flag = ref<string>('')
function changeValue(value: string) {
  flag.value = value
}
</script>

<template>
  <div class="district">
    <div class="content">
      <div class="left">地区:</div>
      <ul>
        <li :class="{ highlight: flag == '' }" @click="changeValue('')">
          全部
        </li>
        <li
          :class="{ highlight: flag == hosAddr.value }"
          v-for="hosAddr in hosAddrs"
          :key="hosAddr.value"
          @click="changeValue(hosAddr.value)"
        >
          {{ hosAddr.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.district {
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
      width: 70px;
    }

    ul {
      //弹性盒子
      display: flex;
      // 换行
      flex-wrap: wrap;

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
