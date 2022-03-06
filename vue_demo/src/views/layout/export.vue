<template>
  <div>
    <Button
      icon="ios-download-outline"
      type="primary"
      color="pink"
      @click="exportHandler"
      :loading="!can_click"
    >
      文件导出</Button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      can_click: true,
    };
  },
  methods: {
    exportHandler() {
      this.can_click = false;
      let url =
        "https://eln-public.oss-cn-shanghai.aliyuncs.com/dev/49da6602-ed5f-4f53-b26d-2acfd105d0d4.xlsx";
      try {
        let elemIF = document.createElement("iframe");
        elemIF.src = url;
        elemIF.style.display = "none";
        document.body.appendChild(elemIF);
      } catch (e) {
        this.$Message.error("下载异常！");
      }
      setTimeout(() => {
        this.can_click = true;
      }, 1000);
      //   this.$api
      //     .couApplyExport(this.params)
      //     .then((res) => {
      //       if (res.code == "200") {
      //         try {
      //           let elemIF = document.createElement("iframe");
      //           elemIF.src = res.data.url;
      //           elemIF.style.display = "none";
      //           document.body.appendChild(elemIF);
      //         } catch (e) {
      //           this.$Message.error("下载异常！");
      //         }
      //       } else {
      //         this.$Message.error("导出失败" + res.message);
      //       }
      //     })
      //     .catch(() => {
      //       this.$Message.error("下载异常！");
      //     })
      //     .finally(() => {
      //       setTimeout(() => {
      //         this.can_click = true;
      //       }, 1000);
      //     });
    },
  },
};
</script>

<style>
</style>