// to do...
import Vue from 'vue'
// 限制只能输入数字 小数点的限制由修饰符控制
const onlyNum = (el, bindings, vnode) => {
    let regExp = /[^\d]/g
    if (bindings.modifiers['point']) {
        // 修饰符 ‘point’
        regExp = /[^\d\.]/g
    }
    fnSaveCursorPos(el, bindings, vnode, regExp)
}
// 限制只能输入字母(包含大小写字母)
const onlyLetter = (el, bindings, vnode) => {
    let regExp = /[^a-z|A-Z]/g
    if (bindings.modifiers['point']) {
        // 修饰符 ‘point’
        regExp = /[^a-z|A-Z|.]/g
    }
    fnSaveCursorPos(el, bindings, vnode, regExp)
}
// 限制只能输入字母和数字(包含大小写字母)
const onlyLetterNum = (el, bindings, vnode) => {
    let regExp = /[^a-z|A-Z\d]/g
    fnSaveCursorPos(el, bindings, vnode, regExp)
}
Vue.directive('input-filter', {
    update(el, bindings, vnode) {
        switch (bindings.arg) {
            case 'num':
                onlyNum(el, bindings, vnode)
                break
            case 'letter':
                onlyLetter(el, bindings, vnode)
                break
            case 'num-letter':
                onlyLetterNum(el, bindings, vnode)
                break
            default:
                break
        }
    }
})
// 处理光标位置，避免重新赋值之后光标出现在末尾
function fnSaveCursorPos(el, bindings, vnode, regExp) {
    bindings.value = bindings.value + ''
    let inputEl = el
    if (el.tagName !== 'INPUT') {
        inputEl = el.querySelector('input')
    }
    if (!inputEl) {
        return
    }
    const inputElCursorPos = inputEl.selectionStart // 输入框输入之后的光标位置
    const regExpStringLength = (bindings.value.match(regExp) || []).length // 被清除的字符长度
    fnSetVal(vnode.context, bindings.expression, bindings.value.replace(regExp, ''))
    inputEl.setSelectionRange(inputElCursorPos - regExpStringLength, inputElCursorPos - regExpStringLength)
    const timer = setTimeout(() => {
        clearTimeout(timer)
        inputEl.setSelectionRange(inputElCursorPos - regExpStringLength, inputElCursorPos - regExpStringLength)
    })
}
function fnSetVal(data, fields, setVal) {
    if (Object.prototype.toString.call(data) === '[object Object]' && Object.prototype.toString.call(fields) === '[object String]') {
        const keys = fields.split('.')
        let value = data
        while (keys.length && value !== undefined) {
            if (keys.length === 1) {
                value[keys[0]] = setVal
                return
            }
            value = value[keys[0]]
            keys.shift()
        }
    }
}