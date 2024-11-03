<!-- <script lang="ts">
export default {
  name: 'HospitalLevel',
}
</script> -->

<script setup lang="ts">
import { reqLevelOrDistrict } from '@/api/home'
import type { ILevelOrDistrictResp } from '@/type'
import { onMounted, ref } from 'vue'
import { getLevelName } from '@/utils'

const levels = ref<
  {
    id: number
    value: string
  }[]
>([])

onMounted(() => {
  getLevels()
})

async function getLevels() {
  const promiseIns = reqLevelOrDistrict('level')
  // console.log(result)
  promiseIns.then(
    //! on fulfilled 成功时的回调函数
    (resp: ILevelOrDistrictResp) => {
      // levels.value = []
      // resp.data.forEach(kvs => {
      //   levels.value.push(kvs.value)
      // })
      levels.value = resp.data.map(item => {
        return {
          id: item.id,
          value: getLevelName(item.id),
        }
      })
    },
    //! on rejected 失败时的回调函数
    reason => {
      console.log(reason)
    },
  )
}

const currId = ref<number>(0)

function switchLevel(levelId: number) {
  currId.value = levelId
  // 子组件使用自定义事件, 向父组件发送数据
  emitFunc('send-level-id' /* 事件名 */, levelId /* 参数列表 */)
}

// 自定义事件 send-level-id
const emitFunc = defineEmits(['send-level-id']) // 事件名列表
</script>

<template>
  <div class="type">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <ul>
        <li :class="{ highlight: currId == 0 }" @click="switchLevel(0)">
          全部
        </li>
        <!-- 点击触发自定义事件 -->
        <li
          :class="{ highlight: currId == level.id }"
          v-for="level in levels"
          :key="level.id"
          @click="
            switchLevel(level.id)
            /* ; emitFunc('send-level-id', level.id) */
          "
        >
          {{ level.value }}
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
