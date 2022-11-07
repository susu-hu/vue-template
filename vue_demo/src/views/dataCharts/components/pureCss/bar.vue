<template>
  <div class="bar-box">
    <div v-for="item in dataList" :key="item.id" :style="{ height: item.rate }" class="bar-item">
      <div class="bar-line"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "LineCircle",
  data() {
    return {
      dataList: [
        { id: 1, rate: "25%" },
        { id: 2, rate: "100%" },
        { id: 3, rate: "50%" },
        { id: 4, rate: "40%" },
        { id: 5, rate: "75%" },
        { id: 6, rate: "90%" },
        { id: 7, rate: "10%" },
        { id: 8, rate: "66%" },
      ],
    };
  },
};
</script>
<style scoped>
.bar-box {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.bar-item {
  position: relative;
  width: 30px;
  height: 0;
  box-sizing: border-box;
  transition: height 1s ease;
}
/* 核心代码 */
.bar-box .bar-item:nth-child(4n + 1) {
  background: linear-gradient(
    to top,
    rgba(54, 205, 232, 1),
    rgba(54, 205, 232, 0.6)
  );
  --marker-bg: rgb(54, 205, 232);
  --clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0 50%);
  --line-opacity: 1;
}
.bar-box .bar-item:nth-child(4n + 2) {
  background: linear-gradient(
    to top,
    rgba(54, 100, 255, 1),
    rgba(54, 100, 255, 0.6)
  );
  --marker-bg: rgb(54, 100, 255);
  --clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0 50%);
  --line-opacity: 1;
}
.bar-box .bar-item:nth-child(4n + 3) {
  background: linear-gradient(
    to top,
    rgba(249, 152, 45, 1),
    rgba(249, 152, 45, 0.6)
  );
  --marker-bg: rgb(249, 152, 45);
  --clip-path: none;
  --line-opacity: 0;
}
.bar-box .bar-item:nth-child(4n) {
  background: linear-gradient(
    to top,
    rgba(0, 220, 153, 1),
    rgba(0, 220, 153, 0.6)
  );
  --marker-bg: rgb(0, 220, 153);
  --clip-path: none;
  --line-opacity: 0;
}
/** 柱子中间的线条，模拟棱角 */
.bar-item .bar-line {
  position: absolute;
  left: 50%;
  top: 0;
  width: 1px;
  height: 100%;
  background: var(--marker-bg);
  opacity: var(--line-opacity);
}
/* 柱子的上下头部添加两个平行四边形 */
.bar-item::before,
.bar-item::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  /* 高度始终是宽度的一半 */
  padding-top: 50%;
  border-radius: 50%;
  clip-path: var(--clip-path);
  z-index: 10;
  background-color: var(--marker-bg);
}
.bar-item::before {
  top: 0;
  transform: translateY(-50%);
}
.bar-item::after {
  bottom: 0;
  transform: translateY(50%);
}
</style>