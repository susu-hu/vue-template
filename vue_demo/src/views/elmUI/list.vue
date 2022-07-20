<template>
  <div class="contentBox">
    <!-- <serarchHead :data="list.list" ref="SHEAD" /> -->
    <!-- <tableList :columns="columnsList" :data="cvsData" :loading="loading">
      <template slot-scope="{row}" slot="btn">
        <el-button type="primary" size="mini" @click="handleDetail(row)">查看</el-button>
      </template>
    </tableList> -->
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
      loading: false,
      cvsData: [],
      options: {
        disabledDate: (date) => {
          return date && date.valueOf() > Date.now();
        },
      },
      list: {},
      columnsList: [
        {
          type: "selection",
          fixed: "left",
        },
        {
          type: "index",
          label: "序号",
          width: "50",
          fixed: "left",
        },
        {
          label: "测试",
          prop: "name",
          sortable: true,
          showtip: true,
          align: "left",
        },
        {
          label: "操作",
          prop: "code",
          slot: "btn",
        },
      ],
    };
  },
  created() {
    // this.list = {
    //   name: "测试list",
    //   type: 1,
    //   http: "getListData",
    //   list: [
    //     {
    //       type: "select",
    //       label: "选择",
    //       params: "code",
    //       list: [
    //         {
    //           code: 1,
    //           name: "选项一",
    //         },
    //       ],
    //       listValue: "code",
    //       listLabel: "name",
    //     },
    //     {
    //       type: "time",
    //       label: "开始时间",
    //       params: "startTime",
    //       options: this.options,
    //       default: this.tools.getFormatTime().todayStart,
    //     },
    //     {
    //       type: "time",
    //       label: "结束时间",
    //       params: "endTime",
    //       options: this.options,
    //       default: this.tools.getFormatTime().todayEnd,
    //     },
    //   ],
    //   columnsList: [
    //     {
    //       type: "selection",
    //       fixed: "left",
    //     },
    //     {
    //       type: "index",
    //       label: "序号",
    //       width: "50",
    //       fixed: "left",
    //     },
    //     {
    //       label: "测试",
    //       prop: "name",
    //       sortable: true,
    //       showtip: true,
    //       align: "left",
    //     },
    //     {
    //       label: "操作",
    //       prop: "code",
    //       slot: "btn",
    //     },
    //   ],
    // };
  },
  methods: {
    handleDetail() {},
  },
};
</script>

<style>
</style>