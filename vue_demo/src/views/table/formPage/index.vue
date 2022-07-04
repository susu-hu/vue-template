<template>
  <div class="content">
    <h1 class="mb-20 t-l-c">测试工具</h1>
    <Row>
      <Form ref="Form" :model="form" :rules="rules">
        <Col span="24" class="flex-row mb-20">
        <FormItem label="卡号：" class="flex-row mb-0 mr-40" style="padding-left: 16px">
          <Input clearable v-model.trim="form.cardNo" type="text" placeholder="请输入卡号" style="width: 180px" />
        </FormItem>
        <FormItem label="日期：" class="flex-row mb-0 mr-40">
          <Date-picker confirm :transfer="true" clearable style="width: 180px" v-model="form.date" type="date" @on-change="changeFormDate" @on-open-change="openChangeDate" :options="dayOptions" placeholder="选择日期"></Date-picker>
        </FormItem>
        <Button type="primary" size="large" class="mr-20 act-btn" @click="search(1)">查询</Button>
        <Button type="primary" size="large" class="mr-20 act-btn" @click="nextDay(-1, 'form.date')">前一天</Button>
        <Button type="primary" size="large" class="mr-20 act-btn" @click="nextDay(1, 'form.date')">后一天</Button>
        <Button type="primary" size="large" class="mr-20 act-btn" @click="openModal">复制</Button>
        <Button type="primary" size="large" class="act-btn" @click="saveData">保存</Button>
        </Col>
        <Col span="24" style="margin-bottom: 10px">
        <Card>
          <div class="flex-row">
            <FormItem label="姓名：" class="flex-row mb-0 mr-40">
              <Input :disabled="true" v-model.trim="userInfo.cnName" type="text" placeholder="请输入姓名" style="width: 180px" />
            </FormItem>
            <FormItem label="部门：" class="flex-row mb-0 mr-40">
              <Input :disabled="true" v-model.trim="userInfo.deptName" type="text" placeholder="请输入部门" style="width: 180px" />
            </FormItem>
            <FormItem label="工号：" class="flex-row mb-0 mr-40">
              <Input :disabled="true" v-model.trim="userInfo.userInfoCode" type="text" placeholder="请输入工号" style="width: 180px" />
            </FormItem>
            <FormItem label="工种：" class="flex-row mb-0 mr-40">
              <Input :disabled="true" v-model.trim="userInfo.dutyName" type="text" placeholder="请输入工种" style="width: 180px" />
            </FormItem>
            <FormItem label="职务：" class="flex-row mb-0 mr-40">
              <Input :disabled="true" v-model.trim="userInfo.positionName" type="text" placeholder="请输入职务" style="width: 180px" />
            </FormItem>
            <FormItem label="班次：" class="flex-row mb-0 mr-40">
              <Input :disabled="true" v-model.trim="userInfo.shiftName" type="text" placeholder="请输入班次" style="width: 180px" />
            </FormItem>
          </div>
        </Card>
        </Col>
        <!-- 考勤 -->
        <Col span="24" style="margin-bottom: 10px; margin-top: 30px">
        <div class="flex-row mb-20">
          <h2 class="mr-20">考勤信息</h2>
          <Icon type="md-add-circle" size="30" color="#57A3F3" @click="addInfo" />
        </div>
        <Table style="border-bottom: 1px solid #dcdee2" :columns="columnAttendance" :data="form.attendance" stripe :row-class-name="rowClassName" border max-height="185" @on-row-click="handleRowChange" @on-row-dblclick="handleRowChange" highlight-row>
          <template slot="sort" slot-scope="{ index }">
            {{ index + 1 }}

          </template>
          <template slot="shiftTimeQuantumId" slot-scope="{ index }">
            <FormItem class="mb-0 td-ipt" :prop="`attendance.${index}.shiftTimeQuantumId`" :rules="rules.shiftTimeQuantumId" style="width: 220px">
              <Select :transfer="true" v-model="form.attendance[index].shiftTimeQuantumId" filterable clearable placeholder="请选择" :disabled="form.attendance[index].no_del" @on-change="(e) => changeShift(e, index)" @on-open-change="hasChange = true" label-in-value>
                <Option v-for="(item, index) in shiftList" :value="item.shiftTimeQuantumId" :key="item.shiftTimeQuantumId + `${index}`">{{ item.timeName }}</Option>
              </Select>
            </FormItem>
          </template>
          <template slot="inwellTime" slot-scope="{ index }">
            <FormItem style="width: 220px" class="mb-0 td-ipt" :prop="`attendance.${index}.inwellTime`" :rules="rules.inwellTime">
              <Date-picker format="yyyy-MM-dd HH:mm:ss" :options="dayOptions" :transfer="true" v-model="form.attendance[index].inwellTime" @on-change="(e) => changeWelTime(e, index, 'inwellTime')" type="datetime" placeholder="选择时间"></Date-picker>
            </FormItem>
          </template>
          <template slot="outwellTime" slot-scope="{ index }">
            <FormItem class="mb-0 td-ipt" style="width: 220px" :prop="`attendance.${index}.outwellTime`" :rules="rules.outwellTime">
              <Date-picker :options="dayOptions" format="yyyy-MM-dd HH:mm:ss" :transfer="true" v-model="form.attendance[index].outwellTime" @on-change="(e) => changeWelTime(e, index, 'outwellTime')" type="datetime" placeholder="选择时间"></Date-picker>
            </FormItem>
          </template>
          <template slot="inwellStationNo" slot-scope="{ index }">
            <FormItem style="width: 220px" class="mb-0 td-ipt" :prop="`attendance.${index}.inwellStationNo`" :rules="rules.inwellStationNo">
              <Select :transfer="true" v-model="form.attendance[index].inwellStationNo" filterable clearable placeholder="请选择基站" :disabled="form.attendance[index].no_del" label-in-value @on-change="
                    (e) => changeStation(e, index, 'inwellStationName')
                  " @on-open-change="hasChange = true">
                <Option v-for="(item, index) in stationList" :value="item.stationNo" :key="item.stationNo + `${index}`">{{ item.stationName }}</Option>
              </Select>
            </FormItem>
          </template>
          <template slot="outwellStationNo" slot-scope="{ index }">
            <FormItem style="width: 220px" class="mb-0 td-ipt" :prop="`attendance.${index}.outwellStationNo`" :rules="rules.outwellStationNo">
              <Select :transfer="true" v-model="form.attendance[index].outwellStationNo" filterable clearable placeholder="请选择基站" :disabled="form.attendance[index].no_del" label-in-value @on-change="
                    (e) => changeStation(e, index, 'outwellStationName')
                  " @on-open-change="hasChange = true">
                <Option v-for="(item, index) in stationList" :value="item.stationNo" :key="item.stationNo + `${index}`">{{ item.stationName }}</Option>
              </Select>
            </FormItem>
          </template>
          <template slot="action" slot-scope="{ row, index }">
            <a v-if="!row.no_del" href="javascript:;" style="color: #d55516" @click.stop="del(index, 'attendance')" class="mr-40">删除</a>
            <a href="javascript:;" style="color: #57a3f3" @click.stop="copy(row, 'attendance')">复制</a>
          </template>
        </Table>
        </Col>
        <!-- 轨迹 -->
        <Col span="24" style="margin-top: 30px" v-if="showTrack">
        <div class="flex-row mb-20">
          <h2 class="mr-20">轨迹信息</h2>
          <Icon type="md-add-circle" size="30" color="#57A3F3" @click="addTrack" />
        </div>
        <div class="flex-row mb-20">
          <FormItem label="入井基站：" class="flex-row mb-0 mr-40">
            <Select :disabled="true" style="width: 220px" :transfer="true" v-model="form.inStationItem.stationNo" placeholder="请选择基站">
              <Option v-for="(item, index) in stationList" :value="item.stationNo" :key="item.stationNo + `${index}`">{{ item.stationName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="方向：" :rules="rules.stationDirection" prop="inStationItem.stationDirection" class="flex-row mb-0 mr-40">
            <Select v-model="form.inStationItem.stationDirection" placeholder="请选择方向" style="width: 220px" :transfer="true" filterable clearable @on-open-change="hasChange = true">
              <!--  :disabled="form.inStationItem.no_del" -->
              <Option :value="1">左</Option>
              <Option :value="2">右</Option>
            </Select>
          </FormItem>
          <FormItem label="距离(米)：" class="flex-row mb-0 mr-40" :rules="rules.stationDistance" prop="inStationItem.stationDistance">
            <!--  :disabled="form.inStationItem.no_del" -->
            <Input @on-change="hasChange = true" v-model.trim="form.inStationItem.stationDistance" type="text" placeholder="请输入距离" style="width: 220px" />
          </FormItem>
          <FormItem label="时间：" class="flex-row mb-0 mr-40">
            <Date-picker style="width: 220px" :options="dayOptions" :disabled="true" :transfer="true" v-model="form.inStationItem.dataTime" type="datetime" placeholder="选择时间" @on-change="hasChange = true" format="yyyy-MM-dd HH:mm:ss"></Date-picker>
          </FormItem>
        </div>
        <!-- <vxe-table
          style="margin-bottom: 20px; border-bottom: 1px solid #dcdee2"
          resizable
          :data="form.trackList"
          show-overflow
          stripe
          border
          :loading="false"
          align="center"
          round
          max-height="285"
          :scroll-x="{ gt: 10 }"
          :scroll-y="{ gt: 10 }"
          :row-config="{ isHover: true }"
        >
          <vxe-column
            type="seq"
            width="100"
            fixed="left"
          > </vxe-column>
          <vxe-column
            field="stationDistance"
            title="参数1"
          >
            <template #default="{ row }">
              <Input
                style="width: 220px"
                clearable
                v-model.trim="row.stationDistance"
                type="text"
                placeholder="请输入距离"
              />
            </template>
          </vxe-column>
          <vxe-column
            field="dataTime"
            title="时间"
          >
            <template #default="{ row }">
              <Date-picker
                style="width: 220px"
                :transfer="true"
                v-model="row.dataTime"
                type="datetime"
                placeholder="选择时间"
                format="yyyy-MM-dd HH:mm:ss"
              ></Date-picker>
            </template>
          </vxe-column>
          <vxe-column
            field="stationNo"
            title="距离"
          >
            <template #default="{ row }">
              <Select
                style="width: 220px"
                :transfer="true"
                v-model="row.stationNo"
                filterable
                clearable
                placeholder="请选择基站"
              >
                <Option
                  v-for="(item, index) in stationList"
                  :value="item.stationNo"
                  :key="item.stationNo + `${index}`"
                >{{ item.stationName }}</Option>
              </Select></template>
          </vxe-column>
          <vxe-column
            field="stationDirection"
            title="距离"
          >
            <template #default="{ row }">
              <Select
                style="width: 220px"
                :transfer="true"
                v-model="row.stationDirection"
                filterable
                clearable
                placeholder="请选择方向"
              >
                <Option :value="1">左</Option>
                <Option :value="2">右</Option>
              </Select>
            </template>
          </vxe-column>
        </vxe-table> -->
        <!-- <Scroll :on-reach-bottom="handleReachBottom"> -->
        <!--     :loading="loading" -->
        <Table style="margin-bottom: 20px; border-bottom: 1px solid #dcdee2" :columns="columnTrack" :data="form.trackList" stripe border :row-class-name="rowClassNameIn" @on-row-click="handleRowChangeTrack" @on-row-dblclick="handleRowChangeTrack" highlight-row max-height="285">
          <template slot="sort" slot-scope="{ index }">
            <span>{{
                30 * (currentPage- 1) + index + 1
              }}</span>
            <!-- {{ index + 1 }} -->
          </template>
          <template slot="stationNo" slot-scope="{ index }">
            <FormItem class="mb-0 td-ipt" :prop="`trackList.${index}.stationNo`" :rules="rules.inwellStationNo">
              <Select :transfer="true" v-model="form.trackList[index].stationNo" filterable clearable placeholder="请选择基站" @on-change="(e) => selectStation(e, index)" :disabled="form.trackList[index].no_del" @on-open-change="hasChange = true">
                <Option v-for="(item, index) in stationList" :value="item.stationNo" :key="item.stationNo + `${index}`">{{ item.stationName }}</Option>
              </Select>
            </FormItem>
          </template>
          <template slot="mainStationHid" slot-scope="{ index }">
            {{ form.trackList[index].mainStationHid }}
          </template>
          <template slot="stationDirection" slot-scope="{ index }">
            <FormItem class="mb-0 td-ipt" :prop="`trackList.${index}.stationDirection`" :rules="rules.stationDirection">
              <Select @on-open-change="hasChange = true" :transfer="true" v-model="form.trackList[index].stationDirection" filterable clearable placeholder="请选择方向" :disabled="form.trackList[index].no_del">
                <Option :value="1">左</Option>
                <Option :value="2">右</Option>
              </Select>
            </FormItem>
          </template>
          <template slot="stationDistance" slot-scope="{ index }">
            <FormItem class="mb-0 td-ipt" :prop="`trackList.${index}.stationDistance`" :rules="rules.stationDistance">
              <Input @on-change="hasChange = true" clearable v-model.trim="form.trackList[index].stationDistance" type="text" placeholder="请输入距离" :disabled="form.trackList[index].no_del" />
            </FormItem>
          </template>
          <template slot="dataTime" slot-scope="{ index }">
            <FormItem class="mb-0 td-ipt" :prop="`trackList.${index}.dataTime`" :rules="rules.dataTime">
              <Date-picker :transfer="true" :options="dayOptions" v-model="form.trackList[index].dataTime" @on-change="
                    (form.trackList[index].dataTime = $event),
                      (hasChange = true)
                  " type="datetime" placeholder="选择时间" :disabled="form.trackList[index].no_del" format="yyyy-MM-dd HH:mm:ss"></Date-picker>
            </FormItem>
          </template>
          <template slot="action" slot-scope="{ row, index }">
            <a v-if="!row.no_del" href="javascript:;" style="color: #d55516" @click.stop="del(index, 'trackList')" class="mr-40">删除</a>
            <a href="javascript:;" style="color: #57a3f3" @click.stop="copy(row, 'trackList')">复制</a>
          </template>
        </Table>
        <!-- </Scroll> -->
        <div>
          <Page class="public-page" :total="currentTotal" :current.sync="currentPage" :page-size="30" :show-sizer="false" show-total prev-text="上一页" next-text="下一页" :show-elevator="false" @on-change="(val) => pageNumChange(val)" />
        </div>

        <div class="flex-row">
          <FormItem label="出井基站：" class="flex-row mb-0 mr-40">
            <Select :disabled="true" style="width: 220px" :transfer="true" v-model="form.outStationItem.stationNo" placeholder="请选择基站">
              <Option v-for="(item, index) in stationList" :value="item.stationNo" :key="item.stationNo + `${index}`">{{ item.stationName }}</Option>
            </Select>
          </FormItem>
          <FormItem label="方向：" class="flex-row mb-0 mr-40" :rules="rules.stationDirection" prop="outStationItem.stationDirection">
            <Select v-model="form.outStationItem.stationDirection" placeholder="请选择方向" style="width: 220px" :transfer="true" filterable clearable @on-open-change="hasChange = true">
              <!--  :disabled="form.outStationItem.no_del" -->
              <Option :value="1">左</Option>
              <Option :value="2">右</Option>
            </Select>
          </FormItem>
          <FormItem label="距离(米)：" class="flex-row mb-0 mr-40" :rules="rules.stationDistance" prop="outStationItem.stationDistance">
            <Input @on-change="hasChange = true" v-model.trim="form.outStationItem.stationDistance" type="text" placeholder="请输入距离" style="width: 220px" />
            <!-- :disabled="form.outStationItem.no_del" -->
          </FormItem>
          <FormItem label="时间：" class="flex-row mb-0 mr-40">
            <Date-picker style="width: 220px" :options="dayOptions" :disabled="true" :transfer="true" v-model="form.outStationItem.dataTime" @on-change="
                  (form.outStationItem.dataTime = $event), (hasChange = true)
                " type="datetime" placeholder="选择时间" format="yyyy-MM-dd HH:mm:ss"></Date-picker>
          </FormItem>
        </div>
        </Col>
      </Form>
    </Row>
    <Modal v-model="modal" title="复制考勤及轨迹" width="950" :mask-closable="false" draggable>
      <Form style="max-height: 500px; overflow-y: auto; overflow-x: hidden">
        <Col span="24" class="flex-row mb-20">
        <FormItem label="卡号：" class="flex-row mb-0 mr-40">
          <Input clearable v-model.trim="copyCardNo" type="text" placeholder="请输入卡号" style="width: 180px" />
        </FormItem>
        <FormItem label="日期：" class="flex-row mb-0 mr-40">
          <Date-picker :transfer="true" :options="dayOptions" clearable style="width: 180px" v-model="copyDate" type="date" @on-change="copyDate = $event" placeholder="选择日期"></Date-picker>
        </FormItem>
        <Button type="primary" size="large" class="mr-20 act-btn" @click="search(2)">查询</Button>
        <Button type="primary" size="large" class="mr-20 act-btn" @click="nextDay(-1, 'copyDate')">前一天</Button>
        <Button type="primary" size="large" class="mr-20 act-btn" @click="nextDay(1, 'copyDate')">后一天</Button>
        </Col>
        <Col span="24">
        <Table class="mb-20" :columns="columnsCopy" :data="copyData" highlight-row border @on-expand="onExpand" @on-selection-change="selectionChange">
          <template slot="index" slot-scope="{ index }">
            {{ index + 1 }}
          </template>
        </Table>
        </Col>
      </Form>
      <div slot="footer">
        <Button size="large" long @click="modal = false" class="act-btn cancel-btn">取消</Button>
        <Button type="primary" size="large" long @click="submit" class="act-btn">确定</Button>
      </div>
    </Modal>
    <Modal v-model="showDel" :title="modalTip == 0 ? '删除' : '提示'" class-name="vertical-center-modal" :closable="false" :mask-closable="false" :width="400">
      <p class="tipsInfo">
        {{ modalTip == 0 ? "确认删除选中的数据?" : "数据有更新，是否离开?" }}
      </p>
      <div slot="footer">
        <Button class="submit" icon="submit" @click="deleteok">{{
          modalTip == 0 ? "确 认" : "是"
        }}</Button>
        <Button class="cancel" icon="cancel" @click="cancelModal">{{
          modalTip == 0 ? "取 消" : "否"
        }}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
/* eslint-disable */
import {
  getMinObj,
  getMaxObj,
  getNextDate,
  formatDate,
  flatten,
} from "@/libs/tools.js";
import columns from "./columns.js";
import { initForm, ruleValidate, originForm } from "./formRule";
export default {
  name: "trackAssistant",
  data() {
    return {
      data: [
        {
          parentId: -1,
          name: "公司",
          id: 0,
          children: [
            {
              parentId: 0,
              name: "信息控制中心",
              id: 1,
              children: [
                {
                  parentId: 1,
                  name: "0002",
                  id: 70,
                  children: null,
                },
              ],
            },
            {
              parentId: 0,
              name: "企管审计部",
              id: 2,
              children: null,
            },
            {
              parentId: 0,
              name: "人力资源部789",
              id: 3,
              children: null,
            },
            {
              parentId: 0,
              name: "生产服务部",
              id: 4,
              children: null,
            },
            {
              parentId: 0,
              name: "生产技术部",
              id: 5,
              children: null,
            },
            {
              parentId: 0,
              name: "生产调度室",
              id: 6,
              children: null,
            },
            {
              parentId: 0,
              name: "生产准备队",
              id: 7,
              children: null,
            },
            {
              parentId: 0,
              name: "生活服务中心",
              id: 8,
              children: null,
            },
            {
              parentId: 0,
              name: "生态环保部",
              id: 9,
              children: null,
            },
            {
              parentId: 0,
              name: "通修队",
              id: 10,
              children: [
                {
                  parentId: 10,
                  name: "通修队测试125",
                  id: 72,
                  children: [
                    {
                      parentId: 72,
                      name: "通修队126",
                      id: 73,
                      children: null,
                    },
                  ],
                },
              ],
            },
            {
              parentId: 0,
              name: "物资管理部",
              id: 11,
              children: null,
            },
            {
              parentId: 0,
              name: "销售中心",
              id: 12,
              children: null,
            },
            {
              parentId: 0,
              name: "综采一队",
              id: 13,
              children: null,
            },
            {
              parentId: 0,
              name: "综采二队",
              id: 14,
              children: null,
            },
            {
              parentId: 0,
              name: "综合办公室",
              id: 15,
              children: null,
            },
            {
              parentId: 0,
              name: "安全监察部",
              id: 16,
              children: null,
            },
            {
              parentId: 0,
              name: "安装三队一分队",
              id: 17,
              children: null,
            },
            {
              parentId: 0,
              name: "安装三队二分队",
              id: 18,
              children: null,
            },
            {
              parentId: 0,
              name: "安装三队三分队",
              id: 19,
              children: null,
            },
            {
              parentId: 0,
              name: "安装三队四分队",
              id: 20,
              children: null,
            },
            {
              parentId: 0,
              name: "南京北路测试",
              id: 21,
              children: null,
            },
            {
              parentId: 0,
              name: "财务资产部",
              id: 22,
              children: null,
            },
            {
              parentId: 0,
              name: "党委工作部",
              id: 23,
              children: null,
            },
            {
              parentId: 0,
              name: "地测技术部",
              id: 25,
              children: null,
            },
            {
              parentId: 0,
              name: "对外协调办公室",
              id: 26,
              children: null,
            },
            {
              parentId: 0,
              name: "辅助运输队22",
              id: 27,
              children: null,
            },
            {
              parentId: 0,
              name: "工会",
              id: 28,
              children: null,
            },
            {
              parentId: 0,
              name: "规划部",
              id: 29,
              children: null,
            },
            {
              parentId: 0,
              name: "机电队",
              id: 30,
              children: null,
            },
            {
              parentId: 0,
              name: "机电技术部",
              id: 31,
              children: null,
            },
            {
              parentId: 0,
              name: "机修车间",
              id: 32,
              children: null,
            },
            {
              parentId: 0,
              name: "机运队",
              id: 33,
              children: null,
            },
            {
              parentId: 0,
              name: "纪检监察室",
              id: 34,
              children: null,
            },
            {
              parentId: 0,
              name: "救护队",
              id: 35,
              children: null,
            },
            {
              parentId: 0,
              name: "掘进一队",
              id: 36,
              children: null,
            },
            {
              parentId: 0,
              name: "掘进二队",
              id: 37,
              children: null,
            },
            {
              parentId: 0,
              name: "掘进三队",
              id: 38,
              children: null,
            },
            {
              parentId: 0,
              name: "掘进五队",
              id: 39,
              children: null,
            },
            {
              parentId: 0,
              name: "安装三队五分队",
              id: 43,
              children: null,
            },
            {
              parentId: 0,
              name: "搬家中心",
              id: 47,
              children: null,
            },
            {
              parentId: 0,
              name: "梅雄测试部",
              id: 48,
              children: null,
            },
            {
              parentId: 0,
              name: "软件开发部",
              id: 53,
              children: null,
            },
            {
              parentId: 0,
              name: "测试部门2",
              id: 54,
              children: [
                {
                  parentId: 54,
                  name: "fsdf",
                  id: 56,
                  children: null,
                },
                {
                  parentId: 54,
                  name: "dg",
                  id: 57,
                  children: null,
                },
                {
                  parentId: 54,
                  name: "sdf",
                  id: 58,
                  children: null,
                },
              ],
            },
            {
              parentId: 0,
              name: "石裕泽强测试的部们",
              id: 63,
              children: null,
            },
            {
              parentId: 0,
              name: "测00000112312",
              id: 64,
              children: null,
            },
            {
              parentId: 0,
              name: "测试部门202214",
              id: 65,
              children: null,
            },
            {
              parentId: 0,
              name: "参数111",
              id: 66,
              children: null,
            },
            {
              parentId: 0,
              name: "123",
              id: 67,
              children: null,
            },
          ],
        },
      ],
      list: [
        {
          horizonId: "", //uuid(新生成)
          horizonName: "本部门", //横向条件名称
          tableName: "bw_department", //表名
          fieldName: "dept_id", //字段名
          meaning: "CUR_DEPT", //条件含义
          fieldUrl: "", //存放多选时候的树形数据url
        },
        {
          horizonId: "",
          horizonName: "本部门及下属部门",
          tableName: "bw_department",
          fieldName: "dept_id",
          meaning: "CUR_SUB_DEPT",
          fieldUrl: "",
        },
        {
          horizonId: "",
          horizonName: "指定部门",
          tableName: "bw_department",
          fieldName: "dept_id",
          meaning: "SEL_DEPT",
          fieldUrl: "/admin/department/data-permission-tree",
        },
        {
          horizonId: "",
          horizonName: "本人",
          tableName: "MYSELF",
          fieldName: "bw_user",
          meaning: "user_id",
          fieldUrl: "",
        },
        {
          horizonId: "",
          horizonName: "指定用户",
          tableName: "SEL_USER",
          fieldName: "bw_user",
          meaning: "user_id",
          fieldUrl: "/admin/user/data-permission-tree",
        },
      ],
      currentPage: 1, //页码
      currentTotal: 0, //总页数
      modalTip: 0,
      dayOptions: {
        // disabledDate: (date) => {
        //   return date >= Date.now();
        // },
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
      currTrackIndex: "", //当前轨迹点击的位置
      historyData: [], //历史考勤
      hasChange: false, //监听是否有变动
      odlDate: "", //数据改变之前的日期
      page: 1,
    };
  },
  created() {
    this.getAllStation();
    this.historyData = JSON.stringify(this.form.attendance);

    // this.getTableData();
  },
  methods: {
    pageNumChange(page) {
      console.log(page, this.currentIndex);
      this.currentPage = page;
      this.form.attendance[this.currentIndex].page = page;
      this.getTrackList("", this.currentIndex);
    },
    handleReachBottom(e) {
      console.log("触底了哦");
      // this.page += 1;
      // this.getTrackList("", this.currentIndex);
    },
    // async getTableData() {
    //   const { code, data, total } = await this.$api.tList(
    //     { page: 1, pageSize: 100 },
    //     false,
    //     "加载中"
    //   );
    //   if (code == 200) {
    //     this.form.trackList = data;
    //   }
    // },
    rowClassName(row, index) {
      return index === this.currentIndex ? "table-select-row" : "";
    },
    rowClassNameIn(row, index) {
      return index === this.currTrackIndex ? "table-select-row" : "";
    },
    changeFormDate(e) {
      this.form.date = e;
    },
    openChangeDate(e) {
      if (!e) {
        if (this.hasChange) {
          this.modalTip = 1;
          this.showDel = true;
          let date = "";
          if (this.oldDate) {
            date = formatDate(JSON.parse(this.oldDate), true);
          }
          this.currDel = {
            is_form_date: date,
            is_del: false,
            is_date: true,
          };
        } else {
          this.reset();
        }
      }
    },
    changeWelTime(e, index, type) {
      this.hasChange = true;
      this.form.attendance[index][type] = e;
      if (type == "inwellTime") {
        this.timeValid(e, "oriInStationItem", "inStationItem", "unshift");
        // if (
        //   this.form.attendance[this.currentIndex].oriInStationItem &&
        //   !this.form.attendance[this.currentIndex].is_copy_his
        // ) {
        //   let oldTime = JSON.parse(
        //       this.form.attendance[this.currentIndex].oriInStationItem
        //     ),
        //     orDateTime = formatDate(oldTime.dataTime, true);
        //   if (e < orDateTime) {
        //     this.form.attendance[
        //       this.currentIndex
        //     ].inStationItem.no_del = false;
        //     let len = this.form.attendance[this.currentIndex].list.filter(
        //       (item) => {
        //         return (
        //           item.dataTime == oldTime.dataTime &&
        //           item.stationNo == oldTime.stationNo
        //         );
        //       }
        //     ).length;
        //     if (len == 0) {
        //       this.form.attendance[this.currentIndex].list.unshift(oldTime);
        //     }
        //   }
        // }
        this.$set(this.form.inStationItem, "dataTime", e);
      } else {
        this.timeValid(e, "oriOutStationItem", "outStationItem", "push");
        // if (
        //   this.form.attendance[this.currentIndex].oriOutStationItem &&
        //   !this.form.attendance[this.currentIndex].is_copy_his
        // ) {
        //   let oldTime = JSON.parse(
        //       this.form.attendance[this.currentIndex].oriOutStationItem
        //     ),
        //     orDateTime = formatDate(oldTime.dataTime, true);
        //   if (e > orDateTime) {
        //     this.form.attendance[
        //       this.currentIndex
        //     ].outStationItem.no_del = false;
        //     let len = this.form.attendance[this.currentIndex].list.filter(
        //       (item) => {
        //         return (
        //           item.dataTime == oldTime.dataTime &&
        //           item.stationNo == oldTime.stationNo
        //         );
        //       }
        //     ).length;
        //     if (len == 0) {
        //       this.form.attendance[this.currentIndex].list.push(oldTime);
        //     }
        //   }
        // }
        this.$set(this.form.outStationItem, "dataTime", e);
      }
    },
    /**
     * 修改历史轨迹数据回显
     * @param {*} e
     * @param {*} oriType
     * @param {*} type
     * @param {*} action
     */
    timeValid(e, oriType, type, action) {
      if (
        this.form.attendance[this.currentIndex][oriType] &&
        !this.form.attendance[this.currentIndex].is_copy_his
      ) {
        let oldTime = JSON.parse(
            this.form.attendance[this.currentIndex][oriType]
          ),
          orDateTime = formatDate(oldTime.dataTime, true);
        if (oriType == "oriInStationItem") {
          if (e < orDateTime) {
            this.setTime(type, action, oldTime);
          }
        } else {
          if (e > orDateTime) {
            this.setTime(type, action, oldTime);
          }
        }
      }
    },
    /**
     * 只添加一条数据
     * @param {*} type
     * @param {*} action
     * @param {*} oldTime
     */
    setTime(type, action, oldTime) {
      this.form.attendance[this.currentIndex][type].no_del = false;
      let len = this.form.attendance[this.currentIndex].list.filter((item) => {
        return (
          formatDate(item.dataTime, true) ==
            formatDate(oldTime.dataTime, true) &&
          item.stationNo == oldTime.stationNo
        );
      }).length;
      if (len == 0) {
        this.form.attendance[this.currentIndex].list[action](oldTime);
      }
    },
    changeStation(e, index, type) {
      this.form.attendance[index][type] = e && e.label;
      if (type == "inwellStationName") {
        this.$set(this.form.inStationItem, "stationNo", e ? e.value : "");
      } else {
        this.$set(this.form.outStationItem, "stationNo", e ? e.value : "");
      }
    },
    changeShift(e, index) {
      this.form.attendance[index].shiftTimeQuantumName = e && e.label;
    },
    selectionChange(e) {
      this.selectHistory = e;
    },
    submit() {
      if (!this.selectHistory.length) return this.$Message.error("您尚未选择");
      this.hasChange = true;
      this.modal = false;
      let newData = JSON.parse(JSON.stringify(this.selectHistory));
      newData.forEach((item) => {
        item.inwellTime =
          formatDate(this.form.date).split(" ") +
          " " +
          formatDate(item.inwellTime, true).split(" ")[1];
        item.outwellTime =
          formatDate(this.form.date).split(" ") +
          " " +
          formatDate(item.outwellTime, true).split(" ")[1];
        item.list.forEach((i0) => {
          i0.dataTime =
            formatDate(this.form.date).split(" ") +
            " " +
            formatDate(i0.dataTime, true).split(" ")[1];
        });
      });
      this.form.attendance = this.form.attendance.concat(newData);
    },
    onExpand(e) {},
    reset() {
      this.hasChange = false;
      this.$refs.Form.resetFields();
      this.form.attendance = JSON.parse(JSON.stringify([originForm.att]));
      this.historyData = JSON.stringify(this.form.attendance);
      this.form.trackList = JSON.parse(JSON.stringify([originForm.track]));
      this.form.inStationItem = JSON.parse(
        JSON.stringify(originForm.inStationItem)
      );
      this.form.outStationItem = JSON.parse(
        JSON.stringify(originForm.outStationItem)
      );
      this.showTrack = false;
      this.currentIndex = "";
      this.currTrackIndex = "";
    },
    async search(e) {
      if (e == 1) {
        // if (!this.form.cardNo || !this.form.date)
        //   return this.$Message.error(" 请填写卡号和日期");
        this.reset();
        this.getUserInfo();
        let l = JSON.parse(JSON.stringify(this.form.date));
        this.oldDate = JSON.stringify(l);
        this.hasChange = false;
      } else {
        if (!this.copyCardNo) return this.$Message.error("请先填写员工卡号");
        if (!this.copyDate) return this.$Message.error("请选择日期");
        // const { data } = await api.getUserInfo(this.copyCardNo);
        // if (data.code == 200 && data.data) {
        //   this.copyNo = data.data.userInfoCode;
        this.getInwellTimeStatics(this.copyCardNo, this.copyDate, 2);
        // } else {
        //   this.$Message.error("查询的员工不存在！");
        // }
      }
    },
    async getUserInfo() {
      // const { data } = await api.getUserInfo(this.form.cardNo);
      let data = {
        code: 200,
        data: {},
      };
      if (data.code == 200) {
        if (data.data) {
          this.userInfo = data.data;
          this.getShiftInfo(data.data.shiftId);
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
      //     cardCode: e1,
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
            shiftTimeQuantumId: "1",
            inwellStationNo: "3",
            outwellStationNo: "2",
          },
          {
            inwellTime: "2022-06-15 09:09:09",
            outwellTime: "2022-06-15 12:12:12",
            shiftTimeQuantumId: "2",
            inwellStationNo: "2",
            outwellStationNo: "3",
          },
        ],
      };
      if (data.code == 200) {
        if (type == 1) {
          if (data.data.length > 0) {
            this.form.attendance = data.data;
            this.form.attendance.forEach((item) => {
              item.no_del = true;
              item.is_history = true;
              item.page = 1;
            });
            this.historyData = JSON.stringify(data.data);
          } else {
            this.$Message.info("暂无考勤信息");
            this.form.attendance = JSON.parse(JSON.stringify([originForm.att]));
            this.historyData = JSON.stringify(
              JSON.parse(JSON.stringify([originForm.att]))
            );
          }
        } else {
          new Promise((resolve) => {
            setTimeout(() => {
              let res = { total: 50000 };
              let data = [];
              for (let i = 0; i < res.total; i++) {
                data.push({
                  id: i,
                  stationDistance: 111,
                  dataTime: "2022-06-15 07:07:07",
                  stationDirection: 1,
                  stationNo: "1",
                });
              }
              resolve(data);
            }, 2000);
            console.log("模拟数据", data);
          }).then((res) => {
            this.copyData = [
              {
                is_copy_his: true,
                inwellTime: "2022-06-15 05:05:05",
                outwellTime: "2022-06-15 08:08:08",
                shiftTimeQuantumId: "1",
                inwellStationNo: "1",
                outwellStationNo: "2",
                list: [
                  // {
                  //   stationDistance: 111,
                  //   dataTime: "2022-06-15 07:07:07",
                  //   stationDirection: 1,
                  // },
                  // {
                  //   stationDistance: 222,
                  //   dataTime: "2022-06-15 06:06:06",
                  //   stationDirection: 1,
                  // },
                  // // 出入基站
                  // {
                  //   stationDistance: 888,
                  //   dataTime: "2022-06-15 05:05:05",
                  //   stationNo: 1,
                  //   stationDirection: 1,
                  // },
                  // {
                  //   stationDistance: 999,
                  //   dataTime: "2022-06-15 08:08:08",
                  //   stationNo: 2,
                  //   stationDirection: 1,
                  // },
                ],
              },
              {
                is_copy_his: true,
                inwellTime: "2022-06-15 09:09:09",
                outwellTime: "2022-06-15 12:12:12",
                shiftTimeQuantumId: "2",
                inwellStationNo: "2",
                outwellStationNo: "3",
                list: [
                  // {
                  //   stationDistance: 999,
                  //   dataTime: "2022-06-15 10:07:07",
                  //   stationDirection: 1,
                  // },
                  // {
                  //   stationDistance: 999,
                  //   dataTime: "2022-06-15 11:06:06",
                  //   stationDirection: 1,
                  // },
                  // // 出入基站
                  // {
                  //   stationDistance: 999,
                  //   dataTime: "2022-06-15 09:09:09",
                  //   stationNo: 2,
                  //   stationDirection: 1,
                  // },
                  // {
                  //   stationDistance: 999,
                  //   dataTime: "2022-06-15 12:12:12",
                  //   stationNo: 3,
                  //   stationDirection: 1,
                  // },
                ],
              },
            ];
            this.copyData.forEach((item) => {
              item.list = res;
            });
          });
        }
      }
    },

    async getTrackList(e, index) {
      console.log("zhix l ni ");
      // if (!this.userInfo.userInfoCode)
      //   return this.$Message.error("员工信息不能为空,请先查询该员工信息");
      // const { data } = await api
      //   .getAuxiliaryInfo({
      //     beginTime: e.inwellTime,
      //     endTime: e.outwellTime,
      //     empList: [{ empNo: this.userInfo.userInfoCode }],
      //   })
      //   .catch(() => {
      //     this.$Message.error("获取轨迹失败，请稍后再试");
      //     this.initFormData(index, e);
      //   });

      const { code, data, total } = await this.$api.tList(
        { page: this.currentPage, pageSize: 30 },
        false,
        "加载中"
      );

      let list = data;

      if (code == 200) {
        let data = {
          code: 200,
          data: list,
          total: total,
        };
        console.log(data);
        if (data.code == 200) {
          this.currentTotal = data.total;
          // console.log("inex", index);
          // console.log("1111", this.form.attendance[index]);
          // let oldList = this.page === 1 ? [] : this.form.attendance[index].list;
          // console.log("1111", this.form.attendance[index].list);
          if (data.data.length > 0) {
            let dataList = data.data;
            dataList.forEach((i0) => {
              i0.stationDistance = i0.stationDistance.toString();
              // i0.dataTime = formatDate(i0.dataTime, true);
              i0.no_del = true;
              // if (e.is_copy) {
              //   i0.no_del = false;
              // }
              // this.stationList.forEach((item) => {
              //   if (i0.stationNo == item.stationNo) {
              //     i0.mainStationHid = item.mainStationHid;
              //   }
              // });
            });
            console.log(dataList);
            // console.log(this.form.attendance[index].list);

            // let list111 = oldList.concat(dataList);
            // this.form.attendance[index].list
            //   ? this.form.attendance[index].list.concat(dataList)
            //   : dataList;
            // this.form.attendance[index].list = list;

            this.$set(this.form.attendance[index], "list", dataList);
            // console.log(index);

            // this.form.attendance[index].list = dataList;

            // this.$set(this.form, "trackList", dataList);

            // this.$set(this.form.attendance[index], "list", dataList);

            this.form.trackList = this.form.attendance[index].list; //dataList;

            // console.log(this.form.trackList);
            // 历史数据
            // if (!e.is_origin) {
            //   this.initListData(e, JSON.stringify(dataList), index);
            // }
          } else {
            this.$set(this.form.attendance[index], "list", [
              JSON.parse(JSON.stringify(originForm.track)),
            ]);
            this.form.trackList = this.form.attendance[index].list;
            this.initFormData(index, e);
          }
        } else {
          this.$Message.error("获取轨迹失败，请稍后再试");
          this.initFormData(index, e);
        }
      }
    },
    initFormData(index, e) {
      this.$set(
        this.form.attendance[index],
        "inStationItem",
        JSON.parse(JSON.stringify(originForm.inStationItem))
      );
      this.$set(
        this.form.attendance[index],
        "outStationItem",
        JSON.parse(JSON.stringify(originForm.outStationItem))
      );
      this.form.attendance[index].inStationItem.dataTime = e.inwellTime;
      this.form.attendance[index].outStationItem.dataTime = e.outwellTime;
      this.form.attendance[index].inStationItem.stationNo = e.inwellStationNo;
      this.form.attendance[index].outStationItem.stationNo = e.outwellStationNo;
      this.form.inStationItem = this.form.attendance[index].inStationItem;
      this.form.outStationItem = this.form.attendance[index].outStationItem;
    },
    /**
     * 当有历史轨迹，但是无法匹配出入井基站时候，设置当前出入井跟随页面考勤
     */
    initStationData(index, e, type, time, station) {
      this.$set(
        this.form.attendance[index],
        [type],
        JSON.parse(JSON.stringify(originForm[type]))
      );
      this.form.attendance[index][type].dataTime = e[time];
      this.form.attendance[index][type].stationNo = e[station];
      this.form[type] = this.form.attendance[index][type];
    },
    initListData(e, w, index) {
      let q = JSON.parse(w);
      if (!e.inStationItem) {
        let list1 = q.filter((item) => item.stationNo == e.inwellStationNo);
        if (list1.length) {
          this.$set(
            this.form.attendance[index],
            "inStationItem",
            getMinObj(list1)
          );
          this.$set(
            this.form.attendance[index],
            "oriInStationItem",
            JSON.stringify(getMinObj(list1))
          );
          this.form.inStationItem = getMinObj(list1);
        } else {
          console.log("无匹配入井");
          this.initStationData(
            index,
            e,
            "inStationItem",
            "inwellTime",
            "inwellStationNo"
          );
        }
      }
      if (!e.outStationItem) {
        let list2 = q.filter((item) => item.stationNo == e.outwellStationNo);
        if (list2.length) {
          this.$set(
            this.form.attendance[index],
            "outStationItem",
            getMaxObj(list2)
          );
          this.$set(
            this.form.attendance[index],
            "oriOutStationItem",
            JSON.stringify(getMaxObj(list2))
          );
          this.form.outStationItem = getMaxObj(list2);
        } else {
          console.log("无匹配出井");
          this.initStationData(
            index,
            e,
            "outStationItem",
            "outwellTime",
            "outwellStationNo"
          );
        }
      }
      // 除去入井基站，出井基站
      let new_list = q.filter((item) => {
        return !(
          item.stationNo == this.form.inStationItem.stationNo &&
          item.dataTime == this.form.inStationItem.dataTime
        );
      });
      let dataList = new_list.filter((item) => {
        return !(
          item.stationNo == this.form.outStationItem.stationNo &&
          item.dataTime == this.form.outStationItem.dataTime
        );
      });
      this.$nextTick(() => {
        this.$set(this.form.attendance[index], "list", dataList);
        this.form.trackList = this.form.attendance[index].list;
      });
    },
    async getAllStation() {
      // const { data } = await api.getStationAll();
      let data = {
        code: 200,
        data: [
          {
            stationNo: "1",
            stationName: "苏苏测试001",
          },
          {
            stationNo: "2",
            stationName: "苏苏测试002",
          },
          {
            stationNo: "3",
            stationName: "苏苏测试003",
          },
        ],
      };
      if (data.code == 200) {
        this.stationList = data.data;
      }
    },
    // eslint-disable-next-line no-unused-vars
    async getShiftInfo(e) {
      // console.log(e);
      // const { data } = await api.getShiftInfo(e);
      let data = {
        code: 200,
        data: [
          {
            shiftTimeQuantumId: "1",
            timeName: "早班",
          },
          {
            shiftTimeQuantumId: "2",
            timeName: "中班",
          },
          {
            shiftTimeQuantumId: "3",
            timeName: "晚班",
          },
        ],
      };
      if (data.code == 200) {
        this.shiftList = data.data;
      }
    },
    handleRowChangeTrack(e, index) {
      this.currTrackIndex = index;
    },
    handleRowChange(e, index) {
      // if (!this.form.cardNo || !this.form.date)
      //   return this.$Message.error("请填写卡号和日期");
      console.log(e);

      this.currTrackIndex = "";
      this.currentIndex = index; //当前所选的考勤信息的索引
      this.showTrack = true;

      this.currentPage = this.form.attendance[index].page; //改变页码

      console.log(this.currentPage);

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
      // this.stationList.forEach((item) => {
      //   if (this.form.outStationItem.stationNo == item.stationNo) {
      //     this.form.outStationItem.mainStationHid = item.mainStationHid;
      //     this.form.outStationItem.stationName = item.stationName;
      //   }
      //   if (this.form.inStationItem.stationNo == item.stationNo) {
      //     this.form.inStationItem.mainStationHid = item.mainStationHid;
      //     this.form.inStationItem.stationName = item.stationName;
      //   }
      // });
      if (e && e.list && e.list.length) {
        console.log("cccc", e.list);
        e.list.forEach((item) => {
          // item.no_del = e.no_del;
          item.dataTime = formatDate(item.dataTime, true);
          item.stationDistance = item.stationDistance.toString();
          item.stationDirection =
            item.stationDirection == undefined ? 0 : item.stationDirection;
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
        if (e.inwellTime && e.outwellTime) this.getTrackList(e, index);
      }
    },
    selectStation(e, index) {
      let d = this.stationList.filter((item) => item.stationNo == e);
      this.form.trackList[index].mainStationHid = d.length
        ? d[0].mainStationHid
        : "";
      this.form.trackList[index].stationName = d.length ? d[0].stationName : "";
    },
    nextDay(e, type) {
      if (type == "copyDate") {
        if (!this.copyCardNo) return this.$Message.error("请先填写卡号");
        this[type] = getNextDate(this[type], e);
      } else {
        this.modalTip = 1;
        if (!this.form.cardNo || !this.form.date)
          return this.$Message.error(" 请填写卡号和日期");
        if (new Date(getNextDate(this.form.date, e)).getTime() > Date.now()) {
          return this.$Message.error("日期不能超过当天！");
        }
        if (this.hasChange) {
          this.showDel = true;
          this.currDel = {
            date: e,
            is_del: false,
          };
        } else {
          this.form.date = getNextDate(this.form.date, e);
          this.reset();
        }
      }
    },
    addInfo() {
      this.hasChange = true;
      if (!this.form.cardNo || !this.form.date)
        return this.$Message.error(" 请填写卡号和日期");
      this.form.attendance.push(JSON.parse(JSON.stringify(originForm.att)));
    },
    addTrack() {
      this.hasChange = true;
      if (!this.form.cardNo || !this.form.date)
        return this.$Message.error(" 请填写卡号和日期");
      this.form.trackList.push(JSON.parse(JSON.stringify(originForm.track)));
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
      this.modalTip = 0;
      if (this.form[type].length == 1 && e == 0) {
        if (type == "attendance") {
          this.form.attendance = [JSON.parse(JSON.stringify(originForm.att))];
          this.form.inStationItem = JSON.parse(
            JSON.stringify(originForm.inStationItem)
          );
          this.form.outStationItem = JSON.parse(
            JSON.stringify(originForm.outStationItem)
          );
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
    cancelModal() {
      this.showDel = false;
      if (this.currDel.is_form_date) {
        this.form.date = this.currDel.is_form_date;
      }
    },
    deleteok() {
      if (this.currDel.is_del) {
        this.form[this.currDel.type].splice(this.currDel.index, 1);
        if (this.currDel.type == "attendance") {
          this.showTrack = false;
        }
        this.hasChange = true;
      } else {
        this.reset();
        if (!this.currDel.is_date) {
          this.form.date = getNextDate(this.form.date, this.currDel.date);
        }
      }
      this.currDel = {};
      this.showDel = false;
    },
    /**
     * 复制一行
     * e:当前一行
     */
    copy(e, type) {
      this.hasChange = true;
      if (!this.form.cardNo || !this.form.date) {
        return this.$Message.error(" 请填写卡号和日期");
      } else {
        e.is_copy = true;
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
      if (!this.form.cardNo || !this.form.date)
        return this.$Message.error("请填写卡号和日期");
      this.$refs.Form.validate((valid) => {
        if (valid) {
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
          // 不论是否展示，直接调用，在这个方法中做判断
          this.saveTrack();
        }
      });
    },
    // 新增考勤
    saveAttence(newArr) {
      console.log("原始数据", JSON.parse(newArr));
      let list = JSON.parse(newArr);
      list.forEach((item) => {
        item.inwellTime = formatDate(item.inwellTime, true);
        item.outwellTime = formatDate(item.outwellTime, true);
        item.shiftDate = formatDate(item.outwellTime);
        if (item.list) delete item.list;
        if (item.inStationItem) delete item.inStationItem;
        if (item.outStationItem) delete item.outStationItem;
        if (item.oriInStationItem) delete item.oriInStationItem;
        if (item.oriInStationItem) delete item.oriInStationItem;
        if (item.oriOutStationItem) delete item.oriOutStationItem;
      });
      console.log(list);
      // api
      //   .addAttendance(list)
      //   .then((res) => {
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
      let l = [],
        new_a = [];
      l = flatten(this.form.attendance.map((item) => item.list)).filter(
        (item) => item != undefined
      );
      this.form.attendance.forEach((item) => {
        new_a.push(item.inStationItem, item.outStationItem);
      });

      let list = l.concat(new_a.filter((item) => item != undefined));
      let params = {
        objectNo: this.userInfo.userInfoCode,
        objectId: this.userInfo.userInfoId,
        cardNo: this.form.cardNo,
      };
      let newArr = list.map((item) => {
        return Object.assign(item, params);
      });
      newArr.forEach((item) => {
        item.dataTime = formatDate(item.dataTime, true);
        item.dataDate = formatDate(item.dataTime, true);
      });

      let lll = newArr.filter(
        (item) => item.dataDate && item.stationDistance && item.stationDirection
      );
      console.log("feino_del", lll);
      let t_list = newArr.filter(
        (item) =>
          item.dataDate &&
          item.stationDistance &&
          item.stationDirection &&
          item.stationNo &&
          !item.no_del
      );
      console.log(t_list);
      // 当有值的时候 再去调用此接口
      if (t_list.length) {
        // api
        //   .addLocus(t_list)
        //   .then((res) => {
        //     if (res.data.code == 200) {
        //     } else {
        //       this.$Message.error("操作失败，请稍后重试！");
        //     }
        //   })
        //   .catch(() => {
        //     this.$Message.error("操作失败，请稍后重试！");
        //   });
      }
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