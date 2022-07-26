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
      <div class="center">
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
      <div class="center">
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
      <div class="bottom">
        <div class="comm-title">苏苏小苏苏</div>
        <div class="bottom-box">
          <data-bar-circle :data="importAreaList"></data-bar-circle>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataPie from "./components/echarts/pie.vue";
import dataLine from "./components/echarts/line.vue";
import dataBar from "./components/echarts/bar.vue";
import dataSpread from "./components/echarts/spread.vue";
import dataBarCircle from "./components/echarts/barCircle.vue";
import dataShadow from "./components/echarts/barShadow.vue";
export default {
  name: "dataCharts",
  components: {
    dataPie,
    dataLine,
    dataBar,
    dataSpread,
    dataBarCircle,
    dataShadow,
  },
  data() {
    return {
      leaderList: [],
      personList: [
        {
          stationName: "苏苏2",
          value: 90,
        },
        {
          stationName: "苏苏44",
          value: 40,
        },

        {
          stationName: "苏苏12",
          value: 0,
        },
        {
          stationName: "苏苏12",
          value: 1,
        },
        {
          stationName: "苏苏12",
          value: 0,
        },
        {
          stationName: "苏苏99",
          value: 99,
        },
      ],
      realTimeAlarmList: {},
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
        {
          stationName: "分各个",
          value: 644,
        },
        {
          stationName: "卢卡申科来得及发",
          value: 899,
        },
        {
          stationName: "手动添加了立式空调",
          value: 644,
        },
        {
          stationName: "切记全文",
          value: 777,
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
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
.chartsBox {
  background: linear-gradient(90deg, #03224e 0%, #011030 100%);
  padding: 38px 40px;
  box-sizing: border-box;
  height: 100vh;
  overflow-y: scroll;
}
.comm-title {
  font-size: 18px;
  font-family: AlibabaPuHuiTiM;
  color: #e1f3ff;
  line-height: 25px;
  position: relative;
  padding-left: 10px;
  font-weight: bold;
  margin-bottom: 20px;
  &::after {
    content: "";
    width: 3px;
    height: 18px;
    background: #83c2ee;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    margin-bottom: 20px;
  }
}
.home-left {
  width: 437px;
  margin-right: 40px;
  .center {
    width: 100%;
    height: 355px;
  }
  .bottom {
    width: 100%;
  }
}
.home-center {
  width: 640px;
  margin-right: 40px;
  .head {
    width: 100%;
    margin-bottom: 15px;
  }
  .center {
    height: 355px;
  }
  .bottom {
    width: 100%;
  }
}
.home-right {
  width: 437px;
  .head {
    width: 100%;
    height: 113px;
    margin-top: 38px;
    margin-bottom: 40px;
  }
  .bottom {
    width: 100%;
  }
}

.mb20 {
  margin-bottom: 20px;
}
</style>
