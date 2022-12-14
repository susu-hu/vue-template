/*
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-02-20 20:30:08
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-06-28 09:32:15
 * @FilePath: \vue_demo\vue.config.js
 * @Description: vue.config.js
 */

const UglifyJsPlugin = require('uglifyjs-webpack-plugin') //引入插件
// const MomentLocalesPlugin = require('moment-locales-webpack-plugin'); //moment配置语言环境

var webpack = require('webpack');
const path = require('path'); //引入path模块
function resolve(dir) {
    return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}

const packageInfo = require('./package.json');

module.exports = {
    lintOnSave: true, //eslint检查
    runtimeCompiler: true,
    publicPath: '/', //根路径
    outputDir: 'susu' + packageInfo.version, //打包之后的文件名字，默认是dist
    assetsDir: "assets",
    productionSourceMap: true,
    devServer: {
        overlay: {
            warnings: false, //不显示警告
            errors: false //不显示错误
        },
        disableHostCheck: true,
        https: false,
        open: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/susutest': { // 匹配所有以 '/api'开头的请求路径
                target: 'https://mock.mengxuegu.com/mock/62261ce8e7ee771c8c6e23cc/', // 代理目标的基础路径
                secure: false, // 如果是https接口的话，需要配置这个参数
                changeOrigin: true, // 支持跨域
                ws: true, // 是否代理websockets
                pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                    // '^/api': '',// 替换成target中的地址
                }
            },
            // '/example': {
            //     target: 'https://mock.mengxuegu.com/mock/62b94c7bc99b3c42abbc247d/', // 代理目标的基础路径
            //     secure: false, // 如果是https接口的话，需要配置这个参数
            //     changeOrigin: true, // 支持跨域
            //     ws: true, // 是否代理websockets
            //     pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
            //         // '^/api': '',// 替换成target中的地址
            //     }
            // },
            '/api': {
                target: 'https://mock.mengxuegu.com/mock/62b94c7bc99b3c42abbc247d/example',
                // target: 'https://mock.mengxuegu.com/mock/62261ce8e7ee771c8c6e23cc/susutest', // 代理目标的基础路径
                secure: false, // 如果是https接口的话，需要配置这个参数
                changeOrigin: true, // 支持跨域
                ws: true, // 是否代理websockets
                pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                    '^/api': '', // 替换成target中的地址
                }
            },
            '/dev': {
                target: 'https://elnbkt-dev-outer.oss-cn-shanghai.aliyuncs.com/', // 代理目标的基础路径
                secure: false, // 如果是https接口的话，需要配置这个参数
                changeOrigin: true, // 支持跨域
                ws: true, // 是否代理websockets
                pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
                    // '^/api': '',// 替换成target中的地址
                }
            },
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
    // 要引入webpack
    configureWebpack() {
        return {
            plugins: [
                new webpack.ProvidePlugin({
                    'window.Quill': 'quill/dist/quill.js', //注意路径，可能与你们路径不一致
                    'Quill': 'quill/dist/quill.js' //注意路径，可能与你们路径不一致
                }),

                // 剥离除 “en” 以外的所有语言环境。
                // new MomentLocalesPlugin(),

                // 或者：剥离除 “en”、“es-us” 和 “ru” 以外的所有语言环境。
                //（“en” 内置于 Moment 中，无法移除）
                // new MomentLocalesPlugin({
                //     localesToKeep: ['es-us', 'zh-cn'],
                // }),
            ],
            externals: {

            },
            optimization: {
                minimizer: [
                    new UglifyJsPlugin({
                        uglifyOptions: {
                            // 删除注释
                            output: {
                                comments: false
                            },
                            // 删除console debugger 删除警告
                            compress: {
                                drop_console: true, //console
                                drop_debugger: false,
                                pure_funcs: ['console.log'] //移除console
                            }
                        }
                    })
                ]
            }

        }
    },
    css: {
        loaderOptions: {
            postcss: {
                plugins: [require('tailwindcss'), require('autoprefixer')],
            },
            // less - loader版本大于6 .0 以上
            // less: {
            //     lessOptions: {
            //         javascriptEnabled: true,
            //     },
            // },
            // less-loader5.0以上
            // less: {
            //     javascriptEnabled: true,
            // },
        },
    },


}