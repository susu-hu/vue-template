<!--
 * @Author: 胡苏珍 1628469970@qq.com
 * @Date: 2022-07-11 16:18:55
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-07-12 01:36:57
 * @FilePath: \control-platform-vue\src\view\threePosition\echarts\pie.vue
 * @Description: 饼图
-->
<template>
  <div id="pieCharts" ref="pieCharts" class="chart"></div>
</template>

<script>
import * as echarts from "echarts";
import { fitChartSize } from "@/utils/echartSize";
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
        let list = [];
        val.forEach((item) => {
          list.push({
            value: item.value,
            name: item.stationName,
          });
        });
        this.list = list;
        console.log("饼图数据", val);
        this.$nextTick(() => {
          if (this.charts == null) {
            this.charts = echarts.init(document.getElementById("pieCharts"));
          }
          this.initData();
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
    erd.listenTo(document.getElementById("pieCharts"), this.handleWindowResize);
  },
  beforeDestroy() {
    erd.uninstall(this.$refs.pieCharts);
  },
  methods: {
    handleWindowResize() {
      if (!this.charts) return;
      this.$nextTick(() => {
        this.charts.resize();
      });
    },
    //params 要处理的字符串
    //length 每行显示长度
    getEqualNewlineString(params, length) {
      let text = "";
      let count = Math.ceil(params.length / length); // 向上取整数
      // 一行展示length个
      if (count > 1) {
        for (let z = 1; z <= count; z++) {
          text += params.substr((z - 1) * length, length);
          if (z < count) {
            text += "\n";
          }
        }
      } else {
        text += params.substr(0, length);
      }
      return text;
    },
    initData() {
      this.charts.setOption({
        // legend: {
        //   top: "bottom",
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a}苏苏 <br/>{b} : {c} ({d}%)",
          // extraCssText: "z-index:999999",
          position: function (point, params, dom, rect, size) {
            // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
            // 提示框位置
            let x = 0; // x坐标位置
            let y = 0; // y坐标位置
            // 当前鼠标位置
            let pointX = point[0];
            let pointY = point[1];
            // 提示框大小
            let boxWidth = size.contentSize[0];
            let boxHeight = size.contentSize[1];

            // boxWidth > pointX 说明鼠标左边放不下提示框
            if (boxWidth > pointX) {
              x = 5;
            } else {
              // 左边放的下
              x = pointX - boxWidth;
            }
            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
              y = 5;
            } else {
              // 上边放得下
              y = pointY - boxHeight;
            }
            return [x, y];
          },
        },
        legend: {
          // type: "scroll",
          // scrollDataIndex: 0,

          orient: "vertical",
          right: fitChartSize(0),
          top: "center",
          icon: "rect",
          itemWidth: fitChartSize(10), // 设置宽度
          itemHeight: fitChartSize(10), // 设置高度
          selectedMode: false,
          textStyle: {
            color: "#fff",
            fontSize: fitChartSize(12),
          },
          formatter: function (name) {
            return name.length > 5 ? name.substr(0, 5) + "..." : name;
          },
          tooltip: {
            show: true,
          },

          //   left: "right",
          //   top: "bottom",
          //   data: [
          //     "rose1",
          //     "rose2",
          //     "rose3",
          //     "rose4",
          //     "rose5",
          //     "rose6",
          //     "rose7",
          //     "rose8",
          //   ],
        },
        toolbox: {
          show: true,
          feature: {
            // mark: { show: true },
            // dataView: { show: true, readOnly: false },
            // restore: { show: true },
            // saveAsImage: { show: true },//下载按钮
          },
        },
        graphic: {
          type: "text",
          left: "30%",
          top: "50%",
          style: {
            text: "重点区域",
            textAlign: "center",
            fill: "#5C5C5C",
            fontSize: 12,
          },
        },

        series: [
          {
            minAngle: 5, //最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
            avoidLabelOverlap: true, //是否启用防止标签重叠策略
            labelLine: {
              minTurnAngle: 0,
            }, //将 avoidLabelOverlap 设置为false，并将 labelLine里的minTurnAngle设置为0，\
            // 即可解决该问题，饼图的label就会展示在对应色块旁边。
            // name: "Nightingale Chart",
            type: "pie",
            radius: [20, 120],
            center: ["30%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 0,
            },
            // lable标签
            label: {
              show: false,
            },
            emphasis: {
              // label: {
              //   show: true,
              //   textStyle: {
              //     fontSize: 10,
              //   },
              //   formatter: (params) => {
              //     //调用自定义显示格式
              //     return this.getEqualNewlineString(params.name, 10);
              //   },
              // },
              // labelLine: {
              //   show: true,
              //   length: 0.001,
              // },
            },
            data: this.list,
            // [
            //   { value: 40, name: "rose 1" },
            //   { value: 38, name: "rose 2" },
            //   { value: 32, name: "rose 3" },
            //   { value: 30, name: "rose 4" },
            //   { value: 28, name: "rose 5" },
            //   { value: 26, name: "rose 6" },
            //   { value: 22, name: "rose 7" },
            //   { value: 18, name: "rose 8" },
            //   { value: 55, name: "rose 9" },
            //   { value: 60, name: "rose 19" },
            //   { value: 32, name: "rose 11" },
            //   { value: 30, name: "rose 12" },
            //   { value: 28, name: "rose 13" },
            //   { value: 26, name: "rose 16" },
            //   { value: 22, name: "rose 17" },
            // ],
          },
        ],
      });
    },
  },
};
</script>

<style scoped lang="less">
// @import "@/styles/mixin.less";
.chart {
  //   .wn(100);
  //   .h(500);
  width: 437px;
  height: 310px;
}
</style>