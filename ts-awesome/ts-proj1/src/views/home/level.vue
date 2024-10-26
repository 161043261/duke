<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级:</div>
      <ul>
        <li class="active">全部</li>
        <li>三级甲等</li>
        <li>三级乙等</li>
        <li>三级丙等</li>
        <li>二级甲等</li>
        <li>二级乙等</li>
        <li>二级丙等</li>
        <li>一级甲等</li>
        <li>一级乙等</li>
        <li>一级丙等</li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.level {
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

        &.active {
          color: #3178c6;
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
