<template>
  <div class="flex-row contentBox">
    <div
      id="charts"
      style="width: 500px; height: 500px; margin-right: 30px"
    ></div>
    <div id="chartsLine" style="width: 700px; height: 500px"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      timer: null,
      chart: null,
      chart2: null,
      dataSource: [
        { name: "一组", value: 742867 },
        { name: "二组", value: 655551 },
        { name: "三组", value: 85551 },
        { name: "四组", value: 200 },
        { name: "五组", value: 652 },
        { name: "六组", value: 96 },
      ],
      pieData: [],
    };
  },
  watch: {
    pieData: {
      handler() {
        this.drawChart();
      },
    },
  },
  created() {
    this.pieData = this.dataSource.sort((a, b) => b.value - a.value);
  },
  mounted() {
    this.chart = echarts.init(document.getElementById("charts"));
    this.drawChart();
    this.chart2 = echarts.init(document.getElementById("chartsLine"));
    this.drawChart2();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
    this.chart2.dispose();
    this.chart2 = null;
    clearInterval(this.timer);
  },
  methods: {
    addData(shift, oneDay, now, date, data) {
      now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/");
      date.push(now);
      data.push((Math.random() - 0.4) * 10 + data[data.length - 1]);
      if (shift) {
        date.shift();
        data.shift();
      }
      now = new Date(+new Date(now) + oneDay);
    },
    drawChart2() {
      var option;
      var base = +new Date(2014, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var date = [];
      var data = [Math.random() * 150];
      var now = new Date(base);
      for (var i = 1; i < 100; i++) {
        this.addData("", oneDay, now, date, data);
      }
      console.log(data);
      console.log(date);
      option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          boundaryGap: [0, "50%"],
          type: "value",
        },
        series: [
          {
            name: "成交",
            type: "line",
            smooth: true,
            symbol: "none",
            stack: "a",
            areaStyle: {
              normal: {},
            },
            data: data,
          },
        ],
      };
      this.timer = setInterval(() => {
        this.addData(true, oneDay, now, date, data);
        this.chart2.setOption({
          xAxis: {
            data: date,
          },
          series: [
            {
              data: data,
            },
          ],
        });
      }, 500);
      option && this.chart2.setOption(option);
    },
    drawChart() {
      let _this = this;
      this.chart.setOption({
        color: ["pink", "#2772FB"],
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          formatter: (p) => {
            let target = this.dataSource.find((it) => it.name === p.name);
            let temp = 0;
            this.dataSource.forEach((it) => {
              temp += it.value;
            });
            let sum = temp;
            let realVal = target.value;
            let realPercent = (realVal / sum).toFixed(5);
            return target.name + " " + realVal + "￥\n (" + realPercent + "%)";
          },
        },
        title: {
          show: false,
          text: "苏苏",
          textAlign: "center",
          textVerticalAlign: "middle",
          top: "43%",
          left: "center",
          textStyle: {
            color: "#3C3B39",
            fontWeight: "normal",
            fontFamily: "苹方-简",
            fontSize: 22,
          },
        },
        legend: {
          data: _this.pieData.map((it) => it.name),
          type: "plain", // 普通图例
          orient: "horizontal", // 水平
          right: 0, // 左距离
          top: 0, // 下距离
          // itemGap: 20, // 间隔
          itemWidth: 22, // 图形宽度。
          itemHeight: 4, // 图形高度。
          itemStyle: {},
        },
        series: [
          {
            type: "pie",
            avoidLabelOverlap: true,
            radius: ["0%", "70%"],
            center: ["50%", "50%"],
            roseType: true,
            minAngle: 5,
            label: {
              show: true,
              bleedMargin: 0, // 放置文字被折叠
              alignTo: "labelLine",
              formatter: (p) => {
                let target = this.dataSource.find((it) => it.name === p.name);
                let temp = 0;
                this.dataSource.forEach((it) => {
                  temp += it.value;
                });
                let sum = temp;
                let realVal = target.value;
                let realPercent = (realVal / sum).toFixed(5);
                return realVal + "￥\n (" + realPercent + "%)";
              },
              // rich: {
              //   bs: {
              //     color: '#000',
              //     fontSize: 14,
              //   },
              //   ds: {
              //     color: '#000',
              //     fontSize: 14,
              //   },
              //   cs: {
              //     color: '#000',
              //     fontSize: 12,
              //     align: 'center',
              //   },
              // },
            },
            itemStyle: {
              borderRadius: 10,
              borderColor: "#f5f5f5",
              borderWidth: 2,
              label: {
                position: "inside",
                fontSize: "16",
                align: "center",
                fontWeight: "bolder",
                fontFamily: "苹方-简",
                overflow: "breakAll",
              },
              labelLine: {
                show: true,
              },
            },

            data: _this.pieData.map((it) => {
              // 这里为了放大数据的差距，在roseType:true时，让小值能够较好的展示出来，如果roseType为false。 直接赋值_this.pieData，需要注意的时候，label和 tooltip的展示值需要调整
              return {
                name: it.name,
                value: Math.pow(it.value, 0.099), // 值越大，数据差越小 最大值为0.5
              };
            }),
          },
        ],
      });
      _this.resize(); //首次绘制 resize
    },
    resize() {
      this.chart.resize({
        width: "auto", //自动获取dom宽度
        height: (() => {
          return "auto";
        })(),
      });
    },
  },
};
</script>
