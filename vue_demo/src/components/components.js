// 引入
import page from '@/views/custom/components/page.vue'
export default {
  install(Vue) {
    // 注册全局组件
    Vue.component('Page', page)
  }
}
