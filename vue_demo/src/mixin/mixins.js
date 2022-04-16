export var myMixin = {
    data() {
        return {
            mixinData: '这是混入数据'
        }
    },
    methods: {
        hello: function (msg = '') {
            console.log("hello, welcome  to susu's blog " + msg)
        }
    },
    created: function () {
        // this.hello();
        // 同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
        console.log('混入对象-被创建');//混入对象打印先执行--父组件---混入对象方法
    }
}