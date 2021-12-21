import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
import { hasPermission } from '@/permission/index.js'
Vue.config.productionTip = false;
// 引入饿了么ui
Vue.use(ElementUI);
// 引用iview
Vue.use(iView);

// 处理按钮权限
Vue.directive("access", {
  inserted: (el, binding) => {
    console.log(el, binding)
    let menus = window.sessionStorage.getItem("menus");
    menus = JSON.parse(decodeURIComponent(menus));
    console.log(menus)
    const buttonAccess = menus.reduce((prev, curr) => {
      if (!curr.url.includes("/")) {
        prev = prev.concat(curr.url);
      }
      return prev;
    }, []);
    console.log(buttonAccess)
    if (!buttonAccess.includes(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});

Vue.prototype.hasPermission = hasPermission; // 通用方法

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
