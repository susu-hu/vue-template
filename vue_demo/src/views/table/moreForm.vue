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
      class="mb20"
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
        >
          <Select
            v-model="item.t1"
            placeholder="请选择结果"
            @on-change="changeT1(item.t1, index)"
            clearable
          >
            <Option value="1">通过</Option>
            <Option value="2">驳回</Option>
          </Select>
        </FormItem>

        <FormItem
          label="参数2 ："
          :prop="`condition.${index}.t2`"
          :rules="ruleValidate.t2"
        >
          <Input v-model="item.t2" type="text"></Input>
        </FormItem>

        <FormItem
          label="参数3 ："
          :prop="`condition.${index}.t3`"
          :rules="ruleValidate.t3"
        >
          <Select
            v-model="item.t3"
            placeholder="请选择措施"
            :disabled="!item.t1"
            @on-change="changeT3(item.t3, index)"
            clearable
          >
            <Option
              v-for="i0 in item.actionList"
              :value="i0.code"
              :key="i0.code"
              :disabled="
                form.condition.filter((e) => {
                  return e.t3 == i0.code;
                }).length > 0
              "
              >{{ i0.name }}</Option
            >
          </Select>
        </FormItem>
        <Button
          v-if="index != 0"
          type="default"
          @click="del(index)"
          class="mb20"
          >删除</Button
        >
        <Divider />
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
            validator: validlLength,
            trigger: "bulr,change",
          },
        ],
        t3: [
          {
            type: "number",
            required: true,
            trigger: "change",
            message: "参数3 不能为空",
          },
        ],
      },
    };
  },
  methods: {
    changeT1(e, index, k) {
      this.$forceUpdate();
      // this.$set(this.form, "condition" + `${[index]}` + "actionList", oneList);
      // this.form.condition[index].t3 = "";
      console.log("参数一", e, index);
      let oneList = [
          // {
          //   code: 1,
          //   name: "加1单",
          // },
          {
            code: 2,
            name: "加2单",
          },
          {
            code: 3,
            name: "加4单",
          },
          {
            code: 4,
            name: "加8单",
          },
        ],
        twoList = [
          {
            code: 5,
            name: "减1单",
          },
          {
            code: 6,
            name: "减2单",
          },
          {
            code: 7,
            name: "减4单",
          },
          {
            code: 8,
            name: "减8单",
          },
        ];
      if (e == 1) {
        console.log("11111111111111111111");
        setTimeout(() => {
          this.form.condition[index].actionList = oneList;
          if (k) {
            console.log(oneList);
            oneList.unshift({
              code: k.t3,
              name: k.name,
            });
            console.log(oneList);
          }
          this.$set(
            this.form,
            "condition" + `${[index]}` + "actionList",
            oneList
          );
          console.log("接口11", this.form.condition[index].actionList);
        }, 0);
      } else if (e == 2) {
        setTimeout(() => {
          this.form.condition[index].actionList = twoList;
          this.$set(this.form.condition[index], "actionList", twoList);
          console.log("接口22", this.form.condition[index].actionList);
        }, 0);

        return false;
      } else {
        this.form.condition[index].t1 = "";
        this.form.condition[index].actionList = [];
      }
      // this.$forceUpdate();
    },
    changeT3() {},
    del(index) {
      this.form.condition.splice(index, 1);
    },
    addmore() {
      this.form.condition.push({
        t1: "",
        t2: "",
        t3: "",
        actionList: [],
      });
    },
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
          actionList: [],
        },
      ];
    },
    edit() {
      // mock已有假数据
      let data = [
          {
            t1: "1",
            t2: "1",
            t3: 1,
            name: "加1单",
          },
        ],
        data1 = JSON.stringify(data);
      let condition = JSON.parse(data1);
      console.log(condition);
      this.form.condition = condition;
      this.changeT1(condition[0].t1, 0, condition[0]);
    },
  },
  watch: {
    "form.condition": {
      immediate: true,
      deep: true,
      // eslint-disable-next-line no-unused-vars
      handler: (newVal, oldVal) => {
        // let that = this;
        console.log(newVal, "变化后的值");
        // newVal.forEach((item, index) => {
        //   that.changeT1(item.t1, index);
        // });
      },
    },
  },
};
</script>
<style scoped lang="less"></style>