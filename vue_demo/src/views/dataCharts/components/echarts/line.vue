<template>
  <div :id="'lineCharts' + byKey" class="chart" :ref="'lineCharts' + byKey"></div>
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
    data: {
      handler(val) {
        this.list = val;
        this.$nextTick(() => {
          if (this.charts == null) {
            this.charts = echarts.init(
              document.getElementById("lineCharts" + this.byKey),
              null,
              {
                renderer: "canvas",
                useDirtyRect: false,
              }
            );
          }

          setTimeout(() => {
            this.initData();
          }, 500);
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
        this.initData();
      });
    },
    initData() {
      var susuData = [
        {
          coords: [
            ["0:00", 222],
            ["6:00", 932],
            ["8:00", 66],
            ["12:00", 934],
            ["16:00", 111],
            ["20:00", 333],
            ["24:00", 0],
          ],
        },
      ];
      var json = {
        chart0: {
          xcategory: this.list[0],
          low: this.list[1],
          lowLine: [],
        },
      };
      var zrUtil = echarts.util;
      zrUtil.each(json.chart0.xcategory, function (item, index) {
        json.chart0.lowLine.push([
          {
            coord: [index, json.chart0.low[index]],
          },
          {
            coord: [index + 1, json.chart0.low[index + 1]],
          },
        ]);
      });
      if (this.byKey == "one") {
        this.charts.setOption({
          animationDuration: 3000,
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
          grid: {
            left: "3%", //图表距边框的距离
            right: "3%",
            top: "15%",
            bottom: "5%",
            containLabel: true,
          },
          xAxis: [
            {
              nameGap: fitChartSize(3), //坐标轴名称与轴线之间的距离。
              nameTextStyle: {
                //坐标轴单位
                color: "red",
                fontSize: fitChartSize(12),
              },
              type: "category",
              data: this.list[0],
              boundaryGap: false, //从0开始
              axisLine: {
                //坐标轴线颜色
                rotate: 30, //坐标轴内容过长旋转
                interval: 0,
                lineStyle: {
                  color: "#636E7C",
                },
              },
              axisLabel: {
                // showMaxLabel: true,
                color: "rgba(255,255,255,.8)", //坐标的字体颜色
                fontSize: fitChartSize(12),
              },
              axisTick: {
                //坐标轴刻度颜色
                show: false,
              },
            },
          ],
          yAxis: [
            {
              nameGap: fitChartSize(15), //坐标轴名称与轴线之间的距离。
              name: "人",
              type: "value",
              // hoverAnimation:true,
              min: 0,
              max: function (value) {
                return Math.ceil(value.max / 5) * 5;
              },
              splitNumber: 5,
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
                //坐标轴刻度颜色---不交叉
                show: false,
              },
              axisLine: {
                //坐标轴线颜色
                show: true,
                lineStyle: {
                  color: "#636E7C",
                },
              },
              axisLabel: {
                color: "rgba(255,255,255,.8)", //坐标的字体颜色
                fontSize: fitChartSize(12),
              },
            },
          ],
          series: [
            {
              name: "苏苏小苏苏",
              type: "line",
              smoothMonotone: "x",
              smooth: this.smooth, //0.5,
              lineStyle: {
                // color: "#DC7828",
                width: fitChartSize(1.5),
                type: "dashed", //solid实线
                shadowOffsetX: 0, // 折线的X偏移
                shadowOffsetY: 3, // 折线的Y偏移
                shadowBlur: 4, // 折线模糊
                opcity: 1,
                shadowColor: "rgba(220,120,40,0.95)", //折线颜色
              },
              showSymbol: false,
              itemStyle: {
                color: "#DC7828",
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
              data: this.list[1],
            },

            {
              polyline: true, // 多线段
              // effect: {
              //   show: true,
              //   trailLength: 0.2, // 尾迹长度
              //   period: 6, // 特效动画的时间, 走完全程的时长
              //   symbolSize: [26, 72],
              //   // symbol: img,
              // },
              showSymbol: false,
              name: "苏苏小苏苏",
              type: "lines",
              smooth: this.smooth, //0.5,
              smoothMonotone: "x",
              coordinateSystem: "cartesian2d",
              zlevel: 1,
              effect: {
                trailLength: 0.2,
                show: true, //是否展示
                smooth: true,
                period: 3, //光点滑动速度
                symbolSize: 3,
                loop: true,
                symbol: "arrow",
              },
              lineStyle: {
                color: "#fff",
                width: 0,
                opacity: 0,
                curveness: 0,
                type: "dashed",
                cap: "round",
              },
              data: json.chart0.lowLine,
            },
          ],
        });
      } else {
        this.charts.setOption({
          // animation: true, //控制动画示否开启
          animationDuration: 3000, // 动画的时长，它是以毫秒为单位
          // animationDuration: (arg) => {
          //   console.log(arg);
          //   return 1000 * arg;
          // },
          // animationEasing: "bounceOut", //缓动动画
          // animationThreshold: 8, //动画元素的阈值
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
          grid: {
            left: "3%", //图表距边框的距离
            right: "3%",
            top: "15%",
            bottom: "5%",
            containLabel: true,
          },
          xAxis: [
            {
              nameGap: fitChartSize(3),
              nameTextStyle: {
                //坐标轴单位
                color: "rgba(255,255,255,.8)",
                fontSize: fitChartSize(12),
              },
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
                // onZero: true,
                //坐标轴线颜色
                rotate: 30, //坐标轴内容过长旋转
                interval: 0,
                lineStyle: {
                  color: "#636E7C",
                },
              },
              axisLabel: {
                // showMaxLabel: true,
                color: "rgba(255,255,255,.8)", //坐标的字体颜色
                fontSize: fitChartSize(12),
              },
              axisTick: {
                //坐标轴刻度颜色  x和y不交叉
                show: false,
              },
            },
          ],
          yAxis: [
            {
              name: "人",
              min: 0,
              max: function (value) {
                return Math.ceil(value.max / 5) * 5;
              },
              splitNumber: 5,
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
                show: false,
              },
              axisLine: {
                //坐标轴线颜色
                show: true,
                lineStyle: {
                  color: "#636E7C",
                },
              },
              axisLabel: {
                // showMaxLabel: true,
                color: "rgba(255,255,255,.8)", //坐标的字体颜色
                fontSize: fitChartSize(12),
              },
            },
          ],
          series: [
            {
              name: "苏苏小苏苏222",
              type: "line",
              smooth: this.smooth, //可设置弧度，0-1
              lineStyle: {
                // color: "#DC7828",
                color: "#00CCA9", //------------------------------------------线条的颜色 ！！！！！
                width: fitChartSize(1.5),
                // width: 2,
                type: "solid",
                shadowOffsetX: 0, // 折线的X偏移
                shadowOffsetY: 10, // 折线的Y偏移
                shadowBlur: 4, // 折线模糊
                shadowColor: "rgba(255, 255, 255, 0.8)", //设置折线阴影颜色 shadowColor: "rgba(0,204,169,0.95)"
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
              symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
              symbolSize: 7, //设定实心点的大小
              itemStyle: {
                color: "#021E47", //小圆点和线的颜色  ---实心的圆点的背景颜色=---------------------圆透明！！！！！！！
                borderWidth: 1, //圆点边框大小
                borderColor: "#00CCA9", //实心的圆点边框颜色
                // lineStyle: {
                //   color: "#00CCA9", //改变折线颜色
                // },
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
              data: [222, 932, 66, 934, 111, 333, 0],
              // data: [0, 0, 99, 0, 66, 0, 0],
            },
            {
              showSymbol: false,
              name: "苏苏小苏苏",
              type: "lines",
              polyline: true,
              smooth: this.smooth, //0.5,
              coordinateSystem: "cartesian2d",
              zlevel: 1,
              effect: {
                show: true,
                smooth: true,
                period: 6,
                symbolSize: 4,
              },
              lineStyle: {
                color: "#fff",
                width: 1,
                opacity: 0,
                curveness: 0,
                cap: "round",
              },
              data: susuData,
            },
          ],
        });
      }
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
