<template>
  <div class="contentBox">
    <div class="mb20">
      <Button type="primary" @click="add">新增</Button>
      <Button type="default" @click="edit" style="margin-left: 20px"
        >修改</Button
      >
    </div>
    <Button
      type="primary"
      @click="addmore"
      v-if="form.condition.length > 0"
      style="margin-bottom: 20px"
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
      <Table
        v-if="form.tunnelRangeList.length > 0"
        :columns="columnsTunnel"
        :data="form.tunnelRangeList"
        stripe
        border
        style="margin-bottom: 25px"
      >
        <template slot="name" slot-scope="{ index }">
          {{ form.tunnelRangeList[index].tunnelName }}
        </template>
        <template slot="meter" slot-scope="{ index }">
          <FormItem
            :prop="`tunnelRangeList.${index}.distance`"
            :rules="ruleValidate.distance"
          >
            <InputNumber
              :min="0"
              v-model="form.tunnelRangeList[index].distance"
              type="text"
            />
          </FormItem>
        </template>
        <template slot="flag" slot-scope="{ index }">
          <p>
            {{ form.tunnelRangeList[index].direction == 0 ? "减量" : "增量" }}
          </p>
        </template>
      </Table>
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
      value = value + "";
      value = value.match(/^\d*(\.?\d{0,2})/g)[0] || "";
      let reg = /^([0-9]\d{0,6})(\.\d{1,2})?$/;
      if (!reg.test(value)) {
        callback(new Error("整数最多7位小数最多两位"));
      } else {
        callback();
      }
    };
    const validDistance = (rule, value, callback) => {
      if (
        this.form.tunnelRangeList[0].distance >=
        this.form.tunnelRangeList[1].distance
      ) {
        callback(new Error("增量不能大于减量"));
      } else {
        // validateField对部分表单字段进行校验的方法，参数1为需校验的 prop，参数2为检验完回调，返回错误信息
        this.$refs.formValidate.fields.forEach((e) => {
          if (
            e.prop == "tunnelRangeList.0.distance" ||
            e.prop == "tunnelRangeList.1.distance"
          ) {
            e.validateState = "";
            e.validateMessage = "";
          }
        });
        callback();
      }
    };
    return {
      form: {
        condition: [],
        tunnelRangeList: [],
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
        distance: [
          {
            type: "number",
            required: true,
            validator: validDistance,
            trigger: "blur,change",
          },
        ],
      },
      columnsTunnel: [
        {
          title: "巷道名称",
          slot: "name",
          align: "center",
        },
        {
          title: "巷道位置（米）",
          slot: "meter",
          align: "center",
        },
        {
          title: "进入标识",
          slot: "flag",
          align: "center",
        },
      ],
    };
  },
  methods: {
    changeT1(e, index) {
      this.form.condition[index].t3 = "";
      if (e) {
        this.getDropList(e, index);
      } else {
        this.form.condition[index].t1 = "";
      }
    },
    getDropList(e, index, k) {
      let oneList = [
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
        setTimeout(() => {
          this.form.condition[index].actionList = oneList;
          if (k) {
            this.form.condition[index].actionList.unshift({
              code: k.t3,
              name: k.name,
            });
          }
          // this.$set(
          //   this.form,
          //   "condition" + `${[index]}` + "actionList",
          //   oneList
          // );
        }, 1000);
      } else if (e == 2) {
        setTimeout(() => {
          this.form.condition[index].actionList = twoList;
        }, 1000);
      }
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
        //对整个表单进行校验，参数为检验完的回调，会返回一个 Boolean 表示成功与失败，支持 Promise
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
      this.addTun();
    },
    edit() {
      // mock已有假数据
      let data = {
          t1: "1",
          t2: "1",
          t3: 1,
          name: "加1单",
        },
        data1 = JSON.stringify(data);
      this.$set(this.form.condition, 0, JSON.parse(data1));
      this.$set(this.form.condition[0], "actionList", []);
      this.getDropList(this.form.condition[0].t1, 0, this.form.condition[0]);
    },
    addTun() {
      for (let i = 0; i < 2; i++) {
        this.form.tunnelRangeList.push({
          tunnelId: 1,
          tunnelName: "苏苏小苏苏",
          distance: 0,
          direction: "",
        });
      }
      this.form.tunnelRangeList[0].direction = 1;
      this.form.tunnelRangeList[1].direction = 0;
    },
  },
  watch: {
    "form.condition": {
      immediate: true,
      deep: true,
      handler: (newVal) => {
        console.log(newVal, "变化后的值");
      },
    },
  },
};
</script>
<style scoped lang="less"></style>