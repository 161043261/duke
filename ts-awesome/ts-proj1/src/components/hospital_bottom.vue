<!-- Optional -->
<script lang="ts">
export default {
  name: 'HospitalBottom',
}
</script>

<script setup lang="ts"></script>

<template>
  <!-- 底部 -->
  <div class="bottom">
    <div class="content">
      <!-- 左侧 -->
      <div class="left">沪 ICP 备 11111111 号, 电话挂号 111-111</div>

      <!-- 右侧 -->
      <div class="right">
        <span>联系客服</span>
        <span>合作医院</span>
        <span>用户协议</span>
        <span>友情链接</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom {
  width: 100%;
  height: 50px;
  background-color: #fff;
  // 弹性盒子
  display: flex;
  justify-content: center;

  .content {
    width: 1200px;
    height: 100%;
    // 弹性盒子
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    .right {
      span {
        // 上下 0, 左右 5px
        margin: 0 5px;
      }
    }
  }
}
</style>
