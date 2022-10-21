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
          :rules="ruleValidate.r1"
        >
          <Input
            type="text"
            v-model="item.paramCode"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <Row v-for="(x, y) in item.paramValue" :key="y">
          <FormItem
            :label="x.name"
            :rules="ruleValidate.r1"
            :prop="'params.' + index + '.paramValue.' + y + '.value'"
          >
            <Input type="text" v-model="x.value" placeholder="苏苏苏"></Input>
          </FormItem>
          <Row v-for="(a, b) in x.configValue" :key="b">
            <FormItem
              :label="a.name"
              :rules="ruleValidate.r1"
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
                v-model="a.value"
                placeholder="configValue的value值"
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
const validateSelfHandler = (msg, rule, value, callback) => {
  console.log(value);
  if (new RegExp(rule).test("" + value)) {
    callback();
  } else {
    callback(new Error(msg));
  }
};
export default {
  data() {
    return {
      params: [
        {
          paramCode: "参数编号1",
          paramName: "参数名称1",
          paramValue: [
            {
              name: "名称1",
              value: "点号1",
              configValue: [
                {
                  name: "名称1",
                  code: "编号1",
                  value: "",
                  unit: "",
                },
              ],
            },
          ],
        },
      ],
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
                    name: "名称2-name1",
                    code: "",
                    value: "",
                    unit: "",
                  },
                  {
                    name: "名称2-name2",
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
      ruleValidate: {
        r1: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
          {
            trigger: "blur",
            validator: (rule, value, callback) =>
              validateSelfHandler(
                "请输入正整数哈哈哈哈",
                /^[1-9]\d*$/,
                value,
                callback
              ),
          },
        ],
      },
      //   validateSelfHandler,//若是在template中调用，需要return返回
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
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
  },
};
</script>

<style></style>
