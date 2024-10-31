<!-- Optional -->
<script lang="ts">
export default {
  name: 'HospitalIndex',
}
</script>

<script setup lang="ts">
import {
  House,
  Phone,
  OfficeBuilding,
  Bell,
  Warning,
  Search,
} from '@element-plus/icons-vue'

import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

// 当前路由
// console.log("current route:", route.path)

function goCompo(path: string) {
  router.replace(path)
  // 等价于 router.push({ path: path })
}
</script>

<template>
  <div class="hospital">
    <!-- 左侧: 菜单 -->
    <div class="menu">
      <div class="top">
        <el-icon>
          <House />
        </el-icon>
        <span> / 医院主页</span>
      </div>
      <el-menu :default-active="route.path" class="el-menu-vertical-demo">
        <el-menu-item
          index="/hospital/detail"
          @click="goCompo('/hospital/detail')"
        >
          <el-icon>
            <OfficeBuilding />
          </el-icon>
          <span>医院详情</span>
        </el-menu-item>

        <el-menu-item
          index="/hospital/register"
          @click="goCompo('/hospital/register')"
        >
          <el-icon>
            <Phone />
          </el-icon>
          <span>预约挂号</span>
        </el-menu-item>

        <el-menu-item index="/hospital/info" @click="goCompo('/hospital/info')">
          <el-icon>
            <Bell />
          </el-icon>
          <span>就诊通知</span>
        </el-menu-item>

        <el-menu-item index="/hospital/warn" @click="goCompo('/hospital/warn')">
          <el-icon>
            <el-icon>
              <Warning />
            </el-icon>
          </el-icon>
          <span>停诊通知</span>
        </el-menu-item>

        <el-menu-item
          index="/hospital/search"
          @click="goCompo('/hospital/search')"
        >
          <el-icon>
            <Search />
          </el-icon>
          <span>查询/取消</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 右侧: 路由组件 -->
    <div class="content">
      <!-- <RouterView></RouterView> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hospital {
  display: flex;

  .menu {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;

    .top {
      color: #7f7f7f;
    }
  }

  .content {
    flex: 8;
  }
}
</style>
