<template>
  <div class="contentBox">
    <Form
      ref="formValidate"
      :model="formItemPass"
      :rules="ruleValidatePass"
      :label-width="100"
    >
      <FormItem label="名称" prop="name">
        <Input
          v-model="formItemPass.name"
          placeholder="请输入名称"
          @on-blur="blur()"
        >
        </Input>
      </FormItem>
      <FormItem label="新密码" prop="password">
        <Input
          v-model="formItemPass.password"
          :type="eye ? 'text' : 'password'"
          placeholder="请输入新密码"
          @on-blur="blur()"
        >
          <Icon
            slot="suffix"
            :type="eye ? 'ios-eye' : 'ios-eye-off'"
            @click="eye = !eye"
          />
        </Input>
      </FormItem>
      <FormItem label="确认新密码" prop="newPwd2">
        <Input
          v-model="formItemPass.newPwd2"
          :type="eye2 ? 'text' : 'password'"
          placeholder="请确认新密码"
          @on-blur="blur()"
        >
          <Icon
            slot="suffix"
            :type="eye2 ? 'ios-eye' : 'ios-eye-off'"
            @click="eye2 = !eye2"
          />
        </Input>
      </FormItem>
      <div style="text-align: right; padding: 20px 0">
        <Button size="large" type="default" @click="cancelPass" class="mr10"
          >取消</Button
        >
        <Button size="large" type="primary" @click="submitPass">确认</Button>
      </div>
    </Form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.formItemPass.password) {
        callback(new Error("两次输入新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      can: false,
      ruleValidatePass: {
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        newPwd2: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      eye: false,
      eye2: false,
      formItemPass: {
        password: "",
        newPwd2: "",
        name: "",
      },
    };
  },
  watch: {
    can: {
      // eslint-disable-next-line
      handler(cur, old) {
        this.can = cur;
        console.log(this.can);
      },
    },
    formItemPass: {
      // 需要具体执行的方法
      //   当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
      // eslint-disable-next-line
      handler(cur, old) {
        console.log("asfdasfsa");
        console.log(this.can);
        if (this.can) {
          this.autoSave(cur);
        }
      },

      // 需要监听的数据的深度，一般用来监听对象中某个属性的变化,数组字符串一般不需要
      deep: true,
      // 在选项参数中指定 immediate: true将立即以表达式的当前值触发回调
      immediate: false,
      //watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性
    },
  },
  methods: {
    blur() {
      this.can = true;
      console.log(this.can);
    },
    submitPass() {
      this.can = false;
      let data = { ...this.formItemPass };
      data.retCode = this.retCode;
      this.$refs["formValidate"].validate((valid) => {
        if (valid) {
          delete data.newPwd2;
          this.$Message.success("修改成功");
          this.cancelPass();
        }
      });
    },
    cancelPass() {
      Object.keys(this.formItemPass).forEach((key) => {
        this.formItemPass[key] = "";
      });
      this.$refs["formValidate"].resetFields();
    },
    autoSave(e) {
      console.log(e);
      this.$Message.success("保存成功");
    },
  },
};
</script>

<style>
</style>