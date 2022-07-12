<template>
  <div class="content">
    <div class="flex-row j_b head">
      <div v-for="(item,index) in list" :key="index">
        <div class="flex-column j_c">
          <div class="flex-row">
            <img :src="item.img" class="u-img" />
            <span class="u-value">{{item.value}}</span>
          </div>
          <span class="u-name">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rightHead",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    data: {
      handler(val) {
        console.log(val);
        let list = [];
        let names = [
          {
            key: "timeoutCount",
            name: "超时人数",
            img: require("@/assets/images/threePosition/alert-p1.png"),
          },
          {
            key: "overManCount",
            name: "超员人数",
            img: require("@/assets/images/threePosition/alert-p2.png"),
          },
          {
            key: "limitAreaCount",
            name: "限制人数",
            img: require("@/assets/images/threePosition/alert-p3.png"),
          },
        ];
        Object.keys(val).forEach((item) => {
          console.log(item);
          list.push({
            name: names.filter((i) => item == i.key)[0].name,
            img: names.filter((i) => item == i.key)[0].img,
            value: val[item],
          });
        });
        this.list = list;
      },
      deep: true, // 深度监听
      immediate: true, // 初次监听即执行
    },
  },
  data() {
    return {
      list: [],
    };
  },
};
</script>

<style scoped lang="less">
@import "@/styles/mixin.less";
@import url("../base.less");
.content {
  .head {
    width: 100%;
    .u-img {
      width: 88px;
      height: 65px;
      margin-right: 4px;
      flex-shrink: 0;
    }
    .u-value {
      font-size: 20px;
      font-family: AlibabaPuHuiTiM;
      color: #4ccdfe;
      line-height: 27px;
      text-shadow: 0px 0px 3px #4ccdfe, 0px 1px 1px rgba(0, 0, 0, 0.75);
      filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.22));
    }
    .u-name {
      font-size: 14px;
      font-family: AlibabaPuHuiTiR;
      color: #fefefe;
      line-height: 20px;
    }
  }
}
</style>