<template>
  <div class="flex flex-wrap contentBox j_b">
    <Calendar theme_color="pink" class="cal"></Calendar>
    <Calendar theme_color="orange" class="cal"></Calendar>
    <Calendar theme_color="#000" class="cal"></Calendar>
    <Calendar theme_color="#999" class="cal"></Calendar>
    <Calendar theme_color="#aa2828bb" class="cal"></Calendar>
    <Calendar theme_color="#48bee2bb" class="cal"></Calendar>
  </div>
</template>

<script>
// 参考链接：https://github.com/ajun568/vue-calendar
import Calendar from "./components/calendar";
export default {
  name: "calenCust",
  components: {
    Calendar,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.cal {
  width: 400px;
  margin-right: 60px;
}
</style>
