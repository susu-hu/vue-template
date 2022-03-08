<template>
  <div v-if="loadFlag">
    <div class="load-circle">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "MyLoading", //组件名称
  props: ["loadFlag"],
};
</script>
<style scoped>
.load-circle {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
.load-circle > div {
  background-color: #a8c992;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  float: left;
  margin-right: 5px;
  animation: stretchdelay 1.2s infinite ease-in-out;
}
.load-circle > .rect2 {
  animation-delay: -1.1s;
}
.load-circle > .rect3 {
  animation-delay: -1s;
}
.load-circle > .rect4 {
  animation-delay: -0.9s;
}
.load-circle > .rect5 {
  animation-delay: -0.8s;
}
@keyframes stretchdelay {
  0%,
  40%,
  100% {
    transform: scale(0.4);
    -webkit-transform: scale(0.4);
  }
  20% {
    transform: scale(1);
    -webkit-transform: scale(1);
  }
}
</style>