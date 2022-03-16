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
const throttle = r => require.ensure([], () => r(require('@/views/event/throttle.vue')), 'throttle')
const dynamicForm = r => require.ensure([], () => r(require('@/views/table/dynamicForm.vue')), 'dynamicForm')
const cAndM = r => require.ensure([], () => r(require('@/views/base/createdAndMounted.vue')), 'cAndM')
const childAp = r => require.ensure([], () => r(require('@/views/base/childAp.vue')), 'childAp')
const sync = r => require.ensure([], () => r(require('@/views/base/sync.vue')), 'sync')
const slot = r => require.ensure([], () => r(require('@/views/base/slot.vue')), 'slot')
const reForm = r => require.ensure([], () => r(require('@/views/elmUI/reForm.vue')), 'reForm')
const jsIndex= r => require.ensure([], () => r(require('@/views/baseJavascript/index.vue')), 'jsIndex')
const closure= r => require.ensure([], () => r(require('@/views/baseJavascript/closure.vue')), 'closure')

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
    // 滚动到页面顶部
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
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
                {
                    path: '/event/throttle',
                    name: 'throttle',
                    component: throttle,
                },
                {
                    path: '/table/dynamicForm',
                    name: 'dynamicForm',
                    component: dynamicForm,
                },
                {
                    path: '/base/childAp',
                    name: 'childAp',
                    component: childAp,
                },
                {
                    path: '/base/cAndM',
                    name: 'cAndM',
                    component: cAndM,
                },
                {
                    path: '/base/sync',
                    name: 'sync',
                    component: sync,
                },
                {
                    path: '/base/slot',
                    name: 'slot',
                    component: slot,
                },
                {
                    path: '/eleUi/reForm',
                    name: 'reForm',
                    component: reForm,
                },
                {
                    path: '/js/index',
                    name: 'jsIndex',
                    component: jsIndex,
                },
                {
                    path: '/js/closure',
                    name: 'closure',
                    component: closure,
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