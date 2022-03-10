// 全局注册组件
import loading001 from '@/components/loading001/index.vue'
import loading002 from '@/components/loading002/index.vue'
// export default {
//     install(Vue) {
//         Vue.component('loading001', loading001)
//         Vue.component('loading002', loading002)
//     }
// }
// 写法2
const components = [
    loading001, loading002
];

const install = function (Vue) {
    components.forEach(component => {
        Vue.component(component.name, component);
    })
    Vue.prototype.$loading001=loading001.install;
    Vue.prototype.$loading002=loading002.install;
}

export default install;
