<template>
  <div class="contentBox">
    <div id="chart" ref="chart" class="chart"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import elementResizeDetectorMaker from "element-resize-detector";
var erd = elementResizeDetectorMaker();
export default {
  data() {
    return {
      charts: null,
    };
  },
  mounted() {
    if (this.charts == null) {
      this.charts = echarts.init(document.getElementById("chart"), null, {
        renderer: "canvas",
      });
    }
    this.initData5();
    erd.listenTo(document.getElementById("chart"), this.handleWindowResize);
  },
  beforeDestroy() {
    erd.uninstall(this.$refs.lineCharts);
  },
  methods: {
    handleWindowResize() {
      if (!this.charts) return;
      this.$nextTick(() => {
        this.charts.resize();
      });
    },
    initData() {
      var XName = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
      var data1 = [
        [123, 154, 234, 321, 120, 390, 634],
        [63, 194, 234, 321, 278, 110, 534],
        [53, 254, 234, 321, 118, 240, 434],
        [23, 354, 334, 221, 178, 190, 234],
      ];
      var Line = [
        "云篆山水路线",
        "昕博朗学校路线",
        "新华小学路线",
        "云锦五路路线",
      ];
      var img = [
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC",
        "image://data:image/png;base64,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",
        "image://data:image/png;base64,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",
        "image://data:image/png;base64,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",
      ];
      var color = ["#00f8ff", "#00f15a", "#0696f9", "#dcf776"];

      //数据处理
      var datas = [];
      Line.map((item, index) => {
        datas.push({
          symbolSize: 150,
          symbol: img[index],
          name: item,
          type: "line",
          yAxisIndex: 1,
          data: data1[index],
          itemStyle: {
            normal: {
              borderWidth: 5,
              color: color[index],
            },
          },
        });
      });

      var option = {
        backgroundColor: "#0e2147",
        grid: {
          left: "5%",
          top: "5%",
          bottom: "5%",
          right: "5%",
        },
        legend: {
          type: "scroll",
          data: Line,
          itemWidth: 18,
          itemHeight: 12,
          textStyle: {
            color: "#00ffff",
            fontSize: 14,
          },
        },
        yAxis: [
          {
            type: "value",
            position: "right",
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
          },
          {
            type: "value",
            position: "left",
            nameTextStyle: {
              color: "#00FFFF",
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "rgba(135,140,147,0.8)",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              formatter: "{value}",
              color: "#fff",
              fontSize: 14,
            },
          },
        ],
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#6A989E",
              },
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff", // x轴颜色
                fontWeight: "normal",
                fontSize: "14",
                lineHeight: 22,
              },
            },
            data: XName,
          },
          {
            type: "category",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitArea: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            //-----
            data: ["1月", "2月", "3月", "4月", "5月", "6月"],
          },
        ],
        series: datas,
      };
      this.charts.clear();
      this.charts.setOption(option);
    },
    initData2() {
      this.charts.setOption({
        backgroundColor: "#0e2147",
        color: ["#00D8FF"],
        tooltip: {
          trigger: "axis",
        },
        legend: {
          y: "bottom",
          itemGap: 30,
          itemWidth: 30,
          itemHeight: 10,
          textStyle: {
            fontSize: 13, //字体大小
            color: "rgb(142, 199, 220)", //字体颜色
          },
        },
        calculable: true,

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              "06:00",
              "09:00",
              "12:00",
              "15:00",
              "18:00",
              "21:00",
              "24:00",
            ],
            axisLabel: {
              show: true,
              textStyle: {
                color: ["rgb(142, 199, 220)"],
              },
            },
            axisLine: {
              lineStyle: {
                color: "#023c7a",
                width: 1,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} °C",
              show: true,
              textStyle: {
                color: ["rgb(142, 199, 220)"],
              },
            },
            splitLine: {
              lineStyle: {
                color: "#023c7a",
                width: 1,
              },
            },
            axisLine: {
              lineStyle: {
                color: "#023c7a",
                width: 1,
              },
            },
          },
        ],
        series: [
          {
            symbolSize: 0, //折线点的大小

            type: "line",
            data: [6000, 4000, 8000, 10000, 4000, 2000, 4000, 2000, 6000],
            areaStyle: {
              normal: {
                //前四个参数代表位置 左下右上，暗青色到亮青色，
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "rgba(12,180,250, 1)" }, //从上往下的渐变
                  { offset: 1, color: "rgba(63, 208, 249, 0)" },
                ]),
              },
            },

            lineStyle: {
              shadowColor: "#5cfbff", //透明的颜色
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              opacity: 1, //透明度
              shadowBlur: 8, //阴影大小
              type: "solid", //实线
              width: 2,
            },
          },
        ],
      });
    },
    initData3() {
      //  renderer: "svg",渲染
      //数据
      var XName = [
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日",
        "粥吧",
      ];
      var data1 = [67, 97, 51, 338, 32, 11, 1, 999];
      var img = [
        "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABRCAYAAABFTSEIAAAACXBIWXMAAAsSAAALEgHS3X78AAAEp0lEQVR42u3cz4sjRRTA8W9Vd3Vn8mMmjj9WQWSRZQ+CsH+B7MnDIgiCd0E8CYJ/gOAIelo8ehUP/gF6WLw5/gMueFP2sIcF0dHd2Z1kknR11fOQZJJJMtlZd03H7HtQpNOTnpn+8Lrm1etmjIig8e/DKoECKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIqoAJudKTr+osZMNPvBUQBHwHsPF9fB9R0DeHMOQ6T6WOrhEzXBM4swDOL0M6CrArRVoq3t2dGUIb9fTvatg8ZZup1PDBgzPmy98mey6qfzjLz2WaWjEUZKEvGyi9nWyneMOvGIyFQo2Sbg4MUSChpU9IeTTUpJdsEajPZOJeJG5uBZj7rLLduWS5dGm6XNLEELOFUFj54ACJCaychkpDSASK3bwsXL0YgVpWJKwM0iy9Zy8HdGru7jvt3Pbu7w0wES7drTwAbjTHMGCsQcIAnYTC1/wRx0wEnl27JNgZI8HQ6Kc1mQq83RNzaMjPzXqDbjTQaJRFLxIyyMSxAXEkWrhrQzAAmo5HOjCQf7jflILxOkohL+aUPgV4vEGNJo+E5PAy02+UIMEwBxo0CPDP7Dg5SnEtpt1PA0e87XO25FOoh8IYIH2Y5b45RzGAQBiIltZoHxqMcjbksXAVgdc2EQMYzzzdotyeZWKuleULXJtwT4SODfC2QCWR+IF9KnjuX1Xbo99Op7LVE8iXlz0YBTk5SyLEEjo5OLuccEoFUvHfO+reuUPx4zftXAIcx1hdcF+/TvFab4A0Bs0VwqyhpVnkJT89/Q4DDQ0e77YCMwIUsFMeFZD856699URRvX4nxE4A/jbnxXp7v4Zw3ReGNSDHI8wFQjIafuoyn58L/fB6sth/Ybg9fez2TRC6QZcZYvgHsazF+MP7YCyLXcM7gvSXLDGBqYDg+NhwdmSpPoTrAkub0W+f4FSB1fDucIunMHSLpO8WAH0rSy8u+19MBCHB4OHzd2pI+CEUhpigEiN+l6WcdY252jLn5s7Wf472ImPcN8pUl/tEHoV4XWq1Ke4KrLmPsTA3oODpytFoOyJKSyzHyMSIxteWngMW5cSEdDJQUhTdZVgxOz3/+jFJm4+bA2e5JpNU6WZ4Fw99JwnWMKccwpeddP+B7GZTNUPKqybJy0O+Hs1YfMz9swwvpB8fbGDG0GuGkkK7V0hxSmZQpABI8l2z0v3sJf50qpAMJCd2qCulql3LD1lRGQjm7lEsDz0rkxTQOfiPPxUBcuJTbbhss/Y1eyi3NwsmKInmkZsKk5gtPUzNhvp11507CSy/X6XYStpvFudpZw1ZWIOF4Cq6SdtbKbioJyAhRTu3u9yMJXerN+ugvaQQsjcZ8Q3VnZwxlSDhe1lB9GjrSw5b+1avT8+Jw+979nNaOI6U3KpTrWAosxVQmygK4ld8X0ZtK/7eViExD7O1NQPb3T7fsl4/4sBpwYzPwjFbTo95Yl9l9Vd1YN1X/147HebSjary1AHyc5qc+XLQEQx9ve8Kg6xr6hKoCKqACKqCGAiqgAiqghgIqoAIqoIYCKqACKqCGAiqgAiqghgIq4JrHP8fEWV8FMTmOAAAAAElFTkSuQmCC",
        "image://data:image/png;base64,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",
        "image://data:image/png;base64,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",
        "image://data:image/png;base64,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",
      ];
      var data = [
        {
          coords: [
            ["周一", 67],
            ["周二", 97],
            ["周三", 51],
            ["周四", 338],
            ["周五", 32],
            ["周六", 11],
            ["周日", 1],
            ["粥吧", 999],
          ],
        },
      ];

      var option = {
        backgroundColor: "#0e2147",
        grid: {
          left: "5%",
          top: "5%",
          bottom: "5%",
          right: "5%",
        },
        legend: {
          type: "scroll",
          data: "来电量",
          itemWidth: 18,
          itemHeight: 12,
          textStyle: {
            color: "#00ffff",
            fontSize: 14,
          },
        },
        yAxis: [
          {
            type: "value",
            position: "left",
            nameTextStyle: {
              color: "#00FFFF",
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "rgba(135,140,147,0.8)",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              formatter: "{value}",
              color: "#fff",
              fontSize: 14,
            },
          },
        ],
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#0696f9",
              },
            },
            axisLabel: {
              inside: false,
              textStyle: {
                color: "#fff", // x轴颜色
                fontWeight: "normal",
                fontSize: "14",
                lineHeight: 22,
              },
            },
            data: XName,
          },
        ],
        series: [
          {
            symbolSize: 150,
            symbol: img[2],
            name: "小灯光",
            type: "line",
            data: data1,
            itemStyle: {
              normal: {
                borderWidth: 5,
                color: "#0696f9",
              },
            },
          },
          {
            name: "滑行的光点",
            type: "lines",
            coordinateSystem: "cartesian2d",
            symbolSize: 30,
            polyline: true,
            effect: {
              show: true,
              trailLength: 0,
              period: 10, //光点滑动速度
              symbolSize: 150,
              symbol: img[0],
              color: "transparent",
            },
            lineStyle: {
              normal: {
                width: 1,
                opacity: 0.6,
                curveness: 0.2,
              },
            },
            data: data,
          },
        ],
      };
      this.charts.setOption(option);
    },
    // 实心圆点背景透明
    initData4() {
      var data = {
        city: ["0", "4", "8", "12", "16", "20"],
        num: ["40", "60", "22", "85", "50", "40"],
      };
      var option = {
        backgroundColor: "#0e1c47",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,255,255,0)", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(255,255,255,1)", // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,255,255,0)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        },
        grid: {
          top: "18%",
          left: "15%",
          right: "5%",
          bottom: "25%",
          // containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: 'color:"#092b5d"',
              },
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: "#24c4ff",
                margin: 15,
              },
              formatter: function (data) {
                return data + "时";
              },
            },
            axisTick: {
              show: false,
            },
            data: data.city,
          },
        ],
        yAxis: [
          {
            min: 0,
            max: 100,
            splitLine: {
              show: true,
              lineStyle: {
                color: "#092b5d",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#092b5d",
              },
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#24c4ff",
              },
              formatter: function (value) {
                if (value === 0) {
                  return value;
                }
                return value + "%";
              },
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "注册总量",
            type: "line",
            symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 8,
            lineStyle: {
              normal: {
                color: "#7c80f4", // 线条颜色
              },
              borderColor: "rgba(0,0,0,.4)",
            },
            itemStyle: {
              color: "rgba(14,30,73,1)",
              borderColor: "#646ace",
              borderWidth: 2,
            },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: [" {a|{c}%}"].join(","),
                rich: {
                  a: {
                    color: "#fff",
                    align: "center",
                  },
                },
              },
            },
            tooltip: {
              show: true,
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(124, 128, 244,.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(124, 128, 244, 0)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(53,142,215, 0.9)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: data.num,
          },
        ],
      };
      this.charts.setOption(option);
    },
    // 折线图流动不分段
    initData5() {
      // 统计百分比
      var data1 = [14, 15, 65, 24, 75, 23, 24, 43, 27, 72, 12, 53];
      var data2 = [45, 65, 24, 74, 75, 23, 42, 54, 13, 32, 52, 13];
      var json = {
        chart0: {
          xcategory: [
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
          low: data1,
          lowLine: [],
        },
      };
      var json2 = {
        chart0: {
          xcategory: [
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
          low: data2,
          lowLine: [],
        },
      };
      var datacoords = [
        {
          coords: [],
        },
      ];
      var datacoords2 = [
        {
          coords: [],
        },
      ];
      for (let i = 0; i < json.chart0.xcategory.length; i++) {
        datacoords[0].coords.push([json.chart0.xcategory[i], data1[i]]);
      }
      for (let i = 0; i < json.chart0.xcategory.length; i++) {
        datacoords2[0].coords.push([json2.chart0.xcategory[i], data2[i]]);
      }

      var option = {
        backgroundColor: "#03060F",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            lineStyle: {
              color: "#15ecf4",
            },
          },
          backgroundColor: "rgba(0,0,0,.8)",
          extraCssText: "box-shadow: 4px 4px 10px rgba(21, 250, 255,.6);",
          formatter: function (params) {
            var result = params[0].name + "<br>";
            params.forEach(function (item) {
              result +=
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' +
                item.color +
                '"></span>';
              // 判断设置增长还是降低
              if (parseFloat(item.data) >= 50) {
                result +=
                  item.seriesName +
                  ": " +
                  '<span class="growth">增长' +
                  item.data +
                  "%</span><br>";
              } else if (parseFloat(item.data) < 50) {
                result +=
                  item.seriesName +
                  ": " +
                  '<span class="reduce">降低' +
                  item.data +
                  "%</span><br>";
              }
            });
            return result;
          },
        },
        legend: {
          data: ["同比", "环比"],
          textStyle: {
            fontSize: 12,
            color: "rgb(0,253,255,0.6)",
          },
          top: "5%",
          right: "5%",
        },
        grid: {
          bottom: 50,
          left: 70,
          right: 50,
        },
        xAxis: {
          axisLine: {
            show: true,
            lineStyle: {
              color: "#15faff",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
          },
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
        yAxis: {
          max: 100,
          splitNumber: 4,
          interval: 25,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dashed",
              color: "#4b4d64",
            },
          },
          axisLabel: {
            formatter: "{value} %",
            textStyle: {
              //改变刻度字体样式
              color: "#ffffff",
            },
          },
        },
        series: [
          {
            name: "环比",
            type: "line",
            // smooth: true,
            symbol: "none",
            symbolSize: 10,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(255, 204,1, .9)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(6, 8, 41,.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "#ffcb00",
              },
            },
            data: data1,
          },
          {
            name: "环比",
            type: "lines",
            coordinateSystem: "cartesian2d",
            zlevel: 1,
            polyline: true,
            // smooth: true,
            symbol: "circle",
            effect: {
              show: true,
              trailLength: 0.4,
              symbol: "circle",
              period: 8, //光点滑动速度
              symbolSize: 8,
            },
            lineStyle: {
              normal: {
                color: "#ffcb00",
                width: 0,
                opacity: 0,
                curveness: 0,
              },
            },
            data: datacoords,
          },
          {
            name: "同比",
            type: "line",
            smooth: false,
            symbol: "none",
            symbolSize: 10,
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(21, 250, 255,.9)",
                    },
                    {
                      offset: 0.8,
                      color: "rgba(6, 8, 41,.1)",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(0, 0, 0, 0.1)",
                shadowBlur: 10,
              },
            },
            itemStyle: {
              normal: {
                color: "#15faff",
              },
            },
            data: data2,
          },
          {
            name: "同比",
            type: "lines",
            coordinateSystem: "cartesian2d",
            zlevel: 1,
            polyline: true,
            symbol: "circle",
            effect: {
              show: true,
              trailLength: 0.4,
              symbol: "circle",
              period: 8, //光点滑动速度
              symbolSize: 8,
            },
            lineStyle: {
              normal: {
                color: "#15faff",
                width: 0,
                opacity: 0,
                curveness: 0,
              },
            },
            data: datacoords2,
          },
        ],
      };
      this.charts.setOption(option);
    },
    // 三条折线重叠，组成一小段流动效果
    initData6() {
      var option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#49bfde",
            },
          },
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#fff",
              // shadowOffsetX: 0, // 折线的X偏移
              // shadowOffsetY: 3, // 折线的Y偏移
              shadowBlur: 2, // 折线模糊
              // shadowColor: "rgba(0,204,169,0.95)", //折线颜色
            },
            animationDelay: 50,
            animationDuration: 15000,
          },
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            lineStyle: {
              color: "#49bfde",
            },
            animationDelay: 500,
            animationDuration: 5000,
          },
        ],
      };
      this.charts.setOption(option);
    },
    initData7() {},
  },
};
</script>
<style scoped lang="less">
.chart {
  width: 100%;
  height: 600px;
  color: transparent;
}
</style>
