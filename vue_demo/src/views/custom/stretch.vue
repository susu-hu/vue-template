<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-07-26 15:14:59
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-07-26 17:59:53
 * @FilePath: \vue_demo\src\views\custom\stretch.vue
 * @Description: 
-->
<template>
  <div class="container" id="content_box">
    <div class="tab">左侧Tab</div>
    <div class="menu" ref="menu">
      左侧菜单
      <div class="menu-resize" ref="menuResize"></div>
    </div>
    <div class="content">
      中心区域
      <div class="opera" ref="opera">
        <div class="opera-resize" ref="operaResize"></div>
        操作区域
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.stretch();
    });
  },
  methods: {
    stretch() {},
  },
};
</script>
