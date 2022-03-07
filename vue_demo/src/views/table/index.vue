<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {
      params: {
        page: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const { code, data, total } = await this.$api.tableList(this.params);
      if (code == "200") {
        this.tbList = data;
        this.total = total;
      }
    },
  },
};
</script>

<style>
</style>
