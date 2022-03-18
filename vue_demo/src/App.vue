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
    $route: function (to, from) {
      console.log(to, from);
      console.log(document.documentElement.scrollTop);
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
    console.log("2", document.charset);
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
.contentBox {
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
  min-height: calc(100vh - 260px)
}
@import "./assets/css/common.css";
* {
  cursor: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/cursor/normal.cur),
    default;
}
::-webkit-scrollbar {
  width: 10px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ffc0cb;
  background-image: -webkit-linear-gradient(
    45deg,
    hsla(0, 0%, 100%, 0.2) 25%,
    transparent 0,
    transparent 50%,
    hsla(0, 0%, 100%, 0.2) 0,
    hsla(0, 0%, 100%, 0.2) 75%,
    transparent 0,
    transparent
  );
}
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px rgb(0 0 0 / 20%);
  background: #fff;
  border-radius: 10px;
}
.public-page {
  margin-top: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}
.mr10 {
  margin-right: 10px;
}
// 按钮
.ivu-btn-primary {
  background-color: #ffc0cb !important;
  border-color: #ffc0cb !important;
}
// page分页
.ivu-page-item-active {
  border-color: #ffc0cb !important;
}
.ivu-page-item-active a,
.ivu-page-item-active:hover a {
  color: #ffc0cb !important;
}
.ivu-page-item:hover {
  border-color: #ffc0cb !important;
}
.ivu-page-item:hover a {
  color: #ffc0cb !important;
}
a:hover {
  color: #ffc0cb;
}
.ivu-page-options-elevator input:hover {
  border-color: #ffc0cb !important;
}
.ivu-page-options-elevator input:focus {
  border-color: #ffc0cb !important;
  box-shadow: 0 0 0 2px #f1c8cf !important;
}
.ivu-select-selection-focused,
.ivu-select-selection:hover {
  border-color: #ffc0cb !important;
}
.ivu-select-item-selected,
.ivu-select-item-selected:hover {
  color: #ffc0cb !important;
}
.ivu-page-next:hover a,
.ivu-page-prev:hover a {
  color: #ffc0cb !important;
}

a:hover {
  color: #ffc0cb !important;
}
// 多选框选中样式
.ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: #ffc0cb !important;
  background-color: #ffc0cb !important;
}
// input框
.ivu-input:hover {
  border-color: #ffc0cb !important;
}
// 按钮
.ivu-btn:hover {
  color: #ffc0cb !important;
  background-color: #fff;
  border-color: #ffc0cb !important;
}
.ivu-btn-primary:hover {
  color: #fff !important;
}

.ivu-avatar > img {
  object-fit: cover;
}

/*  去掉button的默认样式*/
button {
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
}

button::after {
  outline: none;
  border: none;
}
/*点击后样式*/
.button-hover {
  background: transparent;
}
.mb20{
  margin-bottom: 20px;
}
.hd_t{
  font-size:20px;
  font-weight: bold;
}
</style>