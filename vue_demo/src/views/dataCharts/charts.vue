<template>
  <div class="flex chartsBox j_b">
    <div class="home-left">
      <div class="center mb20">
        <div class="comm-title">苏苏小苏苏</div>
        <div class="center-box">
          <data-spread :data="personList"></data-spread>
        </div>
      </div>
      <div class="bottom mb20">
        <div class="comm-title">苏苏小苏苏</div>
        <div class="bottom-box">
          <data-pie :data="importAreaList"></data-pie>
        </div>
      </div>
      <div class="last-b mb20">
        <div class="comm-title">苏苏小苏苏</div>
        <div class="center-box">
          <data-shadow byKey="one"></data-shadow>
        </div>
      </div>
    </div>
    <div class="home-center">
      <div class="center">
        <div class="comm-title">苏苏小苏苏</div>
        <div class="center-box">
          <data-line :data="trendList" :smooth="true" byKey="one"></data-line>
        </div>
      </div>
      <div class="bottom mb20">
        <div class="comm-title">苏苏小苏苏</div>
        <div class="bottom-box">
          <data-line :data="trendList" byKey="two"></data-line>
        </div>
      </div>
      <div class="last-b">
        <div class="comm-title">苏苏小苏苏</div>
        <div class="center-box">
          <data-shadow byKey="two"></data-shadow>
        </div>
      </div>
    </div>
    <div class="home-right">
      <div class="center">
        <div class="comm-title">苏苏小苏苏</div>
        <div class="center-box">
          <data-bar :data="importAreaList"></data-bar>
        </div>
      </div>
      <div class="bottom mb20">
        <div class="comm-title">苏苏小苏苏</div>
        <div class="bottom-box">
          <data-bar-circle :data="importAreaList"></data-bar-circle>
        </div>
      </div>
      <div class="last-b">
        <div class="comm-title">苏苏小苏苏</div>
        <div class="center-box">
          <data-gra></data-gra>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 批量注册局部组件--组件必须有name字段
const requireComponent = require.context(
    "./components/echarts",
    true,
    /\w+\.(vue|js)$/
  ),
  comps = {};
requireComponent.keys().forEach((fileName) => {
  let com = requireComponent(fileName).default;
  comps[com.name] = com;
});
export default {
  name: "dataCharts",
  components: {
    ...comps,
  },
  data() {
    return {
      leaderList: [],
      personList: [
        {
          stationName: "苏苏2",
          value: 9000,
        },
        {
          stationName: "苏苏12",
          value: 777,
        },
        {
          stationName: "苏苏12",
          value: 6666,
        },
        {
          stationName: "苏苏12",
          value: 5555,
        },
        {
          stationName: "苏苏99",
          value: 4,
        },
      ],
      trendList: [
        ["0:00", "6:00", "8:00", "12:00", "16:00", "20:00", "24:00"],
        [222, 932, 66, 934, 111, 333, 0],
      ],
      alarmList: {},
      importAreaList: [
        {
          stationName: "测试11",
          value: 878,
        },
        {
          stationName: "测试222",
          value: 399,
        },
        {
          stationName: "胜多负少",
          value: 578,
        },
        {
          stationName: "十大歌手的风格",
          value: 699,
        },
        {
          stationName: "测试333",
          value: 66,
        },
        {
          stationName: "测试444",
          value: 99,
        },
        {
          stationName: "测试555",
          value: 977,
        },
        {
          stationName: "测试666",
          value: 699,
        },
        {
          stationName: "测试67",
          value: 844,
        },
        {
          stationName: "水电费",
          value: 799,
        },
      ],
      specialList: [],
      stationList: [],
    };
  },
  created() {
    this.importAreaList = this.tools.getSortData(this.importAreaList, "value");
    let maxValue = Math.max.apply(
      Math,
      this.personList.map((item) => {
        return parseInt(item.value);
      })
    );
    this.personList = this.tools.getSortData(this.personList, "value");
    this.personList.forEach((item, index) => {
      item.per = maxValue == 0 ? 0 : (parseInt(item.value) / maxValue) * 100;
      if (index < 3) {
        item.color = "#FF7E3C";
        item.dropColor = "#FE6E23";
        item.activeColor =
          "linear-gradient(270deg, #FF7E3C 0%, rgba(255,126,60,0) 100%)";
      } else {
        item.color = "#5EB6FF";
        item.dropColor = "#5EB6FF";
        item.activeColor =
          "linear-gradient(270deg, #5EB6FF 0%, rgba(94,182,255,0) 100%)";
      }
    });
  },
  mounted() {
    // setTimeout(() => {
    //   this.trendList = [
    //     ["0:00", "6:00", "8:00", "12:00", "16:00", "20:00", "24:00"],
    //     [0, 0, 66, 0, 111, 333, 0],
    //   ];
    // }, 1000);
    // setTimeout(() => {
    //   this.trendList = [
    //     ["0:00", "6:00", "9:00", "12:00", "16:00", "20:00", "24:00"],
    //     [999, 33, 66, 0, 111, 888, 0],
    //   ];
    // }, 2000);
    // setTimeout(() => {
    //   this.trendList = [
    //     ["0:00", "6:00", "11:00", "12:00", "16:00", "20:00", "24:00"],
    //     [9, 0, 1000, 0, 111, 55555, 0],
    //   ];
    // }, 3000);

    setTimeout(() => {
      this.personList.unshift({
        stationName: "动态插入一个数据",
        value: 10000,
      });
    }, 5000);
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>
