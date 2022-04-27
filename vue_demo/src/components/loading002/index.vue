<template>
  <transition name="u-loading-fade">
    <div v-show="visible" class="u-loading-mask">
      <div class="u-loading-spinner">
        <!-- <img src="~@/assets/loading.gif" /> -->
        <p class="u-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "loading002",
  data() {
    return {
      visible: true,
      text: "",
    };
  },
};
</script>
<style lang="scss" scoped>
.u-loading-mask {
  position: fixed;
  z-index: 9999999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: 0.3);
  color: #ffffff;
  .u-loading-spinner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
