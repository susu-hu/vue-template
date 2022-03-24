
<template>
  <div class="contentBox">
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
  </div>
</template>
<script>
import rule from "./js/ruleVal.js";
import publicForm from "./components/form.vue";
export default {
  components: {
    publicForm,
  },
  data() {
    return {
      dialog: false,
      formObj: rule.formObj,
      formData: rule.formData,
      searchSelectOptionsCb: [],
    };
  },
  watch: {
    /* eslint-disable */
    dialog(newVal, oldVal) {
      if (!newVal) {
        this.$refs.publicForm.resetForm();
      }
    },
  },
  methods: {
    selectChange(value, index, prop) {},

    inputINPUT(value, index, prop) {},

    inputChange(value, index, prop) {},

    querySelectValue(value, index, prop) {
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
    formSwitchChange(val, index, prop) {},

    buttonClick(index, prop) {},
    dialogOK() {
      if (this.$refs.publicForm.submitForm()) {
        console.log(this.formData);
      } else {
      }
    },
  },
};
</script>
 
<style lang="less" scoped>
</style>