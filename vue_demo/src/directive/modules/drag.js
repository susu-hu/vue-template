/*
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-06-23 17:02:51
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-06-24 01:05:25
 * @FilePath: \vue_demo\src\directive\drag.js
 * @Description: v-drag
 */
export default {
    install(Vue) {
        Vue.directive('drag', {
            // 指令的定义
            bind: function (el) {
                let odiv = el; // 获取当前元素
                el.onmousedown = (e) => {
                    e.preventDefault();//取消默认事件，可不加
                    // 算出鼠标相对元素的位置
                    let disX = e.clientX - odiv.offsetLeft;//pageX
                    let disY = e.clientY - odiv.offsetTop;//pageY
                
                    document.onmousemove = (e) => {
                        e.stopPropagation()//阻止冒泡
                        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        // e.clientX - disX;
                        // e.clientY - disY;
                        
                        // 绑定元素位置到positionX和positionY上面,移动当前元素
                        odiv.style.left =  e.clientX - disX + "px";
                        odiv.style.top = e.clientY - disY + "px";
                    };
                    document.onmouseup = () => {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            },

        })
    }
}


// 注册
// Vue.directive('my-directive', {
//     bind: function () {},
//     inserted: function () {},
//     update: function () {},
//     componentUpdated: function () {},
//     unbind: function () {}
//   })
  
//   // 注册 (指令函数)
//   Vue.directive('my-directive', function () {
//     // 这里将会被 `bind` 和 `update` 调用
//   })

//   // getter，返回已注册的指令
//   var myDirective = Vue.directive('my-directive')