<template>
  <div class="page">
    <p class="title mb_20">这是sass的颜色函数测试</p>
    <p class="mb_20">
      rgba函数:括号是函数的参数，第一个参数是需要转换的颜色，他可以是任何颜色的表达方式，也可以是一个颜色变量；第二个参数是颜色的透明度，其值是0~1之间。
    </p>
    <p class="mb_20">
      Mix()函数:是将两种颜色根据一定的比例混合在一起，生成另一种颜色具体地说，选择权重是每个RGB的百分比来衡量，当然透明度也会有一定的权重。其中指定的比例会包括在返回的颜色中。默认的的比例是50%,这意味着两个颜色各占一半，如果指定的比例是25%,这意味着第一个颜色所占比例为25%，第二个颜色所占比例为75%。
    </p>
    <p class="mb_20">mix($color-1,$color-2,$weight);</p>
    <p class="t1 mb_20">sass -i // 可终端操作</p>
    <p class="mb_20" v-for="(item, index) in list" :key="index">
      {{ index + 1 }}.{{ item.name }}
    </p>
  </div>
</template>

<script>
// https://www.w3cplus.com/preprocessor/sass-color-function.html
export default {
  data() {
    return {
      list: [
        {
          name: "rgb($red,$green,$blue): 根据红、绿、蓝三个值创建一个颜色",
        },
        {
          name: "rgba($red,$green,$blue,$alpha): 根据红、绿、蓝和透明度值创建一个颜色",
        },
        {
          name: "red($color): 从一个颜色中获取其中红色值",
        },
        {
          name: "green($color): 从一个颜色中获取其中绿色值",
        },
        {
          name: "blue($color):  从一个颜色中获取其中蓝色值",
        },
        {
          name: "mix($color-1,$color-2,[$weight]): 把两种颜色混合起来",
        },
        {
          name: "blue($color):  从一个颜色中获取其中蓝色值",
        },

        {
          name: "hsl($hue,$saturation,$lightness)：通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色",
        },
        {
          name: "hsla($hue,$saturation,$lightness,$alpha)：通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色",
        },

        {
          name: "saturation($color)：从一个颜色中获取饱和度（saturation）值",
        },
        {
          name: "lightness($color)：从一个颜色中获取亮度（lightness）值",
        },

        {
          name: "adjust-hue($color,$degrees)：通过改变一个颜色的色相值，创建一个新的颜色",
        },
        {
          name: "lighten($color,$amount)：通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色",
        },
        {
          name: "darken($color,$amount)：通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色",
        },
        {
          name: "alpha($color)/opacity($color): 获取颜色透明度值",
        },

        {
          name: "rgba($color,$alpha): 改变颜色的透明度",
        },
        {
          name: "opacify($color, $amount) / fade-in($color, $amount)：使颜色更不透明",
        },
        {
          name: "transparentize($color, $amount) / fade-out($color, $amount)：使颜色更加透明",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$color: #f36;
$bgColor: orange;
$borderColor: green;
$color1: #a63;
$color2: #7bec77;
$bgColor1: #f36;
$bgColor2: #e36;
$borderColor1: #c36;
$borderColor2: #b36;
.mb_20 {
  margin-bottom: 20px;
}
.page {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  .title {
    color: rgba($color, 0.4);
    font-size: 25px;
  }
  .t1 {
    font-size: 20px;
    color: mix($color1, $color2, 0.25);
  }
}
</style>
