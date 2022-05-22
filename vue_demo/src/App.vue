<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  watch: {
    // 控制滚动条位置
    $route: function (to) {
      if (to.meta.keepAlive) {
        document.body.scrollTop = to.meta.scrollTop;
        document.documentElement.scrollTop = to.meta.scrollTop;
      }
    },
  },
  created() {
    console.log("版本号", this.getBrowserNameVersion());
    console.log("cc", this.getPageCharset());
    console.log("1", document.characterSet);
    console.log(process.env);
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }
    //刷新保存
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  },
  methods: {
    // 获取浏览器名称及其版本号
    getBrowserNameVersion() {
      var Sys = {};
      var ua = navigator.userAgent.toLowerCase();
      var s;
      /* eslint-disable */
      (s = ua.match(/rv:([\d.]+)\) like gecko/))
        ? (Sys.ie = s[1])
        : (s = ua.match(/msie ([\d\.]+)/))
        ? (Sys.ie = s[1])
        : (s = ua.match(/edge\/([\d\.]+)/))
        ? (Sys.edge = s[1])
        : (s = ua.match(/firefox\/([\d\.]+)/))
        ? (Sys.firefox = s[1])
        : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
        ? (Sys.opera = s[1])
        : (s = ua.match(/chrome\/([\d\.]+)/))
        ? (Sys.chrome = s[1])
        : (s = ua.match(/version\/([\d\.]+).*safari/))
        ? (Sys.safari = s[1])
        : 0;
      // 根据关系进行判断
      if (Sys.ie) return "IE: " + Sys.ie;
      if (Sys.edge) return "EDGE: " + Sys.edge;
      if (Sys.firefox) return "Firefox: " + Sys.firefox;
      if (Sys.chrome) return "Chrome: " + Sys.chrome;
      if (Sys.opera) return "Opera: " + Sys.opera;
      if (Sys.safari) return "Safari: " + Sys.safari;
      return "Unkonwn";
    },

    getPageCharset() {
      var charSet = "";
      var oType = this.getBrowser();
      switch (oType) {
        case "IE":
          charSet = document.charset;
          break;
        case "FIREFOX":
          charSet = document.characterSet;
          break;
        default:
          break;
      }
      return charSet;
    },
    getBrowser() {
      var oType = "";
      if (navigator.userAgent.indexOf("MSIE") != -1) {
        oType = "IE";
      } else if (navigator.userAgent.indexOf("Firefox") != -1) {
        oType = "FIREFOX";
      }
      return oType;
    },
  },
};
</script>
<style lang="less">
@import "./assets/css/common.css";
</style>