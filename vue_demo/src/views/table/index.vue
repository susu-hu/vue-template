<template>
  <div>
    <a>新增</a>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      console.log(1322);
      this.$api.tableList().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style>
</style>