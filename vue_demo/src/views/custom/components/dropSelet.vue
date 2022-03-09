<template>
  <div class="select-wrap" @click.stop ref="select">
    <div class="display" @click="show = !show">
      <div>
        <slot :selectedData="{ text: selectedText, value: selectedValue }">{{
          showText ? selectedText : selectedValue
        }}</slot>
      </div>
      <div class="arrow" :class="{ top: show, bot: !show }"></div>
    </div>
    <ul v-show="show">
      <li
        v-for="(item, index) in options"
        :class="{ active: index === selectedIndex }"
        :key="index"
        @click="select(item, index)"
      >
        <span>{{ item.text }}</span>
        <span v-show="index === selectedIndex">sss </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "dropSelect",
  data() {
    return {
      selectedIndex: null,
      selectedText: "",
      selectedValue: "请选择",
      show: false,
    };
  },
  props: {
    value: {
      type: Number,
    },
    options: {
      type: Array,
      default: () => [],
    },
    showText: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: {
      handler: function () {
        if (typeof this.value === "number") {
          this.selectedIndex = this.value;
          this.selectedText = this.options[this.value].text;
          this.selectedValue = this.options[this.value].value;
        }
      },
      immediate: true,
    },
    selectedIndex: {
      handler: function () {
        this.$emit("input", this.selectedIndex);
        this.$emit("selected", {
          text: this.selectedText,
          value: this.selectedValue,
          index: this.selectedIndex,
        });
      },
      immediate: true,
    },
  },
  created() {},
  mounted() {
    document.addEventListener(
      "click",
      (e) => {
        if (!this.$el.contains(e.target)) {
          this.show = false;
        }
      },
      true
    );
  },
  methods: {
    select(item, index) {
      this.selectedIndex = index;
      this.selectedText = item.text;
      this.selectedValue = item.value;
      this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.select-wrap {
  position: relative;
}
.display {
  display: flex;
  align-items: center;
  height: 50px;
  font-size: 14px;
}
.arrow {
  border-width: 6px;
  border-bottom: 0;
  border-color: #919cad transparent transparent transparent;
  border-style: solid;
  width: 0;
  height: 0;
  transition: transform 0.3s;
  margin-left: 10px;
  &.bot {
    transform: rotate(0deg);
  }
  &.top {
    transform: rotate(-180deg);
  }
}
ul {
  cursor: pointer;
  background: white;
  padding: 0px 15px;
  width: 250px;
  box-sizing: border-box;
  box-shadow: 0px 0px 15px 0px rgba(18, 28, 47, 0.04);
  border-radius: 1px;
  position: absolute;
  z-index: 99;
  top: 50px;
  left: 0;
  opacity: 1;
  li {
    color: #1e1f2d;
    font-size: 14px;
    line-height: 23px;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.active {
      color: pink;
    }
    .icon {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
