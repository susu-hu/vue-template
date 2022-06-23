/*
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-06-23 17:02:51
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-06-23 17:09:56
 * @FilePath: \vue_demo\src\directive\drag.js
 * @Description: v-drag
 */
export default {
    install(Vue) {
        Vue.directive('drag', {
            // 指令的定义
            bind: function (el) {
                console.log(el)
                let odiv = el; // 获取当前元素
                el.onmousedown = (e) => {
                    // 算出鼠标相对元素的位置
                    let disX = e.clientX - odiv.offsetLeft;
                    let disY = e.clientY - odiv.offsetTop;
                    let left = "";
                    let top = "";
                    document.onmousemove = (e) => {
                        // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                        left = e.clientX - disX;
                        top = e.clientY - disY;
                        // 绑定元素位置到positionX和positionY上面
                        // 移动当前元素
                        odiv.style.left = left + "px";
                        odiv.style.top = top + "px";
                    };
                    document.onmouseup = (e) => {
                        document.onmousemove = null;
                        document.onmouseup = null;
                    };
                };
            },

        })
    }
}