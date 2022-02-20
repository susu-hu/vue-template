import Vue from 'vue';
import Router from "vue-router";
import layout from "@/views/layout.vue";
//首页
import index from "@/views/index/home.vue";
// sass
import sassColor from "@/views/sass/color.vue";
//layout
import layIndex from "@/views/layout/layIndex.vue";
Vue.use(Router);
// 解决路由重复点击报错
const originPush = Router.prototype.push
const originReplace = Router.prototype.replace
Router.prototype.push = function (location, onComplete, onAbort) {
    if (onComplete === undefined && onAbort === undefined) {
        return originPush.call(this, location, onComplete, onAbort).catch(() => {
        })
    } else {
        originPush.call(this, location, onComplete, onAbort)
    }
}
Router.prototype.replace = function (location, onComplete, onAbort) {
    if (onComplete === undefined && onAbort === undefined) {
        return originReplace.call(this, location, onComplete, onAbort).catch(() => {
        })
    } else {
        originReplace.call(this, location, onComplete, onAbort)
    }
}

const router = new Router({
    routes: [
        {
            path: "/",
            name: "layout",
            component: layout,
            redirect: '/index',// 重定位后页面加载的页面
            children: [
                {
                    path: "/index",
                    name: "index",
                    component: index,
                    meta: {
                        menu: [{
                            path: "/",
                            name: "欢迎来到苏苏的vue之旅"
                        }]
                    }
                }, {
                    path: "/sassColor",
                    name: "sassColor",
                    component: sassColor
                },
                {
                    path: "/layIndex",
                    name: "layIndex",
                    component: layIndex
                }
            ]
        },
    ],
    mode: "hash" // mode 设置为history ，去掉地址栏上的 # 号
});
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
    if (to.meta.name) {
        document.title = to.meta.name
    } else {
        document.title = '苏苏的vue'
    }
    next()
});

// function checkPermisson(path, menus) {
//     return menus.some(menu => {
//         // console.log(path, menu.url)
//         return path === menu.url
//     })
// }

export default router;