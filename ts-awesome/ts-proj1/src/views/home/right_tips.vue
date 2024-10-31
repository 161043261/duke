<script setup lang="ts">
import { ArrowRightBold, BellFilled } from '@element-plus/icons-vue'
</script>

<template>
  <div class="tips">
    <div class="department">
      <div class="header">
        <div class="left">
          <!-- svg, scalable vector graphics 可缩放矢量图形 -->
          <svg
            t="1730343550652"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4328"
            width="16"
            height="16"
          >
            <path
              d="M817.3 305.3H762V250c0-61.1-49.5-110.7-110.7-110.7H374.7C313.5 139.3 264 188.8 264 250v55.3h-55.3C147.5 305.3 98 354.8 98 416v359.7c0 61.1 49.5 110.7 110.7 110.7h608.7c61.1 0 110.7-49.5 110.7-110.7V416c-0.1-61.2-49.6-110.7-110.8-110.7z m-498-55.3c0-30.5 24.8-55.3 55.3-55.3h276.7c30.5 0 55.3 24.8 55.3 55.3v55.3H319.3V250z m553.4 525.6c0 30.5-24.8 55.3-55.3 55.3H208.7c-30.5 0-55.3-24.8-55.3-55.3V416c0-30.5 24.8-55.3 55.3-55.3H817.3c30.5 0 55.3 24.8 55.3 55.3v359.6z"
              p-id="4329"
              fill="#d81e06"
            ></path>
            <path
              d="M540.7 471.3h-55.4V582H374.7v55.3h110.6V748h55.4V637.3h110.6V582H540.7z"
              p-id="4330"
              fill="#d81e06"
            ></path>
          </svg>
          <span>常见科室</span>
        </div>
        <div class="right">
          <span>全部</span>
          <el-icon>
            <ArrowRightBold />
          </el-icon>
        </div>
      </div>

      <div class="content">
        <ul>
          <li>内科</li>
          <li>外科</li>
          <li>骨科</li>
          <li>麻醉科</li>
          <li>妇产科</li>
          <li>眼科</li>
          <li>耳鼻喉科</li>
          <li>口腔科</li>
        </ul>
      </div>
    </div>

    <div class="notice">
      <div class="header">
        <div class="left">
          <el-icon>
            <BellFilled />
          </el-icon>
          <span>医院通知</span>
        </div>
        <div class="right">
          <span>全部</span>
          <el-icon>
            <ArrowRightBold />
          </el-icon>
        </div>
      </div>
      <div class="content">
        <ul>
          <li>医院通知医院通知医院通知医院通知医院通知</li>
          <li>医院通知医院通知医院通知医院通知医院通知</li>
          <li>医院通知医院通知医院通知医院通知医院通知</li>
        </ul>
      </div>
    </div>

    <div class="notice">
      <div class="header">
        <div class="left">
          <el-icon>
            <BellFilled />
          </el-icon>
          <span>停诊通知</span>
        </div>
        <div class="right">
          <span>全部</span>
          <el-icon>
            <ArrowRightBold />
          </el-icon>
        </div>
      </div>
      <div class="content">
        <ul>
          <li>停诊通知停诊通知停诊通知停诊通知停诊通知</li>
          <li>停诊通知停诊通知停诊通知停诊通知停诊通知</li>
          <li>停诊通知停诊通知停诊通知停诊通知停诊通知</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.tips {
  color: #7f7f7f;

  .department {
    .header {
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;

        span {
          margin-left: 5px;
        }
      }

      .right {
        display: flex;

        span {
          margin-right: 5px;
        }
      }
    }

    .content {
      ul {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

        li {
          width: 40%;
          margin-top: 10px;
        }
      }
    }
  }

  .notice {
    margin-top: 20px;

    .header {
      display: flex;
      justify-content: space-between;

      .left {
        display: flex;

        span {
          margin-left: 5px;
        }
      }

      .right {
        display: flex;

        span {
          margin-right: 5px;
        }
      }
    }

    .content {
      ul {
        li {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 10px;
        }
      }
    }
  }
}
</style>
