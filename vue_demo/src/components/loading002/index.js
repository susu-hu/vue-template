import Vue from 'vue'
import LoadingComponent from './index.vue'
// 通过Vue.extend将loading组件包装成一个子类
const LoadingConstructor = Vue.extend(LoadingComponent)
let loading = undefined
LoadingConstructor.prototype.close = function () {
    // 去除loading引用
    loading = undefined
    // 设置loading隐藏
    this.visible = false
    // 关闭loading；如果当前loading组件存在，则销毁该组件
    setTimeout(() => {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el)
        }
        // 调用组件生命周期函数销毁组件
        this.$destroy()
    }, 300);
}
const Loading = (options = {}) => {
    // 如果组件已渲染，返回
    if (loading) {
        return loading
    }
    // 设置要挂载的元素（父元素）
    const parent = document.body
    // 设置组件属性
    const opts = {
        text: '加载中...',
        ...options
    }
    // 通过构造函数初始化组件， 相当于new Vue()
    const instance = new LoadingConstructor({
        el: document.createElement('div'),
        data: opts
    })
    // 将loading挂载在parent上
    parent.appendChild(instance.$el)
    // 挂载完成，加载loading
    Vue.nextTick(() => {
        instance.loading = true
    })
    // 将组件实例赋值给loading
    loading = instance
    return loading
}
export default Loading


// 挂载全局方法
// import Loading from '...'
// Vue.prototype.$loading = Loading

