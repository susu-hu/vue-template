<template>
  <div class="contentBox">
    <Form
      :label-width="100"
      ref="formValidate"
      :model="form"
      :rules="ruleValidate"
    >
      <Row v-for="(item, index) in form.params" :key="index">
        <!-- :rules="[
            {
              required: true,
              message: 'Item ' + (index + 1) + ' can not be empty',
              trigger: 'blur',
            },
            {
              trigger: 'blur',
              validator: (rule, value, callback) =>
                validateSelfHandler(
                  '请输入正整数哈哈哈哈',
                  /^[1-9]\d*$/,
                  value,
                  callback
                ),
            },
          ]" -->
        <FormItem
          :label="item.paramName"
          :prop="'params.' + index + '.paramCode'"
          :rules="[
            {
              required: true,
              message: item.paramName + '不能为空',
              trigger: 'blur',
            },
            ruleValidate.t1,
          ]"
        >
          <Input
            type="text"
            v-model.trim="item.paramCode"
            placeholder="输入一个小参数吧"
            clearable
          ></Input>
        </FormItem>
        <Row v-for="(x, y) in item.paramValue" :key="y">
          <FormItem
            :label="x.name"
            :rules="[
              {
                required: true,
                message: x.name + '不能为空',
                trigger: 'blur',
              },
              ruleValidate.t1,
            ]"
            :prop="'params.' + index + '.paramValue.' + y + '.value'"
          >
            <Input
              type="text"
              v-model.trim="x.value"
              placeholder="paramValue"
              clearable
            ></Input>
          </FormItem>
          <Row v-for="(a, b) in x.configValue" :key="b">
            <FormItem
              :label="a.name"
              :rules="[
                {
                  required: true,
                  message: a.name + '不能为空',
                  trigger: 'blur',
                },
                ruleValidate.t1,
                ruleValidate.t2,
              ]"
              :prop="
                'params.' +
                index +
                '.paramValue.' +
                y +
                '.configValue.' +
                b +
                '.value'
              "
            >
              <Input
                type="text"
                v-model.trim="a.value"
                placeholder="configValue"
                clearable
              ></Input>
            </FormItem>
          </Row>
        </Row>
      </Row>
    </Form>
    <Button type="primary" class="flex-row j_c" @click="submit('formValidate')"
      >提交数据</Button
    >
  </div>
</template>

<script>
import { ruleValidate } from "./traverseForm";
export default {
  data() {
    return {
      form: {
        params: [
          {
            paramCode: "",
            paramName: "参数名称1",
            paramValue: [
              {
                name: "名称1",
                value: "",
                configValue: [
                  {
                    name: "名称1-name1",
                    code: "",
                    value: "",
                    unit: "",
                  },
                  {
                    name: "名称1-name2",
                    code: "",
                    value: "",
                    unit: "",
                  },
                ],
              },
              {
                name: "名称2",
                value: "",
                configValue: [
                  {
                    name: "量程开始",
                    code: "",
                    value: "",
                    unit: "",
                  },
                  {
                    name: "量程结束",
                    code: "",
                    value: "",
                    unit: "",
                  },
                ],
              },
            ],
          },
        ],
      },
      ruleValidate: ruleValidate(this),
      //validateSelfHandler,//若是在template中调用，需要return返回
    };
  },
  methods: {
    submit(name) {
      console.log(this.form);
      this.$refs[name].fields.forEach((item) => {
        console.log(item.prop);
      });
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("Success!");
        }
      });
    },
  },
};
</script>
