<!-- <script lang="ts">
export default {
  name: 'HospitalLevel',
}
</script> -->

<script setup lang="ts">
import { reqLevelOrDistrict } from '@/api/home';
import type { ILevelOrDistrictRespData } from '@/type';
import { onMounted, ref } from 'vue';

const levels = ref<string[]>()

onMounted(() => {
  getLevels()
})

async function getLevels() {
  const promiseIns = reqLevelOrDistrict("level")
  // console.log(result)
  promiseIns.then(
    (resp: ILevelOrDistrictRespData) => {
      levels.value = resp.data
    },
    reason => {
      console.log(reason)
    },
  )
}

const currLevel = ref<string>('')
function changeLevel(level: string) {
  currLevel.value = level
  // 子组件使用自定义事件, 向父组件发送数据
  emitFunc('send-hosp-level' /* 事件名 */, level /* 参数列表 */)
}

// 自定义事件 send-hosp-level
const emitFunc = defineEmits(['send-hosp-level']) // 事件名列表
</script>

<template>
  <div class="type">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <ul>
        <li :class="{ highlight: currLevel == '' }" @click="changeLevel('')">
          全部
        </li>
        <!-- 点击触发自定义事件 -->
        <li
          :class="{ highlight: currLevel == level }"
          v-for="level in levels"
          :key="level"
          @click="
            changeLevel(level)
            /* ; emitFunc('send-level', level.id) */
          "
        >
          {{ level }}
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
      // margin-right: 10px;
      margin-right: 17px;
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
