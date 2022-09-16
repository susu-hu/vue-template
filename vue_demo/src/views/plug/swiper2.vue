<template>
  <!-- Swiper -->
  <div class="contentBox">
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        <div class="swiper-slide">Slide 4</div>
        <div class="swiper-slide">Slide 5</div>
        <div class="swiper-slide">Slide 6</div>
        <div class="swiper-slide">Slide 7</div>
        <div class="swiper-slide">Slide 8</div>
        <div class="swiper-slide">Slide 9</div>
        <div class="swiper-slide">Slide 10</div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Add Arrows -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
import "swiper/swiper.less";
import "swiper/swiper-bundle.min.css";
import Swiper, { Pagination, Navigation, Autoplay } from "swiper"; // js 模块
Swiper.use([Pagination, Navigation, Autoplay]);
export default {
  data() {
    return {
      swiper: "",
    };
  },
  mounted() {
    this.swiper = new Swiper(".swiper", {
      slidesPerView: 4,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: false,
      loopFillGroupWithBlank: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  },
};
</script>

<style scoped lang="less">
.swiper {
  width: 500px;
  height: 300px;
  border: 1px solid red;
  .swiper-slide {
    width: 100px;
    background: pink;
    // margin-right: 10px;
    height: 100%;
  }
}
</style>