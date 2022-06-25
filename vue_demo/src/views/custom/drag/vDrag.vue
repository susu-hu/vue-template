<template>
  <div class="contentBox">
    <div v-drag class="modal flex-column j_c">苏苏就是小苏苏</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  directives: {
    // drag: {
    //   // 指令的定义
    //   bind: function (el) {
    //     let odiv = el; // 获取当前元素
    //     el.onmousedown = (e) => {
    //       // 算出鼠标相对元素的位置
    //       let disX = e.clientX - odiv.offsetLeft;
    //       let disY = e.clientY - odiv.offsetTop;
    //       let left = "";
    //       let top = "";
    //       document.onmousemove = (e) => {
    //         // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
    //         left = e.clientX - disX;
    //         top = e.clientY - disY;
    //         // 绑定元素位置到positionX和positionY上面
    //         // 移动当前元素
    //         odiv.style.left = left + "px";
    //         odiv.style.top = top + "px";
    //         console.log(left, top);
    //       };
    //       document.onmouseup = () => {
    //         document.onmousemove = null;
    //         document.onmouseup = null;
    //       };
    //     };
    //   },
    // },
  },
};
</script>

<style scoped lang="less">
.contentBox {
  overflow: hidden;

  position: relative;
}
.modal {
  width: 300px;
  height: 200px;
  border-radius: 10px;
  background: pink;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>