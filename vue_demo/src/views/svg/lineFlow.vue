<template>
  <div class="contentBox">
    <!--  4条svg 线条 -->
    <div class="container">
      <div class="line-wrap">
        <!-- 111 -->
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          class="circle-load-rect-svg"
          viewbox="0 0 600 400"
        >
          <polyline
            :points="svgData[currentIndex][0]"
            fill="none"
            class="g-rect-path"
            stroke="#007084"
          />
          <polyline
            :points="svgData[currentIndex][0]"
            fill="none"
            class="g-rect-fill"
            stroke="#00e9f9"
          />
        </svg>
        <!-- 222 -->
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          class="circle-load-rect-svg"
          viewbox="0 0 600 400"
        >
          <polyline
            :points="svgData[currentIndex][1]"
            fill="none"
            class="g-rect-path"
            stroke="#805c2c"
          />
          <polyline
            :points="svgData[currentIndex][1]"
            fill="none"
            class="g-rect-fill"
            stroke="red"
          />
        </svg>
        <!-- 333 -->
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          class="circle-load-rect-svg"
          viewbox="0 0 600 400"
        >
          <polyline
            :points="svgData[currentIndex][2]"
            fill="none"
            class="g-rect-path"
            stroke="#19875c"
          />
          <polyline
            :points="svgData[currentIndex][2]"
            fill="none"
            class="g-rect-fill"
            stroke="#3aeca1"
          />
        </svg>
        <!-- 444 -->
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xml:space="preserve"
          class="circle-load-rect-svg"
          viewbox="0 0 600 400"
        >
          <polyline
            :points="svgData[currentIndex][3]"
            fill="none"
            class="g-rect-path"
            stroke="#18808e"
          />
          <polyline
            :points="svgData[currentIndex][3]"
            fill="none"
            class="g-rect-fill"
            stroke="#36f4fb"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      svgData: [
        [
          "200,0 200,30 930,30 930,97",
          "180,0 180,50 753,50 753,97",
          "160,0 160,70 580,70 580,97",
          "140,0 140,90 405,90 405,96",
        ],
        [
          "530,0 530,30 930,30 930,97",
          "510,0 510,50 753,50 753,97",
          "490,0 490,70 580,70 580,97",
          "470,0 470,90 405,90 405,96",
        ],
        [
          "860,0 860,97 930,97 930,97",
          "840,0 840,50 840,97 753,97",
          "820,0 820,83 580,83 580,97",
          "800,0 800,70 405,70 405,96",
        ],
        [
          "1190,0 1190,97 930,97 930,97",
          "1170,0 1170,83 753,83 753,97",
          "1150,0 1150,70 580,70 580,97",
          "1130,0 1130,58 405,58 405,96",
        ],
      ],
    };
  },
  methods: {
    activeClick(index) {
      this.currentIndex = index;
    },
    leftBtnClick() {
      if (this.currentIndex === 0) {
        this.currentIndex = 3;
        return;
      }
      this.currentIndex--;
    },
    rightBtnClick() {
      if (this.currentIndex === 3) {
        this.currentIndex = 0;
        return;
      }
      this.currentIndex++;
    },
  },
};
</script>
<style scoped lang="less">
.container {
  width: 100%;
  margin-top: -20px;
}
.line-wrap {
  width: 1350px;
  margin: 0 auto;
  position: relative;
}
.line-wrap svg:nth-child(2) {
  position: absolute;
  top: 0;
}
.line-wrap svg:nth-child(3) {
  position: absolute;
  top: 0;
}
.line-wrap svg:nth-child(4) {
  position: absolute;
  top: 0;
}
.circle-load-rect-svg {
  width: 1350px;
  margin: 10px;
}

.g-rect-path {
  fill: none;
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-linecap: round;
}

.g-rect-fill {
  fill: none;
  stroke-width: 5;
  stroke-linejoin: round;
  stroke-linecap: round;
  stroke-dasharray: 3, 900;
  stroke-dashoffset: -100;
  animation: lineMove 3s cubic-bezier(0, 0, 0.74, 0.74) infinite;
}

// @keyframes lineMove {
//   0% {
//     stroke-dashoffset: -850;
//   }
//   100% {
//     stroke-dashoffset: -0;
//   }
// }
.bottom-title {
  position: absolute;
  bottom: 30%;
  width: 100%;
  font-size: 36px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #38dcff;
  text-align: center;
  line-height: 38px;
  background: linear-gradient(0deg, #2de9ff 0.146484375%, #2fa9ff 99.31640625%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
