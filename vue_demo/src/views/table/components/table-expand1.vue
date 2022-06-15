
<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="8">
        <span class="expand-key">经停站1: </span>
        <span class="expand-value">{{ row.stopStation1 }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">经停站2: </span>
        <span class="expand-value">{{ row.stopStation1 }}</span>
      </Col>
      <Col span="8">
        <span class="expand-key">经停站3: </span>
        <span class="expand-value">{{ row.stopStation1 }}</span>
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