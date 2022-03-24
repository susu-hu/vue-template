<template>
  <div
    class="frontImg"
    :style="{ width: topPageWidth + topPageMarginLR * 2 + 'px' }"
  >
    <div
      class="flexDom"
      style="position: relative; transition: 0.3s"
      :style="{
        width:
          dataList.length * (topPageWidth + topPageMarginLR * 3) + 'px',
        left: -activeItem * (topPageWidth + topPageMarginLR * 2) + 'px',
      }"
    >
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="topPage"
        :style="{
          width: topPageWidth + 'px',
          height: topPageHeight + 'px',
          margin: '0px ' + topPageMarginLR + 'px',
        }"
        @mousewheel="mouseWheel"
      >
        {{ item }}
      </div>
    </div>
    <div
      class="flexDom"
      style="width: 100%; display: flex; justify-content: center"
    >
      <div
        v-for="(item, index) in dataList"
        :key="item"
        class="icons"
        :class="{ active: index == activeItem }"
        @click="clickItem(index)"
        @mousewheel="mouseWheel"
      ></div>
    </div>
    <div
      class="flexDom"
      :style="{
        width:
          ((topPageWidth + topPageMarginLR * 2) / 5 + 10) *
            dataList.length +
          'px',
      }"
    >
      <div
        v-for="(item, index) in dataList"
        :key="item"
        class="downPage"
        :style="{
          width: (topPageWidth + topPageMarginLR * 2) / 5 + 10 + 'px',
          height: downPageHeight + 'px',
          transform:
            'rotate(' +
            (index - activeItem) * deg +
            'deg) translateY(' +
            Math.abs(activeItem - index) * 15 +
            'px)',
          left:
            index == activeItem
              ? 'calc(50% - ' +
                ((topPageWidth + topPageMarginLR * 2) / 5 + 10) / 2 +
                'px)'
              : 'calc(50% - ' +
                (((topPageWidth + topPageMarginLR * 2) / 5 + 10) / 2 +
                  (activeItem - index) *
                    ((topPageWidth + topPageMarginLR * 2) / 5 + 10)) +
                'px)',
          'z-index': index == activeItem ? '1' : '0',
        }"
        @click="clickItem(index)"
        @mousewheel="mouseWheel"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "frontImg",
  props: {
    topPageWidth: {
      type: Number,
      default: 400,
    },
    topPageHeight: {
      type: Number,
      default: 300,
    },
    downPageHeight: {
      type: Number,
      default: 100,
    },
    topPageMarginLR: {
      type: Number,
      default: 20,
    },
    downPageMarginLR: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      dataList: [1, 2, 3, 4, 5, 6, 7],
      activeItem: 3,
      deg: 3,
    };
  },
  mounted() {},
  methods: {
    clickItem(index) {
      this.activeItem = index;
    },
    mouseWheel(e) {
      if (e.deltaY < 0) {
        this.activeItem--;
        if (this.activeItem < 0) {
          this.activeItem = 0;
        }
      } else {
        this.activeItem++;
        if (this.activeItem >= this.dataList.length) {
          this.activeItem = this.dataList.length - 1;
        }
      }
    },
  },
};
</script>

<style scoped>
.frontImg {
  height: 500px;
  margin: 0 auto;
  border: 1px solid red;
  overflow: hidden;
  position: relative;
}
.flexDom {
  margin-top: 20px;
  float: left;
}
.topPage {
  box-shadow: 0px 0px 10px #ccc;
  float: left;
}
.icons {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  float: left;
  margin: 5px;
  cursor: pointer;
}
.active {
  background: red;
}
.downPage {
  box-shadow: 0px 0px 10px #ccc;
  background: #3a8ee6;
  float: left;
  transition: 0.3s;
  cursor: pointer;
  position: absolute;
}
</style>