<script setup lang="ts">

</script>

<template>
  <div class="top">
    <!-- 顶部 -->
    <div class="content">
      <!-- 左侧 -->
      <div class="left">
        <img src="../../assets/logo.png" alt="logo">
        <p>北京医院 预约挂号统一平台</p>
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
  // 层级: 高
  z-index: 999;

  width: 100%;
  height: 70px;
  background-color: #fff;
  // 弹性盒子
  display: flex;
  // 主轴居中
  justify-content: center;

  .content {
    width: 1200px;
    height: 70px;
    background-color: #fff;
    // 弹性盒子
    display: flex;
    // 一左一右
    justify-content: space-between;

    .left {
      display: flex;
      // 主轴居中
      justify-content: center;
      // 侧轴居中
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
      }
      p {
        font-size: 20px;
        color: #4490f1;
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
