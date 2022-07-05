<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
  <div>
    <template v-if="row.list && row.list.length > 0">
      <Row class="expand-row" v-for="(item, index) in row.list" :key="index">
        <p>{{ item.name }}</p>
      </Row>
    </template>
    <template v-else><p>暂无数据</p></template>
  </div>
</template>
<script>
export default {
  props: {
    row: Object,
  },
};
</script>
