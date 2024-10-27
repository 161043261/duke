<!-- Optional -->
<script lang="ts">
export default {
  name: 'HospitalTop',
}
</script>

<script setup lang="ts"></script>

<template>
  <!-- 顶部 -->
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left">
        <img src="../assets/baizhu.webp" alt="baizhu" />
        <p>不卜庐 预约挂号统一平台</p>
      </div>

      <!-- 右侧 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login">登录/注册</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top {
  // 固定定位
  position: fixed;
  // 高层级
  z-index: 777;
  width: 100%;
  height: 70px;
  background-color: #fff;
  // 弹性盒子
  display: flex;
  justify-content: center;

  .content {
    width: 1200px;
    height: 70px;
    background-color: #fff;
    // 弹性盒子
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }

      p {
        font-size: 20px;
        color: #3178c6;
      }
    }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;

      .help {
        margin-right: 10px;
      }
    }
  }
}
</style>
