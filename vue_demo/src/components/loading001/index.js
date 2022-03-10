import Vue from 'vue'
import loading001 from './index.vue'

const LoadingConstructor = Vue.extend(loading001)

const instance = new LoadingConstructor({
    el: document.createElement('div')
})

instance.show = false
const loading = {
    show() {
        instance.show = true
        document.body.appendChild(instance.$el)
    },
    hide() {
        instance.show = false
    }
}

export default {
    install() {
        if (!Vue.$showLoading) {
            Vue.$showLoading = loading
        }
        Vue.mixin({
            created() {
                this.$showLoading = Vue.$showLoading
            }
        })
    }
}