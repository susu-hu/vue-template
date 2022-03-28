<template>
  <div class="contentBox">
    <div class="ggk">
      <canvas id="canvas" width="400" height="100"></canvas>
      <div class="text">恭喜您获得100w</div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");

      // 填充的颜色
      ctx.fillStyle = "darkgray";
      // 填充矩形 fillRect(起始X,起始Y,终点X,终点Y)
      ctx.fillRect(0, 0, 400, 100);
      ctx.fillStyle = "#fff";
      // 绘制填充文字
      ctx.fillText("刮刮卡", 180, 50);

      let isDraw = false;
      canvas.onmousedown = function () {
        isDraw = true;
      };
      canvas.onmousemove = function (e) {
        if (!isDraw) return;
        // 计算鼠标在canvas里的位置
        const x = e.pageX - canvas.offsetLeft;
        const y = e.pageY - canvas.offsetTop;
        // 设置globalCompositeOperation
        ctx.globalCompositeOperation = "destination-out";
        // 画圆
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        // 填充圆形
        ctx.fill();
      };
      canvas.onmouseup = function () {
        isDraw = false;
      };
    },
  },
};
</script>

<style scoped>
canvas {
  position: absolute;
  z-index: 99;
}
.text {
  width: 400px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: pink;
}
</style>