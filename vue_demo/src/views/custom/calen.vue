<template>
  <div class="contentBox flex flex-wrap j_b">
    <Calendar theme_color="pink" class="cal"></Calendar>
    <Calendar theme_color="orange" class="cal"></Calendar>
    <Calendar theme_color="#000" class="cal"></Calendar>
    <Calendar theme_color="#999" class="cal"></Calendar>
    <Calendar theme_color="#aa2828bb" class="cal"></Calendar>
    <Calendar theme_color="#48bee2bb" class="cal"></Calendar>
  </div>
</template>

<script>
import Calendar from "./components/calendar";
export default {
  name: "calen",
  components: {
    Calendar,
  },
  data() {
    return {};
  },
};
// 参考链接：https://github.com/ajun568/vue-calendar
</script>

<style scoped>
.cal {
  width: 400px;
  margin-right: 60px;
}
</style>
