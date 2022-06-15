<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-06-01 16:38:33
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-06-13 10:31:31
 * @FilePath: \vue_demo\src\views\library\moment.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="contentBox">
    <div>
      官网：<a href="http://momentjs.cn/" target="_blank">
        http://momentjs.cn/</a
      >
    </div>
    <Divider />
    <p>{{ a }}</p>
    <p>{{ b }}</p>
    <p>{{ c }}</p>
    <p>{{ d }}</p>
    <p>{{ e }}</p>
  </div>
</template>

<script>
// moment.js是JavaScript 日期处理类库，也就是用于日期格式转换的。官网地址：http://momentjs.cn/
var moment = require("moment");
moment.locale("zh-cn");
console.log(moment.locale());
export default {
  data() {
    return {
      a: "",
      b: "",
      c: "",
      d: "",
      e: "",
      f: "",
    };
  },
  created() {
    this.a = moment().format("MMMM Do YYYY, h:mm:ss a"); // 六月 1日 2022, 4:43:54 下午
    this.b = moment().format("dddd"); // 星期三
    this.c = moment().format("MMM Do YY"); // 6月 1日 22
    this.d = moment().format("YYYY [escaped] YYYY"); // 2022 escaped 2022
    this.e = moment().format(); // 2022-06-01T16:43:54+08:00

    let now = moment();
    console.log(now);

    const format = "HH:mm:ss MM/D/YYYY";
    const startTime = moment("16:24:33 04/28/20", format);
    const endTime = moment("20:24:33 04/28/20", format);

    const diff1 = moment(endTime).diff(moment(startTime), "years");
    const diff2 = moment(endTime).diff(moment(startTime), "months");
    const diff3 = moment(endTime).diff(moment(startTime), "days");
    const diff4 = moment(endTime).diff(moment(startTime), "minutes");
    const diff5 = moment(endTime).diff(moment(startTime), "seconds");

    console.log(startTime, endTime);
  },
};
</script>

<style>
</style>