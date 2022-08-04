<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-08-04 23:00:30
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-08-04 23:39:36
 * @FilePath: \vue_demo\src\views\dataCharts\components\echarts\graph.vue
 * @Description: 关系图
-->
<template>
  <div id="graCharts" ref="graCharts" class="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
var erd = elementResizeDetectorMaker();
export default {
  name: "pie",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler: function (val) {
        console.log(val);
        this.$nextTick(() => {
          if (this.charts == null) {
            this.charts = echarts.init(document.getElementById("graCharts"));
          }
          setTimeout(() => {
            this.initData();
          }, 500);
        });
      },
    },
  },
  data() {
    return {
      charts: null,
      list: [],
    };
  },
  mounted() {
    erd.listenTo(document.getElementById("graCharts"), this.handleWindowResize);
  },
  beforeDestroy() {
    erd.uninstall(this.$refs.graCharts);
  },
  methods: {
    handleWindowResize() {
      if (!this.charts) return;
      this.$nextTick(() => {
        this.charts.resize();
        this.initData();
      });
    },
    initData() {
      let colorList = [
        [
          "#ff7f50",
          "#87cefa",
          "#da70d6",
          "#32cd32",
          "#6495ed",
          "#ff69b4",
          "#ba55d3",
          "#cd5c5c",
          "#ffa500",
          "#40e0d0",
          "#1e90ff",
          "#ff6347",
          "#7b68ee",
          "#d0648a",
          "#ffd700",
          "#6b8e23",
          "#4ea397",
          "#3cb371",
          "#b8860b",
          "#7bd9a5",
        ],
        [
          "#ff7f50",
          "#87cefa",
          "#da70d6",
          "#32cd32",
          "#6495ed",
          "#ff69b4",
          "#ba55d3",
          "#cd5c5c",
          "#ffa500",
          "#40e0d0",
          "#1e90ff",
          "#ff6347",
          "#7b68ee",
          "#00fa9a",
          "#ffd700",
          "#6b8e23",
          "#ff00ff",
          "#3cb371",
          "#b8860b",
          "#30e0e0",
        ],
        [
          "#929fff",
          "#9de0ff",
          "#ffa897",
          "#af87fe",
          "#7dc3fe",
          "#bb60b2",
          "#433e7c",
          "#f47a75",
          "#009db2",
          "#024b51",
          "#0780cf",
          "#765005",
          "#e75840",
          "#26ccd8",
          "#3685fe",
          "#9977ef",
          "#f5616f",
          "#f7b13f",
          "#f9e264",
          "#50c48f",
        ],
      ][2];
      let options = {
        // backgroundColor: "#062538",
        tooltip: {},
        animationDurationUpdate: function (idx) {
          // 越往后的数据延迟越大
          return idx * 100;
        },
        animationEasingUpdate: "bounceIn",
        color: ["#fff", "#fff", "#fff"],
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 240,
              edgeLength: 10,
            },
            roam: true,
            label: {
              normal: {
                show: true,
              },
            },
            data: [
              {
                name: "苏苏就是小苏苏",
                value: 2373,
                symbolSize: 48,
                draggable: true,
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: colorList[0],
                    color: colorList[0],
                  },
                },
              },
              {
                name: "实现折线面积图",
                value: 4730,
                symbolSize: 33,
                draggable: true,
                itemStyle: {
                  normal: {
                    shadowBlur: 100,
                    shadowColor: colorList[4],
                    color: colorList[4],
                  },
                },
              },

              {
                name: "引导用户添加小程序动画页",
                value: 926,
                symbolSize: 55,
                draggable: true,
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: colorList[6],
                    color: colorList[6],
                  },
                },
              },
              {
                name: "不定长菜单项轮播滑动",
                value: 4536,
                symbolSize: 44,
                draggable: true,
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: colorList[7],
                    color: colorList[7],
                  },
                },
              },
              {
                name: "tab选中（特殊圆角）样式",
                value: 750,
                symbolSize: 47,
                draggable: true,
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: colorList[8],
                    color: colorList[8],
                  },
                },
              },
              {
                name: "实现城市索引选择+搜索",
                value: 493,
                symbolSize: 82,
                draggable: true,
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: colorList[9],
                    color: colorList[9],
                  },
                },
              },
              {
                name: "弹出菜单动画",
                value: 385,
                symbolSize: 59,
                draggable: true,
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: colorList[10],
                    color: colorList[10],
                  },
                },
              },
              {
                name: "单选跳跃选择动画",
                value: 4960,
                symbolSize: 90,
                draggable: true,
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: colorList[11],
                    color: colorList[11],
                  },
                },
              },

              {
                name: "抽奖走马灯+圆点闪烁",
                value: 339,
                symbolSize: 68,
                draggable: true,
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: colorList[14],
                    color: colorList[14],
                  },
                },
              },

              {
                name: "堆叠式轮播",
                value: 27000,
                symbolSize: 80,
                draggable: true,
                itemStyle: {
                  normal: {
                    shadowBlur: 10,
                    shadowColor: colorList[16],
                    color: colorList[16],
                  },
                },
              },
            ],
          },
        ],
      };
      this.charts.setOption(options);
    },
  },
};
</script>

<style scoped lang="less">
.chart {
  width: 100%;
  height: 330px;
}
</style>
