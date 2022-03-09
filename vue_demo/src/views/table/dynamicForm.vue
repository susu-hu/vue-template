<template>
  <div class="content">
    <Card>
      <p slot="title">表单动态校验</p>
      <Form
        :label-width="100"
        ref="formValidate"
        :model="formInline"
        :rules="ruleValidate"
      >
        <FormItem label="审核结果：" prop="invoiceStatus">
          <Select
            v-model="formInline.invoiceStatus"
            placeholder="请选择审核结果"
          >
            <Option value="1">审核通过</Option>
            <Option value="2">审核驳回</Option>
          </Select>
        </FormItem>
        <FormItem
          label="备注："
          prop="invoiceRemark"
          :rules="
            formInline.invoiceStatus == '2'
              ? ruleValidate.invoiceRemark
              : [{ required: false }]
          "
        >
          <Input v-model="formInline.invoiceRemark" type="textarea"></Input>
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
export default {
  data() {
    return {
      formInline: {
        invoiceRemark: "",
        invoiceStatus: "",
      },
      ruleValidate: {
        invoiceStatus: [
          { required: true, message: "审核结果不能为空", trigger: "change" },
        ],
        invoiceRemark: [
          { required: true, message: "请填写不通过原因", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
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
.content {
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgb(0 0 0 / 20%);
}
</style>