<template>
  <div class="content">
    <div class="flex-row  head">
        <img :src="bgHhead"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "leftHead",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    data: {
      handler(val) {
        this.list = val;
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
    margin: 86px 0 40px;
    height: 93px;
    background: url("../../../assets/images/threePosition/banner-bg.png")
      no-repeat;
    background-size: 100% 100%;
  }
}
</style>