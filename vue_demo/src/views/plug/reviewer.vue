<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-03-27 15:20:31
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-05-18 10:03:34
 * @FilePath: \vue_demo\src\views\plug\reviewer.vue
 * @Description: 文件预览
-->
<template>
  <div ref="detail">
    <div :class="loading ? 'hide' : ''">
      <div>
        <pdf
          v-for="i in numPages"
          :key="i"
          :src="src"
          :page="i"
          @page-loaded="pageLoaded($event)"
        ></pdf>
        <!-- <pdf
          :src="url"
          :page="currentPage"
          @num-pages="pageCount = $event"
          @page-loaded="currentPage = $event"
          @loaded="loadPdfHandler"
        >
        </pdf> -->
      </div>
    </div>
  </div>
</template>

<script>
// npm install --save vue-pdf
import pdf from "vue-pdf";

export default {
  name: "detail",
  components: {
    pdf,
  },
  data() {
    return {
      currentPage: 1, // pdf文件页码
      pageCount: 0, // pdf文件总页数
      fileType: "pdf", // 文件类型
      loading: true, // 显示加载效果
      src: "",
      numPages: 0, // 总页数
      curPageNum: 0, //当前页
      url: "https://susu-file.oss-cn-beijing.aliyuncs.com/susu/2.20%E5%85%AC%E5%BC%80%E8%AF%BE%E5%A4%A7%E7%BA%B2%281%29.pdf",
    };
  },
  methods: {
    loadPdfHandler() {
      this.currentPage = 1; // 加载的时候先加载第一页
    },
    pageLoaded(e) {
      this.curPageNum = e;
      if (this.curPageNum == this.numPages) {
        //加载完最后一页
        this.loading = false;
      }
    },
  },
  mounted() {
    let url =
      "https://susu-file.oss-cn-beijing.aliyuncs.com/susu/2.20%E5%85%AC%E5%BC%80%E8%AF%BE%E5%A4%A7%E7%BA%B2%281%29.pdf";
    this.$refs.detail.scrollIntoView(true);
    this.src = pdf.createLoadingTask(url); // url是pdf文件的全路径
    this.src.promise.then((pdf) => {
      console.log(pdf);
      this.numPages = pdf.numPages;
      // that.pageCount = pdf.numPages;
    });
  },
};
</script>


<style lang="less">
.hide {
  visibility: hidden;
}
</style>