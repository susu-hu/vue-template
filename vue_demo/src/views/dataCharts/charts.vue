<template>
  <div class="chartsBox">
    <div class="flex j_b">
      <div class="home-left">
        <div class="head"></div>
        <div class="center">
          <div class="comm-title">苏苏小苏苏</div>
          <div class="center-box"></div>
        </div>
        <div class="bottom">
          <div class="comm-title">苏苏小苏苏</div>
          <div class="bottom-box">
            <data-pie :data="importAreaList"></data-pie>
          </div>
        </div>
      </div>
      <div class="home-center">
        <div class="head"></div>
        <div class="center">
          <div class="comm-title">苏苏小苏苏</div>
          <div class="center-box">
            <data-line :data="trendList" :smooth="true" byKey="one"></data-line>
          </div>
        </div>
        <div class="bottom">
          <div class="comm-title">苏苏小苏苏</div>
          <div class="bottom-box">
            <data-line :data="trendList" byKey="two"></data-line>
          </div>
        </div>
      </div>
      <div class="home-right">
        <div class="head">
          <div class="comm-title">苏苏小苏苏</div>
        </div>
        <div class="center">
          <div class="comm-title">苏苏小苏苏</div>
          <div class="center-box">
            <data-bar :data="importAreaList"></data-bar>
          </div>
        </div>
        <div class="bottom">
          <div class="comm-title">苏苏小苏苏</div>
          <div class="bottom-box"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataPie from "./components/echarts/pie.vue";
import dataLine from "./components/echarts/line.vue";
import dataBar from "./components/echarts/bar.vue";
export default {
  name: "dataCharts",
  components: {
    dataPie,
    dataLine,
    dataBar,
  },
  data() {
    return {
      leaderList: [], //值班领导
      personList: {}, //核定井下人数
      realTimeAlarmList: {}, //实时告警数据
      trendList: [], //人员趋势
      alarmList: {}, //告警统计
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
          value: 999,
        },
        {
          stationName: "测试444",
          value: 688,
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
        // {
        //   stationName: "胜多负少是",
        //   value: 544,
        // },
        // {
        //   stationName: "哦你了框架",
        //   value: 777,
        // },
        // {
        //   stationName: "苏苏就是小苏苏呀有啊",
        //   value: 444,
        // },
        // {
        //   stationName: "苏苏就是小苏苏呀有啊1231232",
        //   value: 399,
        // },
        // {
        //   stationName: "pool",
        //   value: 244,
        // },
        // {
        //   stationName: "悔恨交加",
        //   value: 777,
        // },
      ], //重点区域人员分布
      specialList: [], //特种人员变化趋势
      stationList: [], //分站统计
    };
  },
};
</script>

<style lang="less" scoped>
@import url("./index.less");
.chartsBox {
  background: linear-gradient(90deg, #03224e 0%, #011030 100%);
  padding: 38px 40px;
  box-sizing: border-box;
}
.comm-title {
  font-size: 18px;
  font-family: AlibabaPuHuiTiM;
  color: #e1f3ff;
  line-height: 25px;
  position: relative;
  padding-left: 10px;
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
  .head {
    margin: 48px 0 40px;
    width: 437px;
    height: 93px;
    background-size: 100% 100%;
  }
  .center {
    width: 100%;
    height: 325px;
  }
  .bottom {
    width: 100%;
    height: 310px;
  }
}
.home-center {
  width: 616px;

  .head {
    width: 100%;
    height: 113px;
    margin-bottom: 40px;
  }
  .center {
    height: 325px;
  }
  .bottom {
    width: 100%;
    height: 310px;
  }
}
.home-right {
  width: 437px;

  .head {
    width: 100%;
    height: 113px;
    margin-bottom: 40px;
  }
  .center {
    height: 325px;
  }
  .bottom {
    width: 100%;
    height: 310px;
  }
}
</style>