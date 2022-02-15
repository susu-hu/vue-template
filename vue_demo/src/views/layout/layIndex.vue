<template lang="pug">
.page
  .title.mb_20 瀑布流布局
  .g-container
    - for(var i = 0; i<4; i++)
      .g-queue
        - for(var j = 0; j<8; j++)
          .g-item
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.mb_20 {
  margin-bottom: 20px;
}
.page {
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  $lineCount: 4;
  $count: 8;

  @function randomNum($max, $min: 0, $u: 1) {
    @return ($min + random($max)) * $u;
  }

  @function randomColor() {
    @return rgb(randomNum(255), randomNum(255), randomNum(255));
  }

  .g-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    overflow: hidden;
  }

  .g-queue {
    display: flex;
    flex-direction: column;
    flex-basis: 24%;
  }

  .g-item {
    position: relative;
    width: 100%;
    margin: 2.5% 0;
  }

  @for $i from 1 to $lineCount + 1 {
    .g-queue:nth-child(#{$i}) {
      @for $j from 1 to $count + 1 {
        .g-item:nth-child(#{$j}) {
          height: #{randomNum(300, 50)}px;
          background: randomColor();

          &::after {
            content: "#{$j}";
            position: absolute;
            color: #fff;
            font-size: 24px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
}
</style>
