<template>
  <div class="contentBox">
    <div class="color-list">
      <div
        class="color-item"
        :style="{ background: color.text }"
        v-for="color in colors"
        v-dragging="{ item: color, list: colors, group: 'color' }"
        :key="color.text"
      >
        {{ color.text }}
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line
import Vue from "vue";
export default {
  data() {
    return {
      colors: [
        {
          text: "Aquamarine",
        },
        {
          text: "Hotpink",
        },
        {
          text: "Gold",
        },
        {
          text: "Crimson",
        },
        {
          text: "Blueviolet",
        },
        {
          text: "Lightblue",
        },
        {
          text: "Cornflowerblue",
        },
        {
          text: "Skyblue",
        },
        {
          text: "Burlywood",
        },
      ],
    };
  },
  //if your need multi drag
  //   mounted: function () {
  //     this.colors.forEach((item) => {
  //       Vue.set(item, "isComb", false);
  //     });
  //   },
  mounted() {
    this.$dragging.$on("dragged", ({ value }) => {
      console.log(value.item);
      console.log(value.list);
      console.log(value.otherData);
    });
    this.$dragging.$on("dragend", () => {});
  },
};
</script>

<style scoped>
.color-item {
  cursor: move;
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  color: #fff;
}
</style>