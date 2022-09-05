<template>
  <div class="contentBox">
    <for-tree :children="data"></for-tree>
  </div>
</template>

<script>
import forTree from "./components/forTree.vue";
export default {
  components: { forTree },
  data() {
    return {
      data: [
        {
          id: 0,
          show: true,
          name: "苏苏1",
          children: [
            { id: 1, name: "苏苏1" },
            { id: 4, name: "苏苏ssd" },
          ],
        },
        {
          id: 2,
          show: false,
          name: "苏苏ttt",
          children: [{ id: 5, name: "苏苏yyyy" }],
        },
        {
          id: 3,
          show: true,
          name: "磨磨唧唧",
          children: [
            { id: 6, name: "磨磨唧唧" },
            { id: 7, name: "磨磨唧唧" },
            {
              id: 8,
              show: false,
              name: "磨磨唧唧",
              children: [
                { id: 9, name: "磨磨唧唧" },
                { id: 10, name: "磨磨唧唧" },
              ],
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>

<style>
</style>