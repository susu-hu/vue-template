<template>
  <div class="contentBox">
    <Table
      :columns="columns10"
      :data="data9"
      highlight-row
      border
      draggable
      @on-expand="expand"
    ></Table>
  </div>
</template>

<script>
import expandRow from "./components/table-expand.vue";
export default {
  data() {
    return {
      columns10: [
        {
          title: "Name",
          key: "name",
        },
        {
          title: "Age",
          key: "age",
        },
        {
          title: "Address",
          key: "address",
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
        },
      ],
      data9: [
        {
          name: "小苏苏",
          age: 18,
          address: "New York No. 1 Lake Park",
          job: "前端开发",
          interest: "badminton",
          birthday: "1991-05-14",
          book: "Steve Jobs",
          movie: "The Prestige",
          music: "I Cry",
          list: [
            {
              name: 1,
            },
            {
              name: 2,
            },
          ],
        },
        {
          name: "Jim Green",
          age: 25,
          address: "London No. 1 Lake Park",
          job: "Data Scientist",
          interest: "volleyball",
          birthday: "1989-03-18",
          book: "My Struggle",
          movie: "Roman Holiday",
          music: "My Heart Will Go On",
          _disableExpand: true, //禁止展开
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          job: "Data Product Manager",
          interest: "tennis",
          birthday: "1992-01-31",
          book: "Win",
          movie: "Jobs",
          music: "Don’t Cry",
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          job: "Data Analyst",
          interest: "snooker",
          birthday: "1988-7-25",
          book: "A Dream in Red Mansions",
          movie: "A Chinese Ghost Story",
          music: "actor",
        },
      ],
    };
  },
  methods: {
    expand(e, status) {
      console.log(e, status);
    },
  },
};
</script>

<style>
</style>