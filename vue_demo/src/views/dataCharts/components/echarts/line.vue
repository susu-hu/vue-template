<template>
  <div
    :id="'lineCharts' + byKey"
    class="chart"
    :ref="'lineCharts' + byKey"
  ></div>
</template>
<script>
import * as echarts from "echarts";
import { fitChartSize } from "@/utils/echartSize";
import elementResizeDetectorMaker from "element-resize-detector";
var erd = elementResizeDetectorMaker();
export default {
  name: "lineData",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    smooth: {
      type: Boolean,
      default: false,
    },
    byKey: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      charts: null,
      list: [],
    };
  },
  watch: {
    chartInfo: {
      handler(val) {
        this.chartInfos = val;
        this.$nextTick(() => {
          if (this.charts == null) {
            this.charts = echarts.init(
              document.getElementById("lineCharts" + this.byKey)
            );
          }
          this.initData();
        });
      },
      deep: true, // 深度监听
      immediate: true, // 初次监听即执行
    },
  },
  mounted() {
    erd.listenTo(
      document.getElementById("lineCharts" + this.byKey),
      this.handleWindowResize
    );
  },
  beforeDestroy() {
    erd.uninstall(this.$refs.lineCharts + this.byKey);
  },
  methods: {
    handleWindowResize() {
      if (!this.charts) return;
      this.$nextTick(() => {
        this.charts.resize();
      });
    },
    //掘进进尺图
    initData() {
      if (this.byKey == "one") {
        this.charts.setOption({
          color: ["#ec5d5f", "#f2cb58", "#64a0c8"],
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(0,0,0,.5)",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "rgba(0,0,0,.5)",
              },
            },
            textStyle: {
              color: "#fff",
              fontSize: fitChartSize(14),
            },
          },
          // legend: {
          //   icon: "rect",
          //   itemWidth: fitChartSize(12), // 设置宽度
          //   itemHeight: fitChartSize(6), // 设置高度
          //   data: ["计划掘进进尺", "实际掘进进尺"],
          //   right: fitChartSize(0),
          //   selectedMode: false,
          //   textStyle: {
          //     color: "#fff",
          //     fontSize: fitChartSize(14),
          //   },
          // },
          grid: {
            left: fitChartSize(10),
            top: fitChartSize(40),
            bottom: fitChartSize(10),
            containLabel: true,
          },
          xAxis: [
            {
              nameGap: 2, //坐标轴名称与轴线之间的距离。
              type: "category",
              data: [
                "0:00",
                "6:00",
                "8:00",
                "12:00",
                "16:00",
                "20:00",
                "24:00",
              ],
              boundaryGap: false, //从0开始
              axisLine: {
                //坐标轴线颜色
                rotate: 30, //坐标轴内容过长旋转
                interval: 0,
                lineStyle: {
                  color: "#636E7C",
                },
              },
            },
            // {
            //   name: "素数",
            //   nameGap: fitChartSize(3),
            //   nameTextStyle: {
            //     //坐标轴单位
            //     color: "rgba(255,255,255,.8)",
            //     fontSize: fitChartSize(14),
            //   },
            //   type: "category",
            //   axisLine: {
            //     //坐标轴线颜色
            //     lineStyle: {
            //       color: "#636E7C",
            //     },
            //   },
            //   axisLabel: {
            //     // showMaxLabel: true,
            //     color: "rgba(255,255,255,.8)", //坐标的字体颜色
            //   },
            //   axisTick: {
            //     //坐标轴刻度颜色
            //     show: false,
            //   },
            //   data: [
            //     ["2019-10-10", 900],
            //     ["2019-10-11", 560],
            //     ["2019-10-12", 750],
            //     ["2019-10-13", 580],
            //     ["2019-10-14", 250],
            //     ["2019-10-15", 300],
            //     ["2019-10-16", 450],
            //     ["2019-10-17", 300],
            //     ["2019-10-18", 100],
            //   ],
            // },
          ],
          yAxis: [
            {
              name: "人",
              type: "value",
              nameTextStyle: {
                //坐标轴单位
                color: "rgba(255,255,255,.89)",
                fontSize: fitChartSize(12),
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.25)",
                  type: "dashed",
                },
                //网格线颜色
              },
              axisTick: {
                //坐标轴刻度颜色
                show: true,
              },
              axisLine: {
                //坐标轴线颜色
                show: true,
                lineStyle: {
                  color: "#636E7C",
                },
              },
            },
            // {
            //   type: "value",
            //   name: "米",
            //   min: 0,
            //   max: function (value) {
            //     return Math.ceil(value.max / 5) * 5;
            //   },
            //   splitNumber: 5,
            //   nameTextStyle: {
            //     //坐标轴单位
            //     color: "rgba(255,255,255,.8)",
            //     fontSize: fitChartSize(14),
            //   },
            //   splitLine: {
            //     show: false,
            //     //网格线颜色
            //   },
            //   axisTick: {
            //     //坐标轴刻度颜色
            //     show: false,
            //   },
            //   axisLine: {
            //     //坐标轴线颜色
            //     show: true,
            //     lineStyle: {
            //       color: "#636E7C",
            //     },
            //   },
            //   axisLabel: {
            //     color: "rgba(255,255,255,.8)", //坐标的字体颜色
            //     formatter: function (num) {
            //       var numStr = num.toString();
            //       // 万以内直接返回
            //       if (numStr.length < 5) {
            //         return numStr;
            //       } else if (numStr.length == 11) {
            //         const number = num / 100000000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "亿";
            //       } else if (numStr.length == 10) {
            //         const number = num / 100000000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "亿";
            //       } else if (numStr.length == 9) {
            //         const number = num / 100000000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "亿";
            //       } else if (numStr.length == 8) {
            //         const number = num / 10000000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "千万";
            //       } else if (numStr.length == 7) {
            //         const number = num / 10000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "万";
            //       } else if (numStr.length == 6) {
            //         const number = num / 10000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "万";
            //       } else if (numStr.length == 5) {
            //         const number = num / 10000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "万";
            //       }
            //     },
            //   },
            // },
          ],
          series: [
            {
              name: "苏苏小苏苏",
              type: "line",
              smooth: this.smooth, //0.5,
              lineStyle: {
                // color: "#DC7828",
                width: fitChartSize(1.5),
                type: "solid",
                shadowOffsetX: 0, // 折线的X偏移
                shadowOffsetY: 3, // 折线的Y偏移
                shadowBlur: 4, // 折线模糊
                shadowColor: "rgba(220,120,40,0.95)", //折线颜色
              },
              showSymbol: false,
              itemStyle: {
                color: "#DC7828",
                // lineStyle: {
                //   color: "#1F824E", //改变折线颜色
                // },
              },
              areaStyle: {
                // // 颜色渐变函数 前四个参数分别表示四个位置依次为
                // 右下左上
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 1,
                    color: "rgba(220,120,40,0.3)",
                  },
                  {
                    offset: 0.74,
                    color: "rgba(220,120,40,0.26)",
                  },
                  {
                    offset: 0,
                    color: "rgba(220,120,40,0)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [222, 932, 66, 934, 111, 333, 444],
            },
            // {
            //   name: "实际掘进进尺",
            //   type: "line",
            //   smooth: true,
            //   lineStyle: {
            //     color: "#D07832",
            //     width: fitChartSize(1),
            //   },
            //   itemStyle: {
            //     color: "#D07832",
            //   },
            //   showSymbol: false,
            //   areaStyle: {
            //     color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            //       {
            //         offset: 1,
            //         color: "rgba(220, 120, 40,.3)",
            //       },
            //       {
            //         offset: 0,
            //         color: "rgba(220, 120, 40,0)",
            //       },
            //     ]),
            //   },
            //   emphasis: {
            //     focus: "series",
            //   },
            //   data: [
            //     ["2019-10-10", 900],
            //     ["2019-10-11", 560],
            //     ["2019-10-12", 750],
            //     ["2019-10-13", 580],
            //     ["2019-10-14", 250],
            //     ["2019-10-15", 300],
            //     ["2019-10-16", 450],
            //     ["2019-10-17", 300],
            //     ["2019-10-18", 100],
            //   ],
            // },
          ],
        });
      } else {
        this.charts.setOption({
          // 给echarts图设置背景色
          backgroundColor: "transparent",
          // backgroundColor: "linear-gradient(90deg, #03224E 0%, #011030 100%)",
          color: ["#ec5d5f", "#f2cb58", "#64a0c8"],
          tooltip: {
            trigger: "axis",
            backgroundColor: "rgba(0,0,0,.5)",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "rgba(0,0,0,.5)",
              },
            },
            textStyle: {
              color: "#fff",
              fontSize: fitChartSize(14),
            },
          },
          // legend: {
          //   icon: "rect",
          //   itemWidth: fitChartSize(12), // 设置宽度
          //   itemHeight: fitChartSize(6), // 设置高度
          //   data: ["计划掘进进尺", "实际掘进进尺"],
          //   right: fitChartSize(0),
          //   selectedMode: false,
          //   textStyle: {
          //     color: "#fff",
          //     fontSize: fitChartSize(14),
          //   },
          // },
          grid: {
            left: fitChartSize(10),
            top: fitChartSize(40),
            bottom: fitChartSize(10),
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: [
                "0:00",
                "6:00",
                "8:00",
                "12:00",
                "16:00",
                "20:00",
                "24:00",
              ],
              boundaryGap: false, //从0开始
              axisLine: {
                // symbol: "arrow",
                // 轴线两边的箭头。可以是字符串，表示两端使用同样的箭头；或者长度为 2 的字符串数组，分别表示两端的箭头。默认不显示箭头，
                // 即 'none'。两端都显示箭头可以设置为 'arrow'，只在末端显示箭头可以设置为 ['none', 'arrow']。
                onZero: true,
                //坐标轴线颜色
                rotate: 30, //坐标轴内容过长旋转
                interval: 0,
                lineStyle: {
                  color: "#636E7C",
                },
              },
            },
            // {
            //   name: "素数",
            //   nameGap: fitChartSize(3),
            //   nameTextStyle: {
            //     //坐标轴单位
            //     color: "rgba(255,255,255,.8)",
            //     fontSize: fitChartSize(14),
            //   },
            //   type: "category",
            //   axisLine: {
            //     //坐标轴线颜色
            //     lineStyle: {
            //       color: "#636E7C",
            //     },
            //   },
            //   axisLabel: {
            //     // showMaxLabel: true,
            //     color: "rgba(255,255,255,.8)", //坐标的字体颜色
            //   },
            //   axisTick: {
            //     //坐标轴刻度颜色
            //     show: false,
            //   },
            //   data: [
            //     ["2019-10-10", 900],
            //     ["2019-10-11", 560],
            //     ["2019-10-12", 750],
            //     ["2019-10-13", 580],
            //     ["2019-10-14", 250],
            //     ["2019-10-15", 300],
            //     ["2019-10-16", 450],
            //     ["2019-10-17", 300],
            //     ["2019-10-18", 100],
            //   ],
            // },
          ],
          yAxis: [
            {
              name: "人",
              type: "value",
              nameTextStyle: {
                //坐标轴单位
                color: "rgba(255,255,255,.89)",
                fontSize: fitChartSize(12),
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "rgba(255,255,255,.25)",
                  type: "dashed",
                },
                //网格线颜色
              },
              axisTick: {
                //坐标轴刻度颜色
                show: true,
              },
              axisLine: {
                //坐标轴线颜色
                show: true,
                lineStyle: {
                  color: "#636E7C",
                },
              },
            },
            // {
            //   type: "value",
            //   name: "米",
            //   min: 0,
            //   max: function (value) {
            //     return Math.ceil(value.max / 5) * 5;
            //   },
            //   splitNumber: 5,
            //   nameTextStyle: {
            //     //坐标轴单位
            //     color: "rgba(255,255,255,.8)",
            //     fontSize: fitChartSize(14),
            //   },
            //   splitLine: {
            //     show: false,
            //     //网格线颜色
            //   },
            //   axisTick: {
            //     //坐标轴刻度颜色
            //     show: false,
            //   },
            //   axisLine: {
            //     //坐标轴线颜色
            //     show: true,
            //     lineStyle: {
            //       color: "#636E7C",
            //     },
            //   },
            //   axisLabel: {
            //     color: "rgba(255,255,255,.8)", //坐标的字体颜色
            //     formatter: function (num) {
            //       var numStr = num.toString();
            //       // 万以内直接返回
            //       if (numStr.length < 5) {
            //         return numStr;
            //       } else if (numStr.length == 11) {
            //         const number = num / 100000000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "亿";
            //       } else if (numStr.length == 10) {
            //         const number = num / 100000000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "亿";
            //       } else if (numStr.length == 9) {
            //         const number = num / 100000000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "亿";
            //       } else if (numStr.length == 8) {
            //         const number = num / 10000000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "千万";
            //       } else if (numStr.length == 7) {
            //         const number = num / 10000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "万";
            //       } else if (numStr.length == 6) {
            //         const number = num / 10000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "万";
            //       } else if (numStr.length == 5) {
            //         const number = num / 10000;
            //         const realVal = parseFloat(number).toFixed(0);
            //         return realVal + "万";
            //       }
            //     },
            //   },
            // },
          ],
          series: [
            {
              name: "苏苏小苏苏222",
              type: "line",
              smooth: this.smooth, //可设置弧度，0-1
              lineStyle: {
                // color: "#DC7828",
                width: fitChartSize(1.5),
                // width: 2,
                type: "solid",
                shadowOffsetX: 0, // 折线的X偏移
                shadowOffsetY: 3, // 折线的Y偏移
                shadowBlur: 4, // 折线模糊
                shadowColor: "rgba(0,204,169,0.95)", //折线颜色
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: "rgba(159, 201, 255, 1)",
                //   },
                //   {
                //     offset: 1,
                //     color: "rgba(102, 153, 255, 1)",
                //   },
                // ]), // 线条渐变色
              },
              showSymbol: true, //是否默认展示圆点
              // symbol: "circle", //设定为实心点，不写symbol默认空心
              symbolSize: 6, //设定实心点的大小
              itemStyle: {
                color: "#00CCA9", //小圆点和线的颜色
                lineStyle: {
                  color: "#00CCA9", //改变折线颜色
                },
                // normal: {
                //   color: "#00CCA9", //改变折线点的颜色
                //   lineStyle: {
                //     color: "#00CCA9", //改变折线颜色
                //   },
                // },
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 1,
                    color: "rgba(0,204,169,0.3)",
                  },
                  {
                    offset: 0,
                    color: "rgba(0,204,169,0)",
                  },
                ]),
              },
              emphasis: {
                focus: "series",
              },
              data: [222, 932, 66, 934, 111, 333, 444],
            },
            // {
            //   name: "实际掘进进尺",
            //   type: "line",
            //   smooth: true,
            //   lineStyle: {
            //     color: "#D07832",
            //     width: fitChartSize(1),
            //   },
            //   itemStyle: {
            //     color: "#D07832",
            //   },
            //   showSymbol: false,
            //   areaStyle: {
            //     color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
            //       {
            //         offset: 1,
            //         color: "rgba(220, 120, 40,.3)",
            //       },
            //       {
            //         offset: 0,
            //         color: "rgba(220, 120, 40,0)",
            //       },
            //     ]),
            //   },
            //   emphasis: {
            //     focus: "series",
            //   },
            //   data: [
            //     ["2019-10-10", 900],
            //     ["2019-10-11", 560],
            //     ["2019-10-12", 750],
            //     ["2019-10-13", 580],
            //     ["2019-10-14", 250],
            //     ["2019-10-15", 300],
            //     ["2019-10-16", 450],
            //     ["2019-10-17", 300],
            //     ["2019-10-18", 100],
            //   ],
            // },
          ],
        });
      }
    },
  },
};
</script>
<style scoped lang="less">
// @import "@/styles/mixin.less";
// .chart {
//   .wn(100);
//   .h(180);
// }
.chart {
  width: 100%;
  height: 300px;
}
</style>
