
<template>
  <div class="contentBox">
    <el-button type="primary" @click="dialog = true" size="mini"
      >点击打开 Dialog</el-button
    >
    <el-dialog
      title="提示"
      :visible.sync="dialog"
      width="1200px"
      :modal-append-to-body="false"
    >
      <publicForm
        ref="publicForm"
        :formObj="formObj"
        :formData="formData"
        :searchSelectOptionsCb="searchSelectOptionsCb"
        @selectChange="selectChange"
        @inputINPUT="inputINPUT"
        @inputChange="inputChange"
        @querySelectValue="querySelectValue"
        @formSwitchChange="formSwitchChange"
        @buttonClick="buttonClick"
      >
      </publicForm>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogOK">确认</el-button>
        <el-button @click="dialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 富文本编辑器:vue-quill-editor---地址：https://github.com/surmon-china/vue-quill-editor
// 1.vue-quill-editor是基于quill(github地址)适用于Vue2的富文本编辑器，所以对于quill的原生属性扩展也是支持的。quill文档地址
// 2.quill 中有许多扩展和自定义方法功能。比如图片的重定义大小、图片上传的点击处理等
import rule from "./js/ruleVal.js";
export default {
  components: {}, 
  data() {
    return {
      dialog: false, //弹出框
      formObj: rule.formObj,
      formData: rule.formData,
      searchSelectOptionsCb: [], //form表单搜索select返回值
    };
  },
  watch: {
    /* eslint-disable */
    dialog(newVal, oldVal) {
      if (!newVal) {
        this.$refs.publicForm.resetForm(); //窗口关闭清空表单
      }
    },
  },
  methods: {
    // select选择框变化
    selectChange(value, index, prop) {
      console.log(value, index, prop);
    },
    // inpuit变化
    inputINPUT(value, index, prop) {
      console.log(value, index, prop);
    },
    // inpuit Change
    inputChange(value, index, prop) {
      console.log(value, index, prop);
    },
    // select 搜索值
    querySelectValue(value, index, prop) {
      console.log(value, index, prop);
      let arr = [
        {
          label: "搜索返回1号",
          value: 1,
        },
        {
          label: "搜索返回2号",
          value: 2,
        },
      ];
      this.searchSelectOptionsCb = arr;
    },
    // form表单switch变化
    formSwitchChange(val, index, prop) {
      console.log(val, index, prop);
    },
    // 按钮点击
    buttonClick(index, prop) {
      console.log(index, prop);
    },
    dialogOK() {
      //判断表单验证是否通过
      if (this.$refs.publicForm.submitForm()) {
        console.log("success");
        console.log(this.formData);
      } else {
        console.log("error");
      }
    },
  },
};
</script>
 
<style lang="less" scoped>
</style>