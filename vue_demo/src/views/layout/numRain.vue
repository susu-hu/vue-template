<template>
  <div>
    <div class="number-box">
      <ul>
        <li v-for="(item, index) in liList" :key="item" :class="[
              { opacity: opacityList.includes(index) },
              { one: oneList.includes(index) },
              { two: twoList.includes(index) },
              { three: threeList.includes(index) },
              { four: fourList.includes(index) },
              { five: fiveList.includes(index) },
              { six: sixList.includes(index) },
              { seven: sevenList.includes(index) },
              { eight: eightList.includes(index) },
              { nine: nineList.includes(index) },
              { ten: tenList.includes(index) },
              { eleven: elevenList.includes(index) },
              { twelve: twelveList.includes(index) },
              { thirteen: thirteenList.includes(index) },
              { fourteen: fourteenList.includes(index) },
              { fifteen: fifteenList.includes(index) },
              { sixteen: sixteenList.includes(index) },
              { seventeen: seventeenList.includes(index) },
              { eighteen: eighteenList.includes(index) },
              { nineteen: nineteenList.includes(index) },
              { twenty: twentyList.includes(index) },
            ]">
          <div v-for="(it, id) in numberList" :key="id">{{ it }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      liList: [],
      numberList: [],
      opacityList: [
        1, 3, 5, 10, 11, 15, 20, 35, 36, 37, 38, 40, 42, 46, 50, 51, 56, 70, 71,
        72, 73, 74, 76, 78, 80, 81, 83, 84, 85, 86, 87,
      ],
      oneList: [2, 22, 42, 62, 82],
      twoList: [21, 41, 61, 81],
      threeList: [3, 23, 43, 63, 83],
      fourList: [0, 20, 40, 60, 80],
      fiveList: [4, 24, 44, 64, 84],
      sixList: [19, 39, 59, 79],
      sevenList: [1, 5, 25, 45, 65, 85],
      eightList: [18, 38, 58, 78],
      nineList: [6, 26, 46, 66, 86],
      tenList: [17, 37, 57, 77],
      elevenList: [7, 27, 47, 67, 87],
      twelveList: [16, 36, 56, 76],
      thirteenList: [8, 28, 48, 68],
      fourteenList: [15, 35, 55, 75],
      fifteenList: [9, 29, 49, 69],
      sixteenList: [14, 34, 54, 74],
      seventeenList: [10, 30, 50, 70],
      eighteenList: [13, 33, 53, 73],
      nineteenList: [11, 31, 51, 71],
      twentyList: [12, 32, 52, 72],
    };
  },
};
</script>

<style scoped lang="less">
</style>