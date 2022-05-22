<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-05-20 23:36:26
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-05-22 15:34:37
 * @FilePath: \vue_demo\src\views\plug\xsheet.vue
 * @Description: xsheet
-->
<template>
  <div class="contentBox">
    <Button type="primary" @click="review">预览</Button>
    <div id="demo"></div>
  </div>
</template>

<script>
const tabledata = {
  merge: {
    merges: [],
  },
  cols: {
    len: 3,
  },
  rows: {
    len: 16,
    data: [
      {
        height: 13.5,
        row: 0,
      },
      {
        height: 13.5,
        row: 1,
      },
      {
        height: 13.5,
        row: 2,
      },
      {
        height: 13.5,
        row: 3,
      },
      {
        height: 13.5,
        row: 4,
      },
      {
        height: 13.5,
        row: 5,
      },
      {
        height: 13.5,
        row: 6,
      },
      {
        height: 13.5,
        row: 7,
      },
      {
        height: 13.5,
        row: 8,
      },
      {
        height: 13.5,
        row: 9,
      },
      {
        height: 13.5,
        row: 10,
      },
      {
        height: 13.5,
        row: 11,
      },
      {
        height: 13.5,
        row: 12,
      },
      {
        height: 13.5,
        row: 13,
      },
      {
        height: 13.5,
        row: 14,
      },
      {
        height: 13.5,
        row: 15,
      },
      {
        height: 13.5,
        row: 16,
      },
    ],
  },
  data: [
    ["1", "2", "3", ""],
    ["2", "3", "4", ""],
    ["3", "4", "5", ""],
    ["4", "5", "6", ""],
    ["5", "6", "7", ""],
    ["6", "7", "8", ""],
    ["7", "8", "9", ""],
    ["8", "9", "10", ""],
    ["9", "10", "11", ""],
    ["10", "11", "12", ""],
    ["11", "12", "13", ""],
    ["12", "13", "14", ""],
    ["", "14", "15", ""],
    ["", "", "16", ""],
    ["", "", "17", ""],
    ["", "", "18", ""],
    ["", "", "19", ""],
  ],
};
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    review() {
      // eslint-disable-next-line no-undef
      new XSheet("#demo", {
        workConfig: {
          body: {
            sheets: [
              {
                tableConfig: tabledata,
              },
            ],
          },
        },
      });
    },
  },
};
</script>

<style scoped>
#demo {
  margin-top: 20px;
  width: 100%;
  height: calc(100vh - 220px);
}
</style>