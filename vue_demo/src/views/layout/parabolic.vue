<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-10-01 22:00:39
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-10-01 22:06:30
 * @FilePath: \vue_demo\src\views\layout\parabolic.vue
 * @Description: 抛物线利用 ease-in 和 ease-out 的速度差达到抛物线效果 
 * 参考：https://qishaoxuan.github.io/css_tricks/parabola/#css-%E5%AE%9E%E7%8E%B0
-->
<template>
  <div class="contentBox">
    <div class="parabola-container" @click="containerClick">
      <div
        class="parabola-item"
        ref="parabolaItem"
        :class="{ active: isActive }"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    containerClick(e) {
      let rect = e.target.getBoundingClientRect();
      let offsetX = e.pageX - rect.left - window.pageXOffset;
      let offsetY = e.pageY - rect.top - window.pageYOffset;

      this.$refs["parabolaItem"].style.setProperty("--left", `${offsetX}px`);
      this.$refs["parabolaItem"].style.setProperty("--top", `${offsetY}px`);

      this.isActive = true;
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
    --left: 0;
    --top: calc(100% - 30px);

    transition: left 0.5s ease-in, top 0.5s ease-out;
    &.active {
      left: var(--left);
      top: var(--top);
    }
  }
}
</style>
