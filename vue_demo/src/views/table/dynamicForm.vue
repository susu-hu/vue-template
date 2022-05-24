<template>
  <div class="contentBox">
    <Card>
      <p slot="title">表单动态校验</p>
      <Form
        :label-width="100"
        ref="formValidate"
        :model="formInline"
        :rules="ruleValidate"
      >
        <FormItem label="审核结果：" prop="status">
          <Select
            v-model="formInline.status"
            placeholder="请选择审核结果"
            @on-change="change"
          >
            <Option value="1">审核通过</Option>
            <Option value="2">审核驳回</Option>
          </Select>
        </FormItem>
        <FormItem label="手机号：" prop="telephone">
          <Input v-model="formInline.telephone" type="text"></Input>
        </FormItem>
        <FormItem label="身份证：" prop="idCard">
          <Input v-model="formInline.idCard" type="text"></Input>
        </FormItem>
        <FormItem label="新密码" prop="newPwd">
          <Input
            v-model="formInline.newPwd"
            type="password"
            placeholder="请输入新密码"
          >
          </Input>
        </FormItem>
        <FormItem label="确认新密码" prop="newPwd2">
          <Input
            v-model="formInline.newPwd2"
            type="password"
            placeholder="请确认新密码"
          >
          </Input>
        </FormItem>
        <FormItem label="数字" prop="stock">
          <Input
            v-model="formInline.stock"
            type="text"
            placeholder="请确认数字"
          >
          </Input>
        </FormItem>
        <FormItem label="数字2" prop="num">
          <Input
            v-model="formInline.num"
            type="text"
            placeholder="请输入数字哇嘿嘿"
          >
          </Input>
        </FormItem>
        <FormItem
          label="备注："
          prop="remark"
          :rules="
            formInline.status == '2'
              ? ruleValidate.remark
              : [{ required: false }]
          "
        >
          <Input v-model="formInline.remark" type="textarea"></Input>
        </FormItem>

        <div style="text-align: right; padding: 20px 0">
          <Button size="large" type="default" @click="cancelAction" class="mr10"
            >取消</Button
          >
          <Button size="large" type="primary" @click="addAction">确认</Button>
        </div>
      </Form>
    </Card>
  </div>
</template>

<script>
import formRuleValidate from "./ruleForm.js";
export default {
  name: "dynamicForm",
  data() {
    // var validatePass2 = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请再次输入新密码"));
    //   } else if (value !== this.formInline.newPwd) {
    //     callback(new Error("两次输入新密码不一致!"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      formInline: {
        remark: "",
        status: "",
        telephone: "",
        idCard: "",
        newPwd: "",
        newPwd2: "",
        num: "",
        stock: "",
      },
      ruleValidate: formRuleValidate(this),
      // {
      //   status: [
      //     { required: true, message: "审核结果不能为空", trigger: "change" },
      //   ],
      //   remark: [
      //     { required: true, message: "请填写不通过原因", trigger: "blur" },
      //   ],
      //   telephone: [
      //     {
      //       required: true,
      //       pattern: /^1[3456789]\d{9}$/,
      //       message: "手机号码格式不正确",
      //       trigger: "blur",
      //     },
      //   ],
      //   idCard: [
      //     {
      //       required: true,
      //       pattern:
      //         /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
      //       message: "身份证号格式不正确",
      //       trigger: "blur",
      //     },
      //   ],
      //   newPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      //   newPwd2: [
      //     { required: true, validator: validatePass2, trigger: "blur" },
      //   ],
      // },
    };
  },
  created() {
    console.log(formRuleValidate(this));
  },
  methods: {
    change(e) {
      console.log(e);
      if (e == 1) {
        for (let item of this.$refs.formValidate.fields) {
          if (item.prop === "remark") {
            item.validateState = "";
            item.validateMessage = "";
          }
        }
      }
    },
    addAction() {
      let data = { ...this.formInline };
      console.log(data);
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          this.$Message.success("操作成功");
          this.cancelAction();
        }
      });
    },
    cancelAction() {
      Object.keys(this.formInline).forEach((key) => {
        this.formInline[key] = "";
      });
      this.$refs["formValidate"].resetFields();
    },
  },
};
</script>

<style scoped>
.contentBox {
  height: calc(100vh - 260px);
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
}
</style>