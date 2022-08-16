<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-08-16 22:03:29
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-08-16 22:13:15
 * @FilePath: \vue_demo\src\views\custom\textOverFlow.vue
 * @Description: 
-->
<template>
  <div class="contentBox">
    <elToop
      content="苏苏就是小苏苏哇哈哈哈哈哈哈哈哈哈哈哈哈哈好你好"
      className="info-text text_ellipsis"
    />
    <elToop content="苏苏就是小苏苏" className="info-text text_ellipsis" />
  </div>
</template>

<script>
import elToop from "./components/elToop.vue";
export default {
  components: {
    elToop,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.info-text {
  max-width: 200px;
  color: brown;
  font-size: 20px;
  font-family: "AlibabaPuHuiTiH";
}
</style>
