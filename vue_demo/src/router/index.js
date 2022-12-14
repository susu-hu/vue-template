import Vue from "vue";
import constantRoutes from './routers'
import Router from "vue-router";
import layout from "@/views/layout.vue";
import page404 from "@/views/404.vue";
import index from "@/views/index/home.vue";//首页
import Calendar from "@/views/custom/calen.vue";// Failed to resolve async component异步组件报错，改成普通引入
import QuillEditor from "@/views/plug/quillEditor.vue";
import UploadFile from "@/views/table/uploadFile.vue";
import dynamicForm from "@/views/table/dynamicForm.vue";
import bigData from "@/views/table/bigData.vue";
const throttle = (r) =>
  require.ensure(
    [],
    () => r(require("@/views/event/throttle.vue")),
    "throttle"
  );
const cAndM = (r) =>
  require.ensure(
    [],
    () => r(require("@/views/base/createdAndMounted.vue")),
    "cAndM"
  );
const childAp = (r) =>
  require.ensure([], () => r(require("@/views/base/childAp.vue")), "childAp");
const sync = (r) =>
  require.ensure([], () => r(require("@/views/base/sync.vue")), "sync");
const slot = (r) =>
  require.ensure([], () => r(require("@/views/base/slot.vue")), "slot");
const reForm = (r) =>
  require.ensure([], () => r(require("@/views/elmUI/reForm.vue")), "reForm");
const jsIndex = (r) =>
  require.ensure(
    [],
    () => r(require("@/views/baseJavascript/index.vue")),
    "jsIndex"
  );
const closure = (r) =>
  require.ensure(
    [],
    () => r(require("@/views/baseJavascript/closure.vue")),
    "closure"
  );
const autoSave = (r) =>
  require.ensure(
    [],
    () => r(require("@/views/event/autoSave.vue")),
    "autoSave"
  );
const vuedraggable = (r) =>
  require.ensure(
    [],
    () => r(require("@/views/plug/vuedraggable.vue")),
    "vuedraggable"
  );
const demoDrag = (r) =>
  require.ensure([], () => r(require("@/views/plug/demoDrag.vue")), "demoDrag");
const aweDnd = (r) =>
  require.ensure([], () => r(require("@/views/plug/aweDnd.vue")), "aweDnd");
const lodash = (r) =>
  require.ensure([], () => r(require("@/views/event/lodash.vue")), "lodash");

const dropItem = (r) =>
  require.ensure([], () => r(require("@/views/custom/dropItem")), "custom");

const searchTree = (r) =>
  require.ensure([], () => r(require("@/views/custom/searchTree")), "custom");

const dataecharts = (r) =>
  require.ensure([], () => r(require("@/views/dataCharts/charts.vue")), "dataV");
const dataV = (r) =>
  require.ensure([], () => r(require("@/views/dataCharts/dataV.vue")), "dataV");
const dataPie = (r) =>
  require.ensure([], () => r(require("@/views/dataCharts/pie.vue")), "dataV");
const dataLine = (r) =>
  require.ensure([], () => r(require("@/views/dataCharts/line.vue")), "dataV");
const swiperPlug = (r) =>
  require.ensure([], () => r(require("@/views/plug/swiper2.vue")), "swiperPlug");

