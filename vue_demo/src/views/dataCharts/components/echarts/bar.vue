<!--
 * @Author: 胡苏珍 1628469970@qq.com
 * @Date: 2022-07-11 16:18:55
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-07-22 00:22:13
 * @FilePath: \control-platform-vue\src\view\threePosition\echarts\pie.vue
 * @Description: 饼图
-->
<template>
  <div id="barCharts" ref="barCharts" class="chart"></div>
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
        let list = [];
        val.forEach((item) => {
          list.push({
            value: item.value,
            name: item.stationName,
          });
        });
        this.list = list;
        this.$nextTick(() => {
          if (this.charts == null) {
            this.charts = echarts.init(document.getElementById("barCharts"));
          }
          setTimeout(() => {
            this.initData8();
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
    erd.listenTo(document.getElementById("barCharts"), this.handleWindowResize);
  },
  beforeDestroy() {
    erd.uninstall(this.$refs.barCharts);
  },
  methods: {
    handleWindowResize() {
      if (!this.charts) return;
      this.$nextTick(() => {
        this.charts.resize();
        this.initData8();
      });
    },
    initData() {
      this.charts.setOption({
        tooltip: {
          trigger: "axis",
          confine: true,
          axisPointer: { type: "none" },
          textStyle: { fontSize: 12, fontWeight: 500 },
          formatter(params) {
            // 只展示柱子对应的内容，把顶部底部的 tooltip 过滤掉
            return params.reduce((pre, i) => {
              if (i.componentSubType === "bar") {
                i.marker = i.marker.replace(
                  /\[object Object\]/,
                  i.color.colorStops[1].color
                );
                i.value = `<span style="flex: 1; text-align: right; margin-left: 16px;">${i.value}</span>`;
                const current = `<div style="display: flex; align-items: center; height: 26px;">${i.marker}${i.seriesName} ${i.value}</div>`;
                return `${pre}${current}`;
              }
              return pre;
            }, "");
          },
        },
        legend: {
          data: ["武汉", "北京", "上海"],
          right: 10,
          top: 12,
          type: "scroll",
          icon: "circle",
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 16,

          // 因为柱子顶部和底部是通过 offset 跟柱子结合起来的，如果取消选中，柱子数量变化，又要重新计算 offset，为了简单点就直接禁掉了
          selectedMode: false,
        },
        grid: { left: "3%", right: "4%", bottom: "5%", containLabel: true },
        xAxis: {
          type: "category",
          data: ["2020", "2021"],
          axisLine: { lineStyle: { color: "#F2F4F7" } },
          axisTick: { show: false },
          axisLabel: { color: "#585D63" },
        },
        yAxis: {
          boundaryGap: [0, 0.01],
          axisLine: { lineStyle: { color: "#F2F4F7" } },
          axisTick: { show: false },
          axisLabel: { color: "#585D63" },
          splitLine: { lineStyle: { color: "#F2F4F7" } },
        },
        series: [
          {
            name: "武汉",
            type: "bar",
            barWidth: 24,
            barCategoryGap: 12,
            data: ["11.8651", "4.9385"],
            itemStyle: {
              // 柱体渐变色
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#E1A4FF",
                },
                {
                  offset: 1,
                  color: "#C65FF9",
                },
              ]),
            },
          },
          {
            name: "武汉",
            type: "pictorialBar",
            symbolSize: [24, 6],

            // 这个属性很重要，直接决定了顶部跟柱子是否契合
            symbolOffset: [-31, -3],

            z: 12,
            itemStyle: { color: "#C65FF9" },
            symbolPosition: "end",

            // 要给成武汉这两个柱子的值，这是圆柱顶部，值不给对高度会对不上
            data: ["11.8651", "4.9385"],
          },
          {
            name: "武汉",
            type: "pictorialBar",
            symbolSize: [24, 6],
            symbolOffset: [-31, 3],
            z: 12,
            itemStyle: { color: "#C65FF9" },
            symbolPosition: "start", // 这个给成大于 0 的值就行，设置了 position，一定会在柱子底部展示

            data: [1, 1],
          },
          {
            name: "北京",
            type: "bar",
            barWidth: 24,
            barCategoryGap: 12,
            data: ["3.7493", "1.5536"],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#FFAC97",
                },
                {
                  offset: 1,
                  color: "#FF704C",
                },
              ]),
            },
          },
          {
            name: "北京",
            type: "pictorialBar",
            symbolSize: [24, 6],
            symbolOffset: [0, -3],
            z: 12,
            itemStyle: { color: "#FF704C" },
            symbolPosition: "end",
            data: ["3.7493", "1.5536"],
          },
          {
            name: "北京",
            type: "pictorialBar",
            symbolSize: [24, 6],
            symbolOffset: [0, 3],
            z: 12,
            itemStyle: { color: "#FF704C" },
            symbolPosition: "start",
            data: ["3.7493", "1.5536"],
          },
          {
            name: "上海",
            type: "bar",
            barWidth: 24,
            barCategoryGap: 12,
            data: ["56.1131", "23.6478"],
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#71A8FE",
                },
                {
                  offset: 1,
                  color: "#2872FC",
                },
              ]),
            },
          },
          {
            name: "上海",
            type: "pictorialBar",
            symbolSize: [24, 6],
            symbolOffset: [31, -3],
            z: 12,
            itemStyle: { color: "#2872FC" },
            symbolPosition: "end",
            data: ["56.1131", "23.6478"],
          },
          {
            name: "上海",
            type: "pictorialBar",
            symbolSize: [24, 6],
            symbolOffset: [31, 3],
            z: 12,
            itemStyle: { color: "#2872FC" },
            symbolPosition: "start",
            data: ["56.1131", "23.6478"],
          },
        ],

        // legend 对应的 color，实际上柱状图的颜色都是在 itemStyle 里定义的
        color: ["#C65FF9", "#FF704C", "#2872FC"],
      });
    },
    initData1() {
      var xData3 = ["6", "7", "8", "9", "10", "11"];
      var data3 = [1209, 1715, 2408, 1308, 1308, 1145];
      var data5 = [4000, 4000, 4000, 4000, 4000, 4000];
      var option = {
        tooltip: {
          trigger: "axis",
          show: false,
        },
        grid: {
          left: 50,
          bottom: 25,
          top: 30,
          right: 40,
        },
        xAxis: {
          data: xData3,
          name: "(月)",
          // 坐标轴刻度相关设置
          axisTick: {
            show: false,
          },
          // 坐标轴线的相关设置
          axisLine: {
            show: true,
            lineStyle: {
              color: "#414965",
            },
          },
          // 坐标轴刻度标签的相关设置
          axisLabel: {
            // 可以设置成 0 强制显示所有标签
            interval: 0,
            textStyle: {
              color: "#7089ba",
              fontSize: 12,
            },
            margin: 15, //刻度标签与轴线之间的距离。
          },
        },
        yAxis: {
          name: "单位: 万m",
          nameTextStyle: {
            color: "#fff",
          },
          // 坐标轴在grid区域中的分隔线
          splitLine: {
            show: true,
            lineStyle: {
              color: "#414965",
              opacity: 0.3,
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#7089ba",
              fontSize: 12,
            },
          },
        },
        series: [
          {
            //三个最低下的圆片
            // 系列名称，用于tooltip的显示，legend 的图例筛选，在 setOption 更新数据和配置项时用于指定对应的系列
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 15],
            symbolOffset: [0, 10],
            z: 12,
            // 图形样式
            itemStyle: {
              opacity: 1,
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#2d6ac5", //0%处的颜色
                  },
                  {
                    offset: 1,
                    color: "#2d6ac5", //100%处的颜色
                  },
                ]),
                barBorderRadius: 0,
                borderWidth: 0,
              },
            },
            // 显示最底下的圆片
            data: [1, 1, 1, 1, 1, 1],
          },

          //下半截柱状图
          {
            name: "2020",
            type: "bar",
            barWidth: 20,
            barGap: "100%",
            itemStyle: {
              //lenged文本
              opacity: 0.1,
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#51b1f9",
                  },
                  {
                    offset: 1,
                    color: "#2f6ef6",
                  },
                ]),
                barBorderRadius: 0,
                borderWidth: 0,
              },
            },
            label: {
              show: true,
              position: "top",
              distance: 10,
              color: "#fff",
            },

            data: data3,
          },
          {
            name: "", //头部
            type: "pictorialBar",
            symbolSize: [20, 15],
            symbolOffset: [0, -10],
            z: 12,
            symbolPosition: "end",
            itemStyle: {
              color: "#22589f",
              opacity: 1,
            },
            data: data5,
          },

          {
            name: "",
            type: "pictorialBar",
            // 图形的大小
            symbolSize: [20, 15],
            // 图形相对于原本位置的偏移
            symbolOffset: [0, -10],
            z: 12,
            itemStyle: {
              opacity: 1,
              normal: {
                show: true,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#48a4f8",
                  },
                  {
                    offset: 1,
                    color: "#7df4f9",
                  },
                ]),
                barBorderRadius: 0,
                borderWidth: 0,
              },
            },
            // 图形的定位位置
            symbolPosition: "end",
            data: data3,
          },

          {
            name: "2019",
            type: "bar",
            barWidth: 20,
            // 如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。
            barGap: "-100%",
            z: 0,
            itemStyle: {
              color: "#102a6f",
              opacity: 0.7,
            },
            data: data5,
          },
        ],
      };
      this.charts.setOption(option);
    },
    initData2() {
      let yData = [23, 30, 33, 5, 60, 7, 88];
      let xData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      let option = {
        grid: {
          // 整体位置
          left: 0, // 距离左侧距离
          bottom: 0, // 距离低侧的距离
          top: 10, // 距离顶部的距离
          right: 0, // 距离右侧的距离
          height: "auto",
          width: "auto",
          containLabel: true,
        },
        tooltip: {
          show: true,
          confine: true, // true限制在图表内部
          trigger: "axis",
          position(point, params, dom, rect, size) {
            // 固定在顶部
            return params[0].dataIndex <= 17
              ? [point[0] + 20, "30%"]
              : { top: "30%", left: point[0] - size.contentSize[0] - 25 };
          },
          padding: 6,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "transparent",
          axisPointer: {
            //坐标轴指示器，坐标轴触发有效，
            type: "shadow", //默认为line，line直线，cross十字准星，shadow阴影
            shadowStyle: {
              color: "rgba(0,222,255,0.3)",
            },
          },
        },
        xAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#397cbc",
            },
          },
          axisTick: {
            show: true,
          },
          axisLabel: {
            fontSize: 16 * this.scale,
            color: "#30eee9",
            interval: "0", //强制显示所有类目
            rotate: -45, //类目倾斜放
            textStyle: {
              color(value, index) {
                return index < 10 ? "#FCC059" : "#30EEE9";
              },
            },
          },
          data: xData,
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#2ad1d2",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            //背景网格线
            show: true,
            lineStyle: {
              color: "#125770",
            },
          },
        },
        series: [
          // 数据配置项（柱状图）
          {
            // 正面
            type: "bar", // 图表类型 bar 为柱状图
            barWidth: 20, // 柱体的宽度
            data: yData, // 柱体数据
            itemStyle: {
              // 单个柱体的配置项
              color: "#4A90E2",
            },
            barGap: 0, // 柱体间隔
          },
          {
            // 侧面
            type: "bar",
            barWidth: 20,
            itemStyle: {
              color: "#3773BA",
            },
            data: yData,
            barGap: 0,
          },
          {
            // 顶部
            name: "b",
            tooltip: {
              show: false,
            },
            type: "pictorialBar",
            itemStyle: {
              //顶部
              normal: {
                color: function (params) {
                  let colorList = [
                    "#FC9F9F",
                    "#F7B177",
                    "#BBF64A",
                    "#4DF4EE",
                    "#947FFA",
                    "#749f83",
                    "#ca8622",
                    "#bda29a",
                    "#6e7074",
                    "#546570",
                  ];
                  return colorList[params.dataIndex];
                },
                borderColor: "",
                borderWidth: 0.01,
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 16,
                    fontFamily: "微软雅黑",
                  },
                },
              },
            },
            symbol: "rect",
            symbolRotate: 45,
            symbolSize: ["30", "30"],
            symbolOffset: ["0", "-17"],
            symbolPosition: "end",
            data: yData,
            z: 3,
          },
        ],
      };
      this.charts.setOption(option);
    },
    initData3() {
      const imgUrl =
        "image://data:image/png;base64,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";
      let yData = [
        { value: 13, symbol: imgUrl },
        { value: 53, symbol: imgUrl },
        { value: 23, symbol: imgUrl },
        { value: 43, symbol: imgUrl },
        { value: 66, symbol: imgUrl },
        { value: 78, symbol: imgUrl },
        { value: 68, symbol: imgUrl },
      ];
      let xData = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      let option = {
        grid: {
          left: "16%",
          bottom: "26%",
          right: "10%",
          top: "16%",
        },
        tooltip: {
          show: true,
          confine: true, // true限制在图表内部
          trigger: "axis",
          position(point, params, dom, rect, size) {
            // 固定在顶部,并且数据下标小于7的显示在右边，大于7的显示在左边
            return params[0].dataIndex <= 7
              ? [point[0] + 20, "30%"]
              : { top: "30%", left: point[0] - size.contentSize[0] - 25 };
          },
          padding: 6,
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "transparent",
          axisPointer: {
            //坐标轴指示器，坐标轴触发有效，
            type: "shadow", //默认为line，line直线，cross十字准星，shadow阴影
            shadowStyle: {
              color: "rgba(0,222,255,0.3)",
            },
          },
        },
        xAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#397cbc",
            },
          },
          axisTick: {
            show: true,
          },
          axisLabel: {
            fontSize: 16 * this.scale,
            color: "#30eee9",
            interval: "0", //强制显示所有类目
            rotate: -45, //类目倾斜放
            textStyle: {
              color(value, index) {
                return index < 10 ? "#FCC059" : "#30EEE9";
              },
            },
          },
          data: xData,
        },
        yAxis: {
          type: "value",
          minInterval: 1,
          axisLabel: {
            formatter: "{value}",
            textStyle: {
              color: "#2ad1d2",
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            //背景网格线
            show: true,
            lineStyle: {
              color: "#125770",
            },
          },
        },
        series: [
          {
            type: "pictorialBar",
            symbol: imgUrl,
            barGap: 0,
            barWidth: 20, //柱图宽度
            symbolSize: ["100%", "100%"],
            data: yData,
          },
        ],
      };
      this.charts.setOption(option);
    },
    initData4() {
      this.charts.setOption({
        // 设置图表的位置
        grid: {
          x: 40, // 左间距
          y: 70, // 上间距
          x2: 50, // 右间距
          y2: 30, // 下间距
          containLabel: true, // grid 区域是否包含坐标轴的刻度标签, 常用于『防止标签溢出』的场景
        },
        // dataZoom 组件 用于区域缩放
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0], // 设置 dataZoom-inside 组件控制的 x轴
            // 数据窗口范围的起始和结束百分比  范围: 0 ~ 100
            start: 0,
            end: 100,
          },
        ],
        // 图表主标题
        title: {
          text: "订单", // 主标题文本，支持使用 \n 换行
          top: 10, // 定位 值: 'top', 'middle', 'bottom' 也可以是具体的值或者百分比
          left: "center", // 值: 'left', 'center', 'right' 同上
          textStyle: {
            // 文本样式
            fontSize: 24,
            fontWeight: 600,
            color: "#fff",
          },
        },
        // 设置自定义文字
        graphic: [
          {
            type: "text", // 图形元素类型
            left: 70, // 进行定位
            bottom: 32,
            style: {
              // 文本样式
              fill: "#cdd3ee",
              text: "(月份)",
              font: "normal 13px Microsoft", // style | weight | size | family
            },
          },
        ],
        // 提示框组件
        tooltip: {
          trigger: "axis", // 触发类型, axis: 坐标轴触发
          axisPointer: {
            type: "line", // 指示器类型
          },
          textStyle: {
            color: "#d5dbff", // 文字颜色
          },
          // 提示框浮层内容格式器，支持字符串模板和回调函数两种形式
          // 折线（区域）图、柱状（条形）图、K线图 : {a}（系列名称），{b}（类目值），{c}（数值）, {d}（无）
          formatter: "{b}<br />{a0}: {c0}万",
        },
        // 图例组件
        legend: {
          // 图例的数据数组
          data: ["订单"],
          icon: "roundRect", // 图例项的 icon  值: 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          top: 13, // 定位
          right: 30,
          textStyle: {
            // 文本样式
            fontSize: 16,
            color: "#cdd3ee",
          },
        },
        // X轴
        xAxis: {
          show: true, // 不设置默认值为 true
          type: "category", // 坐标轴类型,  'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据
          // 坐标轴轴线
          axisLine: {
            lineStyle: {
              type: "solid", // 坐标轴线线的类型 'solid', 'dashed', 'dotted'
              width: 1, // 坐标轴线线宽, 不设置默认值为 1
              color: "#204756", // 坐标轴线线的颜色
            },
          },
          // 坐标轴刻度
          axisTick: {
            show: false,
          },
          // 分隔线
          splitLine: {
            show: false,
          },
          // 坐标轴刻度标签
          axisLabel: {
            fontSize: 16, // 文字的字体大小
            color: "#cdd3ee", // 刻度标签文字的颜色
            // 使用函数模板   传入的数据值 -> value: number|Array,
            formatter: function (value) {
              return value.replace(/[\u4e00-\u9fa5]/g, "");
            },
          },
          // 类目数据，在类目轴（type: 'category'）中有效
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
        },
        // 左侧Y轴
        yAxis: [
          {
            type: "value", // 坐标轴类型,   'value' 数值轴，适用于连续数据
            name: "（万）", // 坐标轴名称
            nameLocation: "end", // 坐标轴名称显示位置 'start', 'middle' 或者 'center', 'end'
            nameTextStyle: {
              // 坐标轴名称的文字样式
              color: "#cdd3ee",
              fontSize: 16,
            },
            nameGap: 13, // 坐标轴名称与轴线之间的距离
            // 坐标轴刻度
            axisTick: {
              show: true, // 是否显示坐标轴刻度 默认显示
            },
            // 坐标轴轴线
            axisLine: {
              // 是否显示坐标轴轴线 默认显示
              show: true, // 是否显示坐标轴轴线 默认显示
              lineStyle: {
                // 坐标轴线线的颜色
                color: "#204756",
              },
            },
            // 坐标轴在 grid 区域中的分隔线
            splitLine: {
              show: true, // 是否显示分隔线，默认数值轴显示
              lineStyle: {
                color: "#204756", // 分隔线颜色
                opacity: 0.5, // 分隔线透明度
              },
            },
            // 坐标轴刻度标签
            axisLabel: {
              show: true, // 是否显示刻度标签 默认显示
              fontSize: 16, // 文字的字体大小
              color: "#cdd3ee", // 刻度标签文字的颜色
              // 使用字符串模板，模板变量为刻度默认标签 {value}
              formatter: "{value}",
            },
          },
        ],
        // 系列列表
        series: [
          // 柱状图顶部的圆片
          {
            name: "订单", // 系列名称, 用于tooltip的显示, legend 的图例筛选
            type: "pictorialBar", // 系列类型
            symbolSize: [20, 10], // 标记的大小
            symbolOffset: [0, -5], // 标记相对于原本位置的偏移
            symbolPosition: "end", // 图形的定位位置。可取值：start、end、center
            // 图例的图形样式
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#92e5c9", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#6effc4", // 100% 处的颜色
                  },
                ],
              },
            },
            z: 10, // 组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖
            data: [200, 330, 400, 600, 830, 650, 690, 430, 550, 420, 420, 320], // 系列中的数据内容数组
          },
          // 柱状图
          {
            name: "订单", // 系列名称, 用于tooltip的显示, legend 的图例筛选
            type: "bar", // 系列类型
            barWidth: 20, // 指定柱宽度，可以使用绝对数值或百分比，默认自适应
            barGap: "-100%", // 不同系列的柱间距离l，如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用
            // 图例的图形样式
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#07c678", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#11ddd4", // 100% 处的颜色
                  },
                ],
              },
            },
            data: [200, 330, 400, 600, 830, 650, 690, 430, 550, 420, 420, 320], // 系列中的数据内容数组
          },
          // 柱状图底下的圆片
          {
            name: "订单",
            type: "pictorialBar", // 系列类型
            symbolSize: [20, 12], // 标记的大小
            symbolOffset: [0, 5], // 标记相对于原本位置的偏移
            // 图例的图形样式
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#08d3bf", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#11ddd4", // 100% 处的颜色
                  },
                ],
              },
            },
            z: 10, // 组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖
            data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // 系列中的数据内容数组
          },
          // 背景顶部的圆片
          {
            name: "订单", // 系列名称, 用于tooltip的显示, legend 的图例筛选
            type: "pictorialBar", // 系列类型
            symbolSize: [20, 10], // 标记的大小
            symbolOffset: [0, -5], // 标记相对于原本位置的偏移
            symbolPosition: "end", // 图形的定位位置。可取值：start、end、center
            // 图例的图形样式
            itemStyle: {
              color: "#457373",
              opacity: 1,
            },
            z: 10, // 组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖
            data: [
              1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
              1000, 1000,
            ], // 系列中的数据内容数组
          },
          // 背景
          {
            name: "订单", // 系列名称, 用于tooltip的显示, legend 的图例筛选
            type: "bar", // 系列类型
            barWidth: 20, // 指定柱宽度，可以使用绝对数值或百分比，默认自适应
            barGap: "-100%", // 不同系列的柱间距离l，如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用
            // 图例的图形样式
            itemStyle: {
              color: "#0a423f",
              opacity: 0.7,
            },
            z: 0, // 组件的所有图形的z值。控制图形的前后顺序。z值小的图形会被z值大的图形覆盖
            data: [
              1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000,
              1000, 1000,
            ], // 系列中的数据内容数组
          },
        ],
      });
    },
    initData5() {
      let yData = [12, 43, 555, 33, 21];
      let barWidth = 14;
      this.charts.setOption({
        grid: {
          top: "24%",
          left: "8%",
          bottom: "2%",
          right: "8%",
          containLabel: true,
        },
        animation: false,
        xAxis: {
          type: "category",
          axisTick: {
            // x轴刻度线
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "#27272E",
              width: 0, //x轴 是否显示
              type: "dotted", //'dotted'虚线 'solid'实线
            },
          },
          // x轴的字体样式
          axisLabel: {
            show: true,
            textStyle: {
              color: "#27272E",
              fontFamily: "zihun107",
              fontSize: 12,
            },
          },
          data: this.labelData,
        },
        yAxis: {
          //修改y轴间距
          type: "value",
          min: 0,
          max: function (value) {
            //取最大值向上取整为最大刻度
            return Math.ceil(value.max) + 10;
          },
          scale: true, //自适应
          minInterval: function (value) {
            //分割刻度
            return Math.ceil(value.max / 10);
          },
          axisTick: {
            // y轴刻度线
            show: false,
          },
          splitLine: {
            // 网格线
            show: false,
          },
          splitArea: { show: false }, // 保留网格区域
          axisLabel: {
            show: false,
            // 这里重新定义就可以
            formatter: function (value) {
              return `${value}`;
            },
            textStyle: {
              color: "#87878E",
              fontSize: "16",
            },
          },
        },
        series: [
          {
            name: "顶部三角",
            type: "pictorialBar",
            symbol: "triangle",
            symbolSize: [barWidth, 10],
            symbolOffset: [0, -10],
            symbolPosition: "end",
            z: 12,
            label: {
              normal: {
                show: true,
                position: "top",
                //数值样式
                fontFamily: "zihun107",
                color: "#bf2323",
                fontSize: 12,
                //顶部数据展示，目前只展示最大值
                formatter: function (params) {
                  let maxIndex = 0;
                  for (const i in yData) {
                    maxIndex =
                      Number(yData[i]) > Number(yData[maxIndex]) ? i : maxIndex;
                  }
                  return params.dataIndex == maxIndex
                    ? params.value + "次"
                    : "";
                },
              },
            },
            color: new this.$echarts.graphic.LinearGradient(1, 1, 0, 1, [
              { offset: 0, color: "#ceccc9" },
              { offset: 0.5, color: "#969799" },
              { offset: 0.5, color: "#b1adad" },
              { offset: 1, color: "#ece4d2" },
            ]),
            data: yData,
          },
          {
            type: "bar",
            barWidth: barWidth,
            barGap: "10%", // Make series be overlap
            barCateGoryGap: "10%",
            markPoint: {
              data: [
                {
                  type: "max",
                  name: "最大值",
                },
                {
                  type: "min",
                  name: "最小值",
                },
              ],
            },
            itemStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(1, 1, 0, 1, [
                  { offset: 0, color: "#ceccc9" },
                  { offset: 0.5, color: "#969799" },
                  { offset: 0.5, color: "#b1adad" },
                  { offset: 1, color: "#ece4d2" },
                ]),
              },
            },
            data: yData,
          },
        ],
      });
    },
    initData6() {
      let indictedCase = [10, 7, 15, 8, 6, 2, 1, 3, 5, 8, 9];
      this.charts.setOption({
        backgroundColor: "#051c71",
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgb(11,11,81)",
          padding: [15, 30],
          extraCssText:
            "box-shadow: 0px 0px 25px 5px rgb(41, 95, 159) inset;border-radius:10px",
        },
        legend: {
          show: true,
          top: "5%",
          textStyle: {
            color: "#fff",
          },
          data: ["数量", "金额1", "金额2"],
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "2%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          axisLabel: {
            //"rotate": 30,
            interval: 0,
            color: "#eee",
            fontSize: 14,
          },
          axisLine: {
            lineStyle: {
              color: "#5475c8",
            },
          },
          data: [
            "2011年",
            "2012年",
            "2013年",
            "2014年",
            "2015年",
            "2016年",
            "2017年",
            "2018年",
            "2019年",
            "2020年",
            "2021年",
          ],
        },
        yAxis: [
          {
            type: "value",
            name: "单位:(个)",
            min: 0,
            // "max": leftMax*2,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "transparent",
              },
            },
            splitNumber: 5,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#eee",
              },
            },
            nameTextStyle: {
              color: "#fff",
            },
            axisLine: {
              lineStyle: {
                color: "#5475c8",
              },
            },
          },
          {
            type: "value",
            name: "金额:(元)",
            min: 0,
            // "max": 15000,
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0.2)",
              },
            },
            splitNumber: 5,
            axisLabel: {
              show: true,
              textStyle: {
                color: "#eee",
              },
            },
            nameTextStyle: {
              color: "#fff",
            },
            axisLine: {
              lineStyle: {
                color: "#5475c8",
              },
            },
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: 8,
            barGap: 0,
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
            itemStyle: {
              normal: {
                color: "#77f9ef",
              },
            },
            data: indictedCase,
          },
          {
            name: "数量",
            type: "bar",
            barWidth: 8,
            tooltip: {
              show: false,
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
            itemStyle: {
              normal: {
                color: "#52bbb3",
              },
            },
            data: indictedCase,
          },
          {
            name: "数量",
            type: "pictorialBar", // 长方体顶部四边形
            symbol: "diamond",
            symbolRotate: 0,
            symbolSize: ["16", "10"],
            symbolOffset: ["0", "-5"],
            symbolPosition: "end",
            z: 3, // 顶部四边形
            tooltip: {
              show: false,
            },
            label: {
              normal: {
                show: false,
                position: "insideRight",
              },
            },
            itemStyle: {
              normal: {
                color: "#52bbb3",
              },
            },
            data: indictedCase,
          },
          {
            name: "金额1",
            type: "line",
            yAxisIndex: 1,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            smooth: true,
            itemStyle: {
              color: "rgb(253,146,166)",
            },
            lineStyle: {
              color: "rgb(253,146,166)",
            },
            data: [
              1000, 1200, 1500, 1800, 1700, 1900, 2000, 2500, 1500, 1770, 1300,
            ],
          },
          {
            name: "金额2",
            type: "line",
            yAxisIndex: 1,
            showAllSymbol: true,
            symbol: "circle",
            symbolSize: 10,
            smooth: true,
            itemStyle: {
              color: "rgb(78,230,244)",
            },
            lineStyle: {
              color: "rgb(78,230,244)",
            },
            data: [
              900, 1000, 1300, 1700, 1600, 1900, 1500, 2100, 2000, 1500, 1100,
            ],
          },
        ],
      });
    },
    initData7() {
      var MyCubeRect = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
          width: 24, //柱宽
          zWidth: 4, //阴影折角宽
          zHeight: 0, //阴影折角高
        },
        buildPath: function (ctx, shape) {
          const api = shape.api;
          //坐标系列
          const xAxisPoint = api.coord([shape.xValue, 0]);
          const p0 = [shape.x, shape.y];
          const p1 = [shape.x - 15, shape.y];
          const p4 = [shape.x + 15, shape.y];
          const p2 = [xAxisPoint[0] - 15, xAxisPoint[1]];
          const p3 = [xAxisPoint[0] + 15, xAxisPoint[1]];
          // 描绘的图形
          ctx.moveTo(p0[0], p0[1]); //0
          ctx.lineTo(p1[0], p1[1]); //1
          ctx.lineTo(p2[0], p2[1]); //2
          ctx.lineTo(p3[0], p3[1]); //3
          ctx.lineTo(p4[0], p4[1]); //4
          ctx.lineTo(p0[0], p0[1]); //0
          ctx.closePath();
        },
      });
      var MyCubeShadow = echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
          width: 15,
          zWidth: 6,
          zHeight: 4,
        },
        buildPath: function (ctx, shape) {
          const api = shape.api;
          const xAxisPoint = api.coord([shape.xValue, 0]);
          //   const p0 = [shape.x, shape.y];
          const p1 = [shape.x - 15, shape.y];
          const p4 = [shape.x + 15, shape.y];
          const p6 = [shape.x + 15 + 8, shape.y - 4];
          const p7 = [shape.x - 15 + 8, shape.y - 4];
          const p3 = [xAxisPoint[0] + 15, xAxisPoint[1]];
          const p5 = [xAxisPoint[0] + 15 + 8, xAxisPoint[1] - 4];

          ctx.moveTo(p4[0], p4[1]); //4
          ctx.lineTo(p3[0], p3[1]); //3
          ctx.lineTo(p5[0], p5[1]); //5
          ctx.lineTo(p6[0], p6[1]); //6
          ctx.lineTo(p4[0], p4[1]); //4

          ctx.moveTo(p4[0], p4[1]); //4
          ctx.lineTo(p6[0], p6[1]); //6
          ctx.lineTo(p7[0], p7[1]); //7
          ctx.lineTo(p1[0], p1[1]); //1
          ctx.lineTo(p4[0], p4[1]); //4
          ctx.closePath();
        },
      });
      echarts.graphic.registerShape("MyCubeRect", MyCubeRect);
      echarts.graphic.registerShape("MyCubeShadow", MyCubeShadow);
      var seriesData = [20, 100, 50, 44, 12];
      let option = {
        grid: {
          height: 300,
        },
        xAxis: {
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "custom",
            data: seriesData,
            renderItem: function (params, api) {
              let location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "MyCubeRect", // shape 属性描述了这个矩形的像素位置和大小
                    shape: {
                      api,
                      xValue: api.value(0), //表示取出当前 dataItem 中第一个维度的数值
                      yValue: api.value(0),
                      x: location[0],
                      y: location[1],
                    },
                    style: {
                      stroke: "yellow", //边框颜色
                      fill: "#3773e1", //平面颜色
                      text: seriesData[params.dataIndex],
                      textPosition: [10, -20], //文字显示位置
                    },
                  },

                  {
                    type: "MyCubeShadow",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                    },
                    style: {
                      stroke: "yellow", //边框颜色
                      fill: "#3773e1", //平面颜色
                    },
                  },
                ],
              };
            },
          },
        ],
      };
      this.charts.setOption(option);
    },
    initData8() {
      this.charts.setOption(
        this.getEcharts3DBar(
          ["服务1", "服务2", "服务3", "服务4", "服务5"],
          [5, 36, 10, 20, 15],
          "01"
        )
      );
    },
    getEcharts3DBar(xAxisData, data, colorType) {
      var colorArr = [];
      if (colorType == "01") {
        colorArr = ["#2886c6", "#50bfda", "#89e3ec"];
      } else {
        colorArr = ["#28c1c6", "#50dac0", "#87e8c7"];
      }
      var color = {
        type: "linear",
        x: 0,
        x2: 1,
        y: 0,
        y2: 0,
        colorStops: [
          {
            offset: 0,
            color: colorArr[0],
          },
          {
            offset: 0.5,
            color: colorArr[0],
          },
          {
            offset: 0.5,
            color: colorArr[1],
          },
          {
            offset: 1,
            color: colorArr[1],
          },
        ],
      };
      var barWidth = 20;
      var constData = [];
      var showData = [];
      data.filter(function (item) {
        if (item) {
          constData.push(1);
          showData.push(item);
        } else {
          constData.push(0);
          showData.push({
            value: 1,
            itemStyle: {
              normal: {
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 2,
                color: "rgba(0,0,0,0)",
              },
            },
          });
        }
      });
      return {
        animation: true, //控制动画示否开启
        animationDuration: 5000, // 动画的时长，它是以毫秒为单位
        // animationDuration: (arg) => {
        //   console.log(arg);
        //   return 1000 * arg;
        // },
        // animationEasing: "bounceOut", //缓动动画
        // animationThreshold: 8, //动画元素的阈值
        tooltip: {
          // trigger: "axis",
          // formatter: function (params) {
          //   var str = params[0].axisValue + "：";
          //   params.filter(function (item) {
          //     if (item.componentSubType == "bar") {
          //       str += "<br/>" + item.seriesName + "：" + item.value;
          //     }
          //   });
          //   return str;
          // },
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
            fontSize: 14,
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
          data: xAxisData,
          axisTick: {
            show: false,
          },
          axisLabel: {
            // showMaxLabel: true,
            color: "rgba(255,255,255,.8)", //坐标的字体颜色
            fontSize: 12,
          },
        },
        yAxis: {
          axisLine: {
            show: true,
          },
          axisLabel: {
            show: true,
            color: "rgba(255,255,255,.8)", //坐标的字体颜色
            fontSize: 12,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.25)",
              type: "dashed",
            },
            //网格线颜色
          },
        },
        series: [
          {
            z: 1,
            name: "数据",
            type: "bar",
            barWidth: barWidth,
            barGap: "0%",
            data: data,
            itemStyle: {
              normal: {
                color: color,
              },
            },
          },
          {
            z: 2,
            name: "数据",
            type: "pictorialBar",
            data: constData,
            symbol: "diamond",
            symbolOffset: ["0%", "50%"], //显示超出坐标
            symbolSize: [barWidth, 10],
            itemStyle: {
              normal: {
                color: color,
              },
            },
            tooltip: {
              show: false,
            },
          },
          {
            z: 3,
            name: "数据",
            type: "pictorialBar",
            symbolPosition: "end",
            data: showData,
            symbol: "diamond",
            symbolOffset: ["0%", "-50%"],
            symbolSize: [barWidth - 4, (10 * (barWidth - 4)) / barWidth],
            itemStyle: {
              normal: {
                borderColor: colorArr[2],
                borderWidth: 2,
                color: colorArr[2],
              },
            },
            tooltip: {
              show: false,
            },
          },
        ],
      };
    },
  },
};
</script>

<style scoped lang="less">
.chart {
  width: 437px;
  height: 310px;
}
</style>
