<template>
  <section class="main">
    <div class="container">
      <Table
        stripe
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
  </section>
</template>
 
<script>
/* eslint-disable */
import expandRow from "./components/table-expand1.vue";
export default {
  components: { expandRow },
  data() {
    return {
      tableData: [],
      //行数据标题
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
          title: "线路名称",
          key: "lineName",
        },
        {
          title: "线路方向",
          key: "lineDirection",
        },
        {
          title: "始发站",
          key: "startStation",
        },
        {
          title: "经停站",
          key: "_text",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              {
                props: { row: params.row },
                style: { color: "tomato" },
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
        {
          title: "终点站",
          key: "endStation",
        },
        {
          title: "线路类型",
          key: "lineType",
        },
        {
          title: "运营里程",
          key: "mileage",
        },
        {
          title: "线路运营单位",
          key: "operateDepart",
        },
        {
          title: "票价",
          key: "price",
        },
      ],

      // 数据源
      tableData1: [
        {
          id: 12,
          lineName: "公主坟线",
          lineDirection: "机场-市区",
          startStation: "T1",
          stopStation: "all",
          endStation: "公主坟",
          lineType: "市区",
          mileage: "100Km",
          operateDepart: "PEK运营一部",
          price: "20元",
          stopStation1: "东直门",
          stopStation2: "西直门",
          stopStation3: "复兴门",
        },
        {
          id: 13,
          lineName: "公主坟线",
          lineDirection: "机场-市区",
          startStation: "T1",
          stopStation: "all",
          endStation: "公主坟",
          lineType: "市区",
          mileage: "100Km",
          operateDepart: "PEK运营一部",
          price: "20元",
          stopStation1: "东直门",
          stopStation2: "西直门",
          stopStation3: "复兴门",
        },
      ],
    };
  },

  mounted() {
    // 给tableData1  增加_expanded/_text
    this.tableData = this.tableData1.map((item) => {
      item._expanded = false;
      item._text = "查看所有经停站";
      return item;
    });
    console.log(this.tableData);
  },
  methods: {
    onSelect() {},
    selectionClick() {},
    //点击展开收起
    expand(item, index) {
      console.log(item, index);
      if (item._expanded) {
        // this.tableData.splice()
        // this.tableData.push()
        this.tableData.sort(); //更新视图
        this.tableData[index]._expanded = false;
        this.tableData[index]._text = "查看所有经停站";
      } else {
        this.tableData.splice();
        this.tableData[index]._expanded = true;
        this.tableData[index]._text = "收起所有经停站";
      }
    },

    // 展开原生事件  点击左侧展收起
    onExpand(row, status) {
      // console.log(row,status);
      if (status) {
        this.tableData1.splice();
        this.tableData1.filter((item, index) => {
          if (item.id == row.id) {
            item._expanded = true; //展开选中的行
            // this.$set(item, "_text", "收起所有经停站")
            item._text = "收起所有经停站";
          } else {
            item._expanded = false; //其他行关闭
          }
          return item;
        });
        this.tableData = this.tableData1;
      } else {
        this.tableData.splice();
        this.tableData.map((item, index) => {
          if (item.id == row.id) {
            item._expanded = false; //展开选中的行
            // this.$set(item, "_text", "查看所有经停站")
            item._text = "查看所有经停站";
          } else {
            item._expanded = false; //其他行关闭
          }
          return item;
        });
      }
    },
  },
};
</script>
