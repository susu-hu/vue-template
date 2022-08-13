<template>
  <div
    :id="'barShadow' + byKey"
    :class="['chart', { chart2: byKey == 'two' }]"
    :ref="'barShadow' + byKey"
  ></div>
</template>

<script>
import * as echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
var erd = elementResizeDetectorMaker();
export default {
  name: "dataShadow",
  data() {
    return {
      charts: null,
      list: [],
    };
  },
  props: {
    byKey: {
      type: String,
      default: "",
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (this.charts == null) {
        this.charts = echarts.init(
          document.getElementById("barShadow" + this.byKey)
        );
      }
      if (this.byKey == "one") {
        this.initData();
      } else {
        this.initData2();
      }
    });
    erd.listenTo(
      document.getElementById("barShadow" + this.byKey),
      this.handleWindowResize
    );
  },
  beforeDestroy() {
    erd.uninstall(this.$refs.barShadow + this.byKey);
  },
  methods: {
    handleWindowResize() {
      if (!this.charts) return;
      this.$nextTick(() => {
        this.charts.resize();
      });
    },
    initData() {
      // 绘制左侧面
      const CubeLeft = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c0 = [shape.x, shape.y];
          const c1 = [shape.x - 5, shape.y - 5];
          const c2 = [xAxisPoint[0] - 5, xAxisPoint[1] - 5];
          const c3 = [xAxisPoint[0], xAxisPoint[1]];
          ctx
            .moveTo(c0[0], c0[1])
            .lineTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .closePath();
        },
      });
      // 绘制右侧面
      const CubeRight = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c1 = [shape.x, shape.y];
          const c2 = [xAxisPoint[0], xAxisPoint[1]];
          const c3 = [xAxisPoint[0] + 10, xAxisPoint[1] - 5];
          const c4 = [shape.x + 10, shape.y - 5];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      // 绘制顶面
      const CubeTop = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const c1 = [shape.x, shape.y];
          const c2 = [shape.x + 10, shape.y - 5];
          const c3 = [shape.x + 5, shape.y - 10];
          const c4 = [shape.x - 5, shape.y - 5];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      // 注册三个面图形
      echarts.graphic.registerShape("CubeLeft", CubeLeft);
      echarts.graphic.registerShape("CubeRight", CubeRight);
      echarts.graphic.registerShape("CubeTop", CubeTop);
      const MAX = [300, 777, 888, 999, 300];
      const VALUE = [200, 500, 400, 700, 280];
      const option = {
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
          // eslint-disable-next-line no-unused-vars
          formatter: function (params, ticket, callback) {
            const item = params[1];
            return item.name + " : " + item.value;
          },
        },
        grid: {
          left: "3%", //图表距边框的距离
          right: "3%",
          top: "15%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: ["测1", "测2", "测3", "测4", "测5"],
          axisLine: {
            show: true,
            lineStyle: { color: "#636E7C" },
          },
          axisLabel: {
            color: "rgba(255,255,255,.8)", //坐标的字体颜色
            fontSize: 12,
          },
          axisTick: {
            //坐标轴刻度颜色
            show: false,
            length: 9,
            alignWithLabel: true,
            lineStyle: {
              color: "#7DFFFD",
            },
          },
          offset: 15,
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: { color: "#636E7C" },
          },
          axisLabel: {
            color: "rgba(255,255,255,.8)", //坐标的字体颜色
            fontSize: 12,
          },
          axisTick: {
            //坐标轴刻度颜色
            show: false,
            length: 9,
            alignWithLabel: true,
            lineStyle: {
              color: "#7DFFFD",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.25)",
              type: "dashed",
            },
            //网格线颜色
          },
          //   boundaryGap: ["20%", "20%"],
        },
        series: [
          {
            type: "custom",
            renderItem: function (params, api) {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(47,102,192,.27)",
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(59,128,226,.27)",
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(72,156,221,.27)",
                    },
                  },
                ],
              };
            },
            data: MAX,
          },
          {
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              var color =
                api.value(1) > 2000
                  ? "red"
                  : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      {
                        offset: 0,
                        color: "rgba(67,102,243,1)",
                      },
                      {
                        offset: 1,
                        color: "rgba(29,67,243,1)",
                      },
                    ]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: color,
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: color,
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: color,
                    },
                  },
                ],
              };
            },
            data: VALUE,
          },
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                fontSize: 12,
                color: "#fff",
                offset: [2, -25],
              },
            },
            itemStyle: {
              color: "transparent",
            },
            tooltip: {},
            data: MAX,
          },
        ],
      };
      // 循环高亮展示
      let current = -1;
      let dataLen1 = option.series[0].data.length;
      setInterval(() => {
        // 取消之前高亮的图形
        this.charts.dispatchAction({
          type: "downplay",
          seriesIndex: 0,
          dataIndex: current,
        });
        current = (current + 1) % dataLen1;
        // 高亮当前图形
        this.charts.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: current,
        });
        // 显示 tooltip
        this.charts.dispatchAction({
          type: "showTip",
          seriesIndex: 0,
          dataIndex: current,
        });
      }, 2000);
      this.charts.setOption(option);
    },
    initData2() {
      this.charts.setOption({
        color: ["#3cefff"],
        tooltip: {},
        grid: {
          left: "3%", //图表距边框的距离
          right: "9%",
          top: "15%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "01月",
              "02月",
              "03月",
              "04月",
              "05月",
              "06月",
              "07月",
              "08月",
              "09月",
              "10月",
              "11月",
              "12月",
            ],
            axisTick: {
              alignWithLabel: true,
            },
            nameTextStyle: {
              color: "#636E7C",
            },

            axisLine: {
              show: true,
              lineStyle: {
                color: "#636E7C",
              },
            },
            axisLabel: {
              textStyle: {
                color: "#636E7C",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#636E7C",
              },
              formatter: "{value}%",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.25)",
                type: "dashed",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#636E7C",
              },
            },
          },
        ],
        series: [
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [0, -5],
            symbolPosition: "end",
            z: 12,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}%",
              },
            },
            data: [60, 70, 80, 90, 60, 70, 80, 90],
          },
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 10],
            symbolOffset: [0, 5],
            z: 12,
            data: [60, 70, 80, 90, 60, 70, 80, 90],
          },
          {
            type: "bar",
            itemStyle: {
              normal: {
                opacity: 0.7,
              },
            },
            barWidth: "20",
            data: [60, 70, 80, 90, 60, 70, 80, 90],
            markLine: {
              silent: true,
              label: {
                position: "middle",
                formatter: "{b}",
                color: "red",
              },
              data: [
                {
                  name: "目标值",
                  yAxis: 80,
                  lineStyle: {
                    color: "red",
                  },
                  itemStyle: {
                    color: "red",
                  },
                  label: {
                    position: "end",
                    formatter: "{b}\n {c}%",
                  },
                },
              ],
            },
          },
          {
            type: "effectScatter",
            silent: true,
            tooltip: {
              show: false,
            },
            zlevel: 3,
            symbolSize: 10,
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke",
              color: "#3cefff",
              scale: 5,
            },
            itemStyle: {
              color: "#3cefff",
            },
            hoverAnimation: true,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
        ],
      });
    },
  },
};
</script>
<style scoped lang="less">
.chart {
  width: 437px;
  height: 310px;
}
.chart2 {
  width: 100%;
  height: 330px;
}
</style>
