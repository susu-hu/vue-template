<template>
  <div>
    <Modal
      v-model="modal"
      :draggable="draggable ? false : true"
      :class-name="`${draggable ? 'all-box' : ''}` + className"
      :closable="true"
      :mask-closable="false"
      :width="width"
      @on-visible-change="visiableChange"
    >
      <div slot="header">
        <div class="flex-row j_b" style="padding-right: 20px">
          <div class="">{{ title }}</div>
          <div v-if="showDrag">
            <div v-if="draggable" class="" @click="checkDraggable(false)">
              <i class="iconfont icon-expand"></i>
            </div>
            <div v-else class="" @click="checkDraggable(true)">
              <i class="iconfont icon-inner"></i>
            </div>
          </div>
        </div>
      </div>
      <slot></slot>
      <div slot="footer">
        <Button class="cancel" @click="modalCancel" v-if="cancelText">{{
          cancelText
        }}</Button>
        <Button
          class="submit"
          @click="modalOk"
          :disabled="!prevent"
          v-if="submitText && showSubmit"
          >{{ submitText }}</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "DialogModal",
  props: {
    width: {
      type: Number,
      default: 400,
    },
    showDrag: {
      type: Boolean,
      default: () => true,
    },
    visiable: {
      type: Boolean,
      default: () => false,
    },
    canDrag: {
      type: Boolean,
      default: () => false,
    },
    titles: {
      type: String,
      default: "标题",
    },
    preventClick: {
      type: Boolean,
      default: () => true,
    },
    className: {
      type: String,
      default: "",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    submitText: {
      type: String,
      default: "确定",
    },
    showSubmit: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      modal: false,
      draggable: false,
      title: this.titles,
      prevent: true,
    };
  },
  watch: {
    visiable(val) {
      this.modal = val;
    },
    canDrag(val) {
      this.draggable = val;
    },
    titles(val) {
      this.title = val;
    },
    preventClick(val) {
      this.prevent = val;
    },
  },
  methods: {
    modalCancel() {
      this.modal = false;
      this.$emit("cancel", this.modal);
      // this.$emit("update:visiable", false);
    },
    modalOk() {
      this.$emit("submit");
    },
    checkDraggable(e) {
      this.$emit("update:canDrag", e);
    },
    visiableChange(e) {
      this.$emit("visiableChange", e);
    },
  },
};
</script>
<style>
.all-box {
  width: 80%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>