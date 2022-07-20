<!--
 * @Author: 胡苏珍 1628469970@qq.com
 * @Description: table列表
-->
<template>
  <el-table :data="data" style="width: 100%" height="100%" stripe v-loading="loading">
    <template v-for="(item, index) in list">
      <template v-if="item.type">
        <el-table-column :type="item.type" :width="item.width" :key="index" :fixed="item.fixed" :label="item.label" />
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
      list: [
        // {
        //   type: "selection",
        // },
        // {
        //   type: "index",
        //   label: "序号",
        //   width: "50",
        //   fixed: "left",
        // },
        // {
        //   label: "1",
        //   prop: "name",
        //   sortable: true,
        //   showtip: true,
        //   align: "left",
        // },
        // {
        //   label: "1",
        //   prop: "code",
        //   slot: "sususu",
        // },
      ],
    };
  },
};
</script>

<style></style>
