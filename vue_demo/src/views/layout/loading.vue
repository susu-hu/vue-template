<template>
  <div>
    <div class="loading1">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="loading2">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="loading3">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="loading4" style="margin-top: 50px">
      <div></div>
      <div></div>
    </div>
    <div class="loading5" style="margin-top: 50px">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
      <div class="shape shape-4"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    // this.$showLoading.show();
  },
  methods: {},
  destroyed() {},
};
</script>

<style scoped>
div {
  margin: 20px auto;
}

.loading5 {
  width: 30px;
  height: 30px;
  position: relative;
  transform: rotate(45deg);
  animation: animationContainer 1s ease infinite;
}

.shape {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  position: absolute;
}

.shape-1 {
  background-color: #1875e5;
  left: 0;
  animation: animationShape1 0.3s ease infinite alternate;
}

.shape-2 {
  background-color: #c5523f;
  right: 0;
  animation: animationShape2 0.3s ease infinite 0.3s alternate;
}

.shape-3 {
  background-color: #499255;
  bottom: 0;
  animation: animationShape3 0.3s ease infinite 0.3s alternate;
}

.shape-4 {
  background-color: #f2b736;
  right: 0;
  bottom: 0;
  animation: animationShape4 0.3s ease infinite alternate;
}

@keyframes animationContainer {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes animationShape1 {
  0% {
    transform: translate(5px, 5px);
  }

  100% {
    transform: translate(-3px, -3px);
  }
}

@keyframes animationShape2 {
  0% {
    transform: translate(-5px, 5px);
  }

  100% {
    transform: translate(3px, -3px);
  }
}

@keyframes animationShape3 {
  0% {
    transform: translate(5px, -5px);
  }

  100% {
    transform: translate(-3px, 3px);
  }
}

@keyframes animationShape4 {
  0% {
    transform: translate(-5px, -5px);
  }

  100% {
    transform: translate(3px, 3px);
  }
}

.loading4,
.loading4 > div {
  position: relative;
  box-sizing: border-box;
}

.loading4 {
  display: block;
  font-size: 0;
  color: #fff;
}

.loading4.la-dark {
  color: #333;
}

.loading4 > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading4 {
  width: 32px;
  height: 32px;
}

.loading4 > div:nth-child(1),
.loading4 > div:nth-child(2) {
  position: absolute;
  left: 0;
  width: 100%;
}

.loading4 > div:nth-child(1) {
  top: -25%;
  z-index: 1;
  height: 100%;
  border-radius: 10%;
  animation: square-jelly-box-animate 0.6s -0.1s linear infinite;
}

.loading4 > div:nth-child(2) {
  bottom: -9%;
  height: 10%;
  background: #fff;
  border-radius: 50%;
  opacity: 0.2;
  animation: square-jelly-box-shadow 0.6s -0.1s linear infinite;
}

.loading4.la-sm {
  width: 16px;
  height: 16px;
}

.loading4.la-2x {
  width: 64px;
  height: 64px;
}

.loading4.la-3x {
  width: 96px;
  height: 96px;
}

@keyframes square-jelly-box-animate {
  17% {
    border-bottom-right-radius: 10%;
  }

  25% {
    transform: translateY(25%) rotate(22.5deg);
  }

  50% {
    border-bottom-right-radius: 100%;
    transform: translateY(50%) scale(1, 0.9) rotate(45deg);
  }

  75% {
    transform: translateY(25%) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes square-jelly-box-shadow {
  50% {
    transform: scale(1.25, 1);
  }
}

.loading3,
.loading3 > div {
  position: relative;
  box-sizing: border-box;
}

.loading3 {
  display: block;
  font-size: 0;
  color: #fff;
}

.loading3.la-dark {
  color: #333;
}

.loading3 > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading3 {
  width: 32px;
  height: 32px;
}

.loading3 > div:nth-child(1),
.loading3 > div:nth-child(2) {
  width: 0;
  height: 0;
  background: transparent;
  border-style: solid;
  border-width: 16px;
  border-right-color: transparent;
  border-radius: 100%;
  animation: pacman-rotate-half-up 0.5s 0s infinite;
}

.loading3 > div:nth-child(2) {
  margin-top: -32px;
  animation-name: pacman-rotate-half-down;
}

.loading3 > div:nth-child(3),
.loading3 > div:nth-child(4),
.loading3 > div:nth-child(5),
.loading3 > div:nth-child(6) {
  position: absolute;
  top: 50%;
  left: 200%;
  width: 8px;
  height: 8px;
  border-radius: 100%;
  opacity: 0;
  animation: pacman-balls 2s 0s infinite linear;
}

.loading3 > div:nth-child(3) {
  animation-delay: -1.44s;
}

.loading3 > div:nth-child(4) {
  animation-delay: -1.94s;
}

.loading3 > div:nth-child(5) {
  animation-delay: -2.44s;
}

.loading3 > div:nth-child(6) {
  animation-delay: -2.94s;
}

.loading3.la-sm {
  width: 16px;
  height: 16px;
}

.loading3.la-sm > div:nth-child(1),
.loading3.la-sm > div:nth-child(2) {
  border-width: 8px;
}

.loading3.la-sm > div:nth-child(2) {
  margin-top: -16px;
}

.loading3.la-sm > div:nth-child(3),
.loading3.la-sm > div:nth-child(4),
.loading3.la-sm > div:nth-child(5),
.loading3.la-sm > div:nth-child(6) {
  width: 4px;
  height: 4px;
}

.loading3.la-2x {
  width: 64px;
  height: 64px;
}

.loading3.la-2x > div:nth-child(1),
.loading3.la-2x > div:nth-child(2) {
  border-width: 32px;
}

.loading3.la-2x > div:nth-child(2) {
  margin-top: -64px;
}

.loading3.la-2x > div:nth-child(3),
.loading3.la-2x > div:nth-child(4),
.loading3.la-2x > div:nth-child(5),
.loading3.la-2x > div:nth-child(6) {
  width: 16px;
  height: 16px;
}

.loading3.la-3x {
  width: 96px;
  height: 96px;
}

.loading3.la-3x > div:nth-child(1),
.loading3.la-3x > div:nth-child(2) {
  border-width: 48px;
}

.loading3.la-3x > div:nth-child(2) {
  margin-top: -96px;
}

.loading3.la-3x > div:nth-child(3),
.loading3.la-3x > div:nth-child(4),
.loading3.la-3x > div:nth-child(5),
.loading3.la-3x > div:nth-child(6) {
  width: 24px;
  height: 24px;
}

@keyframes pacman-rotate-half-up {
  0%,
  100% {
    transform: rotate(270deg);
  }

  50% {
    transform: rotate(360deg);
  }
}

@keyframes pacman-rotate-half-down {
  0%,
  100% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(0deg);
  }
}

@keyframes pacman-balls {
  0% {
    left: 200%;
    opacity: 0;
    transform: translateY(-50%);
  }

  5% {
    opacity: 0.5;
  }

  66% {
    opacity: 1;
  }

  67% {
    opacity: 0;
  }

  100% {
    left: 0;
    transform: translateY(-50%);
  }
}

.loading1,
.loading1 > div {
  position: relative;
  box-sizing: border-box;
}

.loading1 {
  display: block;
  font-size: 0;
  color: #fff;
}

.loading1.la-dark {
  color: #333;
}

.loading1 > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading1 {
  width: 26px;
  height: 26px;
}

.loading1 > div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 12px;
  margin-top: -6px;
  margin-left: -6px;
  border-radius: 100%;
  animation: ball-square-clockwise-spin 1s infinite ease-in-out;
}

.loading1 > div:nth-child(1) {
  top: 0;
  left: 0;
  animation-delay: -0.875s;
}

.loading1 > div:nth-child(2) {
  top: 0;
  left: 50%;
  animation-delay: -0.75s;
}

.loading1 > div:nth-child(3) {
  top: 0;
  left: 100%;
  animation-delay: -0.625s;
}

.loading1 > div:nth-child(4) {
  top: 50%;
  left: 100%;
  animation-delay: -0.5s;
}

.loading1 > div:nth-child(5) {
  top: 100%;
  left: 100%;
  animation-delay: -0.375s;
}

.loading1 > div:nth-child(6) {
  top: 100%;
  left: 50%;
  animation-delay: -0.25s;
}

.loading1 > div:nth-child(7) {
  top: 100%;
  left: 0;
  animation-delay: -0.125s;
}

.loading1 > div:nth-child(8) {
  top: 50%;
  left: 0;
  animation-delay: 0s;
}

.loading1.la-sm {
  width: 12px;
  height: 12px;
}

.loading1.la-sm > div {
  width: 6px;
  height: 6px;
  margin-top: -3px;
  margin-left: -3px;
}

.loading1.la-2x {
  width: 52px;
  height: 52px;
}

.loading1.la-2x > div {
  width: 24px;
  height: 24px;
  margin-top: -12px;
  margin-left: -12px;
}

.loading1.la-3x {
  width: 78px;
  height: 78px;
}

.loading1.la-3x > div {
  width: 36px;
  height: 36px;
  margin-top: -18px;
  margin-left: -18px;
}

@keyframes ball-square-clockwise-spin {
  0%,
  40%,
  100% {
    transform: scale(0.4);
  }

  70% {
    transform: scale(1);
  }
}
.loading2,
.loading2 > div {
  position: relative;
  box-sizing: border-box;
}

.loading2 {
  display: block;
  font-size: 0;
  color: #fff;
}

.loading2.la-dark {
  color: #333;
}

.loading2 > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
}

