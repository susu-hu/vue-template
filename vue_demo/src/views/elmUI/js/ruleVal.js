import regex from "../../../utils/regex.js" // 正则表达式 
export default {
    formObj: [{
        input: true, //是input
        label: "input+正则", //字段
        prop: "input", //字段名
        placeholder: "请填写手机号", //提示内容
        width: 12, //参考el-col
        disabled: false, //是否禁用
        unit: '单位',
        rules: [{
            required: true,
            message: '联系方式'
        }, { //可以自己写utils，封装正则验证
            validator: (rule, value, callback) => {
                if (!value || !regex.isPhone(value)) {
                    callback(new Error());
                } else {
                    callback();
                }
            },
            message: "联系方式不对",
        }] //验证
    }, {
        textarea: true, //是input
        label: "输入框", //字段
        prop: "textearea", //字段名
        placeholder: "请填写输入框", //提示内容
        width: 12, //参考el-col
        disabled: false, //是否禁用
        rules: [{
            required: true,
            message: '输入框'
        },] //验证
    },
    {
        select: true,
        label: "选择框",
        prop: "select",
        placeholder: "请选择",
        width: 12, //参考el-col
        disabled: false,
        options: [{
            label: "options1",
            value: "1"
        }, {
            label: "options2",
            value: "2"
        },],
        rules: [{
            required: true,
            message: '选择框不能为空！'
        }]
    }, {
        searchSelect: true,
        label: "select搜索框",
        prop: "searchSelect",
        placeholder: "请选择",
        width: 12, //参考el-col
        disabled: false,
        options: [],
        rules: [{
            required: true,
            message: 'select搜索框！'
        }]
    }, {
        dateTimeRange: true,
        label: "年月日时分秒开",
        prop: "dateTimeRange",
        width: 12, //参考el-col
        disabled: false,
        options: {
            selectableRange: '18:30:00 - 20:30:00'
        },
        rules: [{
            required: true,
            message: '年月日时分秒开'
        },]
    }, {
        timePicker: true,
        label: "时分秒选择器",
        prop: "timePicker",
        placeholder: "请选择",
        width: 12, //参考el-col
        disabled: false,
        options: "",
        rules: [{
            required: true,
            message: '时分秒选择器'
        },]
    }, {
        timePickerIsRange: true,
        label: "时分秒开始结束",
        prop: "timePickerIsRange",
        placeholder: "请选择",
        width: 12, //参考el-col
        disabled: false,
        options: "",
        rules: [{
            required: true,
            message: '时分秒开始结束'
        },]
    }, {
        datePicker: true,
        label: "年月日选择器",
        prop: "datePicker",
        placeholder: "请选择",
        width: 12, //参考el-col
        disabled: false,
        options: "",
        rules: [{
            required: true,
            message: '年月日选择器'
        },]
    }, {
        datePickerIsRange: true,
        label: "年月日开始结束",
        prop: "datePickerIsRange",
        placeholder: "请选择",
        width: 12, //参考el-col
        disabled: false,
        options: "",
        rules: [{
            required: true,
            message: '年月日开始结束'
        },]
    }, {
        dateTime: true,
        label: " 年月日时分秒",
        prop: "dateTime",
        placeholder: "请选择",
        width: 12, //参考el-col
        disabled: false,
        options: "",
        rules: [{
            required: true,
            message: ' 年月日时分秒'
        },]
    }, {
        switch: true,
        label: "switch",
        prop: "switch",
        placeholder: "请选择",
        width: 12, //参考el-col
        disabled: false,
        rules: [{
            required: true,
            message: 'switch'
        },]
    }, {
        radio: true,
        label: "单选框",
        prop: "radio",
        placeholder: "请选择",
        width: 12, //参考el-col
        disabled: false,
        options: [{
            label: "单选框1",
            value: "1"
        }, {
            label: "单选框2",
            value: "2"
        },],
        rules: [{
            required: true,
            message: '单选框不能为空'
        },]
    }, {
        checkbox: true,
        label: "复选框",
        prop: "checkbox",
        disabled: false,
        width: 12, //参考el-col
        options: [{
            label: "复选框1",
            value: "1"
        }, {
            label: "复选框2",
            value: "2"
        }, {
            label: "复选框3",
            value: "3"
        },],
        rules: [{
            required: true,
            message: '复选框不能为空'
        },]
    },
    {
        upload: true,
        label: "文件上传",
        prop: "upload",
        disabled: false,
        uploadObj: {
            fileType: "2001",
            limit: 1, //上传长度限制
            hideUpload: false, //是否隐藏上传框

        },
        rules: [{
            required: true,
            message: '文件上传'
        },]
    },
    {
        button: true,
        label: "按钮",
        prop: "buttona",
        placeholder: "发送验证码",
        width: 12, //参考el-col
        disabled: false,
    },
    {
        text: true,
        label: "文本",
        prop: "text",
        width: 12, //参考el-col
        disabled: false,
    },
    {
        quillEditor: true,
        label: "富文本",
        prop: "quill",
        disabled: false,
    },
    ],
    formData: {
        input: "",
        textearea: "",
        select: "",
        searchSelect: "",
        dateTimeRange: [],
        timePicker: "",
        timePickerIsRange: [],
        datePicker: "",
        datePickerIsRange: [],
        dateTime: "",
        date1: "",
        switch: false,
        radio: "",
        checkbox: [],
        upload: [],
        text: "这是一段文本，用于预览",
        quill: {
            content: ""
        }
    },
}