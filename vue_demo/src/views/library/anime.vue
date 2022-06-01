<!--
 * @Author: 胡苏珍 1628469970@qq.com
 * @Date: 2022-06-01 17:35:43
 * @LastEditors: 胡苏珍 1628469970@qq.com
 * @LastEditTime: 2022-06-01 17:59:38
 * @FilePath: \vue_demo\src\views\library\anime.vue
 * @Description:anime.js

-->
<template>
  <div class="contentBox">
    <div>
      anime.js 是一款功能强大的Javascript 动画库插件。anime.js 可以和CSS3
      属性，SVG，DOM 元素和JS
      对象一起工作，制作出各种高性能，平滑过渡的动画效果。 官网：<a
        href="https://www.animejs.cn/start/"
        target="_blank"
      >
        https://www.animejs.cn/start/</a
      >
    </div>
    <div>
      CodePen：<a href="https://codepen.io/collection/XLebem/" target="_blank">
        https://codepen.io/collection/XLebem/</a
      >
    </div>
    <Divider />
    <div class="container">
      <div class="stagger-visualizer"></div>
    </div>
  </div>
</template>

<script>
//npm install animejs
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #222;
}

.stagger-visualizer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 450px;
}

.stagger-visualizer div {
  width: 64px;
  height: 128px;
  border: 1px solid #373535;
  background-color: pink;
}
</style>