<template>
  <el-form v-model="params" inline class="flex-row">
    <div v-for="(item,index) in searchList" :key="index">
      <el-form-item :label="item.label" v-if="item.type=='input'">
        <el-input clearable v-model.trim="params[item.params]" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item :label="item.label" v-if="item.type=='time'">
        <el-date-picker v-model="params[item.params]" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" :picker-options="item.options">
        </el-date-picker>
      </el-form-item>
      <el-form-item :label="item.label" v-if="item.type=='select'">
        <el-select clearable filterable v-model="params[item.params]">
          <el-option v-for="(i0, i1) in item.list" :key="i1" :label="i0[item.listLabel]" :value="i0[item.listValue]">
          </el-option>
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.searchList = val;
        let p = {};
        if (val && val.length) {
          val.forEach((item) => {
            p[item.params] = "";
          });
          this.params = p;
          let l = val.filter((item) => item.type == "time");
          l.forEach((i) => {
            if (i.default) this.params[i.params] = i.default;
          });
        }
      },
    },
  },
  data() {
    return {
      params: {},
      searchList: [],
    };
  },
};
</script>

<style lang="less" scoped>
/deep/ .el-form-item {
  margin-bottom: 0;
}
</style>