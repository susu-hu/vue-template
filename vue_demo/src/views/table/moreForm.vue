<template>
  <div class="contentBox">
    <div class="mb20">
      <Button type="primary" @click="add">新增</Button>
      <Button type="default" @click="edit">修改</Button>
    </div>
    <Button
      type="primary"
      @click="addmore"
      v-if="form.condition.length > 0"
      class="flex-row j_c"
      >新增一组数据</Button
    >
    <Form
      :label-width="100"
      ref="formValidate"
      :model="form"
      :rules="ruleValidate"
    >
      <Row v-for="(item, index) in form.condition" :key="index">
        <FormItem
          label="参数1 ："
          :prop="`condition.${index}.t1`"
          :rules="ruleValidate.t1"
          @on-change="changeT1(item.t1, index)"
        >
          <Select v-model="item.t1" placeholder="请选择结果">
            <Option value="1">通过</Option>
            <Option value="2">驳回</Option>
          </Select>
        </FormItem>

        <FormItem
          label="参数2 ："
          :prop="`condition.${index}.t2`"
          :rules="ruleValidate.t2"
          @on-change="changeT2(item.t2, index)"
        >
          <Input v-model="item.t2" type="text"></Input>
        </FormItem>
      </Row>
    </Form>
    <Button
      type="primary"
      v-if="form.condition.length > 0"
      class="flex-row j_c"
      @click="submit"
      >提交数据</Button
    >
  </div>
</template>
<script>
export default {
  data() {
    const validlLength = (rule, value, callback) => {
      console.log("aaaaaaaaaaaaaaa", value);
      value = value + "";
      value = value.match(/^\d*(\.?\d{0,2})/g)[0] || "";
      let reg = /^([0-9]\d{0,6})(\.\d{1,2})?$/;
      if (!reg.test(value)) {
        callback(new Error("整数最多7位小数最多两位"));
      } else {
        callback();
      }
    };
    return {
      form: {
        condition: [],
      },
      ruleValidate: {
        t1: [
          {
            required: true,
            trigger: "change",
            message: "参数1 不能为空",
          },
        ],
        t2: [
          {
            required: true,
            trigger: "change",
            message: "参数2 不能为空",
          },
        ],
        t3: [
          {
            validator: validlLength,
            trigger: "bulr,change",
          },
        ],
      },
    };
  },
  methods: {
    addmore() {},
    submit() {
      let data = { ...this.form };
      console.log(data);
      this.$refs.formValidate.validate((valid) => {
        if (valid) {
          console.log(data);
        }
      });
    },
    // 新增
    add() {
      this.form.condition = [
        {
          t1: "",
          t2: "",
          t3: "",
          carNameList: [], //车辆列表
        },
      ];
    },
    edit() {},
  },
};
</script>
<style scoped lang="less"></style>