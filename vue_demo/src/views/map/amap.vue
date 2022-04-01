<template>
  <div class="contentBox">
    <div id="container" style="width: 100%; height: 600px"></div>
    <Button type="primary" class="mt20" @click="Next">下一个</Button>
  </div>
</template>

<script>
import MapLoader from "@/assets/js/AMap.js";
export default {
  data() {
    return {
      map: null,
    };
  },
  //   mounted() {
  //     let that = this;
  //     MapLoader().then(
  //       (AMap) => {
  //         console.log("地图加载成功");
  //         that.map = new AMap.Map("container", {
  //           center: [117.000923, 36.675807],
  //           zoom: 11,
  //         });
  //       },
  //       (e) => {
  //         console.log("地图加载失败", e);
  //       }
  //     );
  //   },
  created() {
    this.initMap();
  },
  methods: {
    Next() {
      this.$router.push("/map/amap2");
    },
    // 查看位置
    initMap() {
      let e = {
        jwd: [118.000923, 36.675807],
        title: "测试苏苏",
        address: "1232112312312",
      };
      this.$nextTick(function () {
        this.mapReq(e);
      });
    },
    // 获取高德地图api
    mapReq(data) {
      let that = this;
      MapLoader().then(
        (AMap) => {
          console.log("地图加载成功");
          that.map = new AMap.Map("container", {
            resizeEnable: true,
            center: data.jwd, //地图标记title
            zoom: 12, //地图视图缩放级别
          });
          let marker = new AMap.Marker({
            position: that.map.getCenter(),
            icon: new AMap.Icon({
              image: "https://i.postimg.cc/mgsKJGLw/susu1.jpg", //定位点显示的图标
              size: new AMap.Size(60, 60), // 图标大小
              imageSize: new AMap.Size(26, 26),
            }),
            offset: new AMap.Pixel(-30, -60), //图标点的位置
          });
          marker.setMap(that.map);
          // 设置label标签
          // label默认蓝框白底左上角显示，样式className为：amap-marker-label
          marker.setLabel({
            // 修改label相对于maker的位置
            offset: new AMap.Pixel(30, -80), //点标记定位
            content:
              `<div style='width:320px;height:160px;background:#fff;border-radius:3px;font-size:12px;box-shadow:5px 5px 5px #999;'>
          <h5 style='text-align:center;margin:0;padding:10px;border-bottom:1px solid #e6e6e6;font-size:16px;'>` +
              data.title +
              `</h5>
            <div style='padding:5px;'>
              <p style='margin:8px 0;'>测试：` +
              "sususu " +
              `</p>
              <p style='margin:8px 0;'>时间：` +
              "2022-04-01" +
              `</p>
              <p style='margin:8px 0;white-space:pre-wrap;'>地址：` +
              data.address +
              `</p>
              <p style='margin:8px 0;'>内容：<a style="color:pink" href="` +
              data.urls +
              `" target="_bank">` +
              "测试内容" +
              `</a></p>
            </div>
        </div> `,
          });
        },
        (e) => {
          console.log("地图加载失败", e);
        }
      );
    },
  },
};
</script>

<style>
.amap-marker-label {
  border: none;
}
</style>