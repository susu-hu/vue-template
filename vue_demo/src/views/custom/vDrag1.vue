<template>
  <div class="conentBox">
    <div class="drag" v-drag @click="handleDragClick">我是拖拽的div</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  directives: {
    drag: {
      //1.指令绑定到元素上回立刻执行bind函数，只执行一次
      //2.每个函数中第一个参数永远是el，表示绑定指令的元素，el参数是原生js对象
      //3.通过el.focus()是无法获取焦点的，因为只有插入DOM后才生效
      // eslint-disable-next-line no-unused-vars
      bind: function (el) {},
      //inserted表示一个元素，插入到DOM中会执行inserted函数，只触发一次
      inserted: function (el) {
        let odiv = el; //获取当前元素
        let firstTime = "",
          lastTime = "";
        el.onmousedown = function (e) {
          var disx = e.pageX - el.offsetLeft;
          var disy = e.pageY - el.offsetTop;
          // 给当前元素添加属性，用于元素状态的判断
          odiv.setAttribute("ele-flag", false);
          odiv.setAttribute("draging-flag", true);
          firstTime = new Date().getTime();
          document.onmousemove = function (e) {
            el.style.left = e.pageX - disx + "px";
            el.style.top = e.pageY - disy + "px";
          };
          document.onmouseup = function (event) {
            document.onmousemove = document.onmouseup = null;
            lastTime = new Date().getTime();
            if (lastTime - firstTime > 200) {
              odiv.setAttribute("ele-flag", true);
              event.stopPropagation();
            }
            setTimeout(function () {
              odiv.setAttribute("draging-flag", false);
            }, 100);
          };
        };
      },
    },
  },
  methods: {
    handleDragClick(e) {
      // 判断拖拽组件的状态
      let isDrag = false;
      try {
        isDrag = e.target.getAttribute("ele-flag") === "true";
      } catch (e) {
        console.log(e);
      }
      if (isDrag) {
        return;
      }
      // 当推拽组件未在 拖动状态 执行点击事件
      // todo 下面是执行点击事件的代码
    },
  },
};
</script>

<style scoped>
.conentBox {
  position: relative;
}
.drag {
  width: 100px;
  height: 100px;
  border: 1px solid pink;
  position: absolute;
  left: 0;
  top: 0;
}
</style>