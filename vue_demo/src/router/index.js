import Vue from 'vue';
import Router from "vue-router";
import layout from "@/views/layout.vue";
import page404 from "@/views/404.vue";
//首页
import index from "@/views/index/home.vue";
// sass
import sassColor from "@/views/sass/color.vue";
//layout路由懒加载
const layIndex = r => require.ensure([], () => r(require('@/views/layout/layIndex.vue')), 'layIndex')// import layIndex from "@/views/layout/layIndex.vue";
// 自定义下拉组件
import dropItem from "@/views/custom/dropItem.vue";
// 文件导出
import exportFile from "@/views/layout/export.vue";
import table from "@/views/table/index.vue";

const loading = r => require.ensure([], () => r(require('@/views/layout/loading.vue')), 'loading')

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
                    component: sassColor,
                    meta: {
                        menu: [{
                            path: "/",
                            name: "颜色函数"
                        }]
                    }
                },
                {
                    path: "/layIndex",
                    name: "layIndex",
                    component: layIndex
                },
                {
                    path: "/loading",
                    name: "loading",
                    component: loading
                },
                {
                    path: "/table",
                    name: "table",
                    component: table
                },
                {
                    path: "/exportFile",
                    name: "exportFile",
                    component: exportFile
                },
                {
                    path: '/custom/dropItem', //(一级路由)
                    name: 'dropItem',
                    component: dropItem,
                },
            ]
        },

        // 404页面需要放在最底下
        {
            path: "/404",
            name: "404",
            meta: {
                noAuth: true
            },
            component: page404
        },
        {
            path: "*",
            redirect: '/404'
        }
    ],
    mode: "history" // mode 设置为history ，去掉地址栏上的 # 号
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
// 标题
// router.beforeEach((to, from, next) => {
//     to.meta.title && (document.title = to.meta.title);
//     next()
// });

export default router;