<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-10-01 22:00:39
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-10-01 22:29:42
 * @FilePath: \vue_demo\src\views\layout\parabolicJs.vue
 * @Description:抛物线函数
 * 参考：https://qishaoxuan.github.io/css_tricks/parabola/#js-%E5%AE%9E%E7%8E%B0
-->
<template>
  <div class="contentBox">
    <div class="parabola-container" @click="containerClick">
      <div class="parabola-item" ref="parabolaItem"></div>
      <div class="click-point" ref="point"></div>
    </div>
  </div>
</template>

<script>
import funParabola from "./parabolic.js";
export default {
  name: "parabolaJs",
  data() {
    return {
      parabola: null,
    };
  },
  methods: {
    containerClick(e) {
      let rect = e.target.getBoundingClientRect();
      let offsetX = e.pageX - rect.left - window.pageXOffset;
      let offsetY = e.pageY - rect.top - window.pageYOffset;

      this.$refs["point"].style.setProperty("left", `${offsetX}px`);
      this.$refs["point"].style.setProperty("top", `${offsetY}px`);

      this.parabola = funParabola(
        this.$refs["parabolaItem"],
        this.$refs["point"],
        {
          speed: 166.67 * 3,
          endScale: 0.5,
        }
      ).init();
    },
  },
};
</script>
<style scoped lang="scss">
.parabola-container {
  position: relative;
  height: 400px;
  border: 1px solid #eee;
  .parabola-item {
    width: 30px;
    height: 30px;
    background: pink;
    position: absolute;
    left: 0;
    top: calc(100% - 30px);
  }
  .click-point {
    width: 2px;
    height: 2px;
    position: absolute;
    left: 0;
    top: 0;
    background: #00adb5;
  }
}
</style>
