<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>

<template>
  <div class="district">
    <div class="content">
      <div class="left">地区:</div>
      <ul>
        <li class="active">全部</li>
        <li>黄浦区</li>
        <li>徐汇区</li>
        <li>长宁区</li>
        <li v-for="v in 10" :key="v">静安区</li>
        <li>普陀区</li>
        <li>虹口区</li>
        <li>杨浦区</li>
        <li>闵行区</li>
        <li>宝山区</li>
        <li>嘉定区</li>
        <li>浦东新区</li>
        <li>金山区</li>
        <li>松江区</li>
        <li>青浦区</li>
        <li>奉贤区</li>
        <li>崇明区</li>
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
