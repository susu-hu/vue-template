<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
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
};
</script>
<style lang="less">
@import "./assets/css/common.css";
* {
  cursor: url(https://cdn.jsdelivr.net/gh/honjun/cdn@1.6/img/cursor/normal.cur), default; 
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
</style>