<template>
  <div class="contentBox">
    <Card>
      <p>二次封装iview组件的Page分页组件</p>
      <Page
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
    </Card>
  </div>
</template>
<script>
import Page from "./components/page.vue";
export default {
  components: {
    Page,
  },
  data() {
    return {
      total: 350,
      page: 1,
      pageSize: 10,
    };
  },
  methods: {
    pageChange(e) {
      console.log('---页数',e);
    },
    pageSizeChange(e) {
      console.log('---size',e);
    },
  },
};
</script>

<style>
</style>