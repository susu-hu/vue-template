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
::-webkit-scrollbar {
  width: 10px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #ffc0cb ;
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
</style>