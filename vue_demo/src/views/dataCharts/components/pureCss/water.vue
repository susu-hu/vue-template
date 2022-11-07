<!-- demo1.vue -->
<template>
  <div class="box-wrap" :style="styObj">
    <div class="box">
      <div class="fill-area">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" class="waves back-wave" viewBox="0 0 600 140">
          <path :d="path" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" version="1.0" class="waves front-wave" viewBox="0 0 600 140">
          <path :d="path" />
        </svg>
      </div>
      <!-- 插槽内容 -->
      <div class="slot-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rate: {
      type: String,
      default: "0",
    },
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      defaultConfig: {
        frontColor: "#0bc8e8", // 前面波纹颜色
        backColor: "#0b6d98", // 后面波纹颜色
        outerBorderColor: "#0bc8e8", // 外边框颜色
        outerBorderWidth: "4px", // 外变宽宽度
        outerPadding: "4px", // 外边框内边距
        innerBackground: "transparent", // 水球内部背景颜色
        doubleWaves: true, // 是否显示双波浪线
        borderRadius: "50%", // 外围边框圆角程度
        crests: 40, // 波峰-波谷，值0-70，值越大，水面突出越明显
      },
    };
  },
  computed: {
    path() {
      let obj = Object.assign({}, this.defaultConfig, this.config);
      let crests = obj.crests;
      if (crests >= 70) {
        crests = 70;
      } else if (crests <= 0) {
        crests = 0;
      }
      return `M 0 70 Q 75 ${
        70 - crests
      },150 70 T 300 70 T 450 70 T 600 70 L 600 140 L 0 140 L 0 70Z`;
    },
    styObj() {
      let obj = Object.assign({}, this.defaultConfig, this.config);
      let rate = this.rate.replace("%", "");
      let waveDisplay = obj.doubleWaves ? "block" : "none";
      if (rate <= 0) {
        rate = 0;
      } else if (rate >= 100) {
        rate = 100;
      }
      return {
        "--front-color": obj.frontColor,
        "--back-color": obj.backColor,
        "--outer-border-color": obj.outerBorderColor,
        "--outer-border-width": obj.outerBorderWidth,
        "--outer-padding": obj.outerPadding,
        "--inner-background": obj.innerBackground,
        "--water-height": `${rate}%`,
        "--wave-display": waveDisplay,
        "--border-radius": obj.borderRadius,
      };
    },
  },
};
</script>
<style scoped>
.box-wrap {
  width: 100%;
  height: 100%;
  border: var(--outer-border-width) solid var(--outer-border-color);
  padding: var(--outer-padding);
  box-sizing: border-box;
  border-radius: var(--border-radius);
}
.box {
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: var(--border-radius);
  /** 解决增加圆角后超出部分不隐藏bug */
  z-index: 1;
  overflow: hidden;
  background-color: var(--inner-background);
}
/* 波纹填充区域 */
.fill-area {
  position: absolute;
  left: 0;
  bottom: -123.33%;
  width: 100%;
  height: 100%;
  transform: translateY(calc(0% - var(--water-height)));
  background-color: var(--front-color);
}
.waves {
  position: absolute;
  left: 0;
  bottom: 100%;
  width: 200%;
  stroke: none;
  /* 解决水球图中间有一条线问题 */
  box-shadow: 0 10px 4px 4px var(--front-color);
}
.front-wave {
  fill: var(--front-color);
  transform: translate(-50%, 0);
  animation: front-wave-move 3s linear infinite;
}
.back-wave {
  display: var(--wave-display);
  fill: var(--back-color);
  transform: translate(0, 0);
  animation: back-wave-move 1.5s linear infinite;
}
@keyframes front-wave-move {
  100% {
    transform: translate(0, 0);
  }
}
@keyframes back-wave-move {
  100% {
    transform: translate(-50%, 0);
  }
}
/* 插槽内容样式 */
.slot-content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>