<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-06-16 21:52:04
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-07-05 20:56:51
 * @FilePath: \vue_demo\src\views\table\components\table-expand1.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">展开1: </span>
        <span class="expand-value">{{ row.data }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">展开2: </span>
        <span class="expand-value">{{ row.data }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">展开3: </span>
        <span class="expand-value">{{ row.data }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  props: {
    row: Object,
  },
};
</script>