.loading2 {
  width: 32px;
  height: 32px;
}

.loading2 > div {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-radius: 100%;
}

.loading2 > div:nth-child(1) {
  animation: ball-triangle-path-ball-one 2s 0s ease-in-out infinite;
}

.loading2 > div:nth-child(2) {
  animation: ball-triangle-path-ball-two 2s 0s ease-in-out infinite;
}

.loading2 > div:nth-child(3) {
  animation: ball-triangle-path-ball-tree 2s 0s ease-in-out infinite;
}

.loading2.la-sm {
  width: 16px;
  height: 16px;
}

.loading2.la-sm > div {
  width: 4px;
  height: 4px;
}

.loading2.la-2x {
  width: 64px;
  height: 64px;
}

.loading2.la-2x > div {
  width: 20px;
  height: 20px;
}

.loading2.la-3x {
  width: 96px;
  height: 96px;
}

.loading2.la-3x > div {
  width: 30px;
  height: 30px;
}

@keyframes ball-triangle-path-ball-one {
  0% {
    transform: translate(0, 220%);
  }

  17% {
    opacity: 0.25;
  }

  33% {
    opacity: 1;
    transform: translate(110%, 0);
  }

  50% {
    opacity: 0.25;
  }

  66% {
    opacity: 1;
    transform: translate(220%, 220%);
  }

  83% {
    opacity: 0.25;
  }

  100% {
    opacity: 1;
    transform: translate(0, 220%);
  }
}

@keyframes ball-triangle-path-ball-two {
  0% {
    transform: translate(110%, 0);
  }

  17% {
    opacity: 0.25;
  }

  33% {
    opacity: 1;
    transform: translate(220%, 220%);
  }

  50% {
    opacity: 0.25;
  }

  66% {
    opacity: 1;
    transform: translate(0, 220%);
  }

  83% {
    opacity: 0.25;
  }

  100% {
    opacity: 1;
    transform: translate(110%, 0);
  }
}

@keyframes ball-triangle-path-ball-tree {
  0% {
    transform: translate(220%, 220%);
  }

  17% {
    opacity: 0.25;
  }

  33% {
    opacity: 1;
    transform: translate(0, 220%);
  }

  50% {
    opacity: 0.25;
  }

  66% {
    opacity: 1;
    transform: translate(110%, 0);
  }

  83% {
    opacity: 0.25;
  }

  100% {
    opacity: 1;
    transform: translate(220%, 220%);
  }
}
</style>