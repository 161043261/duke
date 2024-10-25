<script setup lang="ts"></script>

<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop />

    <div class="content">
      <!-- 路由组件 -->
      <router-view></router-view>
    </div>

    <!-- 底部全局组件 -->
    <HospitalBottom />
  </div>
</template>

<style scoped lang="scss">
.container {
  // 弹性盒子
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>
