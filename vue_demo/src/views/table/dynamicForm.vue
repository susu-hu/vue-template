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
    };
  },
  created() {
    console.log(formRuleValidate(this));
  },
  methods: {
    change(e) {
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