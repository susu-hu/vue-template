<template>
  <div class="contentBox">
    <Button type="primary" @click="change" style="margin-right:40px">防抖</Button>
    <Button type="primary" @click="jile">节流</Button>
    <!--当是isDebounce==1时表示是防抖函数，isDebounce==2是节流函数，isDebounce==3是立即执行版防抖函数，time是执行时间间隔,UI框架click事件失效时可用修饰符native-->
    <!-- <Debounce000
      :time="2000"
      :isDebounce="3"
    >
      <text @click="action()"
        >删除</text
      >
    </Debounce000> -->
  </div>
</template>

<script>
/* eslint-disable */
import { Debounce, Throttle,Throttle1 } from "../../utils/common.js";
export default {
  data() {
    return {};
  },
  methods: {
    change: Debounce(function (val) {
      console.log("防抖了");
    }, 5000),
    jile: Throttle1(function (val) {
      console.log('节流了');
    }, 5000),
    action() {},
  },
};
</script>

<style>
</style>