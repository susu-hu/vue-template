<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-05-15 21:41:52
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-05-15 22:18:20
 * @FilePath: \vue_demo\src\views\base\keepAlive\a.vue
 * @Description: B
-->
<template>
  <div>
    <p class="mb20">这是B页面</p>
    <Input
      v-model="remark"
      :maxlength="100"
      show-word-limit
      clearable
      type="text"
      placeholder="请输入备注"
      style="width: 300px"
    />
  </div>
</template>

<script>
export default {
  name: "B",
  data() {
    return {
      remark: "",
    };
  },
};
</script>

<style>
</style>