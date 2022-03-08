import axios from 'axios'; // 引入axios
// import QS from 'qs';
import { Message } from "iview";
// import loading from '@/components/load2/index.js' // 引入loading
import Vue from 'vue';
// import router from "./router";
/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
const domain = 'https://mock.mengxuegu.com/mock/62261ce8e7ee771c8c6e23cc/susutest'
const domainUat = "https://mock.mengxuegu.com/mock/62261ce8e7ee771c8c6e23cc/susutest";
const domainProd = "https://mock.mengxuegu.com/mock/62261ce8e7ee771c8c6e23cc/susutest";
axios.defaults.baseURL = domain;
// 环境的切换
// if (
//     process.env.NODE_ENV == "development" ||
//     process.env.NODE_ENV == "debug" ||
//     process.env.HOST == "dev"
// ) {
//     axios.defaults.baseURL = domain;
// } else if (process.env.NODE_ENV == "uat" || process.env.HOST == "uat") {
//     axios.defaults.baseURL = domainUat;
// } else if (process.env.NODE_ENV == "production" || process.env.HOST == "prod") {
//     axios.defaults.baseURL = domainProd;
// }

if (
    process.env.NODE_ENV == "development"
) {
    console.log('123123123123')
    axios.defaults.baseURL = "";
} else if (process.env.HOST == "dev") {
    axios.defaults.baseURL = domain;
} else if (process.env.NODE_ENV == "uat" || process.env.HOST == "uat") {
    axios.defaults.baseURL = domainUat;
} else if (process.env.NODE_ENV == "production" || process.env.HOST == "prod") {
    axios.defaults.baseURL = domainProd;
}

// 请求超时时间
axios.defaults.timeout = 50000;
// post请求头
//  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json';
// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = sessionStorage.token;
        token && (config.headers.token = token);
        return config;
    },
    error => {
        return Promise.error(error);
    }
)
// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况    Network Error
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 登录异常
                case 600008:
                    Message.error(error.response.data.message);
                    window.sessionStorage.clear();
                    Message.error('3秒后退出系统');
                    setTimeout(function () {
                        // eslint-disable-next-line no-undef
                        router.replace({ path: '/login' });
                    }, 3000)
                    break;
                // 其他错误，直接抛出错误提示
                default:
                    Message.error(error.response.data.message);
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(res => {
                let d = res.data;
                if (d.code != '200') {
                    Message.error(d.message);
                }
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * QS.stringify(params)
 */
export function post(url, params, is_show_msg = false, msg = '') {
    if (is_show_msg) {
        // this.$loading.show(msg)
        // loading.show(msg)
        console.log(msg)
        // this.$Spin.show()
        Vue.$loading.show(msg)
        // Vue.prototype.$loading.show(msg)
    }
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                let d = res.data;
                if (d.code != '200') {
                    Message.error(d.message);
                }
                resolve(res.data);

            })
            .catch(err => {
                reject(err.data)
                console.log('xib xib ')
            })
            .finally(() => {
                console.log('sldfshjdfhsjdfhsdj')
                if (is_show_msg) {
                    Vue.$loading.hide()
                    // Vue.prototype.$loading.hide()
                    // this.$loading.hide()
                }
            })
    });
}

export { axios }
