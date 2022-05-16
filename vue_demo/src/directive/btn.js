export default {
    install(Vue) {
        Vue.directive('btn', {
            // eslint-disable-next-line no-unused-vars
            inserted(button, bind) {
                button.addEventListener('click', () => {
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