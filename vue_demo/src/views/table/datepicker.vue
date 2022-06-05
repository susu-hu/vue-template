<template>
  <div class="contentBox">
    <Card>
      <template slot="title"> 日期选择+禁用 </template>
      <Form
        :style="{ width: '490px', margin: '0 auto' }"
        ref="formValidate"
        :model="formInline"
        :rules="ruleValidate"
        class="inputForm"
        :label-width="100"
      >
        <Form-item label="月份" prop="billMonth">
          <DatePicker
            type="month"
            :disabled="currentType == 1"
            placeholder="请先选择月份,在选择后续数据"
            v-model="formInline.billMonth"
            @on-change="(v) => timeChange(v, 'billMonth')"
            format="yyyy-MM"
            style="width: 340px"
          ></DatePicker>
        </Form-item>
        <Form-item
          label="日期"
          prop="billDate"
          :rules="
            !!formInline.beginDate || !!formInline.endDate
              ? [{ required: false }]
              : ruleValidate.billDate
          "
        >
          <DatePicker
            :start-date="st"
            :options="options"
            :disabled="
              !!formInline.beginDate ||
              !!formInline.endDate ||
              !formInline.billMonth
            "
            v-model="formInline.billDate"
            type="datetime"
            placeholder="请先清空开始日期和结束日期，再选择日期"
            style="width: 340px"
            @on-change="(v) => timeChange(v, 'billDate')"
          ></DatePicker>
        </Form-item>
        <FormItem
          label="开始日期"
          prop="beginDate"
          :rules="
            !formInline.billDate
              ? ruleValidate.beginDate
              : [{ required: false }]
          "
        >
          <DatePicker
            :start-date="st"
            :options="options"
            :disabled="!!formInline.billDate || !formInline.billMonth"
            style="width: 340px"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="请先清空日期，再选择开始时间"
            :value="formInline.beginDate"
            @on-change="(v) => timeChange(v, 'beginDate')"
          ></DatePicker>
        </FormItem>
        <FormItem
          label="结束日期"
          prop="endDate"
          :rules="
            !formInline.billDate ? ruleValidate.endDate : [{ required: false }]
          "
        >
          <DatePicker
            :start-date="st"
            :disabled="!!formInline.billDate || !formInline.billMonth"
            style="width: 340px"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="请先清空日期，再选择结束日期"
            :value="formInline.endDate"
            @on-change="(v) => timeChange(v, 'endDate')"
          ></DatePicker>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')"
            >保存</Button
          >
          <Button @click="handleReset('formValidate')" style="margin-left: 8px"
            >重置</Button
          >
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: "datepicker",
  data() {
    const vaTime = (rule, value, callback) => {
      if (this.formInline.beginDate && this.formInline.endDate) {
        if (this.formInline.beginDate > this.formInline.endDate) {
          callback(new Error("开始时间不能大于结束时间"));
        } else {
          callback();
        }
      }
    };
    const vaDate = (msg, e, value, callback) => {
      if (this.formInline[e]) {
        callback();
      } else {
        callback(new Error(msg));
      }
    };
    return {
      seTime: [],
      st: new Date(),
      currentType: 0,
      formInline: {
        billDate: "",
        billMonth: "",
        beginDate: "",
        endDate: "",
      },
      ruleValidate: {
        billDate: [
          {
            trigger: "change",
            required: true,
            validator: (rule, value, callback) =>
              vaDate("请选择日期", "billDate", value, callback),
          },
        ],
        beginDate: [
          { required: true, message: "请选择开始日期", trigger: "change" },
          {
            trigger: "change",
            required: true,
            validator: vaTime,
          },
        ],
        endDate: [
          { required: true, message: "请选择结束日期", trigger: "change" },
          {
            trigger: "change",
            required: true,
            validator: vaTime,
          },
        ],
        billMonth: [
          {
            trigger: "change",
            required: true,
            validator: (rule, value, callback) =>
              vaDate("请输入月份", "billMonth", value, callback),
          },
        ],
        type: [
          {
            required: true,
            type: "number",
            message: "类型不能为空",
            trigger: "change",
          },
        ],
      },
      options: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    timeChange(v, type) {
      this.formInline[type] = v;
      if (type == "billMonth") {
        this.formInline.billDate = "";
        this.formInline.beginDate = "";
        this.formInline.endDate = "";
        var now = new Date(v);
        var nowMonth = now.getMonth();
        var nowYear = now.getFullYear();
        this.st = new Date(nowYear, nowMonth, 1);
        this.options = {
          disabledDate: (date) => {
            return this.getDsDate(date, v);
          },
        };
      }
      if (type == "billDate" || type == "beginDate" || type == "endDate") {
        this.$refs.formValidate.fields.forEach((item) => {
          if (
            item.prop == "beginDate" ||
            item.prop == "endDate" ||
            item.prop == "billDate"
          ) {
            item.validateState = "";
            item.validateMessage = "";

            // validateDisabled 是否校验
            // validateState 展示状态（校验错误时此处值为 'error'）
            // validateMessage 错误提示文字
          }
        });
      }
    },
    getDsDate(date, v) {
      let dateTime = new Date(v);
      let currentYear = dateTime.getFullYear();
      let currentMonth = dateTime.getMonth();
      let monthFirstDay = new Date(currentYear, currentMonth, 1);
      let newMonth = ++currentMonth;
      let newYear = currentYear;
      if (newMonth >= 12) {
        newMonth -= 12;
        newYear++;
      }
      let nextMonthFirst = new Date(newYear, newMonth, 1);
      let nonthLastDay = new Date(
        nextMonthFirst.getTime() - 24 * 60 * 60 * 1000
      );
      return (
        date.valueOf() < new Date(monthFirstDay).getTime() ||
        date.valueOf() > new Date(nonthLastDay).getTime()
      );
    },
    getData() {
      let q = this.$route.query;
      if (q.id) {
        this.currentType = 1;
        this.$api["funDetail"]({ id: q.id }).then((res) => {
          if (res.code == "200") {
            let d = res.data;
            Object.keys(this.formInline).forEach((key) => {
              this.formInline[key] = d[key];
            });
            this.options = {
              disabledDate: (date) => {
                return this.getDsDate(date, this.formInline.billMonth);
              },
            };
          }
        });
      }
    },
    handleSubmit(name) {
      let data = { ...this.formInline };
      data.billMonth = this.tools.yyyymm(data.billMonth, true);
      data.billDate = this.tools.formatDate(data.billDate, true);
      data.beginDate = this.tools.formatDate(data.beginDate, true);
      data.endDate = this.tools.formatDate(data.endDate, true);
      if (this.currentType == 1) {
        data.id = this.$route.query.id;
      }
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success("操作成功");
        }
      });
    },
    handleReset(name) {
      if (this.currentType == 0) {
        this.$refs[name].resetFields();
        for (let key in this.formInline) {
          this.formInline[key] = "";
        }
      } else {
        this.$refs[name].fields.forEach((item) => {
          if (item.prop !== "billMonth") {
            item.resetField();
          }
        });
      }
    },
  },
};
</script>

<style scoped>
</style>
