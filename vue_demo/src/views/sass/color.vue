<template>
  <div class="page">
    <p class="title">这是sass的颜色函数测试</p>
  </div>
</template>

<script>
// https://www.w3cplus.com/preprocessor/sass-color-function.html
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
$color: #f36;
$bgColor: orange;
$borderColor: green;
.page {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  .title {
    color: rgba($color, 0.4);
    font-size: 25px;
  }
}
</style>
