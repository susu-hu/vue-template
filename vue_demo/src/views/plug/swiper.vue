<template>
  <div class="contentBox">
    <!-- <swiper
        :slides-per-view="3"
        :space-between="50"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>Slide 1</swiper-slide>
        <swiper-slide>Slide 2</swiper-slide>
        <swiper-slide>Slide 3</swiper-slide>
      </swiper> -->
    <!--  <div class="swiper-container" style="height: 100px">
        <div class="swiper-wrapper" v-for="(item, index) in 5" :key="index">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
        </div>
        <!~~ 如果需要分页器 ~~>
        <div class="swiper-pagination"></div>
  
        <!~~ 如果需要导航按钮 ~~>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
  
        <!~~ 如果需要滚动条 ~~>
        <div class="swiper-scrollbar"></div>
      </div> -->
    <!-- Swiper -->
    <div class="swiper-container">
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
      <!-- <div class="swiper-pagination"></div> -->
      <!-- Add Arrows -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
// import { Swiper, SwiperSlide } from "swiper/vue";
// import "swiper/css";
// import "swiper/dist/js/swiper";
import "swiper/swiper-bundle.css"; //6.8.4版本
import Swiper from "swiper";
export default {
  components: {
    // Swiper,
    // SwiperSlide,
  },
  data() {
    return {
      swiper: "",
    };
  },
  mounted() {
    this.swiper = new Swiper(".swiper-container", {
      // slidesPerGroupAuto: true,
      // slidesPerView: 3,
      // spaceBetween: 20,
      // //direction: 'vertical', // 垂直切换选项
      // //mousewheel: true, //滚轮
      // // autoplay: {
      // //   //自动开始
      // //   delay: 2500, //时间间隔
      // //   disableOnInteraction: false, //*手动操作轮播图后不会暂停*
      // // },
      // autoplay: false,
      // loop: false, // 循环模式选项

      // // 如果需要分页器
      // pagination: {
      //   el: ".swiper-pagination",
      //   clickable: true, // 分页器可以点击
      // },

      // // 如果需要前进后退按钮
      // navigation: {
      //   nextEl: ".swiper-button-next",
      //   prevEl: ".swiper-button-prev",
      // },

      // // 如果需要滚动条
      // scrollbar: {
      //   el: ".swiper-scrollbar",
      // },

      //   5.4.5--
      //   slidesPerView: 3,
      //   spaceBetween: 30,
      //   slidesPerGroup: 3,
      //   loop: false,
      //   loopFillGroupWithBlank: true,
      //   pagination: {
      //     el: ".swiper-pagination",
      //     clickable: true,
      //   },
      //   navigation: {
      //     nextEl: ".swiper-button-next",
      //     prevEl: ".swiper-button-prev",
      //   },
      // 6.8.4
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 3,
      loop: true,
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

<style scoped>
.swiper-container {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: pink;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
</style>
