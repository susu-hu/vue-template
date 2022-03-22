<template>
  <div class="contentBox">
    <a
      class="title"
      target="_blank"
      href="http://datav.jiaminghi.com/guide/#%E7%94%A8%E5%89%8D%E5%BF%85%E7%9C%8B"
      >官网</a
    >
    <!-- <dv-loading>Loading...</dv-loading> loading加载-->
    <dv-border-box-11 title="dataV" style="min-height: 300px; padding: 20px">
      <div
        style="min-height: 300px; padding: 20px; box-sizing: border-box"
        class="flex-row j_c flex-wrap"
      >
        <dv-charts :option="option" style="width: 300px; height: 300px" />
        <dv-active-ring-chart
          :config="config"
          style="width: 300px; height: 300px"
        />
        <dv-capsule-chart
          :config="config1"
          style="width: 400px; height: 200px"
        />
        <div style="margin-left: 20px">
          <dv-water-level-pond
            :config="config2"
            style="width: 150px; height: 200px"
          />
        </div>
      </div>
      <div class="mt20 flex-row j_c">
        <!-- <dv-conical-column-chart
          :config="config3"
          style="width: 500px; height: 300px"
        /> -->
      </div>
    </dv-border-box-11>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {
        title: {
          text: "剩余油量表",
          style: {
            fill: "#fff",
          },
        },
        series: [
          {
            type: "gauge",
            data: [{ name: "itemA", value: 55 }],
            center: ["50%", "55%"],
            axisLabel: {
              formatter: "{value}%",
              style: {
                fill: "#fff",
              },
            },
            axisTick: {
              style: {
                stroke: "#fff",
              },
            },
            animationCurve: "easeInOutBack",
          },
        ],
      },
      config: {
        radius: "40%",
        activeRadius: "45%",
        data: [
          {
            name: "周口",
            value: 55,
          },
          {
            name: "南阳",
            value: 120,
          },
          {
            name: "西峡",
            value: 78,
          },
          {
            name: "驻马店",
            value: 66,
          },
          {
            name: "新乡",
            value: 80,
          },
        ],
        digitalFlopStyle: {
          fontSize: 20,
        },
        showOriginValue: true,
      },
      config1: {
        data: [
          {
            name: "南阳",
            value: 167,
          },
          {
            name: "周口",
            value: 67,
          },
          {
            name: "漯河",
            value: 123,
          },
          {
            name: "郑州",
            value: 55,
          },
          {
            name: "西峡",
            value: 98,
          },
        ],
      },
      config2: {
        data: [66],
      },
      config3: {
        data: [
          {
            name: "周口",
            value: 55,
          },
          {
            name: "南阳",
            value: 120,
          },
          {
            name: "西峡",
            value: 71,
          },
          {
            name: "驻马店",
            value: 66,
          },
          {
            name: "新乡",
            value: 80,
          },
          {
            name: "信阳",
            value: 35,
          },
          {
            name: "漯河",
            value: 15,
          },
        ],
        // img: [
        //   "https://i.postimg.cc/mgsKJGLw/susu1.jpg",
        //   "https://i.postimg.cc/mgsKJGLw/susu1.jpg",
        //   "https://i.postimg.cc/mgsKJGLw/susu1.jpg",
        //   "https://i.postimg.cc/mgsKJGLw/susu1.jpg",
        //   "https://i.postimg.cc/mgsKJGLw/susu1.jpg",
        //   "https://i.postimg.cc/mgsKJGLw/susu1.jpg",
        //   "https://i.postimg.cc/mgsKJGLw/susu1.jpg",
        // ],
        showValue: true,
      },
    };
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  background-image: linear-gradient(to right, #ff4b1f, #1fddff);
  font-size: 20px;
}
.contentBox {
  background: #282c34 !important;
}
</style>