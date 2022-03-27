<template>
  <div class="contentBox">
    <!-- lodash 防抖节流函数里面使用this实例 -->
    <Button type="primary" @click="blur('susu')" style="margin-right:30px">this实例</Button>
    <Button type="primary" @click="Throttle('susu')">节流</Button>
  </div>
</template>

<script>
/* eslint-disable */
import _ from "lodash"; //导入lodash插件
export default {
  data() {
    return {
      data: "ss",
      text: "",
    };
  },
  methods: {
    //debounce里面不要使用箭头函数，具体详见箭头函数的this指向问题
    blur: _.debounce(function (e) {
      console.log(e);
      //这个this就是页面的实例
      console.log(this.data);
    }, 1000),
    Throttle: _.throttle(
      function (e) {
        console.log("arguments", arguments);
      },
      5000,
      {
        leading: true,
        trailing: false,
      }
    ),
  },
};
</script>

<style>
</style>