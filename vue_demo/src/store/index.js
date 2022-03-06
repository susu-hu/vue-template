import Vue from 'vue';
import Vuex from 'vuex';
// import { axios as request } from "../request/http";
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        // 设置属性，用于保存后台接口返回的权限数据
        permission: [],
        // 缓存组件页面
        catch_components: [],
        activePath: '/index',
        openNames: [],
        activeName: "",
        tranx: "-0",
        tabList: [
            { path: '/index', label: '首页', name: '首页' }
        ]
    },
    //状态计算
    getters: {

    },
    mutations: {
        SET_PERMISSION(state, permission) {//permission 为传入的权限标识集合
            // 传入的权限集合 赋值给状态中的 permission
            state.permission = permission;
        },
        //清空vuex数据
        clearTabs(state) {
            state.catch_components = []
            state.activePath = '/homepage'
            state.openNames = []
            state.activeName = ""
            state.tranx = "-0"
            state.tabList = [
                { path: '/homepage', label: '首页', name: 'home' }
            ]
        },
        // 跳转页面执行
        selectMenu(state, submenu) {
            var activePath = submenu.path
            var oldTabList = state.tabList
            var result = oldTabList.some(item => {
                if (item.path === activePath) {
                    return true
                }
            })
            if (!result) {
                oldTabList.push({
                    path: submenu.path,
                    name: submenu.name,
                    label: submenu.label,
                    index: submenu.index,
                    subName: submenu.subName
                })
            }
            state.activePath = activePath
            state.tabList = oldTabList
            state.activeName = submenu.subName + "-" + submenu.index
            state.openNames = [submenu.subName]
        },
        // 添加keepalive缓存
        addKeepAliveCache(state, val) {
            if (val === '/homepage') {
                return
            }
            if (state.catch_components.indexOf(val) === -1) {
                state.catch_components.push(val)
            }
        },
        // 删除keepalive缓存
        removeKeepAliveCache(state, val) {
            let cache = state.catch_components

            for (let i = 0; i < cache.length; i++) {
                if (cache[i] === val) {
                    cache.splice(i, 1);
                }
            }
            state.catch_components = cache
        },
        setTranx(state, val) {
            console.log(val)
            state.tranx = val
        },
        //关闭菜单
        closeTab(state, val) {
            state.activePath = val.activePath
            state.tabList = val.tabList
            state.openNames = val.openNames
            state.activeName = val.activeName
        },
        // 点击标签选择菜单
        changeMenu(state, val) {
            state.activePath = val.path
            state.activeName = val.subName + "-" + val.index
            state.openNames = [val.subName]
        }
    },
    actions: {// 官方不推荐直接修改mutation， 可使用actions来提交 mutation

        SET_PERMISSION(context, permission) {
            // 提交到 mutation 中的 SET_PERMISSION 函数
            context.commit("SET_PERMISSION", permission);
        }
    },
    modules: {

    }

})