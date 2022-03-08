import Loading from './index.vue'

Loading.install = function (Vue) {
    Vue.component(Loading.name, Loading) //组件名称取组件的name
}

export default Loading  //导出组件