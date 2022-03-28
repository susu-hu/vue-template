<template>
  <div class="contentBox">
    <div style="margin-bottom: 25px; display: flex; align-items: center">
      <el-button @click="changeType('huabi')" type="primary">画笔</el-button>
      <el-button @click="changeType('rect')" type="success">正方形</el-button>
      <el-button
        @click="changeType('arc')"
        type="warning"
        style="margin-right: 10px"
        >圆形</el-button
      >
      <div>颜色：</div>
      <el-color-picker v-model="color"></el-color-picker>
      <el-button @click="clear">清空</el-button>
      <el-button @click="saveImg">保存</el-button>
    </div>
    <canvas
      id="canvas"
      width="800"
      height="600"
      @mousedown="canvasDown"
      @mousemove="canvasMove"
      @mouseout="canvasUp"
      @mouseup="canvasUp"
    >
    </canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "huabi",
      isDraw: false,
      canvasDom: null,
      ctx: null,
      beginX: 0,
      beginY: 0,
      color: "#000",
      imageData: null,
    };
  },
  mounted() {
    this.canvasDom = document.getElementById("canvas");
    this.ctx = this.canvasDom.getContext("2d");
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    canvasDown(e) {
      this.isDraw = true;
      const canvas = this.canvasDom;
      this.beginX = e.pageX - canvas.offsetLeft;
      this.beginY = e.pageY - canvas.offsetTop;
    },
    canvasMove(e) {
      if (!this.isDraw) return;
      const canvas = this.canvasDom;
      const ctx = this.ctx;
      const x = e.pageX - canvas.offsetLeft;
      const y = e.pageY - canvas.offsetTop;
      this[`${this.type}Fn`](ctx, x, y);
    },
    canvasUp() {
      this.imageData = this.ctx.getImageData(0, 0, 800, 400);
      this.isDraw = false;
    },
    huabiFn(ctx, x, y) {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    },
    rectFn(ctx, x, y) {
      const beginX = this.beginX;
      const beginY = this.beginY;
      ctx.clearRect(0, 0, 800, 400);
      this.imageData && ctx.putImageData(this.imageData, 0, 0, 0, 0, 800, 400);
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.rect(beginX, beginY, x - beginX, y - beginY);
      ctx.stroke();
      ctx.closePath();
    },
    arcFn(ctx, x, y) {
      const beginX = this.beginX;
      const beginY = this.beginY;
      this.isDraw && ctx.clearRect(0, 0, 800, 400);
      this.imageData && ctx.putImageData(this.imageData, 0, 0, 0, 0, 800, 400);
      ctx.beginPath();
      ctx.strokeStyle = this.color;
      ctx.arc(
        beginX,
        beginY,
        Math.round(
          Math.sqrt((x - beginX) * (x - beginX) + (y - beginY) * (y - beginY))
        ),
        0,
        2 * Math.PI
      );
      ctx.stroke();
      ctx.closePath();
    },
    saveImg() {
      const url = this.canvasDom.toDataURL();
      const a = document.createElement("a");
      a.download = "canvas图片";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    clear() {
      this.imageData = null;
      this.ctx.clearRect(0, 0, 800, 400);
    },
  },
};
</script>

<style lang="scss" scoped>
#canvas {
  box-shadow: 5px 5px 5px #f8f0f0, -5px -5px 4px #f8f0f0;
  border-radius: 15px;
}
</style>
