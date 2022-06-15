<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-05-22 14:45:55
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-06-01 15:07:51
 * @FilePath: \vue_demo\src\views\custom\modal.vue
 * @Description: 二次封装iview的Modal组件
-->
<template>
  <div class="contentBox">
    <div>二次封装iview的Modal组件,可拖拽,可添加自定义内容</div>
    <Divider />
    <Button type="primary" @click="(show = true), (canDrag = false)"
      >打开</Button
    >
    <Dialog
      titles="二次封装Modal组件"
      :width="700"
      :visiable="show"
      :canDrag.sync="canDrag"
      @cancel="modalCancel"
      @submit="modalOk"
      @visiableChange="(e) => visiableChange(e, 'show')"
    ></Dialog>
  </div>
</template>

<script>
import Dialog from "./components/dialog.vue";
export default {
  components: {
    Dialog,
  },
  data() {
    return {
      show: false,
      canDrag: false,
    };
  },
  methods: {
    checkDraggable(e) {
      this.canDrag = e;
    },
    visiableChange(e, type) {
      this[type] = e;
    },
    modalCancel(e) {
      this.modal = e;
    },
    modalOk() {},
  },
};
</script>

<style>
</style>