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
        open: true,
        host: '0.0.0.0',
        port: 9999,
        proxy: {
            '/api': { // 匹配所有以 '/api'开头的请求路径
                target: process.env.VUE_APP_URL, // 代理目标的基础路径
                secure: false,
                changeOrigin: true, // 支持跨域
                pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
                    '^/api': '',// 替换成target中的地址
                }
            }
        },
        https: false,
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