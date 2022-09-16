<template>
  <div class="contentBox">
    <swiper :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="(item, index) in 10" :key="index">slide{{ index }}</swiper-slide>
      <!-- 分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper"; //局部引入
// import "swiper/swiper-bundle.css";
export default {
  components: {
    swiper,
    swiperSlide,
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination", //分页器作用对象
          clickable: true, //分页器小圆点是否可点击
        },
      },
    };
  },
};
</script>

<style scoped>
.swiper-slide {
  height: 400px;
  background: pink;
  font-size: 50px;
  text-align: center;
  line-height: 400px;
}
</style>
