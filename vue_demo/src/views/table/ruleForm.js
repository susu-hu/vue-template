
const ruleValidate = (obj) => {
    console.log(obj)
    const rule = {
        status: [
            { required: true, message: "审核结果不能为空", trigger: "change" },
        ],
        remark: [
            { required: true, message: "请填写不通过原因", trigger: "blur" },
        ],
        telephone: [
            {
                required: true,
                pattern: /^1[3456789]\d{9}$/,
                message: "手机号码格式不正确",
                trigger: "blur",
            },
        ],
        idCard: [
            {
                required: true,
                pattern:
                    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                message: "身份证号格式不正确",
                trigger: "blur",
            },
        ],
        newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        newPwd2: [
            { required: true, validator: (rule, value, callback) => validatePass2(rule, value, callback, obj), trigger: "blur" },
        ],
        stock: [
            {
                required: true,
                type: "number",
                validator: (rule, value, callback) =>
                    validateSelfHandler(
                        "请输入正整数哈哈哈哈",
                        /^[1-9]\d*$/,
                        value,
                        callback
                    ),
                trigger: "blur",
            },
        ],
        num: [
            { required: true, validator: vaIsNum, trigger: "blur" },
        ]
    }
    return rule;
}
export default ruleValidate;
var validatePass2 = (rule, value, callback, obj) => {
    // console.log(rule)
    // console.log(value)
    // console.log(callback)
    console.log(obj)
    if (value === "") {
        callback(new Error("请再次输入新密码"));
    } else if (value !== obj.formInline.newPwd) {
        callback(new Error("两次输入新密码不一致!"));
    } else {
        callback();
    }
};

const validateSelfHandler = (msg, rule, value, callback) => {
    if (new RegExp(rule).test("" + value)) {
        callback();
    } else {
        callback(new Error(msg));
    }
};

const vaIsNum = (rule, value, callback) => {
    if (value != '' && value < 99) {
        callback()
    } else {
        callback(new Error('不能大于99哦'))
    }

}
