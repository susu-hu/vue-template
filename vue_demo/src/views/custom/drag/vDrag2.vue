<template>
  <div>
    <div class="container">
      <div class="box" v-drag></div>
      <div class="box" v-drag></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      dragAble: false,
    };
  },
  directives: {
    //拖拽&&缩放指令
    drag: {
      bind: (el, binding) => {
        console.log(el);
        console.log(binding.value);
        //绑定默认样式
        el.style.zIndex = 9;
        el.style.backgroundColor = "rgba(0,0,0,1)";
        //如果为编辑状态
        if (binding.value || binding.value === undefined) {
          //定义该元素的 top left width height
          let x, y, w, h;
          //鼠标的起始和结束坐标
          let cx_start, cy_start, cx_end, cy_end;
          //判断鼠标样式
          el.onmousemove = (e) => {
            //获取鼠标当前位置
            let cx_now = e.clientX;
            let cy_now = e.clientY;
            //获取div右下角相对浏览器的位置
            let {
              top: el_top,
              left: el_left,
              width: el_width,
              height: el_height,
            } = el.getBoundingClientRect();
            let el_bottom_height = el_top + el_height;
            let el_right_width = el_left + el_width;
            //判断鼠标是否在div下边界
            let mouse_in_bottom =
              cy_now <= el_bottom_height + 5 && cy_now >= el_bottom_height - 5;
            //判断鼠标是否在div右边界
            let mouse_in_right =
              cx_now <= el_right_width + 5 && cx_now >= el_right_width - 5;
            if (mouse_in_bottom && mouse_in_right) {
              el.style.cursor = "se-resize";
            } else if (mouse_in_right) {
              el.style.cursor = "e-resize";
            } else if (mouse_in_bottom) {
              el.style.cursor = "s-resize";
            } else {
              el.style.cursor = "move";
            }
          };
          el.onmousedown = (e) => {
            let mouse = el.style.cursor;
            //更改默认样式
            el.style.backgroundColor = "rgba(0,0,0,.5)";
            el.style.zIndex = 99;
            //对象解构赋值
            let {
              left: el_x,
              top: el_y,
              width: el_w,
              height: el_h,
            } = window.getComputedStyle(el);
            x = el_x;
            y = el_y;
            w = el_w;
            h = el_h;
            console.log(x, y, w, h);
            cx_start = e.clientX;
            cy_start = e.clientY;
            //绑定移动事件
            document.onmousemove = (e) => {
              cx_end = e.clientX;
              cy_end = e.clientY;
              //默认左下方向配置
              let x_move = cx_end - cx_start;
              let y_move = cy_end - cy_start;
              let direct = ["width", "height"];
              let pos = [w, h];
              let move = [x_move, y_move];
              let limit = 50;
              //判断鼠标的类型进行对应的操作
              switch (mouse) {
                case "e-resize":
                  direct = ["width"];
                  pos = [w];
                  move = [x_move];
                  break;
                case "s-resize":
                  direct = ["height"];
                  pos = [h];
                  move = [y_move];
                  break;
                case "move":
                  direct = ["left", "top"];
                  pos = [x, y];
                  limit = 0;
                  break;
              }
              handle_div(direct, pos, move, limit);
            };
            //取消移动事件
            document.onmouseup = () => {
              //还原默认样式
              el.style.zIndex = 9;
              el.style.backgroundColor = "rgba(0,0,0,1)";
              document.onmousemove = null;
            };
            /**
             * 操作DOM位置和大小方法
             * @param direct 方向
             * @param pos 尺寸/坐标
             * @param move 拖动距离
             * @param limit 限定范围
             */
            function handle_div(direct, pos, move, limit) {
              for (let i = 0; i < direct.length; i++) {
                let val = parseInt(pos[i]) + move[i];
                val = val <= limit ? limit : val;
                el.style[direct[i]] = val + "px";
              }
            }
          };
        } else {
          el.style.cursor = "default";
          //移除点击事件
          el.onmousedown = null;
          el.onmousemove = null;
        }
      },
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 500px;
  position: relative;
  border: 1px solid pink;
  border-radius: 10px;
  overflow: auto;
}
.box {
  height: 50px;
  width: 50px;
  border: 1px solid pink;
  position: absolute;
  left: 0;
  top: 0;
}
</style>