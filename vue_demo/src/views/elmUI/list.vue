
<template>
  <div class="contentBox">
    <serarchHead :data="list.list" ref="SHEAD" />
    <tableList :columns="list.columnsList" :data="cvsData" :loading="loading">
      <template slot-scope="{row}" slot="btn">
        <el-button type="primary" size="mini" @click="handleDetail(row)">查看</el-button>
      </template>
    </tableList>
  </div>
</template>

<script>
import serarchHead from "./components/searchHead.vue";
import tableList from "./components/tableList.vue";
export default {
  components: {
    serarchHead,
    tableList,
  },
  data() {
    return {
      cvsData: [],
      options: {
        disabledDate: (date) => {
          return date && date.valueOf() > Date.now();
        },
      },
      list: {
        name: "测试list",
        type: 9,
        http: "getListData",
        list: [
          {
            type: "select",
            label: "选择",
            params: "code",
            list: [],
            listValue: "code",
            listLabel: "name",
          },
          {
            type: "time",
            label: "开始时间",
            params: "startTime",
            options: this.options,
            default: this.tools.getFormatTime().todayStart,
          },
          {
            type: "time",
            label: "结束时间",
            params: "endTime",
            options: this.options,
            default: this.tools.getFormatTime().todayEnd,
          },
        ],
        columnsList: [
          {
            type: "index",
            label: "序号",
            width: "50",
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>