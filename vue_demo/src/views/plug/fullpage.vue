<!--
 * @Author: 胡苏珍 1628469970@qq.com
 * @Date: 2022-06-01 17:27:13
 * @LastEditors: 胡苏珍 1628469970@qq.com
 * @LastEditTime: 2022-06-08 10:26:25
 * @FilePath: \vue_demo\src\views\plug\fullpage.vue
 * @Description: 全屏滚动
-->
<template>
  <div class="contentBox">
    <full-page :options="options" id="fullpage" ref="fullpage">
      <div class="section">
        <h3>vue-fullpage.js</h3>
      </div>
      <div class="section">
        <div class="slide">
          <h3>Slide 2.1</h3>
        </div>
        <div class="slide">
          <h3>Slide 2.2</h3>
        </div>
        <div class="slide">
          <h3>Slide 2.3</h3>
        </div>
      </div>
      <div class="section">
        <h3>Section 3</h3>
      </div>
    </full-page>
  </div>
</template>

<script>
// npm install --save vue-fullpage.js
export default {
  name: "fullPage11",
  data() {
    return {
      options: {
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
        afterLoad: this.afterLoad,
        navigation: true,
        anchors: ["page1", "page2", "page3"],
        sectionsColor: [
          "#41b883",
          "#ff5f45",
          "#0798ec",
          "#fec401",
          "#1bcee6",
          "#ee1a59",
          "#2c3e4f",
          "#ba5be9",
          "#b4b8ab",
        ],
      },
    };
  },

  methods: {
    afterLoad: function (origin, destination, direction) {
      console.log("After load....");
      console.log(origin, destination, direction);
    },
  },
};
</script>

<style>
</style>