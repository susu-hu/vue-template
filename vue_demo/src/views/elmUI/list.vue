<template>
  <div class="contentBox">
    <div class="flex-row mb20">
      <serarchHead :data="headList" ref="SHEAD" />
      <el-button type="primary" icon="el-icon-search" class="e-btn">查询</el-button>
    </div>
    <tableList :columns="columnsList" :data="data" :loading="loading" @selection-change="selectChange" rowKey="id">
      <template slot-scope="{row}" slot="btn">
        <el-button type="primary" size="mini" @click="handleDetail(row)">查看</el-button>
      </template>
    </tableList>
    <el-pagination class="e-page" background @size-change="(val)=>handleChange(val,'pageSize')" @current-change="(val)=>handleChange(val,'page')" :current-page.sync="params.page" :page-size="params.pageSize" :page-sizes="[10, 20]" layout="total,sizes,prev, pager, next, jumper" :total="total">
    </el-pagination>
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
      data: [],
      total: 0,
      params: {
        page: 1,
        pageSize: 10,
      },
      options: {
        disabledDate: (date) => {
          return date && date.valueOf() > Date.now();
        },
      },
      headList: [
        {
          type: "select",
          label: "选择",
          params: "code",
          list: [
            {
              code: 1,
              name: "选项一",
            },
          ],
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
          type: "selection",
          fixed: "left",
          reserveSel: true,
        },
        {
          type: "index",
          label: "序号",
          width: "50",
          fixed: "left",
        },
        {
          label: "编号",
          prop: "id",
          align: "center",
        },
        {
          label: "测试",
          prop: "stationName",
          sortable: true,
          showtip: true,
          align: "center",
        },
        {
          label: "操作",
          slot: "btn",
        },
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const { code, data, total } = await this.$api.tList(
        this.params,
        true,
        "加载中"
      );
      if (code == 200) {
        this.data = data;
        this.total = total;
      }
    },
    handleChange(e, type) {
      this.params[type] = e;
      this.getList();
    },
    selectChange(e) {
      console.log(e);
    },
    handleDetail() {},
  },
};
</script>

<style scoped lang="less">
.e-page {
  margin-top: 20px;
  text-align: right;
}
.e-btn {
  box-shadow: 0 10px 30px rgb(255, 194, 204, 0.4);
  // rgb(45 140 240,.4)
}
</style>