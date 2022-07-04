/* eslint-disable */


// import { formatDate } from "@/utils/tools.js";

export const ruleValidate = (obj) => {
  const rule = {
    // inwellTime: [
    //   {
    //     trigger: "change",
    //     required: true,
    //     validator: (rule, value, callback) => vaTime(rule, value, callback, obj),
    //   },
    //   {
    //     trigger: "change",
    //     required: true,
    //     validator: (rule, value, callback) => vaEffectInllTime(rule, value, callback, obj),
    //   },
    // ],
    // outwellTime: [
    //   {
    //     trigger: "change",
    //     required: true,
    //     validator: (rule, value, callback) => vaTime(rule, value, callback, obj),
    //   },
    //   {
    //     trigger: "change",
    //     required: true,
    //     validator: (rule, value, callback) => vaEffectTime(rule, value, callback, obj),
    //   },
    // ],
    // shiftTimeQuantumId: [{
    //   type: 'number',
    //   required: true,
    //   message: "时间段不能为空",
    //   trigger: "blur,change",
    // },],
    // inwellStationNo: [{
    //   required: true,
    //   message: "入井基站不能为空",
    //   trigger: "blur,change",
    // },],
    // outwellStationNo: [{
    //   required: true,
    //   message: "出井基站不能为空",
    //   trigger: "blur,change",
    // },],
    // stationNo: [{
    //   required: true,
    //   message: "出井基站不能为空",
    //   trigger: "blur,change",
    // },],
    // stationDirection: [{
    //   type: 'number',
    //   required: true,
    //   message: "方向不能为空",
    //   trigger: "blur,change",
    // },],
    // stationDistance: [{
    //   required: true,
    //   message: "距离不能为空",
    //   trigger: "blur,change",
    // },],
    // dataTime: [
    //   {
    //     trigger: "change",
    //     required: true,
    //     validator: (rule, value, callback) => vaTime(rule, value, callback, obj),
    //   },
    //   {
    //     trigger: "change",
    //     required: true,
    //     validator: (rule, value, callback) => vaStationTime(rule, value, callback, obj),
    //   },
    // ],
  }
  return rule;
}
const vaTime = (rule, value, callback, obj) => {
  if (value) {
    callback();
  } else {
    callback(new Error("时间不能为空"));
  }
};
const vaEffectInllTime = (rule, value, callback, obj) => {
  if (obj.currentIndex !== '' && obj.currentIndex !== undefined && obj.currentIndex !== null) {
    if (obj.form.attendance[obj.currentIndex].no_del) {
      let origin_list = JSON.parse(obj.historyData);
      if (formatDate(obj.form.attendance[obj.currentIndex].inwellTime, true) > formatDate(origin_list[obj.currentIndex].inwellTime, true)) {
        callback(new Error("已有考勤的入井时间只能改小"));
      } else {
        callback()
      }
    }
    if (obj.form.attendance[obj.currentIndex].outwellTime && obj.form.attendance[obj.currentIndex].inwellTime) {
      if (formatDate(obj.form.attendance[obj.currentIndex].inwellTime, true) >= formatDate(obj.form.attendance[obj.currentIndex].outwellTime, true)) {
        callback(new Error("入井时间不能大于出井时间"));
      }
      else {
        callback();
      }
    } else {
      callback();
    }
  } else {
    callback();
  }
};
const vaEffectTime = (rule, value, callback, obj) => {
  if (obj.currentIndex !== '' && obj.currentIndex !== undefined && obj.currentIndex !== null) {
    if (obj.form.attendance[obj.currentIndex].no_del) {
      let origin_list = JSON.parse(obj.historyData);
      if (formatDate(obj.form.attendance[obj.currentIndex].outwellTime, true) < formatDate(origin_list[obj.currentIndex].outwellTime, true)) {
        callback(new Error("已有考勤的出井时间只能改大"));
      } else {
        callback()
      }
    }
    if (obj.form.attendance[obj.currentIndex].outwellTime && obj.form.attendance[obj.currentIndex].inwellTime) {
      if (formatDate(obj.form.attendance[obj.currentIndex].outwellTime, true) <= formatDate(obj.form.attendance[obj.currentIndex].inwellTime, true)) {
        callback(new Error("出井时间不能小于入井时间"));
      }
      else {
        callback();
      }
    } else {
      callback();
    }
  } else {
    callback();
  }
};
const vaStationTime = (rule, value, callback, obj) => {
  if (value) {
    if (obj.currTrackIndex !== '' && obj.currTrackIndex !== undefined && obj.currTrackIndex !== null) {
      if (obj.changeList && obj.changeLen === 1) {
        let oldTime = formatDate((JSON.parse(
          obj.form.attendance[obj.currentIndex].oriOutStationItem
        )).dataTime, true)

        if (obj.form.attendance[obj.currentIndex].list[obj.currTrackIndex].is_old_add) {
          if (formatDate(obj.form.attendance[obj.currentIndex].list[obj.currTrackIndex].dataTime, true) >= oldTime &&
            formatDate(obj.form.attendance[obj.currentIndex].list[obj.currTrackIndex].dataTime, true) <= formatDate(obj.form.attendance[obj.currentIndex].outwellTime, true)) {
            callback()
          } else {
            callback(new Error("时间必须在新出井和旧出井之间"));
          }
        } else {
          callback()
        }
      }
    }
    if (formatDate(value, true) >= formatDate(obj.form.attendance[obj.currentIndex].inwellTime, true) &&
      formatDate(value, true) <= formatDate(obj.form.attendance[obj.currentIndex].outwellTime, true)) {
      callback()
    } else {
      callback(new Error("时间必须在入井和出井之间"));
    }
  }

}
export const originForm = {
  att: {
    shiftTimeQuantumId: "",
    shiftTimeQuantumName: "",
    inwellTime: "",
    inwellStationNo: "",
    inwellStationName: "",
    outwellTime: "",
    outwellStationNo: "",
    outwellStationName: "",
    dataType: 1,
    objectNo: '',
    shiftDate: '',
    shiftId: '',
    shiftName: '',
    cnName: '',
    spellName: '',
    cardNo: '',
    positionId: '',
    positionNo: '',
    positionName: '',
    dutyId: '',
    dutyNo: '',
    dutyName: '',
    deptId: '',
    deptName: '',
    isDutyLeader: '',
    isWithLeader: '',
    isMineLeader: '',
    isSpeicial: '',
    workStatus: '',
    countClassMethod: '',
    is_origin: true,
    list: [],
    inStationItem: {},
    outStationItem: {},
    page: 1,
  },
  track: {
    stationNo: "",
    mainStationHid: "",
    stationDirection: "",
    stationDistance: "",
    dataTime: "",
    stationName: "",
  },
  inStationItem: {
    stationNo: "",
    dataTime: "",
    stationDirection: "",
    stationDistance: "",
    mainStationHid: "",
    stationName: "",
  },
  outStationItem: {
    stationNo: "",
    dataTime: "",
    stationDirection: "",
    stationDistance: "",
    mainStationHid: "",
    stationName: "",
  },
}
export const initForm = {
  cardNo: "",
  date: "",
  // 轨迹参数
  inStationItem: {
    stationNo: "",
    dataTime: "",
    stationDirection: "",
    stationDistance: "",
    mainStationHid: "",
    stationName: "",
  },
  outStationItem: {
    stationNo: "",
    dataTime: "",
    stationDirection: "",
    stationDistance: "",
    mainStationHid: "",
    stationName: "",
  },
  attendance: [{
    shiftTimeQuantumId: "",
    shiftTimeQuantumName: "",
    inwellTime: "",
    inwellStationNo: "",
    inwellStationName: "",
    outwellTime: "",
    outwellStationNo: "",
    outwellStationName: "",
    dataType: 1,
    // 固定字段
    objectNo: '',
    shiftDate: '',
    shiftId: '',
    shiftName: '',
    cnName: '',
    spellName: '',
    cardNo: '',
    positionId: '',
    positionNo: '',
    positionName: '',
    dutyId: '',
    dutyNo: '',
    dutyName: '',
    deptId: '',
    deptName: '',
    isDutyLeader: '',
    isWithLeader: '',
    isMineLeader: '',
    isSpeicial: '',
    workStatus: '',
    countClassMethod: '',
    is_origin: true,
    // 轨迹信息
    list: [],
    inStationItem: {},
    outStationItem: {},
    page: 1,//分页页数
  },], //出勤记录
  trackList: [{
    stationNo: "",
    mainStationHid: "",
    stationDirection: "",
    stationDistance: "",
    dataTime: "",
    stationName: "",
  },], //轨迹信息
}