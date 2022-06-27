<template>
  <div class="contentBox">
    <vxe-table :data="tableData">
      <vxe-column
        type="index"
        width="60"
      ></vxe-column>
      <vxe-column
        field="name"
        title="Name"
      ></vxe-column>
      <vxe-column
        field="date"
        title="Date"
      ></vxe-column>
      <vxe-column
        field="sex"
        title="Sex"
      ></vxe-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyData: [],
      tableData: [
        {
          id: 10001,
          name: "test1",
          sex: "Man",
          date: "2019-05-01",
        },
      ],
    };
  },
  created() {
    new Promise((resolve) => {
      setTimeout(() => {
        let item = {
          stationDistance: 111,
          dataTime: "2022-06-15 07:07:07",
          stationDirection: 1,
        };
        let res = { total: 10000 };
        let data = [];
        for (let i = 0; i < res.total; i++) {
          data.push(item);
        }
        resolve(data);
      }, 2000);
    }).then((res) => {
      this.copyData = [
        {
          is_copy_his: true,
          inwellTime: "2022-06-15 05:05:05",
          outwellTime: "2022-06-15 08:08:08",
          shiftTimeQuantumId: "1",
          inwellStationNo: "1",
          outwellStationNo: "2",
          list: [],
        },
        {
          is_copy_his: true,
          inwellTime: "2022-06-15 09:09:09",
          outwellTime: "2022-06-15 12:12:12",
          shiftTimeQuantumId: "2",
          inwellStationNo: "2",
          outwellStationNo: "3",
          list: [],
        },
      ];
      this.copyData.forEach((item) => {
        item.list = res;
      });
    });
  },
};
</script>

<style>
</style>