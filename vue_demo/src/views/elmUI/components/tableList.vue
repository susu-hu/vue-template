<!--
 * @Description: table列表
-->
<template>
  <el-table :data="data" style="width: 100%" stripe border v-loading="loading" @selection-change="selectChange" :row-key="rowKey">
    <template v-for="(item, index) in list">
      <template v-if="item.type">
        <el-table-column :type="item.type" :width="item.width" :key="index" :fixed="item.fixed" :label="item.label" :reserve-selection="item.reserveSel" />
      </template>
      <template v-else>
        <el-table-column :width="item.width" :key="index" :fixed="item.fixed" :sortable="item.sortable" :show-overflow-tooltip="item.showtip" :label="item.label" :prop="item.prop">
          <template slot-scope="{ row, $index }" v-if="!item.type">
            <!-- 自定义插槽 -->
            <slot v-if="item.slot" :name="item.slot" :row="row" :index="$index"></slot>
            <!-- 空数据--显示 -->
            <span v-else>{{ row[item.prop] }}</span>
          </template>
        </el-table-column>
      </template>
    </template>
  </el-table>
</template>

<script>
export default {
  name: "dataTable",
  watch: {
    columns: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.list = val;
        console.log("table", val);
      },
    },
  },
  props: {
    rowKey: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: [],
    };
  },
  methods: {
    selectChange(e) {
      this.$emit("selection-change", e);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-table__header tr th {
  text-align: center;
  color: #000;
  background: #f4f4f4;
}

/deep/ .el-table__body .el-table__row td {
  text-align: center;
}
</style>
