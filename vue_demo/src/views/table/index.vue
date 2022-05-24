<template>
  <div class="contentBox">
    <Card>
      <p slot="title">分页多选数据</p>
      <template slot="extra">
        <Button type="primary" icon="md-sync" @click="reset()" class="mr10"
          >刷新</Button
        >
        <Button type="primary" @click="batch">批量操作</Button>
      </template>
      <Table
        border
        stripe
        :columns="columns"
        :data="tbList || []"
        @on-select-all="selectAll"
        @on-select-all-cancel="cancelAll"
        @on-select="tableSelectRow"
        @on-select-cancel="tableSelectCancelRow"
      >
        <template slot-scope="{ index }" slot="index">
          {{ (params.page - 1) * params.pageSize + index + 1 }}
        </template>
        <template slot-scope="{ row }" slot="iconCover">
          <Avatar shape="square" size="large" :src="row.icon_cover" />
        </template>
        <template slot-scope="{ row }" slot="action">
          <a href="javascript:;" @click="del(row)"> 删除</a>
        </template>
      </Table>
      <div>
        <Pager
          class="public-page"
          :style="{ marginTop: '20px' }"
          :total="total"
          :current.sync="params.page"
          :page-size-opts="[10, 20, 30, 100]"
          :page-size="params.pageSize"
          show-sizer
          show-total
          prev-text="Previous"
          next-text="Next"
          show-elevator
          @on-change="(val) => pageNumChange(val, 'params')"
          @on-page-size-change="(val) => pageSizeChange(val, 'params')"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import columnTable from "./column";
export default {
  name: "tableList",
  data() {
    // const columns = [
    //   {
    //     type: "selection",
    //     width: 60,
    //     align: "center",
    //     fixed: "left",
    //   },
    //   {
    //     title: "序号",
    //     slot: "index",
    //     width: 80,
    //     align: "center",
    //   },
    //   {
    //     title: "ID",
    //     key: "id",
    //     align: "center",
    //   },
    //   {
    //     title: "名称",
    //     key: "name",
    //     align: "center",
    //     ellipsis: true,
    //   },
    //   {
    //     title: "年龄",
    //     key: "age",
    //     align: "center",
    //   },
    //   {
    //     title: "创建时间",
    //     key: "dateTime",
    //     align: "center",
    //   },
    //   {
    //     title: "头像",
    //     slot: "iconCover",
    //     align: "center",
    //   },
    //   {
    //     title: "查看",
    //     render: (h, params) => {
    //       const { row } = params;
    //       return h(
    //         "a",
    //         {
    //           style: {
    //             marginRight: "5px",
    //           },
    //           on: {
    //             click: () => {
    //               this.handleOpenDeatil(row.name);
    //             },
    //           },
    //         },
    //         "查看详情"
    //       );
    //     },
    //   },
    //   {
    //     title: "操作",
    //     slot: "action",
    //     align: "center",
    //   },
    // ];
    return {
      columns: columnTable(this),
      params: {
        page: 1,
        pageSize: 10,
      },
      tbList: [],
      total: 0,
      checkedList: [],
      susu: "苏苏小苏苏",
    };
  },
  filters: {},
  created() {
    // this.columns = columnTable(this);
    console.log("--------created");
    this.getList();
  },
  activated() {
    console.log("--------activated");
  },
  destroyed() {},
  methods: {
    handleOpenDeatil(e, o) {
      console.log(o);
      this.$Message.info(e + o);
    },
    async getList() {
      // this.$Spin.show();
      this.$showLoading.show();
      // this.$loading.show();
      const { code, data, total } = await this.$api.tableList2(
        this.params,
        false,
        "加载中"
      );
      if (code == "200") {
        setTimeout(() => {
          this.$showLoading.hide();
        }, 400);
        this.$ls.set("susu", "小苏苏");
        // 设置有效期
        this.$ls.set("susu", "小苏苏", 60 * 60 * 1000); //有效1小时
        let a = this.$ls.get("susu");
        console.log(a);
        this.$ls.get("susu", "大苏苏"); // 如果没有设置susu返回默认值大苏苏
        this.$ls.remove("susu"); // 移除

        this.tbList = data;
        this.total = total;
        this.tbList.forEach((item, index) => {
          if (index % 2 == 0) {
            this.$set(this.tbList[index], "_disabled", false);
          } else {
            this.$set(this.tbList[index], "_disabled", true);
          }
        });
        this.selectedData();
      }
    },
    pageNumChange(page, type) {
      if (type == "params") {
        this[type].page = page;
        this.getList();
      }
    },
    pageSizeChange(pageSize, type) {
      this[type].pageSize = pageSize;
      if (type == "params") {
        if (this[type].page == 1) {
          this.getList();
        } else {
          this[type].page = 1;
        }
      }
    },
    reset() {
      this.params.page = 1;
      this.params.pageSize = 10;
      this.checkedList = [];
      this.getList();
    },
    tableSelectRow(selection, row) {
      if (!this.checkedList.includes(row.id)) {
        this.checkedList.push(row.id);
      }
    },
    tableSelectCancelRow(selection, row) {
      var index = this.checkedList.indexOf(row.id);
      if (index != -1) {
        this.checkedList.splice(index, 1);
      }
    },
    selectAll() {
      this.tbList.forEach((item) => {
        if (item._disabled == false) {
          this.tableSelectRow(null, item);
        }
      });
    },
    cancelAll() {
      this.tbList.forEach((item) => {
        if (item._disabled == false) {
          this.tableSelectCancelRow(null, item);
        }
      });
    },
    selectedData() {
      if (this.checkedList.length > 0) {
        this.tbList.forEach((item, index) => {
          if (this.checkedList.includes(item.id)) {
            this.$set(this.tbList[index], "_checked", true);
          }
        });
      }
    },
    batch() {
      if (this.checkedList.length == 0) {
        return this.$Message.error("尚未选择呢");
      }
      console.log(this.checkedList);
    },
    del(e) {
      this.$Modal.confirm({
        title: "提示",
        content: `确认删除${e.name}`,
        okText: "确定",
        cancelText: "取消",
        onOk: async () => {},
      });
    },
  },
};
</script>

<style scoped>
.contentBox {
  width: 100%;
  height: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
}
</style>
