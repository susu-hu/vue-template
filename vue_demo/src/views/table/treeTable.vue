<template>
  <div class="contentBox">
    <Table
      stripe
      border
      highlight-row
      :columns="tableColumns1"
      :data="tableData"
      size="small"
      ref="table"
      @on-expand="onExpand"
      @on-select="onSelect"
      @on-selection-change="selectionClick"
    >
    </Table>
  </div>
</template>
 
<script>
/* eslint-disable */
import expandRow from "./components/table-expand1.vue";
export default {
  components: { expandRow },
  data() {
    return {
      tableData: [],
      tableColumns1: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: { row: params.row },
            });
          },
        },
        {
          title: "参数1",
          key: "data1",
        },
        {
          title: "参数2",
          key: "data2",
        },
        {
          title: "参数3",
          key: "data3",
        },
        {
          title: "参数4",
          key: "_text",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                props: { row: params.row },
                style: { color: "pink" },
                on: {
                  click: () => {
                    this.expand(params.row, params.index);
                  },
                },
              },
              params.row._text
            );
          },
        },
      ],

      // 数据源
      tableData1: [
        {
          id: 12,
          data1: "苏苏测试1",
          data2: "机场-苏苏测试1",
          data3: "苏苏测试1",
          data: "这是展开参数1",
        },
        {
          id: 13,
          data1: "苏苏测试2",
          data2: "苏苏测试2",
          data3: "苏苏测试2",
          data: "这是展开参数2",
        },
      ],
    };
  },
  created() {
    this.tableData = this.tableData1.map((item) => {
      item._expanded = false;
      item._text = "查看";
      return item;
    });
  },
  methods: {
    onSelect() {},
    selectionClick() {},
    expand(item, index) {
      console.log(item, index);
      if (item._expanded) {
        this.tableData.sort(); //更新视图
        this.tableData[index]._expanded = false;
        this.tableData[index]._text = "查看";
      } else {
        this.tableData.splice();
        this.tableData[index]._expanded = true;
        this.tableData[index]._text = "收起";
      }
    },

    // 展开原生事件  点击左侧展收起
    onExpand(row, status) {
      if (status) {
        this.tableData1.splice();
        this.tableData1.filter((item, index) => {
          if (item.id == row.id) {
            item._expanded = true;
            item._text = "收起";
          } else {
            item._expanded = false;
          }
          return item;
        });
        this.tableData = this.tableData1;
      } else {
        this.tableData.splice();
        this.tableData.map((item, index) => {
          if (item.id == row.id) {
            item._expanded = false;
            item._text = "查看";
          } else {
            item._expanded = false;
          }
          return item;
        });
      }
    },
  },
};
</script>