Vue.use(Router);
// 解决路由重复点击报错
const originPush = Router.prototype.push;
const originReplace = Router.prototype.replace;
Router.prototype.push = function (location, onComplete, onAbort) {
  if (onComplete === undefined && onAbort === undefined) {
    return originPush.call(this, location, onComplete, onAbort).catch(() => { });
  } else {
    originPush.call(this, location, onComplete, onAbort);
  }
};
Router.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete === undefined && onAbort === undefined) {
    return originReplace
      .call(this, location, onComplete, onAbort)
      .catch(() => { });
  } else {
    originReplace.call(this, location, onComplete, onAbort);
  }
};
const router = new Router({
  // 滚动到页面顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  },
  routes: [
    {
      path: "/",
      name: "layout",
      component: layout,
      redirect: "/index", // 重定位后页面加载的页面
      children: [
        {
          path: "/index",
          name: "index",
          component: index,
          meta: {
            menu: [{
              path: "/",
              name: "欢迎来到苏苏的vue之旅",
            },],
          },
        },
        {
          path: "/sassColor",
          name: "sassColor",
          component: () => import('@/views/sass/color.vue'),
          meta: {
            menu: [{
              path: "/",
              name: "颜色函数",
            },],
          },
        },
        {
          path: "/tailwindCSS",
          name: "tailwindCSS",
          component: () => import('@/views/sass/tailwindCSS.vue'),
        },

        {
          path: "/tableList",
          name: "tableList",
          component: () => import('@/views/table/index.vue'),
          meta: {},
        },
        {
          path: "/table/dynamicForm",
          name: "dynamicForm",
          component: dynamicForm,
        },
        {
          path: "/table/datepicker",
          name: "datepicker",
          component: () => import("@/views/table/datepicker.vue"),
        },
        {
          path: "/table/uploadFile",
          name: "uploadFile",
          component: UploadFile,
        },
        {
          path: "/table/moreForm",
          name: "moreForm",
          component: () => import("@/views/table/moreForm.vue"),
        },
        {
          path: "/table/traverseForm",
          name: "traverseForm",
          component: () => import("@/views/table/traverseForm.vue"),
        },
        {
          path: "/table/treeTable",
          name: "treeTable",
          component: () => import("@/views/table/treeTable.vue"),
        },
        {
          path: "/table/tree",
          name: "tree",
          component: () => import("@/views/table/tree.vue"),
        },
        {
          path: "/table/todayPicker",
          name: "todayPicker",
          component: () => import("@/views/table/todayPicker.vue"),
        },
        {
          path: "/table/bigData",
          name: "bigData",
          component: bigData,
        },
        {
          path: "/table/treeAndCheckbox",
          name: "treeAndCheckbox",
          component: () => import("@/views/table/treeAndCheckbox.vue"),
        },

        {
          path: "/custom/dropItem", //(一级路由)
          name: "dropItem",
          component: dropItem,
        },
        {
          path: "/event/throttle",
          name: "throttle",
          component: throttle,
        },
        {
          path: "/event/lodash",
          name: "lodash",
          component: lodash,
        },

        {
          path: "/base/childAp",
          name: "childAp",
          component: childAp,
        },
        {
          path: "/base/cAndM",
          name: "cAndM",
          component: cAndM,
        },
        {
          path: "/base/sync",
          name: "sync",
          component: sync,
        },
        {
          path: "/base/slot",
          name: "slot",
          component: slot,
        },
        {
          path: "/base/mixin",
          name: "mixin",
          component: () => import("@/views/base/mixin.vue"),
        },
        {
          path: "/base/whiteRouter",
          name: "whiteRouter",
          component: () => import("@/views/base/whiteRouter.vue"),
        },
        {
          path: "/base/keepAlive",
          name: "keepAlive",
          component: () => import("@/views/base/keepAlive/keepAlive.vue"),
          // redirect: '/base/keepAlive/A',
          children: [{
            path: 'A',
            name: 'A',
            component: () => import("@/views/base/keepAlive/a.vue"),
            meta: {
              keepAlive: true
            },
          },
          {
            path: 'B',
            name: 'B',
            component: () => import("@/views/base/keepAlive/b.vue"),
            meta: {
              keepAlive: true
            },
          },
          {
            path: 'C',
            name: 'C',
            component: () => import("@/views/base/keepAlive/c.vue"),
            meta: {
              keepAlive: true
            },
          }
          ]
        },
        {
          path: "/eleUi/reForm",
          name: "reForm",
          component: reForm,
        },
        {
          path: "/js/index",
          name: "jsIndex",
          component: jsIndex,
        },
        {
          path: "/js/closure",
          name: "closure",
          component: closure,
        },
        {
          path: "/js/export",
          name: "export",
          component: () => import("@/views/baseJavascript/export.vue"),
        },
        {
          path: "/js/common",
          name: "jscommon",
          component: () => import("@/views/baseJavascript/common.vue"),
        },
        {
          path: "/js/nullJadge",
          name: "nullJadge",
          component: () => import("@/views/baseJavascript/nullJadge.vue"),

        },
        {
          path: "/event/autoSave",
          name: "autoSave",
          component: autoSave,
        },
        {
          path: "/plug/vuedraggable",
          name: "vuedraggable",
          component: vuedraggable,
        },
        {
          path: "/plug/quillEditor",
          name: "quillEditor",
          component: QuillEditor,
        },
        {
          path: "/plug/reviewer",
          name: "reviewer",
          component: () => import("@/views/plug/reviewer.vue"),
        },
        {
          path: "/plug/xsheet",
          name: "xsheet",
          component: () => import("@/views/plug/xsheet.vue"),
        },
        {
          path: "/plug/luckysheet",
          name: "luckysheet",
          component: () => import("@/views/plug/luckysheet.vue"),
        },

        {
          path: "/plug/fullPage",
          name: "fullPage",
          component: () => import("@/views/plug/fullpage.vue"),
        },

        {
          path: "/plug/demoDrag",
          name: "demoDrag",
          component: demoDrag,
        },
        {
          path: "/plug/aweDnd",
          name: "aweDnd",
          component: aweDnd,
        },
        {
          path: "/plug/seamlesScroll",
          name: "seamlesScroll",
          component: () => import('@/views/plug/seamlesScroll.vue'),
        },
        {
          path: "/plug/swiper",
          name: "swiperPlug",
          component: swiperPlug,
          // component: () => import('@/views/plug/swiper.vue'),
        },
        {
          path: "/data/dataV",
          name: "dataV",
          component: dataV,
        },
        {
          path: "/data/pie",
          name: "datapie",
          component: dataPie,
        },
        {
          path: "/data/line",
          name: "dataline",
          component: dataLine,
        },
        {
          path: "/data/waterCss",
          name: "waterCss",
          component: () => import('@/views/dataCharts/waterCss.vue'),
        },
        {
          path: "/jest/index",
          name: "jestIndex",
          component: () => import("@/views/jest/index.vue"),
        },
        {
          path: "/jest/test01",
          name: "test01",
          component: () => import("@/views/jest/test01.vue"),
        },
        {
          path: "/canvas/index",
          name: "demo01",
          component: () => import("@/views/canvas/index.vue"),
        },
        {
          path: "/canvas/ggk",
          name: "ggk",
          component: () => import("@/views/canvas/ggk.vue"),
        },
        {
          path: "/map/amap",
          name: "amap",
          component: () => import("@/views/map/amap.vue"),
        },
        {
          path: "/map/amap2",
          name: "amap2",
          component: () => import("@/views/map/amap2.vue"),
        },
        {
          path: "/media/video",
          name: "video",
          component: () => import("@/views/media/video.vue"),
        },
        {
          path: "/media/vueDplayer",
          name: "vueDplayer",
          component: () => import("@/views/media/vueDplayer.vue"),
        },
        {
          path: "/custom/calendar",
          name: "calendar",
          component: Calendar,
          // component: resolve => require(['@/views/custom/calen.vue'], resolve)
        },
        {
          path: "/custom/page",
          name: "page",
          component: () => import("@/views/custom/page.vue"),
        },
        {
          path: "/custom/modal",
          name: "customModal",
          component: () => import("@/views/custom/modal.vue"),
        },
        {
          path: "/custom/vDrag",
          name: "vDrag",
          component: () => import("@/views/custom/drag/vDrag.vue"),
        },
        {
          path: "/custom/searchTree",
          name: "searchTree",
          component: searchTree
        },
        {
          path: "/custom/textOverFlow",
          name: "textOverFlow",
          component: () => import('@/views/custom/textOverFlow.vue')
        },
        {
          path: "/custom/stretch",
          name: "stretch",
          component: () => import('@/views/custom/stretch.vue')
        },
        {
          path: "/custom/renderTree",
          name: "renderTree",
          component: () => import('@/views/custom/renderTree.vue')
        },
        // 处理类库
        {
          path: "/library/moment",
          name: "moment",
          component: () => import("@/views/library/moment.vue"),
        },
        {
          path: "/library/anime",
          name: "anime",
          component: () => import("@/views/library/anime.vue"),
        },

        ...constantRoutes
      ],
    },
    {
      path: "/data/echarts",
      name: "dataecharts",
      component: dataecharts,
    },
    // 404页面需要放在最底下
    {
      path: "/404",
      name: "404",
      meta: {
        noAuth: true,
      },
      component: page404,
    },
    {
      path: "*",
      redirect: "/404",
    },
  ],
  mode: "history", // mode 设置为history ，去掉地址栏上的 # 号
});
//白名单
// eslint-disable-next-line
const whiteRouter = ['/login']; //indexOf方法，判断数组中是否存在指定的某个对象，如果不存在，则返回-1
router.beforeEach((to, from, next) => {
  // if (to.path === "/login") return next();
  // //获取token
  // const tokenStr = window.sessionStorage.getItem("token");
  // if (!tokenStr) return next("/login");
  // next()
  // // TODO:
  // let menus = window.sessionStorage.getItem("menus");
  // menus = JSON.parse(decodeURIComponent(menus))
  // // 根据路由元信息判断是否需要控制权限
  // if(to.matched.some(record => record.meta.noAuth)){
  //   next() // 确保一定要调用 next()
  // }else{
  //   if(menus && menus.length){
  //     // console.log(to.path, menus)
  //     const hasPermisson = checkPermisson(to.path, menus)
  //     if(hasPermisson){
  //       next();
  //     }else{
  //       next("/404")
  //     }
  //   }else{
  //     next("/login");
  //   }
  // }


  // 路由白名单
  /**
   * next():执行了to里面的路由对象,进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
   *
   *     1.不带参数:指向(进入)to钩子--进入下一个页面，但是不会触发beforeEach
   *     2.带参数next('/')或者next({path:'/'}):进入指定页面,发生路由变化，有变化就会触发beforeEach ---  问题:容易造成死循环--比如next('/index'),当执行到这里的时候，触发beforeEach,又遇到里面的next('/index')，又触发next('/index')......
   *     
   *     如果要进入下一个页面，直接next()--进入to钩子，调用to里面的路径，往下一个页面跑
   * 
   *      console.log(to)  // 进入的页面(下一个页面)
   *      console.log(from) // 离开之前的页面(上一个页面)
   *      console.log(next) // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。确保要调用 next 方法，否则钩子就不会被 resolved。
   *      
   *      to.path:进入的下一个页面的路径
   *     
   */

  //token令牌--处理权限

  //console.log(to) //index -->在login页面直接输入url跳转到index。 to.path == index
  // if (tokenStr) {
  //   if (to.path === '/login') {
  //     next();
  //   } else {
  //     //获取用户角色
  //     //动态分配路由权限
  //     next();
  //   }
  //   /**
  //    *  1. to = /console   触发beforeEach,检测到token存在，next() --> 重定向到index
  //    *  2. to = /index     触发beforeEach,检测到token存在，next() --> 进入控制台首页
  //    */
  //   //路由动态添加，分配菜单，每个角色分配不同菜单
  //   console.log("存在");
  // } else {
  //   // next('/login');  //发生路由指向变化的情况下，会触发beforeEach,又会检测toKen存不存在，造成死循环 --  解决方法：使用白名单!
  //   console.log("不存在");

  //   if (whiteRouter.indexOf(to.path) !== -1) {  //当to.path == '/login' 的时候，存在，执行next(),跳到login页面,不触发beforeEach
  //     next(); //指向(进入)to钩子--进入下一个页面,to.path == '/login'
  //   } else {
  //     next('/login'); //发生路由指向变化，触发beforeEach ---> to.path == '/login'
  //   }
  //   /**
  //    *  解析:
  //    *     1.直接进入 index 的时候，参数to被改变成了 "/index" ,触发路由指向，就会跑beforeEach（第一次）
  //    *     2.再一次 next 指向了login, 再次发生路由指向，再跑beforeEach （第二次）, 参数的to被改变成了 "/login"
  //    *     3.白名单判断存在，则直接执行next(),因为没有参数，所以不会再跑beforeEach。
  //    */
  // }
  if (to.meta.name) {
    document.title = to.meta.name;
  } else {
    document.title = "苏苏的vue";
  }
  next();
});

// function checkPermisson(path, menus) {
//     return menus.some(menu => {
//         // console.log(path, menu.url)
//         return path === menu.url
//     })
// }
// 标题
// router.beforeEach((to, from, next) => {
//     to.meta.title && (document.title = to.meta.title);
//     next()
// });
// 滚到顶部
// router.afterEach((to, from, next) => {
//   window.scrollTo(0, 0)
//   next()
// });

export default router;