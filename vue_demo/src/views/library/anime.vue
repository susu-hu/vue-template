<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-06-01 17:35:43
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-06-02 16:23:40
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
      <div class="a">
        <div></div>
      </div>
      <div class="b">
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import anime from "animejs/lib/anime.js";
//npm install animejs --save
export default {
  data() {
    return {};
  },
  mounted() {
    anime({
      targets: [".a", ".b"],
      translateX: "-300px",
      rotate: 360,
      borderRadius: 100,
      duration: 2000 * 2,
      loop: true,
      easing: "linear",
    });
  },
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #222;
}

.a,
.b {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  padding: 10px 0 0 10px;
  div {
    width: 30px;
    height: 30px;
    border-radius: 20px;
    background-color: #fff;
  }
}
.a {
  background-color: #ffc0cb;
}
.b {
  background-color: #e27815;
}
</style>