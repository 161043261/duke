<script lang="ts">
export default {
  name: 'HospitalDistrict',
}
</script>

<script setup lang="ts">
import { reqLevelOrDistrict } from '@/api/home';
import { onMounted, ref } from 'vue';

const hospDistrictArr = ref<string[]>()

onMounted(() => {
  getDistricts()
})

async function getDistricts() {
  const resp = await reqLevelOrDistrict("district")
  console.log(resp.data)
  if (resp.code == 200) {
    hospDistrictArr.value = resp.data
    // console.log(hospDistrictArr.id)
  } else {
    console.log(resp.message)
  }
}

const currDistrict = ref<string>('')
function changeDistrict(district: string) {
  currDistrict.value = district
  // 子组件使用自定义事件, 向父组件发送数据
  emitFunc('send-district' /* 事件名 */, district /* 参数列表 */)
}

// 自定义事件 send-address
const emitFunc = defineEmits(['send-district']) // 事件名列表
</script>

<template>
  <div class="district">
    <div class="content">
      <div class="left">地区:</div>
      <ul>
        <li :class="{ highlight: currDistrict == '' }" @click="changeDistrict('')">
          全部
        </li>
        <li
          :class="{ highlight: currDistrict == hospDistrict }"
          v-for="hospDistrict in hospDistrictArr"
          :key="hospDistrict"
          @click="changeDistrict(hospDistrict)"
        >
          {{ hospDistrict }}
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
      width: 50px;
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
