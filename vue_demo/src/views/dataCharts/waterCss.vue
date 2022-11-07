<template>
  <div class="contentBox">
    <div class="main-box">
      <!-- 水球图1-正方形带圆角效果 -->
      <div class="module">
        <water-circle rate="25%" :config="config1">
          <span class="slot-font2">25%</span>
        </water-circle>
      </div>
      <!-- 水球图2-模拟echarts -->
      <div class="module">
        <water-circle rate="75%" :config="config2">
          <span class="slot-font1">75%</span>
        </water-circle>
      </div>
      <!-- 水球图3-单波浪纹 -->
      <div class="module">
        <water-circle rate="75%" :config="{ doubleWaves: false }">
          <span class="slot-font1">75%</span>
        </water-circle>
      </div>
    </div>
    <hr />
    <div class="main-box">
      <!-- 水球图4-三角形裁剪 -->
      <div class="module">
        <water-circle rate="10%" :config="config3" style="clip-path: polygon(50% 0%, 0% 100%, 100% 100%)">
          <span class="slot-font2">10%</span>
        </water-circle>
      </div>
      <!-- 水球图5-菱形裁剪 -->
      <div class="module">
        <water-circle rate="10%" :config="config3" style="clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)">
          <span class="slot-font2">10%</span>
        </water-circle>
      </div>
      <!-- 水球图6-五角星裁剪 -->
      <div class="module">
        <water-circle rate="50%" :config="config3" style="clip-path: polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)">
          <span class="slot-font2">50%</span>
        </water-circle>
      </div>
    </div>
    <hr />
    <div class="svg-module">
      <div class="module-title">伪3D柱形进度条-6-</div>
      <div class="module-content">
        <bar-circle></bar-circle>
      </div>
    </div>
  </div>
</template>
<script>
import WaterCircle from "./components/pureCss/water.vue";
import BarCircle from "./components/pureCss/bar.vue";
export default {
  components: {
    WaterCircle,
    BarCircle,
  },
  data() {
    return {
      config1: {
        frontColor: "#148cdb",
        backColor: "#2e5199",
        outerBorderColor: "#294d99",
        outerBorderWidth: "6px",
        outerPadding: "6px",
        innerBackground: "#ddf0f8",
        borderRadius: "20%",
        crests: 30,
      },
      config2: {
        frontColor: "#148cdb",
        backColor: "#2e5199",
        outerBorderColor: "#294d99",
        outerBorderWidth: "6px",
        outerPadding: "6px",
        innerBackground: "#ddf0f8",
        crests: 50,
      },
      config3: {
        outerBorderWidth: "0px",
        outerPadding: "0px",
        innerBackground: "#ddf0f8",
        borderRadius: 0,
      },
    };
  },
};
</script>
<style scoped>
.main-box {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.module {
  /* 务必保证容器宽高一致、否则会导致水面高度计算有误 */
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  padding: 10px;
}
.slot-font1 {
  color: #fff;
  font-size: 20px;
  font-weight: bold;
}
.slot-font2 {
  color: #274380;
  font-size: 20px;
  font-weight: bold;
}
/* 柱状 */

.svg-module {
  width: 400px;
  height: 300px;
}
.module-content {
  width: 100%;
  height: calc(100% - 30px);
  padding: 10px;
  border: 1px solid #064774;
  color: #fff;
  box-sizing: border-box;
}
.module-title {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
  color: #fff;
}
.module-title::before,
.module-title::after {
  content: "";
  position: absolute;
  z-index: -1;
  top: 0;
  width: 50%;
  height: 100%;
  background-image: linear-gradient(to bottom, #061223, #042c4c);
}
.module-title::before {
  left: 0;
  transform: skew(-45deg);
  transform-origin: left bottom;
}
.module-title::after {
  right: 0;
  transform: skew(45deg);
  transform-origin: right bottom;
}
</style>