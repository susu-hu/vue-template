<template>
  <div class="API-table">
    <Form ref="formRef" :model="appindexData" :rules="rules">
      <FormItem prop="stratHeight">
        <DatePicker
          style="width: 400px"
          type="date"
          :confirm="true"
          placeholder="请输入起始时间"
          :value="appindexData.stratHeight"
          :options="startTimeOptions"
          @on-ok="startTimeChoose"
          @on-change="appindexData.stratHeight = $event"
        ></DatePicker>
      </FormItem>

      <p>终止时间</p>
      <FormItem prop="endHeight">
        <DatePicker
          style="width: 400px"
          type="date"
          :confirm="true"
          placeholder="请输入终止时间"
          :value="appindexData.endHeight"
          :options="endTimeOptions"
          @on-open-change="endTimeOpen"
          @on-change="appindexData.endHeight = $event"
        ></DatePicker>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      startTimeOptions: {
        //限制日期前以前的不可选择
        // disabledDate: date => {
        //   return date && date.valueOf() < Date.now() - 86400000;
        // }
      },
      endTimeOptions: {},
      rules: {
        stratHeight: [
          { required: true, message: "开始时间不能为空", trigger: "blur" },
        ],
        endHeight: [
          { required: true, message: "结束时间不能为空", trigger: "blur" },
        ],
      },

      appindexData: {
        stratHeight: "",
        endHeight: "",
      },
    };
  },
  mounted() {},
  watch: {
    // 结束时间范围
    "appindexData.stratHeight": function (e) {
      this.endTimeOptions = {
        disabledDate: (date) => {
          // return date && date.valueOf() < new Date(this.appindexData.stratHeight).getTime()-86400000
          // 设置结束日期 可以选择开始日期当天的日期
          let startTime = "";
          //获取当前e对应的日期 xxxx/xx/xx
          let curD = new Date(e).toLocaleDateString();
          if (new Date(curD).valueOf() < new Date(e).valueOf()) {
            //86400000 = 1 * 24 * 60 * 60 * 1000 是一天(24小时)的毫秒数
            startTime = e ? new Date(e).valueOf() - 86400000 : "";
          } else {
            startTime = e ? new Date(e).valueOf() : "";
          }
          return date && date.valueOf() < startTime;
        },
      };
    },
  },

  methods: {
    startTimeChoose() {
      if (
        new Date(this.appindexData.stratHeight) -
          new Date(this.appindexData.endHeight) >
        0
      ) {
        this.$Message.warning("开始时间早于结束数时间");
        this.appindexData.stratHeight = "";
      }
    },
    // 结束时间验证
    endTimeOpen() {
      if (!this.appindexData.stratHeight) {
        this.$Message.warning("请先选择开始时间");
        this.appindexData.endHeight = "";
      }
    },
  },
};
</script>
<style scoped>
</style>