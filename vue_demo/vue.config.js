const path = require('path');        //引入path模块
function resolve(dir) {
    return path.join(__dirname, dir)  //path.join(__dirname)设置绝对路径
}

module.exports = {
    publicPath: '/', //根路径
    outputDir: "dist",
    assetsDir: "assets",
    lintOnSave: true,
    runtimeCompiler: false,
    productionSourceMap: true,
    devServer: {
        disableHostCheck: true,
        https: false,
        open: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/susutest': { // 匹配所有以 '/api'开头的请求路径
                target: 'https://mock.mengxuegu.com/mock/62261ce8e7ee771c8c6e23cc/', // 代理目标的基础路径
                secure: false,// 如果是https接口的话，需要配置这个参数
                changeOrigin: true, // 支持跨域
                ws: true, // 是否代理websockets
                pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
                    // '^/api': '',// 替换成target中的地址
                }
            },
            // '/dev': {
            //     target: 'https://eln-public.oss-cn-shanghai.aliyuncs.com/', // 代理目标的基础路径
            //     secure: false,// 如果是https接口的话，需要配置这个参数
            //     changeOrigin: true, // 支持跨域
            //     ws: true, // 是否代理websockets
            //     pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
            //         // '^/api': '',// 替换成target中的地址
            //     }
            // },
            '/dev': {
                target: 'https://elnbkt-dev-outer.oss-cn-shanghai.aliyuncs.com/', // 代理目标的基础路径
                secure: false,// 如果是https接口的话，需要配置这个参数
                changeOrigin: true, // 支持跨域
                ws: true, // 是否代理websockets
                pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
                    // '^/api': '',// 替换成target中的地址
                }
            },

            // https://elnbkt-dev-outer.oss-cn-shanghai.aliyuncs.com/dev/4472da00-3d5b-4a55-990c-5cf4447d864e/仓库导入模板.xlsx
        },
        hotOnly: false,
    },
    chainWebpack: (config) => {
        config.resolve.alias
            //set第一个参数：设置的别名，第二个参数：设置的路径
            .set('@', resolve('./src'))
            .set('assets', resolve('.src/assets'))
            .set('components', resolve('./src/components'))
            .set('views', resolve('src/views'))
        config.module
            .rule("pug")
            .test(/\.pug$/)
            .use("pug-html-loader")
            .loader("pug-html-loader")
            .end();
    },
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "less",
            patterns: [path.resolve(__dirname, "./src/assets/css/variable.less")],
        },
    },
}