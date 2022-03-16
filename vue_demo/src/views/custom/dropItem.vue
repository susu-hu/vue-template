<template>
  <div class="contentBox">
    <DropSelet
      :showText="true"
      v-slot="{ selectedData }"
      :options="selectedData"
    >
      {{ "+" + selectedData.value }}
    </DropSelet>
    <div>
      <div class="flex-row">
        <div
          class="hd_sel flex-row j_b"
          @click="show_month = !show_month"
          ref="s1"
        >
          <div>{{ current_month }}</div>
          <div
            class="arrow"
            :class="{ top: show_month, bot: !show_month }"
          ></div>
        </div>
      </div>
      <div class="hd_e">
        <div v-show="show_month" class="drop_hd">
          <div
            class="drop_hd_item"
            v-for="(item, index) in month_list"
            :class="{ drop_hd_ative: current_month == item.name }"
            :key="index"
            @click="choseItem(item, index)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DropSelet from "./components/dropSelet.vue";
export default {
  name: "dropItem",
  components: {
    DropSelet,
  },

  data() {
    return {
      current_month: "All",
      selectedData: [
        {
          text: "ss +852",
          value: "852",
        },
        {
          text: "ss +853",
          value: "853",
        },
        {
          text: "s +86",
          value: "86",
        },
        {
          text: "ces  +886",
          value: "886",
        },
        {
          text: "cessd +44",
          value: "44",
        },
      ],
      show_month: false,
      month_list: [
        {
          name: "All",
        },
        {
          name: "2022-1",
        },
        {
          name: "2022-2",
        },
      ],
    };
  },
  mounted() {
    document.addEventListener(
      "click",
      (e) => {
        let s1 = this.$refs.s1;
        if (s1 && !s1.contains(e.target)) {
          this.show_month = false;
        }
      },
      true
    );
  },
  methods: {
    choseItem(e) {
      this.current_month = e.name;
      this.show_month = false;
    },
  },
};
</script>

<style lang="less" scoped>
.drop_hd_ative {
  background-color: pink;
  color: #fff !important;
}

.drop_hd_item {
  line-height: 30px;
  color: #333;
}

.drop_hd {
  position: absolute;
  width: 200px;
  min-height: 30px;
  box-sizing: border-box;
  padding: 10px;
  background: #fff;
  left: 0;
  top: 3px;
  border-radius: 5px;
  z-index: 99;
  box-shadow: 5px 5px 5px #ccc;
  cursor: pointer;
}

.hd_e {
  position: relative;
}
.hd_sel {
  margin-top: 50px;
  min-width: 200px;
  height: 32px;
  background: rgba(243, 243, 243);
  border-radius: 8px;
  box-sizing: border-box;
  padding: 0 16px;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  cursor: pointer;
}
.arrow {
  border-width: 6px;
  border-bottom: 0;
  border-color: #fff transparent transparent transparent;
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
</style>