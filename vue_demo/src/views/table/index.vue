<template>
  <div v-if="$loadingPlugin.getList">loading ...</div>
  <!-- <div v-loading="true">tgasdhgsfdahatgahf </div> -->
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
      this.$loading.show();
      const { code, data, total } = await this.$api.tableList(this.params);
      if (code == "200") {
        this.tbList = data;
        this.total = total;
        console.log(data);
        // this.$my_message("这是一个message");
        // this.$loading.show('hello world')
        // this.$loading.hide()
        // setTimeout(() => {
        //   this.$loading.hide();
        // }, 2000);
      }
    },
  },
};
</script>

<style>
</style>
