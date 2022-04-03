<template>
  <div class="contentBox">
    <div id="dplayer" style="width: 100%; height: 600px"></div>
  </div>
</template>

<script>
// npm install dplayer --save
// npm对DPlayer做了封装，vue中可以使用vue-dplayer
// 官网地址：http://dplayer.js.org/
import DPlayer from "dplayer";
export default {
  data() {
    return {
      dp: {},
    };
  },
  mounted() {
    //   screenshot: true, //是否开启截图
    //   autoplay: false, //是否自动播放
    //   theme: "#FADFA3", //主题色
    //   loop: true, //视频是否循环播放
    //   lang: "zh-cn",
    //   hotkey: true, //是否开启热键
    //   preload: "auto", //视频是否预加载
    //   volume: 0.7, //默认音量
    //   mutex: true, //阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
    this.dp = new DPlayer({
      container: document.getElementById("dplayer"),
      autoplay: false,
      theme: "#FADFA3",
      loop: true,
      lang: "zh-cn",
      screenshot: true,
      hotkey: true,
      preload: "auto",
      logo: "logo.png",
      volume: 0.7,
      mutex: true,
      video: {
        url: "dplayer.mp4",
        pic: "https://i.postimg.cc/j57Lwdy3/123.png",
        thumbnails: "thumbnails.jpg",
        type: "auto",
      },
      subtitle: {
        url: "dplayer.vtt",
        type: "webvtt",
        fontSize: "25px",
        bottom: "10%",
        color: "#b7daff",
      },
      danmaku: {
        id: "9E2E3368B56CDBB4",
        api: "https://api.prprpr.me/dplayer/",
        token: "tokendemo",
        maximum: 1000,
        addition: ["https://api.prprpr.me/dplayer/v3/bilibili?aid=4157142"],
        user: "DIYgod",
        bottom: "15%",
        unlimited: true,
      },
      contextmenu: [
        {
          text: "custom1",
          link: "https://github.com/DIYgod/DPlayer",
        },
        {
          text: "custom2",
          click: (player) => {
            console.log(player);
          },
        },
      ],
      highlight: [
        {
          text: "marker for 20s",
          time: 20,
        },
        {
          text: "marker for 2mins",
          time: 120,
        },
      ],
    });
  },
};
</script>

<style>
</style>