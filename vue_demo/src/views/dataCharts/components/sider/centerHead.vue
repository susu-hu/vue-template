


<template>
  <div class="content">
    <div class="flex-row j_c head">
      <div class="flex-column j_c head-box">
        <span class="title">核定井下总人数</span>
        <div class="flex-row">
          <label class="numTotal " v-for="(item, index) in (data.limitCount + '').split('')" :key="index">
            <numRoll :number="parseInt(data.limitCount)"></numRoll>
          </label>
        </div>
      </div>
      <div class="flex-column j_c">
        <span class="title">当前井下总人数</span>
        <div class="flex-row">
          <label class="numTotal " v-for="(item, index) in (data.currentCount + '').split('')" :key="index">
            <numRoll :number="parseInt(data.currentCount)"></numRoll>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numRoll from "@/components/numRoll/index"; //滚动字
export default {
  components: { numRoll },
  name: "centerHead",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {};
  },
  created() {},
};
</script>

<style scoped lang="less">
@import "@/styles/mixin.less";
@import url("../base.less");
.content {
  width: 640px;
  height: 214px;
  background: url("../../../assets/images/threePosition/c-head-bg.png")
    no-repeat;
  background-size: 100% 100%;
  .head {
    width: 100%;
    box-sizing: border-box;
    padding: 49px 0;
    &-box {
      &:nth-child(1) {
        margin-right: 80px;
      }
    }
    .title {
      height: 27px;
      font-size: 20px;
      font-family: AlibabaPuHuiTiM;
      color: rgba(255, 255, 255, 0.9);
      line-height: 27px;
      margin-bottom: 14px;
    }
    .numTotal {
      text-align: center;
      width: 30px;
      height: 42px;
      background: url("../../../assets/images/threePosition/num-bg.png")
        no-repeat;
      background-size: 100% 100%;
      margin-right: 16px;
      &:last-child {
        margin-right: 0;
      }

      /deep/ .num-roll {
        .pt(4);

        .box-item span {
          filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.22));
          background: linear-gradient(180deg, #f7cf3a 0%, #fc9704 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 30px;
        }
      }
    }
  }
}
</style>

