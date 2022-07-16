/*
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-07-16 00:49:11
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-07-16 01:00:17
 * @FilePath: \vue_demo\src\libs\common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 获取文件后缀名
 * @param {String} filename
 */
export function getExt(filename) {
    if (typeof filename == 'string') {
        // 如果文件没有后缀名，返回null
        if (!filename.includes('.')) { return null }
        return filename
            .split('.')
            .pop()
            .toLowerCase()
    } else {
        throw new Error('filename must be a string type')
    }
}
/**
 * 复制内容到剪贴板
 * 创建一个textare元素并调用select()方法选中
* document.execCommand(‘copy’)方法，拷贝当前选中内容到剪贴板。
 */
export function copyToBoard(value) {
    const element = document.createElement('textarea')
    document.body.appendChild(element)
    element.value = value
    element.select()
    if (document.execCommand('copy')) {
        document.execCommand('copy')
        document.body.removeChild(element)
        return true
    }
    document.body.removeChild(element)
    return false
}

/**
 * 休眠xxxms
 * @param {Number} milliseconds
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
/**
 * //使用方式
const a=async()=>{
    await sleep(1000)
}
 */

/**
 * 生成随机uuid
 * @param {*} length
 * @param {*} chars
 */
export function uuid(length = 8, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    let result = ''
    for (let i = length; i > 0; --i)
        result += chars[Math.floor(Math.random() * chars.length)]
    return result
}

/**
 *简易-深拷贝 只拷贝对象、数组以及对象数组
 * @export
 * @param {*} obj
 * @returns
 */
export function deepCopy(obj) {
    if (typeof obj != 'object') {
        return obj
    }
    if (obj == null) {
        return obj
    }
    return JSON.parse(JSON.stringify(obj))
}
/**
 * 数组去重
 * @param {*} arr
 */
export function uniqueArray(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('The first parameter must be an array')
    }
    if (arr.length == 1) {
        return arr
    }
    return [...new Set(arr)]
}
/**
 * 对象转化为formdata
 * 上传文件，一个FormData对象，参数append 
 * @param {Object} object
 */

export function getFormData(object) {
    const formData = new FormData()
    Object.keys(object).forEach(key => {
        const value = object[key]
        if (Array.isArray(value)) {
            value.forEach((subValue, i) =>
                formData.append(key + `[${i}]`, subValue)
            )
        } else {
            formData.append(key, object[key])
        }
    })
    return formData
}
// 保留小数点以后几位，默认2位
export function cutNumber(number, no = 2) {
    if (typeof number != 'number') {
        number = Number(number)
    }
    return Number(number.toFixed(no))
}
//下载一个excel文档
export function download(link, name) {
    if (!name) {
        name = link.slice(link.lastIndexOf('/') + 1)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}

/**
 * 浏览器下载静态文件
 * @param {String} name 文件名
 * @param {String} content 文件内容
 * 1.downloadFile('1.json','aaaaaaaa'}))
 * 2.download('http://xx:xx:XX/a/b/c')下载后端返回的流
 * 3.图片链接，图片、pdf等文件，浏览器会默认执行预览，需把图片、pdf等文件转成blob，再调用download方法进行下载
 * 
 */
export function downloadFile(name, content) {
    if (typeof name == 'undefined') {
        throw new Error('The first parameter name is a must')
    }
    if (typeof content == 'undefined') {
        throw new Error('The second parameter content is a must')
    }
    if (!(content instanceof Blob)) {
        content = new Blob([content])
    }
    const link = URL.createObjectURL(content)
    download1(link, name)
}
//下载一个链接
export function download1(link, name) {
    if (!name) {//如果没有提供名字，从给的Link中截取最后一坨
        name = link.slice(link.lastIndexOf('/') + 1)
    }
    let eleLink = document.createElement('a')
    eleLink.download = name
    eleLink.style.display = 'none'
    eleLink.href = link
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}


/**
 * axios请求对应的链接可以用来下载浏览器会默认预览的文件类型，例如mp4,jpg等,会有同源策略的限制，需要配置转发
 */
import axios from 'axios'
//提供一个link，完成文件下载，
export function downloadByLink(link, fileName) {
    axios.request({
        url: link,
        responseType: 'blob' //关键代码，让axios把响应改成blob
    }).then(res => {
        const link = URL.createObjectURL(res.data)
        download(link, fileName)
    })
}


/**
 *防抖
 * @param {*} func 要进行debouce的函数 Lodash
 * @param {*} wait 等待时间,默认500ms
 * @param {*} immediate 是否立即执行
 */
export function debounce(func, wait = 500, immediate = false) {
    var timeout
    return function () {
        var context = this
        var args = arguments

        if (timeout) clearTimeout(timeout)
        if (immediate) {
            // 如果已经执行过，不再执行
            var callNow = !timeout
            timeout = setTimeout(function () {
                timeout = null
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(function () {
                func.apply(context, args)
            }, wait)
        }
    }
}

/**
 * 节流，多次触发，间隔时间段执行Lodash
 * @param {Function} func
 * @param {Int} wait
 * @param {Object} options
 */
export function throttle(func, wait = 500, options) {
    //container.onmousemove = throttle(getUserAction, 1000);
    var timeout, context, args
    var previous = 0
    if (!options) options = { leading: false, trailing: true }

    var later = function () {
        previous = options.leading === false ? 0 : new Date().getTime()
        timeout = null
        func.apply(context, args)
        if (!timeout) context = args = null
    }

    var throttled = function () {
        var now = new Date().getTime()
        if (!previous && options.leading === false) previous = now
        var remaining = wait - (now - previous)
        context = this
        args = arguments
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout)
                timeout = null
            }
            previous = now
            func.apply(context, args)
            if (!timeout) context = args = null
        } else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining)
        }
    }
    return throttled
}

/**
 * 去除对象中value为空(null,undefined,’’)的属性
 * @param {*} value 
 * @returns 
 */
export const isFalsy = (value) => (value === 0 ? false : !value);
export const isVoid = (value) =>
    value === undefined || value === null || value === "";

export const cleanObject = (object) => {
    // Object.assign({}, object)
    if (!object) {
        return {};
    }
    const result = { ...object };
    Object.keys(result).forEach((key) => {
        const value = result[key];
        if (isVoid(value)) {
            delete result[key];
        }
    });
    return result;
};
