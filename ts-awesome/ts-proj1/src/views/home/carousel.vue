<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
  <!-- 走马灯: 在有限空间内, 循环播放图片, 文字等内容 -->
  <el-carousel height="350px">
    <el-carousel-item v-for="idx in 4" :key="idx">
      <img src="../../assets/ganyu.jpg" alt="ganyu" />
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped>
img {
  width: 100%;
  // height: 350px;
}
</style>
