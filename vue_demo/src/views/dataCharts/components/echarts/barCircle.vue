<template>
  <div id="barChartCircle" ref="barChartCircle" class="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { fitChartSize } from "@/utils/echartSize";
import elementResizeDetectorMaker from "element-resize-detector";
var erd = elementResizeDetectorMaker();
export default {
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
        this.list = val;
        this.$nextTick(() => {
          if (this.charts == null) {
            this.charts = echarts.init(
              document.getElementById("barChartCircle")
            );
          }
          setTimeout(() => {
            this.initData();
          }, 800);
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
    erd.listenTo(
      document.getElementById("barChartCircle"),
      this.handleWindowResize
    );
  },
  beforeDestroy() {
    erd.uninstall(this.$refs.barChartCircle);
  },
  methods: {
    handleWindowResize() {
      if (!this.charts) return;
      this.$nextTick(() => {
        this.charts.resize();
      });
    },
    initData() {
      let yData1 = [2, 5, 7, 4],
        yData2 = [1, 2, 2, 3],
        max = 8,
        min = 1;
      this.charts.setOption({
        color: ["rgba(0, 255, 244, 0.7)", "rgba(208, 59, 50, 0.7)"],
        tooltip: {
          show: false,
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,.5)",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "rgba(0,0,0,.5)",
            },
          },
          textStyle: {
            color: "rgba(255,255,255,.8)",
            fontSize: fitChartSize(14),
          },
        },
        legend: {
          itemWidth: fitChartSize(12), // 设置宽度
          itemHeight: fitChartSize(6), // 设置高度
          selectedMode: false,
          right: fitChartSize(20),
          textStyle: {
            color: "rgba(255,255,255,.8)",
            fontSize: fitChartSize(14),
          },
        },
        grid: {
          left: fitChartSize(10),
          right: fitChartSize(10),
          top: fitChartSize(40),
          bottom: fitChartSize(10),
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            nameGap: fitChartSize(3), //坐标轴名称与轴线之间的距离
            nameTextStyle: {
              //坐标轴单位
              color: "rgba(255,255,255,.8)",
              fontSize: fitChartSize(14),
            },
            axisLine: {
              //坐标轴线颜色
              lineStyle: { color: "#636E7C" },
            },
            axisLabel: {
              color: "rgba(255,255,255,.8)", //坐标的字体颜色
              fontSize: fitChartSize(12),
            },
            axisTick: {
              //坐标轴刻度颜色
              show: false,
              alignWithLabel: true,
            },
            data: ["测试1", "测试2", "测试3"],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "单位",
            splitNumber: 5,
            nameTextStyle: {
              //坐标轴单位
              color: "rgba(255,255,255,.8)",
              fontSize: fitChartSize(12),
              padding: [0, 0, 0, 30], // 上右下左与原位置距离
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.6)", //坐标轴线颜色
              },
            },
            axisLabel: {
              color: "rgba(255,255,255,.8)", //坐标的字体颜色
              fontSize: fitChartSize(12),
            },
            splitLine: {
              //显示分割线
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.2)",
                type: "dashed",
              },
            },
          },
        ],
        series: [
          {
            name: "2222",
            type: "bar",
            barWidth: fitChartSize(16),
            barGap: fitChartSize(1), //柱间距离
            data: yData1,
            label: {
              show: false,
              position: "top",
              textAlign: "left",
              formatter: function (data) {
                return data.value ? data.value : "";
              },
              fontSize: fitChartSize(12),
              color: "#fff",
            },
            itemStyle: {
              show: true,
              color: function (params) {
                var index_num = params.value;
                for (var i = 0; i < yData1.length; i++) {
                  //判断数据是否大于max
                  if (
                    parseFloat(index_num) >= parseFloat(max) ||
                    parseFloat(index_num) < parseFloat(min)
                  ) {
                    return (params.color = {
                      x: 0,
                      y: 1,
                      x2: 0,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(208, 59, 50, 0.11)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(208, 59, 50, 0.7)", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    });
                  } else {
                    return (params.color = {
                      x: 0,
                      y: 1,
                      x2: 0,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(0, 255, 244, 0.11)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(0, 255, 244, 0.7)", // 100% 处的颜色
                        },
                      ],
                      global: false, // 缺省为 false
                    });
                  }
                }
              },
              opacity: 0.8,
            },
          },
          {
            name: "1111",
            type: "bar",
            barWidth: fitChartSize(16),
            barGap: fitChartSize(1), //柱间距离
            data: yData2,
            label: {
              show: false,
              position: "top",
              textAlign: "left",
              formatter: function (data) {
                return data.value ? data.value : "";
              },
              fontSize: fitChartSize(12),
              color: "#fff",
            },
            itemStyle: {
              //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
              color: function (params) {
                var index_num = params.value;
                for (var i = 0; i < yData2.length; i++) {
                  //判断数据是否大于max
                  if (
                    parseFloat(index_num) >= parseFloat(max) ||
                    parseFloat(index_num) < parseFloat(min)
                  ) {
                    return (params.color = {
                      x: 0,
                      y: 1,
                      x2: 0,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(208, 59, 50, 0.11)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(208, 59, 50, 0.7)", // 100% 处的颜色
                        },
                      ],
                      global: false,
                    });
                  } else {
                    return (params.color = {
                      x: 0,
                      y: 1,
                      x2: 0,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0,
                          color: "rgba(0, 255, 244, 0.11)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(0, 255, 244, 0.7)", // 100% 处的颜色
                        },
                      ],
                      global: false,
                    });
                  }
                }
              },
              opacity: 0.8,
            },
          },
          {
            name: "2222",
            type: "pictorialBar",
            symbolSize: [fitChartSize(16), fitChartSize(9)],
            symbolOffset: [fitChartSize(-16), fitChartSize(-5)],
            symbolPosition: "end",
            z: 12,
            label: {
              show: true,
              offset: [fitChartSize(-16), 0],
              position: "top",
              textAlign: "left",
              formatter: function (data) {
                if (data.value === 0) {
                  return "";
                }
                return data.value;
              },
              fontSize: fitChartSize(12),
              color: "rgba(255,255,255,.8)",
            },
            data: yData1,
            itemStyle: {
              show: true,
              color: function (params) {
                var index_num = params.value;
                for (var i = 0; i < yData1.length; i++) {
                  //判断数据是否大于max
                  if (
                    parseFloat(index_num) >= parseFloat(max) ||
                    parseFloat(index_num) < parseFloat(min)
                  ) {
                    return "rgba(208, 59, 50, 0.7)";
                  } else {
                    return "rgba(0, 255, 244, 0.7)";
                  }
                }
              },
            },
          },
          {
            name: "1111",
            type: "pictorialBar",
            symbolSize: [fitChartSize(16), fitChartSize(10)],
            symbolOffset: [fitChartSize(16), fitChartSize(-5)],
            symbolPosition: "end",
            z: 12,
            label: {
              offset: [fitChartSize(16), 0],
              show: true,
              position: "top",
              fontSize: fitChartSize(12),
              color: "rgba(255,255,255,.8)",
              formatter: function (data) {
                if (data.value === 0) {
                  return "";
                }
                return data.value;
              },
            },
            data: yData2,
            itemStyle: {
              show: true,
              color: function (params) {
                var index_num = params.value;
                for (var i = 0; i < yData2.length; i++) {
                  //判断数据是否大于max
                  if (
                    parseFloat(index_num) >= parseFloat(max) ||
                    parseFloat(index_num) < parseFloat(min)
                  ) {
                    return "rgba(208, 59, 50, 0.7)";
                  } else {
                    return "rgba(0, 255, 244, 0.7)";
                  }
                }
              },
            },
          },
        ],
      });
    },
  },
};
</script>

<style scoped lang="less">
.chart {
  width: 100%;
  height: 310px;
}
</style>
