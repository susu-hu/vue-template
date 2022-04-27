<template>
  <div>
    <Page
      :page-size-opts="[10, 20, 50, 500]"
      :total="total"
      :page-size="pageSize"
      :current="page"
      show-sizer
      show-total
      prev-text="上一页"
      next-text="下一页"
      @on-change="pageChange"
      @on-page-size-change="pageSizeChange"
      class="public-page"
    />
  </div>
</template>

<script>
export default {
  name: "Pager",
  props: {
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {};
  },
  methods: {
    pageChange(e) {
      this.$emit("on-change", e);
      //   console.log(e);
    },
    pageSizeChange(e) {
      this.$emit("on-page-size-change", e);
      //   console.log(e);
    },
  },
};
</script>

<style scoped>
.public-page {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>