<!--
 * @Author: 胡苏珍 1628469970@qq.com
 * @Date: 2022-07-12 11:00:28
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-08-04 23:11:54
 * @FilePath: \control-platform-vue\src\view\threePosition\echarts\spread.vue
 * @Description: 
-->
<template>
  <div class="sp-box">
    <vue-seamless-scroll :data="list" :class-option="defaultOption">
      <div v-for="(item, index) in list" :key="index">
        <div class="flex-row mb-12 j_b">
          <div class="flex-row">
            <div
              class="trangle"
              :style="{ '--color': item.color, '--dropColor': item.dropColor }"
            ></div>

            <span class="title">{{ item.stationName }}</span>
          </div>
          <span class="value" :style="{ '--color': item.color }">{{
            item.value
          }}</span>
        </div>
        <div class="line">
          <div
            class="line-active"
            :style="{
              '--bgColor': item.activeColor,
              '--per': item.per + '%',
              '--delay': index + 's',
            }"
          >
            <img :src="points" />
          </div>
        </div>
      </div>
    </vue-seamless-scroll>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  name: "dataSpread",
  components: {
    vueSeamlessScroll,
  },
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
        console.log(this.list);
      },
    },
  },
  computed: {
    defaultOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 5, // 开始无缝滚动的数据量
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  data() {
    return {
      points: require("@/assets/img/point.png"),
      list: [],
      maxValue: 0,
    };
  },
};
</script>

<style scoped lang="less">
.sp-box {
  height: 313px;
  width: 100%;
  overflow: hidden;
}
.line {
  width: 95%;
  margin: 0 auto;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  margin-bottom: 20px;
  position: relative;
  &-active {
    width: 0; //var(--per);
    background: var(--bgColor);
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 2px;
    img {
      width: 20px;
      height: 20px;
      position: absolute;
      right: -10px;
      top: 50%;
      transform: translateY(-50%);
    }
    animation: deep 1s var(--delay) linear forwards;
  }
}
@keyframes deep {
  0% {
    width: 0;
  }
  100% {
    width: var(--per);
  }
}
.title {
  font-size: 14px;
  font-family: AlibabaPuHuiTiM;
  color: #ffffff;
  line-height: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  margin-left: 9px;
}
.value {
  font-size: 20px;
  font-family: AlibabaPuHuiTiB;
  line-height: 27px;
  letter-spacing: 2px;
  font-weight: bold;
  color: var(--color);
}
.mb-12 {
  margin-bottom: 12px;
}
.trangle {
  width: 0px;
  height: 0px;
  border: 7px solid transparent;
  border-left: 14px solid var(--color);
  filter: drop-shadow(2px 2px 2px var(--dropColor));
}
</style>
