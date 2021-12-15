import Vue from 'vue'
import App from './App.vue'
import store from "./store/index";
import router from "./router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS

Vue.config.productionTip = false;
// 引入饿了么ui
Vue.use(ElementUI);
// 引用iview
Vue.use(iView);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
