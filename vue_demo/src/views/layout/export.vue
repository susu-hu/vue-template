<template>
  <div>
    <button v-btn @click="btnClick" class="btn1">测试自定义指令</button>
    <Button v-btn type="primary" @click="btnClick">这是一个自定义指令</Button>
    <my-loading :loadFlag="loadFlag"></my-loading>
    <Button
      icon="ios-download-outline"
      type="primary"
      color="pink"
      @click="exportHandler"
      :loading="!can_click"
    >
      文件导出</Button
    >
    <Button @click="downloadTask" type="primary">导出1</Button>
    <Button @click="lll" type="primary">导出2</Button>
    <Button @click="downTTT" type="primary"> 导出进度条</Button>
    <Progress
      class="pro"
      :percent="filePercentage"
      stroke-color="['#108ee9', '#87d068']"
      :hide-info="false"
    ></Progress>
    <div>
      <img
        style="display: block; margin: 20px auto"
        src="https://i.postimg.cc/mgsKJGLw/susu1.jpg"
        @click="downImg('https://i.postimg.cc/mgsKJGLw/susu1.jpg')"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loadFlag: false,
      can_click: true,
      filePercentage: 0,
    };
  },
  created() {
    // this.$my_message("这是一个message");
    // this.$my_message("这是一个warning", "warning");
    // this.getList();
    // this.$my_message({
    //   content: "这是一个success提示",
    //   time: 5000000,
    //   type: "success",
    //   hasClose: true,
    // });
  },
  methods: {
    btnClick() {
      console.log("zidy ceccee");
    },
    async getList() {
      const { code, data, total } = await this.$api.aaa();
      if (code == "200") {
        this.tbList = data;
        this.total = total;
      }
    },
    lll() {
      window.location.href =
        "https://eln-public.oss-cn-shanghai.aliyuncs.com/dev/49da6602-ed5f-4f53-b26d-2acfd105d0d4.xlsx";
    },
    downloadTask(index, row) {
      console.log(row, index);
      let url = window.URL.createObjectURL(
        new Blob(
          [
            "https://eln-public.oss-cn-shanghai.aliyuncs.com/dev/49da6602-ed5f-4f53-b26d-2acfd105d0d4.xlsx",
          ],
          { type: "application/vnd.ms-excel" }
        )
      );
      let link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.setAttribute("download", "苏苏小苏苏");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // let own = this;
      // this.fullscreenLoading = true;
      // this.axios({
      //   method: "post",
      //   url: this.baseUrl + "/api/Task/DownLoad",
      //   data: { id: row.id },
      //   responseType: "blob",
      //   //敲黑板
      //   onDownloadProgress(progress) {
      //     own.dlProgress = Math.round((progress.loaded / progress.total) * 100);
      //   },
      // })
      //   .then((res) => {
      //     this.fullscreenLoading = false;
      //     let fileName = decodeURI(
      //       res.headers["content-disposition"].split("=")[1]
      //     );
      //     let url = window.URL.createObjectURL(new Blob([res.data]));
      //     let link = document.createElement("a");
      //     link.style.display = "none";
      //     link.href = url;
      //     link.setAttribute("download", fileName);
      //     document.body.appendChild(link);
      //     link.click();
      //     document.body.removeChild(link);
      //     this.$message.success("下载成功");
      //   })
      //   .catch(() => {
      //     this.fullscreenLoading = false;
      //   });
    },
    downImg(url) {
      axios.request({
        url: url,
        method: "get",
        onDownloadProgress(progress) {
          console.log(progress);
          console.log(
            Math.round((progress.loaded / progress.total) * 100) + "%"
          );
        },
      });
    },
    downTTT(url) {
      console.log(process.env.NODE_ENV);
      url =
        "https://elnbkt-dev-outer.oss-cn-shanghai.aliyuncs.com/dev/4472da00-3d5b-4a55-990c-5cf4447d864e/仓库导入模板.xlsx";
      axios
        .request({
          url: "/dev/4472da00-3d5b-4a55-990c-5cf4447d864e/仓库导入模板.xlsx",
          method: "GET",
          responseType: "blob",
          onDownloadProgress: (progress) => {
            console.log(progress);

            console.log(
              Math.round((progress.loaded / progress.total) * 100) + "%"
            );
            this.$nextTick(() => {
              this.filePercentage = Math.round(
                (progress.loaded / progress.total) * 100
              );
            });
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            try {
              let elemIF = document.createElement("iframe");
              elemIF.src = url;
              elemIF.style.display = "none";
              document.body.appendChild(elemIF);
            } catch (e) {
              this.$Message.error("下载异常！");
            }
          }
        });
    },
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

<style scoped>
/*  去掉button的默认样式*/
button {
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  vertical-align: middle;
}

button::after {
  outline: none;
  border: none;
}
/*点击后样式*/
.button-hover {
  background: transparent;
}
.btn1 {
  display: block;
  width: 132px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin: 20px auto;
  border: 1px solid #fff;
  border-radius: 10px;
  color: #fff;
}
/* 禁用样式 */
button[disabled] {
  background: #f8c9c8 !important;
}
Button {
  display: block;
  margin: 20px auto;
}
.pro {
  width: 200px;
  display: block;
  margin: 20px auto;
}
.ivu-progress-success .ivu-progress-bg {
  background-color: pink;
}
</style>