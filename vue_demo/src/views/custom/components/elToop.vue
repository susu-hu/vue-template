<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-08-16 22:01:56
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-08-16 22:02:15
 * @FilePath: \vue_demo\src\views\custom\components\elToop.vue
 * @Description: 二次封装饿了么的el-tooltip
-->
<template>
  <el-tooltip
    ref="tlp"
    :content="content"
    effect="dark"
    :disabled="disabled"
    :placement="placement"
    transfer
  >
    <p :class="className" ref="con" @mouseenter="changeShow($event)">
      {{ content }}
    </p>
  </el-tooltip>
</template>

<script>
export default {
  name: "EllipsisTooltip",
  props: {
    content: {
      type: String,
      default: "",
    },
    placement: {
      type: String,
      default: "top",
    },
    className: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    changeShow() {
      this.disabled = this.$refs.con.scrollWidth <= this.$refs.con.clientWidth;
      // console.log(this.$refs.con.scrollWidth);
      // console.log(this.$refs.con.clientWidth);
      // console.log(this.$refs.con.getBoundingClientRect().width);
    },
  },
};
</script>
