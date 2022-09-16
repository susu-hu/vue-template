<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-08-05 23:04:50
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-08-07 23:29:06
 * @FilePath: \vue_demo\src\views\plug\seamlesScroll.vue
 * @Description: "vue-seamless-scroll"
 * @link:https://chenxuan0000.github.io/vue-seamless-scroll/
-->

<template>
  <div class="contentBox">
    <div
      @click.stop="handleEvent($event)"
      v-if="list.length > 0"
      class="container"
    >
      <vue-seamless-scroll
        :data="list"
        :class-option="defaultOption"
        class="listBox"
      >
        <div v-for="(item, index) in list" :key="index">
          <div
            class="flex-row user"
            :data-item="JSON.stringify(item)"
            :data-index="index"
            data-type="1"
          >
            <img
              :src="item.img"
              class="user-ava"
              :data-item="JSON.stringify(item)"
              :data-index="index"
              data-type="1"
            />
            <span
              :data-item="JSON.stringify(item)"
              :data-index="index"
              data-type="1"
              >{{ item.name }}</span
            >
          </div>
        </div>
      </vue-seamless-scroll>
    </div>
    <Modal
      :transfer="true"
      v-model="show"
      title="详情"
      :mask-closable="false"
      :draggable="true"
    >
      <div class="flex">图片：<img :src="detail.img" /></div>
      <div class="flex">名称：{{ detail.name }}</div>
    </Modal>
  </div>
</template>

<script>
// npm install vue-seamless-scroll --save
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      show: false,
      detail: {},
      list: [
        {
          img: "https://s3.bmp.ovh/imgs/2022/07/27/85dabf1d5821a98b.png",
          name: "苏苏1",
        },
        {
          img: "https://s3.bmp.ovh/imgs/2022/07/27/c3bdf18a88cc56a5.png",
          name: "苏苏2",
        },
        {
          img: "https://s3.bmp.ovh/imgs/2022/07/27/85dabf1d5821a98b.png",
          name: "苏苏3",
        },
        {
          img: "https://s3.bmp.ovh/imgs/2022/07/27/c3bdf18a88cc56a5.png",
          name: "苏苏4",
        },
        {
          img: "https://s3.bmp.ovh/imgs/2022/07/27/85dabf1d5821a98b.png",
          name: "苏苏5",
        },
        {
          img: "https://s3.bmp.ovh/imgs/2022/07/27/c3bdf18a88cc56a5.png",
          name: "苏苏6",
        },
      ],
    };
  },
  computed: {
    defaultOption() {
      return {
        step: 0.5, // 数值越大速度滚动越快
        limitMoveNum: 6, // 开始无缝滚动的数据量
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  methods: {
    handleEvent(e) {
      let { dataset } = e.target,
        { type, item, index } = dataset;
      console.log(type, item, index);
      this.show = true;
      this.detail = JSON.parse(item);
    },
  },
};
</script>

<style scoped lang="less">
.container {
  border: 1px solid pink;
  border-radius: 10px;
  padding: 60px 30px;
  .listBox {
    overflow: hidden;
    height: 450px;
    .user {
      margin-bottom: 20px;
      font-size: 17px;
      color: #333;
      font-weight: bold;
      &-ava {
        width: 70px;
        height: 70px;
        flex-shrink: 0;
        margin-right: 20px;
      }
    }
  }
}
</style>
