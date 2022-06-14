<template>
  <div class="container contentBox">
    <h1 class="mb-20 t-l-c">人员历史轨迹辅助工具</h1>
    <Row>
      <Form ref="Form" :model="form" :rules="rules">
        <Col span="24" class="flex-row mb-20">
          <FormItem label="卡号：" class="flex-row mb-0 mr-40">
            <Input
              clearable
              v-model.trim="form.cardNo"
              type="text"
              placeholder="请输入卡号"
              style="width: 220px"
            />
          </FormItem>
          <FormItem label="日期：" class="flex-row mb-0 mr-40">
            <Date-picker
              clearable
              style="width: 220px"
              v-model="form.date"
              type="date"
              @on-change="changeFormDate"
              :options="dayOptions"
              placeholder="选择日期"
            ></Date-picker>
          </FormItem>
          <Button
            type="primary"
            size="large"
            class="mr-20 act-btn"
            @click="search(1)"
            >查询</Button
          >
          <Button
            type="primary"
            size="large"
            class="mr-20 act-btn"
            @click="nextDay(-1, 'form.date')"
            >前一天</Button
          >
          <Button
            type="primary"
            size="large"
            class="mr-20 act-btn"
            @click="nextDay(1, 'form.date')"
            >后一天</Button
          >
          <Button
            type="primary"
            size="large"
            class="mr-20 act-btn"
            @click="openModal"
            >复制</Button
          >
          <Button type="primary" size="large" class="act-btn" @click="saveData"
            >保存</Button
          >
        </Col>
        <Col span="24" style="margin-bottom: 30px">
          <Card>
            <div class="flex-row j_b">
              <FormItem label="姓名：" class="flex-row mb-0 mr-40">
                <Input
                  :disabled="true"
                  v-model.trim="userInfo.cnName"
                  type="text"
                  placeholder="请输入姓名"
                  style="width: 180px"
                />
              </FormItem>
              <FormItem label="部门：" class="flex-row mb-0 mr-40">
                <Input
                  :disabled="true"
                  v-model.trim="userInfo.deptName"
                  type="text"
                  placeholder="请输入部门"
                  style="width: 180px"
                />
              </FormItem>
              <FormItem label="工号：" class="flex-row mb-0 mr-40">
                <Input
                  :disabled="true"
                  v-model.trim="userInfo.userInfoCode"
                  type="text"
                  placeholder="请输入工号"
                  style="width: 180px"
                />
              </FormItem>
              <FormItem label="工种：" class="flex-row mb-0 mr-40">
                <Input
                  :disabled="true"
                  v-model.trim="userInfo.dutyName"
                  type="text"
                  placeholder="请输入工种"
                  style="width: 180px"
                />
              </FormItem>
              <FormItem label="职务：" class="flex-row mb-0 mr-40">
                <Input
                  :disabled="true"
                  v-model.trim="userInfo.positionName"
                  type="text"
                  placeholder="请输入职务"
                  style="width: 180px"
                />
              </FormItem>
              <FormItem label="班次：" class="flex-row mb-0 mr-40">
                <Input
                  :disabled="true"
                  v-model.trim="userInfo.shiftName"
                  type="text"
                  placeholder="请输入班次"
                  style="width: 180px"
                />
              </FormItem>
            </div>
          </Card>
        </Col>
        <!-- 考勤 -->
        <Col span="24" style="margin-bottom: 30px">
          <div class="flex-row mb-20">
            <h2 class="mr-20">考勤信息</h2>
            <Icon
              type="md-add-circle"
              size="30"
              color="#57A3F3"
              @click="addInfo"
            />
          </div>
          <Table
            style="border-bottom: 1px solid #dcdee2"
            :columns="columnAttendance"
            :data="form.attendance"
            stripe
            border
            max-height="300"
            @on-row-click="handleRowChange"
            @on-row-dblclick="handleRowChange"
            highlight-row
          >
            <template slot="sort" slot-scope="{ index }">
              {{ index + 1 }}
            </template>
            <template slot="shiftTimeQuantumId" slot-scope="{ index }">
              <FormItem
                class="mt-20"
                :prop="`attendance.${index}.shiftTimeQuantumId`"
                :rules="rules.shiftTimeQuantumId"
              >
                <Select
                  :transfer="true"
                  v-model="form.attendance[index].shiftTimeQuantumId"
                  filterable
                  clearable
                  placeholder="请选择"
                  :disabled="form.attendance[index].no_del"
                  @on-change="(e) => changeShift(e, index)"
                  label-in-value
                >
                  <Option
                    v-for="(item, index) in shiftList"
                    :value="item.shiftTimeQuantumId"
                    :key="item.shiftTimeQuantumId + `${index}`"
                    >{{ item.timeName }}</Option
                  >
                </Select>
              </FormItem>
            </template>
            <template slot="inwellTime" slot-scope="{ index }">
              <FormItem
                class="mt-20"
                :prop="`attendance.${index}.inwellTime`"
                :rules="rules.inwellTime"
              >
                <Date-picker
                  :options="dayOptions"
                  :transfer="true"
                  v-model="form.attendance[index].inwellTime"
                  @on-change="(e) => changeWelTime(e, index, 'inwellTime')"
                  type="datetime"
                  placeholder="选择时间"
                ></Date-picker>
              </FormItem>
            </template>
            <template slot="outwellTime" slot-scope="{ index }">
              <FormItem
                class="mt-20"
                :prop="`attendance.${index}.outwellTime`"
                :rules="rules.outwellTime"
              >
                <Date-picker
                  :options="dayOptions"
                  :transfer="true"
                  v-model="form.attendance[index].outwellTime"
                  @on-change="(e) => changeWelTime(e, index, 'outwellTime')"
                  @on-open-change="(e) => endTimeChange(e, index)"
                  type="datetime"
                  placeholder="选择时间"
                ></Date-picker>
              </FormItem>
            </template>
            <template slot="inwellStationNo" slot-scope="{ index }">
              <FormItem
                class="mt-20"
                :prop="`attendance.${index}.inwellStationNo`"
                :rules="rules.inwellStationNo"
              >
                <Select
                  :transfer="true"
                  v-model="form.attendance[index].inwellStationNo"
                  filterable
                  clearable
                  placeholder="请选择基站"
                  :disabled="form.attendance[index].no_del"
                  label-in-value
                  @on-change="
                    (e) => changeStation(e, index, 'inwellStationName')
                  "
                >
                  <Option
                    v-for="(item, index) in stationList"
                    :value="item.stationNo"
                    :key="item.stationNo + `${index}`"
                    >{{ item.stationName }}</Option
                  >
                </Select>
              </FormItem>
            </template>
            <template slot="outwellStationNo" slot-scope="{ index }">
              <FormItem
                class="mt-20"
                :prop="`attendance.${index}.outwellStationNo`"
                :rules="rules.outwellStationNo"
              >
                <Select
                  :transfer="true"
                  v-model="form.attendance[index].outwellStationNo"
                  filterable
                  clearable
                  placeholder="请选择基站"
                  :disabled="form.attendance[index].no_del"
                  label-in-value
                  @on-change="
                    (e) => changeStation(e, index, 'outwellStationName')
                  "
                >
                  <Option
                    v-for="(item, index) in stationList"
                    :value="item.stationNo"
                    :key="item.stationNo + `${index}`"
                    >{{ item.stationName }}</Option
                  >
                </Select>
              </FormItem>
            </template>
            <template slot="action" slot-scope="{ row, index }">
              <a
                v-if="!row.no_del"
                href="javascript:;"
                style="color: #d55516"
                @click="del(index, 'attendance')"
                class="mr-40"
                >删除</a
              >
              <a
                href="javascript:;"
                style="color: #57a3f3"
                @click="copy(row, 'attendance')"
                >复制</a
              >
            </template>
          </Table>
        </Col>
        <!-- 轨迹 -->
        <Col span="24" style="margin-bottom: 30px" v-if="showTrack">
          <div class="flex-row mb-20">
            <h2 class="mr-20">轨迹信息</h2>
            <Icon
              type="md-add-circle"
              size="30"
              color="#57A3F3"
              @click="addTrack"
            />
          </div>
          <div class="flex-row mb-20">
            <FormItem label="入井基站：" class="flex-row mb-0 mr-40">
              <Select
                :disabled="true"
                style="width: 220px"
                :transfer="true"
                v-model="form.inStationItem.stationNo"
                placeholder="请选择基站"
              >
                <Option
                  v-for="(item, index) in stationList"
                  :value="item.stationNo"
                  :key="item.stationNo + `${index}`"
                  >{{ item.stationName }}</Option
                >
              </Select>
            </FormItem>
            <FormItem
              label="方向："
              :rules="rules.stationDirection"
              class="flex-row mb-0 mr-40"
            >
              <!--  :prop="`${form.inStationItem.stationDirection}`" -->
              <Select
                v-model="form.inStationItem.stationDirection"
                placeholder="请选择方向"
                style="width: 220px"
                :transfer="true"
                filterable
                clearable
              >
                <!--  :disabled="form.inStationItem.no_del" -->
                <Option :value="1">左</Option>
                <Option :value="2">右</Option>
              </Select>
            </FormItem>
            <FormItem
              label="距离："
              class="flex-row mb-0 mr-40"
              :rules="rules.stationDistance"
            >
              <!-- :prop="`${form.inStationItem.stationDistance}`" -->
              <!--  :disabled="form.inStationItem.no_del" -->
              <Input
                v-model.trim="form.inStationItem.stationDistance"
                type="text"
                placeholder="请输入距离"
                style="width: 220px"
              />
            </FormItem>
            <FormItem label="时间：" class="flex-row mb-0 mr-40">
              <Date-picker
                style="width: 220px"
                :options="dayOptions"
                :disabled="true"
                :transfer="true"
                v-model="form.inStationItem.dataTime"
                type="datetime"
                placeholder="选择时间"
              ></Date-picker>
            </FormItem>
          </div>
          <Table
            style="margin-bottom: 40px; border-bottom: 1px solid #dcdee2"
            :columns="columnTrack"
            :data="form.trackList"
            stripe
            border
            max-height="300"
          >
            <template slot="sort" slot-scope="{ index }">
              {{ index + 1 }}
            </template>
            <template slot="stationNo" slot-scope="{ index }">
              <FormItem
                class="mt-20"
                :prop="`trackList.${index}.stationNo`"
                :rules="rules.inwellStationNo"
              >
                <Select
                  :transfer="true"
                  v-model="form.trackList[index].stationNo"
                  filterable
                  clearable
                  placeholder="请选择基站"
                  @on-change="(e) => selectStation(e, index)"
                  :disabled="form.trackList[index].no_del"
                >
                  <Option
                    v-for="(item, index) in stationList"
                    :value="item.stationNo"
                    :key="item.stationNo + `${index}`"
                    >{{ item.stationName }}</Option
                  >
                </Select>
              </FormItem>
            </template>
            <template slot="mainStationHid" slot-scope="{ index }">
              {{ form.trackList[index].mainStationHid }}
            </template>
            <template slot="stationDirection" slot-scope="{ index }">
              <FormItem
                class="mt-20"
                :prop="`trackList.${index}.stationDirection`"
                :rules="rules.stationDirection"
              >
                <Select
                  :transfer="true"
                  v-model="form.trackList[index].stationDirection"
                  filterable
                  clearable
                  placeholder="请选择方向"
                  :disabled="form.trackList[index].no_del"
                >
                  <Option :value="1">左</Option>
                  <Option :value="2">右</Option>
                </Select>
              </FormItem>
            </template>
            <template slot="stationDistance" slot-scope="{ index }">
              <FormItem
                class="mt-20"
                :prop="`trackList.${index}.stationDistance`"
                :rules="rules.stationDistance"
              >
                <Input
                  clearable
                  v-model.trim="form.trackList[index].stationDistance"
                  type="text"
                  placeholder="请输入距离"
                  :disabled="form.trackList[index].no_del"
                />
              </FormItem>
            </template>
            <template slot="dataTime" slot-scope="{ index }">
              <FormItem
                class="mt-20"
                :prop="`trackList.${index}.dataTime`"
                :rules="rules.dataTime"
              >
                <Date-picker
                  :transfer="true"
                  :options="dayOptions"
                  v-model="form.trackList[index].dataTime"
                  @on-change="form.trackList[index].dataTime = $event"
                  type="datetime"
                  placeholder="选择时间"
                  :disabled="form.trackList[index].no_del"
                ></Date-picker>
              </FormItem>
            </template>
            <template slot="action" slot-scope="{ row, index }">
              <a
                v-if="!row.no_del"
                href="javascript:;"
                style="color: #d55516"
                @click="del(index, 'trackList')"
                class="mr-40"
                >删除</a
              >
              <a
                href="javascript:;"
                style="color: #57a3f3"
                @click="copy(row, 'trackList')"
                >复制</a
              >
            </template>
          </Table>
          <div class="flex-row">
            <FormItem label="出井基站：" class="flex-row mb-0 mr-40">
              <Select
                :disabled="true"
                style="width: 220px"
                :transfer="true"
                v-model="form.outStationItem.stationNo"
                placeholder="请选择基站"
              >
                <Option
                  v-for="(item, index) in stationList"
                  :value="item.stationNo"
                  :key="item.stationNo + `${index}`"
                  >{{ item.stationName }}</Option
                >
              </Select>
            </FormItem>
            <FormItem
              label="方向："
              class="flex-row mb-0 mr-40"
              :rules="rules.stationDirection"
            >
              <!--  :prop="`outStationItem.stationDirection`" -->
              <Select
                v-model="form.outStationItem.stationDirection"
                placeholder="请选择方向"
                style="width: 220px"
                :transfer="true"
                filterable
                clearable
              >
                <!--  :disabled="form.outStationItem.no_del" -->
                <Option :value="1">左</Option>
                <Option :value="2">右</Option>
              </Select>
            </FormItem>
            <FormItem
              label="距离："
              class="flex-row mb-0 mr-40"
              :rules="rules.stationDistance"
            >
              <!-- :prop="`outStationItem.stationDistance`" -->
              <Input
                v-model.trim="form.outStationItem.stationDistance"
                type="text"
                placeholder="请输入距离"
                style="width: 220px"
              />
              <!-- :disabled="form.outStationItem.no_del" -->
            </FormItem>
            <FormItem label="时间：" class="flex-row mb-0 mr-40">
              <Date-picker
                style="width: 220px"
                :options="dayOptions"
                :disabled="true"
                :transfer="true"
                v-model="form.outStationItem.dataTime"
                @on-change="form.outStationItem.dataTime = $event"
                type="datetime"
                placeholder="选择时间"
              ></Date-picker>
            </FormItem>
          </div>
        </Col>
      </Form>
    </Row>
    <Modal
      v-model="modal"
      title="复制考勤及轨迹"
      width="950"
      :mask-closable="false"
      draggable
    >
      <Form>
        <Col span="24" class="flex-row mb-20">
          <FormItem label="卡号：" class="flex-row mb-0 mr-40">
            <Input
              clearable
              v-model.trim="copyCardNo"
              type="text"
              placeholder="请输入卡号"
              style="width: 180px"
            />
          </FormItem>
          <FormItem label="日期：" class="flex-row mb-0 mr-40">
            <Date-picker
              :transfer="true"
              :options="dayOptions"
              clearable
              style="width: 180px"
              v-model="copyDate"
              type="date"
              @on-change="copyDate = $event"
              placeholder="选择日期"
            ></Date-picker>
          </FormItem>
          <Button
            type="primary"
            size="large"
            class="mr-20 act-btn"
            @click="search(2)"
            >查询</Button
          >
          <Button
            type="primary"
            size="large"
            class="mr-20 act-btn"
            @click="nextDay(-1, 'copyDate')"
            >前一天</Button
          >
          <Button
            type="primary"
            size="large"
            class="mr-20 act-btn"
            @click="nextDay(1, 'copyDate')"
            >后一天</Button
          >
        </Col>
        <Col span="24">
          <Table
            class="mb-20"
            :columns="columnsCopy"
            :data="copyData"
            highlight-row
            border
            @on-expand="onExpand"
            @on-selection-change="selectionChange"
          >
            <template slot="index" slot-scope="{ index }">
              {{ index + 1 }}
            </template>
          </Table>
        </Col>
      </Form>
      <div slot="footer">
        <Button
          size="large"
          long
          @click="modal = false"
          class="act-btn cancel-btn"
          >取消</Button
        >
        <Button type="primary" size="large" long @click="submit" class="act-btn"
          >确定</Button
        >
      </div>
    </Modal>
    <Modal
      v-model="showDel"
      :title="modalTitle"
      class-name="vertical-center-modal"
      :closable="false"
      :mask-closable="false"
      :width="400"
    >
      <p class="tipsInfo">{{ modalText }}</p>
      <div slot="footer">
        <Button class="submit" icon="submit" @click="deleteok">确 认</Button>
        <Button class="cancel" icon="cancel" @click="showDel = false"
          >取 消</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  getMinObj,
  getMaxObj,
  getNextDate,
  formatDate,
  compareTime,
  flatten,
} from "@/libs/tools.js";
import columns from "./columns.js";
import { initForm, ruleValidate, originForm } from "./formRule";
// import * as api from "@/api/track.js";
export default {
  name: "trackAssistant",
  data() {
    return {
      modalTitle: "删除",
      modalText: "确认删除选中的数据?",
      dayOptions: {
        disabledDate: (date) => {
          return date >= Date.now();
        },
      },
      copyCardNo: "",
      copyDate: formatDate(new Date()),
      copyNo: "",
      currDel: {
        index: "",
        type: "",
        is_del: "",
        date: "",
      }, //删除的当前索引及删除list的type
      showDel: false, //是否展示删除弹框
      showTrack: false, //是否展示轨迹信息
      modal: false, //复制弹框
      userInfo: {},
      form: initForm,
      rules: ruleValidate(this),
      columnAttendance: columns.columnAttendance,
      columnTrack: columns.columnTrack,
      shiftList: [], //班次
      stationList: [], //基站
      columnsCopy: columns.columnCopy,
      copyData: [],
      selectHistory: [],
      currentIndex: "", //当前点击的考勤记录的位置
    };
  },

  created() {
    this.getAllStation();
  },
  methods: {
    changeFormDate(e) {
      this.form.date = e;
    },
    changeWelTime(e, index, type) {
      // this.form.inStationItem = JSON.parse(
      //   JSON.stringify(originForm.inStationItem)
      // );
      // this.form.outStationItem = JSON.parse(
      //   JSON.stringify(originForm.outStationItem)
      // );

      // this.form.attendance[index].inwellTime = e;
      console.log(type);
      this.form.attendance[index][type] = e;
      console.log(e);
      if (type == "inwellTime") {
        console.log(111111111111);
        this.$set(this.form.inStationItem, "dataTime", e);
        // this.form.inStationItem.dataTime = e;
      } else {
        console.log(2222222222222);
        this.$set(this.form.outStationItem, "dataTime", e);
        // this.form.outStationItem.dataTime = e;
      }
    },
    changeStation(e, index, type) {
      // this.form.inStationItem = JSON.parse(
      //   JSON.stringify(originForm.inStationItem)
      // );
      // this.form.outStationItem = JSON.parse(
      //   JSON.stringify(originForm.outStationItem)
      // );

      this.form.attendance[index][type] = e && e.label;
      console.log(type);
      if (type == "inwellStationName") {
        console.log(111111111111);
        // this.form.inStationItem.stationNo = e ? e.value : "";

        this.$set(this.form.inStationItem, "stationNo", e ? e.value : "");
      } else {
        console.log(22222222);
        // this.form.outStationItem.stationNo = e ? e.value : "";

        this.$set(this.form.outStationItem, "stationNo", e ? e.value : "");
      }

      console.log(this.form.outStationItem);
      console.log(this.form.inStationItem);
    },
    changeShift(e, index) {
      this.form.attendance[index].shiftTimeQuantumName = e && e.label;
    },
    endTimeChange(e, index) {
      // if (
      //   !e &&
      //   !compareTime(
      //     formatDate(this.form.attendance[index].inwellTime, true),
      //     formatDate(this.form.attendance[index].outwellTime, true)
      //   )
      // ) {
      //   this.$Message.error("出井时间不能大于入井时间");
      //   this.form.attendance[index].outwellTime = "";
      // }
    },
    selectionChange(e) {
      // console.log(e);
      this.selectHistory = e;
    },
    submit() {
      if (!this.selectHistory.length) return this.$Message.error("您尚未选择");
      console.log(this.selectHistory);
      this.modal = false;
      this.selectHistory.forEach((item) => {
        item.inwellTime =
          this.form.date &&
          this.form.date.split(" ") + " " + item.inwellTime.split(" ")[1];
        item.outwellTime =
          this.form.date &&
          this.form.date.split(" ") + " " + item.outwellTime.split(" ")[1];

        item.list.forEach((i0) => {
          i0.dataTime =
            this.form.date.split(" ") + " " + i0.dataTime.split(" ")[1];
        });
      });
      this.form.attendance = this.form.attendance.concat(this.selectHistory);
    },
    onExpand(e) {},
    reset() {
      this.$refs.Form.resetFields();
      this.form.attendance = JSON.parse(JSON.stringify([originForm.att]));
      this.form.trackList = JSON.parse(JSON.stringify([originForm.track]));
      this.form.inStationItem = JSON.parse(
        JSON.stringify(originForm.inStationItem)
      );
      this.form.outStationItem = JSON.parse(
        JSON.stringify(originForm.outStationItem)
      );
    },
    async search(e) {
      if (e == 1) {
        if (!this.form.cardNo) return this.$Message.error("请先填写员工卡号");
        if (!this.form.date) return this.$Message.error("请选择日期");
        this.reset();
        this.getUserInfo();
      } else {
        // if (!this.copyCardNo) return this.$Message.error("请先填写员工卡号");
        // if (!this.copyDate) return this.$Message.error("请选择日期");
        // const { data } = await api.getUserInfo(this.copyCardNo);
        // this.copyNo = data.data.userInfoCode;
        // this.getInwellTimeStatics(this.copyCardNo, this.copyDate, 2);
      }
    },
    async getUserInfo() {
      // const { data } = await api.getUserInfo(this.form.cardNo);
      let data = {
        code: 200,
        data: {},
      };
      // console.log(data);
      if (data.code == 200) {
        if (data.data) {
          this.userInfo = data.data;
          // this.getShiftInfo(data.data.shiftId);
          this.getInwellTimeStatics(this.form.cardNo, this.form.date, 1);
        } else {
          this.$Message.error("查询的员工不存在！");
        }
      }
    },
    /**
     * 查询用户考勤历史记录
     */
    async getInwellTimeStatics(e1, e2, type) {
      if (type == 1) {
        this.form.attendance = [];
      }
      // const { data } = await api
      //   .getInwellTimeStatics({
      //     cardNo: e1,
      //     type: 4,
      //     isPaging: 0,
      //     startDate: formatDate(e2),
      //     endDate: formatDate(e2),
      //     pageIndex: -1,
      //   })
      //   .catch(() => {
      //     if (type == 1)
      //       this.form.attendance = JSON.parse(JSON.stringify([originForm.att]));
      //   });
      let data = {
        code: 200,
        data: [
          {
            inwellTime: "2022-06-15 05:05:05",
            outwellTime: "2022-06-15 08:08:08",
          },
          {
            inwellTime: "2022-06-15 09:09:09",
            outwellTime: "2022-06-15 12:12:12",
          },
        ],
      };
      console.log("考勤信息-------------------------", data);
      if (data.code == 200) {
        if (type == 1) {
          if (data.data.length > 0) {
            // data.data.forEach((item) => {
            //   this.form.attendance.unshift(item);
            // });
            this.form.attendance = data.data;
            this.form.attendance.forEach((item) => {
              item.no_del = true;
              item.is_history = true;
            });
          } else {
            this.form.attendance = JSON.parse(JSON.stringify([originForm.att]));
          }
        } else {
          // data.data.forEach((item) => {
          //   item.list = [];
          //   api
          //     .getAuxiliaryInfo({
          //       beginTime: item.inwellTime,
          //       endTime: item.outwellTime,
          //       empList: [{ empNo: this.copyNo }],
          //     })
          //     .then((res) => {
          //       if (res.data.code == 200) {
          //         item.list = res.data.data;
          //         this.$set(item, "list", res.data.data);
          //       }
          //     });
          // });
          // this.copyData = data.data;
          // console.log(this.copyData);
        }
      }
    },

    async getTrackList(e, index) {
      console.log("-------------------------------", !e.is_origin);
      // if (!this.userInfo.userInfoCode)
      //   return this.$Message.error("员工信息不能为空");
      // const { data } = await api.getAuxiliaryInfo({
      //   beginTime: e.inwellTime,
      //   endTime: e.outwellTime,
      //   empList: [{ empNo: this.userInfo.userInfoCode }],
      // });
      let data = {
        code: 200,
        data: [
          {
            stationDistance: 111,
            dataTime: "2022-06-15 22:22:22",
          },
          {
            stationDistance: 222,
            dataTime: "2022-06-15 10:10:10",
          },
        ],
      };
      if (data.code == 200) {
        if (data.data.length > 0) {
          let dataList = data.data;
          this.stationList.forEach((item) => {
            dataList.forEach((i0) => {
              i0.stationDistance = i0.stationDistance.toString();
              i0.dataTime = formatDate(i0.dataTime, true);
              i0.no_del = true;
              if (i0.stationNo == item.stationNo) {
                i0.mainStationHid = item.mainStationHid;
              }
            });
          });
          this.$set(this.form.attendance[index], "list", dataList);
          this.form.trackList = this.form.attendance[index].list;
          if (!e.is_origin) {
            this.initListData(e, JSON.stringify(data.data), index);
          }
          // this.form.trackList = dataList;
          console.log("轨迹信息", this.form.trackList);
          console.log(this.form.attendance);
        } else {
          this.$set(this.form.attendance[index], "list", [
            JSON.parse(JSON.stringify(originForm.track)),
          ]);
          this.form.trackList = this.form.attendance[index].list;
          console.log(e, "没数据");

          this.$set(
            this.form.attendance[index],
            "inStationItem",
            // this.form.inStationItem
            JSON.parse(JSON.stringify(originForm.inStationItem))
          );
          this.$set(
            this.form.attendance[index],
            "outStationItem",
            // this.form.outStationItem
            JSON.parse(JSON.stringify(originForm.outStationItem))
          );
          this.form.attendance[index].inStationItem.dataTime = e.inwellTime;
          this.form.attendance[index].outStationItem.dataTime = e.outwellTime;
          this.form.attendance[index].inStationItem.stationNo =
            e.inwellStationNo;
          this.form.attendance[index].outStationItem.stationNo =
            e.outwellStationNo;
          this.form.inStationItem = this.form.attendance[index].inStationItem;
          this.form.outStationItem = this.form.attendance[index].outStationItem;
          console.log(this.form.attendance);
        }
      }
    },
    initListData(e, w, index) {
      // let q = JSON.parse(w);
      // let list1 = q.filter((item) => item.stationNo == e.inwellStationNo),
      //   list2 = q.filter((item) => item.stationNo == e.outwellStationNo);
      // console.log(list1, list2);
      // if (list1.length) {
      //   this.$set(
      //     this.form.attendance[index],
      //     "inStationItem",
      //     getMinObj(list1)
      //   );
      //   this.form.inStationItem = getMinObj(list1);
      // }
      // if (list2.length) {
      //   this.$set(
      //     this.form.attendance[index],
      //     "outStationItem",
      //     getMaxObj(list2)
      //   );
      //   this.form.outStationItem = getMaxObj(list2);
      // }
    },
    async getAllStation() {
      // const { data } = await api.getStationAll();
      // if (data.code == 200) {
      //   this.stationList = data.data;
      // }
    },
    async getShiftInfo(e) {
      // const { data } = await api.getShiftInfo(e);
      // if (data.code == 200) {
      //   this.shiftList = data.data;
      // }
    },

    handleRowChange(e, index) {
      this.currentIndex = index; //当前所选的考勤信息的索引
      console.log(index);
      console.log(e);
      this.showTrack = true;
      this.form.trackList = JSON.parse(JSON.stringify([originForm.track]));

      if (e.inStationItem || e.outStationItem) {
        this.form.inStationItem = e.inStationItem;
        this.form.outStationItem = e.outStationItem;
        e.inStationItem.dataTime = formatDate(
          this.form.inStationItem.dataTime,
          true
        );
        e.outStationItem.dataTime = formatDate(
          this.form.outStationItem.dataTime,
          true
        );
      } else {
        console.log("无数据");
        this.$set(
          this.form.attendance[index],
          "inStationItem",
          this.form.inStationItem
        );
        this.$set(
          this.form.attendance[index],
          "outStationItem",
          this.form.outStationItem
        );
      }

      // console.log(this.form.inStationItem.dataTime);
      // console.log(formatDate(this.form.inStationItem.dataTime, true));
      // console.log(this.form.outStationItem.dataTime);
      // this.form.inStationItem = {}; //originForm.track;
      // this.form.outStationItem = {}; //originForm.track;

      // this.form.inStationItem = JSON.parse(
      //   JSON.stringify(originForm.inStationItem)
      // );
      // this.form.outStationItem = JSON.parse(
      //   JSON.stringify(originForm.outStationItem)
      // );

      // this.form.inStationItem.stationNo = e.inwellStationNo;
      // this.form.outStationItem.stationNo = e.outwellStationNo;
      // this.form.inStationItem.dataTime = e.inwellTime;
      // this.form.outStationItem.dataTime = e.outwellTime;

      // this.form.inStationItem.no_del = e.no_del;
      // this.form.outStationItem.no_del = e.no_del;

      this.stationList.forEach((item) => {
        if (this.form.outStationItem.stationNo == item.stationNo) {
          this.form.outStationItem.mainStationHid = item.mainStationHid;
          this.form.outStationItem.stationName = item.stationName;
          this.form.outStationItem.tunnelNo = item.tunnelNo;
          this.form.outStationItem.tunnelName = item.tunnelName;
          this.form.outStationItem.tunnelName = item.tunnelLoc;
        }
        if (this.form.inStationItem.stationNo == item.stationNo) {
          this.form.inStationItem.mainStationHid = item.mainStationHid;
          this.form.inStationItem.stationName = item.stationName;
          this.form.inStationItem.tunnelNo = item.tunnelNo;
          this.form.inStationItem.tunnelName = item.tunnelName;
          this.form.inStationItem.tunnelName = item.tunnelLoc;
        }
      });
      // console.log(this.form);
      console.log("e.list", e.list);

      if (e && e.list && e.list.length) {
        e.list.forEach((item) => {
          // item.dataTime =
          //   this.form.date.split(" ") + " " + item.dataTime.split(" ")[1];
          item.stationDistance = item.stationDistance.toString();
          this.stationList.forEach((i0) => {
            if (i0.stationNo == item.stationNo)
              item.mainStationHid = i0.mainStationHid;
          });
        });
        if (!e.is_origin) {
          this.initListData(e, JSON.stringify(e.list), index);
        }
        let dataList = e.list;
        this.form.trackList = dataList;
      } else {
        if (e.is_origin) {
          this.$set(this.form.attendance[index], "list", [
            JSON.parse(JSON.stringify(originForm.track)),
          ]);
          this.form.trackList = this.form.attendance[index].list;
        }
        console.log("啥时候执行这个呢 ，--------------------------------");
        if (e.inwellTime && e.outwellTime) this.getTrackList(e, index);
      }

      // else if (e.is_history && !e.list) {
      //   this.getTrackList(e, index);
      // }
      // console.log(e);
      // is_new
      // if (e.inwellTime && e.outwellTime)
    },
    selectStation(e, index) {
      let d = this.stationList.filter((item) => item.stationNo == e);
      this.form.trackList[index].mainStationHid = d.length
        ? d[0].mainStationHid
        : "";

      console.log("pillll", d);
      this.form.trackList[index].stationName = d.length ? d[0].stationName : "";
      this.form.trackList[index].tunnelNo = d.length ? d[0].tunnelNo : "";
      this.form.trackList[index].tunnelName = d.length ? d[0].tunnelName : "";
      this.form.trackList[index].tunnelName = d.length ? d[0].tunnelLoc : "";
      // this.form.attendance[this.currentIndex].list = this.form.trackList;
      console.log(this.form.attendance[this.currentIndex]);
    },
    nextDay(e, type) {
      if (type == "copyDate") {
        if (!this.copyCardNo) return this.$Message.error("请先填写卡号");
        this[type] = getNextDate(this[type], e);
      } else {
        if (!this.form.cardNo) return this.$Message.error("请先填写卡号");
        this.showDel = true;
        this.currDel = {
          date: e,
          is_del: false,
        };
        this.modalTitle = "提示";
        this.modalText = "数据若有修改,请先保存,再进行查询操作";
      }
    },
    addInfo() {
      if (!this.form.cardNo) return this.$Message.error("请先填写卡号");
      console.log(JSON.parse(JSON.stringify(originForm.att)));
      this.form.attendance.push(JSON.parse(JSON.stringify(originForm.att)));
      console.log(this.form.attendance);
    },
    addTrack() {
      if (!this.form.cardNo) return this.$Message.error("请先填写卡号");
      console.log(this.currentIndex);
      this.form.trackList.push(JSON.parse(JSON.stringify(originForm.track)));
      // this.form.attendance[this.currentIndex].list.push(
      //   JSON.parse(JSON.stringify(originForm.track))
      // );
      // this.form.trackList = this.form.attendance[this.currentIndex].list;
      this.$set(
        this.form.attendance[this.currentIndex],
        "list",
        this.form.trackList
      );
    },
    /**
     * e：索引
     * type:当前删除的list
     */
    del(e, type) {
      if (this.form[type].length == 1 && e == 0) {
        // Object.keys(this.form[type][0]).forEach((key) => {
        //   this.form[type][0][key] = "";
        // });
        if (type == "attendance") {
          this.form.attendance = [JSON.parse(JSON.stringify(originForm.att))];

          this.form.inStationItem = JSON.parse(
            JSON.stringify(originForm.inStationItem)
          );
          this.form.outStationItem = JSON.parse(
            JSON.stringify(originForm.outStationItem)
          );
          // this.form.inStationItem = {};
          // this.form.outStationItem = {};
        } else {
          this.form.trackList = [JSON.parse(JSON.stringify(originForm.track))];
        }
      } else {
        this.showDel = true;
        this.currDel = {
          index: e,
          type: type,
          is_del: true,
        };
      }
    },
    deleteok() {
      if (this.currDel.is_del) {
        this.form[this.currDel.type].splice(this.currDel.index, 1);
        if (this.currDel.type == "attendance") {
          this.showTrack = false;
        }
      } else {
        this.form.date = getNextDate(this.form.date, this.currDel.date);
      }
      this.currDel = {};
      this.showDel = false;
    },
    /**
     * 复制一行
     * e:当前一行
     */
    copy(e, type) {
      if (!this.form.cardNo) {
        return this.$Message.error("请先填写卡号");
      } else {
        console.log(e);
        e.no_del = false;
        delete e._index;
        delete e._rowKey;
        if (e.id) delete e.id;
        if (e.is_history) delete e.is_history;
        if (e.list) {
          e.list.forEach((item) => {
            item.no_del = false;
          });
        }
        this.form[type].push(e);
        console.log(e.list);
        if (type == "trackList") {
          this.$set(
            this.form.attendance[this.currentIndex],
            "list",
            this.form[type]
          );
        }
      }
    },
    openModal() {
      if (!this.form.cardNo || !this.form.date)
        return this.$Message.error("请先填写卡号和日期");
      this.modal = true;
    },
    /**
     * 保存
     */
    saveData() {
      console.log(
        "提交的数据------------------------------------------",
        this.form.attendance
      );
      if (!this.form.cardNo) return this.$Message.error("请先填写卡号");
      this.$refs.Form.validate((valid) => {
        if (valid) {
          console.log("有效");
          let params = {};
          let keys = Object.keys(JSON.parse(JSON.stringify(originForm.att)));
          Object.keys(this.userInfo).forEach((key) => {
            if (keys.includes(key)) {
              params[key] = this.userInfo[key];
            }
          });
          params.objectNo = this.userInfo.userInfoCode;
          params.shiftDate = this.form.date;
          let newArr = this.form.attendance.map((item) => {
            return Object.assign(item, params);
          });
          this.form.attendance = newArr;
          this.saveAttence(JSON.stringify(newArr));
          if (this.showTrack) {
            this.saveTrack();
          }
        }
      });
    },
    // 新增考勤
    saveAttence(newArr) {
      let list = JSON.parse(newArr);
      list.forEach((item) => {
        item.inwellTime = formatDate(item.inwellTime, true);
        item.outwellTime = formatDate(item.outwellTime, true);
        item.shiftDate = formatDate(item.outwellTime);
        if (item.list) delete item.list;
        if (item.inStationItem) delete item.inwellStationNo;
        if (item.outStationItem) delete item.outStationItem;
      });
      console.log("考勤记录", list);

      // api
      //   .addAttendance(this.form.attendance)
      //   .then((res) => {
      //     console.log(res);
      //     if (res.data.code == 200) {
      //       this.$Message.success("操作成功！");
      //       this.search(1);
      //     } else {
      //       this.$Message.error("操作失败，请稍后重试！");
      //     }
      //   })
      //   .catch(() => {
      //     this.$Message.error("操作失败，请稍后重试！");
      //   });
    },
    // 新增轨迹
    saveTrack() {
      console.log("当前轨迹啊 哈哈哈重要的就是这个东西", this.form.attendance);
      let l = flatten(this.form.attendance.map((item) => item.list)).filter(
        (item) => item != undefined
      );

      let new_a = [];
      this.form.attendance.forEach((item) => {
        new_a.push(item.inStationItem, item.outStationItem);
      });
      console.log(new_a);
      let list = l.concat(new_a.filter((item) => item != undefined));
      let params = {
        objectNo: this.userInfo.userInfoCode,
        objectId: this.userInfo.userInfoId,
        cardNo: this.form.cardNo,
      };
      console.log(list);
      let newArr = list.map((item) => {
        return Object.assign(item, params);
      });
      newArr.forEach((item) => {
        item.dataTime = formatDate(item.dataTime, true);
        item.dataDate = formatDate(item.dataTime, true);
      });
      console.log(newArr);
      let t_list = newArr.filter((item) => item.dataDate);
      console.log(t_list);
      // api
      //   .addLocus(t_list)
      //   .then((res) => {
      //     console.log(res);
      //     if (res.data.code == 200) {
      //       console.log(res);
      //     } else {
      //       this.$Message.error("操作失败，请稍后重试！");
      //     }
      //   })
      //   .catch(() => {
      //     this.$Message.error("操作失败，请稍后重试！");
      //   });
    },
  },
  watch: {
    "form.trackList": {
      immediate: true,
      deep: true,
      handler: function (newVal) {
        if (newVal) {
          this.form.trackList = newVal;
          if (
            this.currentIndex != undefined &&
            this.form.attendance &&
            this.form.attendance[this.currentIndex]
          ) {
            this.$set(this.form.attendance[this.currentIndex], "list", []);
            this.$set(this.form.attendance[this.currentIndex], "list", newVal);
          }
        }
      },
    },
    "form.inStationItem": {
      immediate: true,
      deep: true,
      handler: function (newVal) {
        if (
          this.currentIndex != undefined &&
          this.form.attendance &&
          this.form.attendance[this.currentIndex]
        ) {
          this.$set(
            this.form.attendance[this.currentIndex],
            "inStationItem",
            {}
          );
          this.$set(
            this.form.attendance[this.currentIndex],
            "inStationItem",
            newVal
          );
        }
      },
    },
    "form.outStationItem": {
      immediate: true,
      deep: true,
      handler: function (newVal) {
        if (
          this.currentIndex != undefined &&
          this.form.attendance &&
          this.form.attendance[this.currentIndex]
        ) {
          this.$set(
            this.form.attendance[this.currentIndex],
            "outStationItem",
            {}
          );
          this.$set(
            this.form.attendance[this.currentIndex],
            "outStationItem",
            newVal
          );
        }
      },
    },
  },
};
</script>

<style scoped lang="less">
@import "./index.less";
</style>