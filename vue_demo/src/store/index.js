import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export default new Vuex.Store({
    state: {
        // 设置属性，用于保存后台接口返回的权限数据
        permission: []
    },
    mutations: {
        SET_PERMISSION(state, permission) {//permission 为传入的权限标识集合
            // 传入的权限集合 赋值给状态中的 permission
            state.permission = permission;
        }
    },
    actions: {// 官方不推荐直接修改mutation， 可使用actions来提交 mutation

        SET_PERMISSION(context, permission) {
            // 提交到 mutation 中的 SET_PERMISSION 函数
            context.commit("SET_PERMISSION", permission);
        }
    },

})