export default {
    install(Vue) {
        Vue.directive('btn', {
            // eslint-disable-next-line no-unused-vars
            inserted(button, bind) {
                button.addEventListener('click', () => {
                    console.log('自定义指令v-btn')
                    if (!button.disabled) {
                        button.disabled = true;
                        setTimeout(() => {
                            button.disabled = false
                        }, 1000)
                    }
                })
            }
        })
    }
}