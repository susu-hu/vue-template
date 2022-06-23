import Vue from "vue";
import App from "./App.vue";
import store from "./store/index";
import router from "./router";
import axios from "axios";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

//-------------------4.x
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

// -------------3.x版本
// import iView from "iview";
// import "iview/dist/styles/iview.css";
// Vue.use(iView);

// import './iview/theme.less'; //--定制主题
import './index.scss'; // 台湾css


import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;

import api from "@/request/api.js";
import tools from "@/utils/tools.js";
import menus from "./utils/menu";
import {
  hasPermission
} from "@/permission/index.js";

import Loading from "@/components/loading";
Vue.use(Loading);

import Message from "@/components/message";
Vue.prototype.$my_message = Message.install;

import load from "@/components/load";
Vue.use(load);

import loading from "@/components/load2/index.js";
Vue.use(loading);

import loading001 from "@/components/loading001/index.js";
Vue.use(loading001);

import btn from "@/directive/btn.js";
Vue.use(btn);

import drag from "@/directive/drag.js";
Vue.use(drag);

import VueDND from "awe-dnd";

Vue.use(VueDND);

import Debounce000 from "./utils/throDebo.js";
Vue.component("Debounce000", Debounce000);

// main.js 全局引入lodash
// import _ from 'lodash'
// Vue.prototype._ = _ // 使用 this._.debounce(this.handleClick,1000,false)

// 将自动注册所有组件为全局组件
import dataV from "@jiaminghi/data-view";
Vue.use(dataV);

import VueDPlayer from "vue-dplayer";
import "vue-dplayer/dist/vue-dplayer.css";
Vue.use(VueDPlayer);

// 全屏滚动
import VueFullPage from 'vue-fullpage.js';
Vue.use(VueFullPage);

import Storage from "vue-ls";
const options = {
  namespace: "vuejs__", // key键前缀
  name: "ls", // 命名Vue变量.[ls]或this.[$ls],
  storage: "local", // 存储名称: session, local, memory
};
Vue.use(Storage, options);

Vue.config.productionTip = false; // 阻止启动生产消息
// 引入饿了么ui
Vue.use(ElementUI);


// 处理按钮权限
Vue.directive("access", {
  inserted: (el, binding) => {
    console.log(el, binding);
    let menus = window.sessionStorage.getItem("menus");
    menus = JSON.parse(decodeURIComponent(menus));
    console.log(menus);
    const buttonAccess = menus.reduce((prev, curr) => {
      if (!curr.url.includes("/")) {
        prev = prev.concat(curr.url);
      }
      return prev;
    }, []);
    console.log(buttonAccess);
    if (!buttonAccess.includes(binding.value)) {
      el.parentNode.removeChild(el);
    }
  },
});
// 全局注册组件
import Components from './components'
Vue.use(Components)

Vue.prototype.hasPermission = hasPermission; // 通用方法
Vue.prototype.$api = api; // 接口
Vue.prototype.tools = tools; // 通用方法
Vue.prototype.menus = menus; // 通用方法
Vue.prototype.$http = axios; // 临时处理

Vue.prototype.$sessionToken = () => sessionStorage.token;
Vue.prototype.$bus = new Vue();

// 全局混入
Vue.mixin({
  beforeRouteLeave(to, from, next) {
    // let flag = this.$store.state.closeFlag,
    //   currPath = this.$store.state.currPath;
    // if (flag) {
    //   // 拿到keep-alive的cache
    //   let cache = this.$vnode.parent.componentInstance.cache; //缓存的组件
    //   let keys = this.$vnode.parent.componentInstance.keys; // 缓存的组件名
    //   console.log("cache-------------------------", cache);
    //   console.log("keys--------------------------", keys);
    //   console.log(currPath);
    //   if (cache[currPath] != null) {
    //     delete cache[currPath];
    //     keys.splice(keys.indexOf(currPath), 1);
    //     console.log('this-----------', this.$destroy)
    //     this.$destroy();

    //   }
    // }
    next()
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    // 可以通过传一个回调给 next来访问组件实例
    // eslint-disable-next-line no-unused-vars
    next((vm) => { })
  },

})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");