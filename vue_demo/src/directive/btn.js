export default {
    install(Vue) {
        Vue.directive('btn', {
            // eslint-disable-next-line no-unused-vars
            inserted(button, bind) {
                console.log(button)
                button.addEventListener('click', () => {
                    console.log(button.disabled)
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
