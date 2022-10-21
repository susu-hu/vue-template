/* eslint-disable */
export const ruleValidate = (obj) => {
    const rule = {
        t1: {
            trigger: "blur,change",
            validator: (rule, value, callback) =>
                validateSelfHandler(
                    "请输入正整数哈哈哈哈",
                    /^[1-9]\d*$/,
                    value,
                    callback
                ),
        },
        t2: {
            validator: (rule, value, callback) => validlLength(rule, value, callback, obj),
            trigger: "bulr,change",
        },
    }
    return rule;
}
const validateSelfHandler = (msg, rule, value, callback) => {
    if (new RegExp(rule).test("" + value)) {
        callback();
    } else {
        callback(new Error(msg));
    }
};
const validlLength = (rule, value, callback, obj) => {
    console.log('this对象', obj)
    console.log(obj.form.params)
    // 需要先判断这两个对比对象的值是否存在
    // if( checkIsNull(xx1) && checkIsNull(xx2)) { //To Do ...}
    // if ('比较') {
    //     callback(new Error('错误信息'));
    // } else {
    //     obj.$refs.formValidate.fields.forEach((e) => {
    //         if (
    //             e.prop == "xx" ||
    //             e.prop == "xxx"
    //         ) {
    //             e.validateState = "";
    //             e.validateMessage = "";
    //         }
    //     });
    //     callback();
    // }
}