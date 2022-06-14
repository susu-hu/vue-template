import expandRow from "./table-expand.vue";
const publistHead = [{
  title: "序号",
  slot: "sort",
  width: 80,
  align: "center",
},];
const publistFoot = [{
  title: "操作",
  slot: "action",
  align: "center",
},];
const columns = {
  columnAttendance: [
    ...publistHead,
    {
      title: "时间段",
      slot: "shiftTimeQuantumId",
      align: "center",
    },
    {
      title: "入井时间*",
      slot: "inwellTime",
      align: "center",
    }, {
      title: "入井基站*",
      slot: "inwellStationNo",
      align: "center",
    }, {
      title: "出井时间*",
      slot: "outwellTime",
      align: "center",
    }, {
      title: "出井基站*",
      slot: "outwellStationNo",
      align: "center",
    },
    ...publistFoot,
  ],
  columnTrack: [
    ...publistHead, {
      title: "基站*",
      slot: "stationNo",
      align: "center",
    }, {
      title: "HID",
      slot: "mainStationHid",
      align: "center",
    }, {
      title: "方向*",
      slot: "stationDirection",
      align: "center",
    }, {
      title: "距离(米)",
      slot: "stationDistance",
      align: "center",
    }, {
      title: "时间",
      slot: "dataTime",
      align: "center",
    },
    ...publistFoot,
  ],
  columnCopy: [
    {
      type: "selection",
      width: 60,
      align: "center",
    },
    {
      title: "序号",
      slot: "index",
      width: 80,
      align: "center",
    },
    {
      title: "入井时间",
      key: "inwellTime",
      align: "center",
    },
    {
      title: "出井时间",
      key: "outwellTime",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      type: "expand",
      width: 150,
      render: (h, params) => {
        return h(expandRow, {
          props: {
            row: params.row,
          },
        });
      },
    },]

};
export default columns;