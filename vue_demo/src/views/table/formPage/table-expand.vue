<template>
  <div>
    <template v-if="row.list && row.list.length > 0">
      <Row class="expand-row flex-row">
        <P class="item_title">时间</P>
        <P class="item_title">位置</P>
      </Row>
      <Row
        class="expand-row flex-row"
        v-for="(item, index) in row.list"
        :key="index"
      >
        <P class="item_title">{{ item.dataTime }}</P>
        <P class="item_title"><span>{{ item.stationName }}巷道</span>{{
            item.stationDirection == 2
              ? parseInt(item.tunnelLoc) + parseInt(item.stationDistance)
              : parseInt(item.tunnelLoc) - parseInt(item.stationDistance)
          }}米</P>
      </Row>
    </template>
    <template v-else>
      <p style="text-align: center">暂无轨迹信息</p>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    row: Object,
  },
  watch: {
    // row: {
    //   immediate: true,
    //   deep: true,
    //   handler(val) {},
    // },
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
.expand-row {
  margin-bottom: 16px;
}
.item_title {
  width: 350px;
  text-align: center;
}
</style>