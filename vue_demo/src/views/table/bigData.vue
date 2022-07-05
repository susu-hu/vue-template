<template>
  <div class="contentBox">
    <vxe-table
      resizable
      :data="copyData"
      show-overflow
      stripe
      border
      :loading="loading"
      align="center"
      round
      height="500"
      :row-config="{ isHover: true }"
    >
      <vxe-column type="checkbox" width="60" fixed="left"></vxe-column>
      <vxe-column type="seq" width="100" fixed="left">
        <!-- <template #default="{ row }">{{ row.seq }}</template> -->
      </vxe-column>
      <vxe-column field="stationDistance" title="参数1">
        <template #default="{ row }">
          <Input
            clearable
            v-model.trim="row.stationDistance"
            type="text"
            placeholder="请输入距离"
          />
          <!-- <slot name="stationDistance" :row="row"></slot> -->
        </template>
      </vxe-column>
      <vxe-column field="dataTime" title="时间">
        <template #default="{ row }">
          <Date-picker
            :transfer="true"
            v-model="row.dataTime"
            type="datetime"
            placeholder="选择时间"
            format="yyyy-MM-dd HH:mm:ss"
          ></Date-picker
        ></template>
      </vxe-column>
      <vxe-column field="stationDirection" title="距离"></vxe-column>
      <vxe-column field="stationNo" title="距离">
        <template #default="{ row }">
          <Select
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
              >{{ item.stationName }}</Option
            >
          </Select></template
        >
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      copyData: [],
      loading: false,
      stationList: [
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
  },
  created() {
    this.loading = true;
    new Promise((resolve) => {
      setTimeout(() => {
        let res = { total: 100000 };
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
    }).then((res) => {
      this.copyData = res;
      this.loading = false;
      console.log(this.copyData);
    });
  },
};
</script>

<style>
</style>