<!--
 * @Author: susu 1628469970@qq.com
 * @Date: 2022-05-17 09:47:29
 * @LastEditors: susu 1628469970@qq.com
 * @LastEditTime: 2022-05-18 08:59:55
 * @FilePath: \vue_demo\src\views\table\uploadFile.vue
 * @Description: 文件上传
-->
<template>
  <div class="contentBox">
    <Card class="card">
      <p class="hd-title mb20">文件上传</p>
      <Row class="mb20">
        <Col span="8">
          <Upload
            style="width: 320px"
            ref="upload"
            :show-upload-list="true"
            :action="uploadUrl"
            :data="uploadParams"
            :before-upload="beforeUpload"
            :on-success="onSuccess"
            :on-error="onError"
            :accept="Accept"
            type="drag"
          >
            <div style="padding: 20px 0">
              <Icon
                type="ios-cloud-upload"
                size="52"
                style="color: #3399ff"
              ></Icon>
              <p style="margin-bottom: 10px">点击或将文件拖拽到这里上传</p>
              <p>(提示：只支持.docx,.xlsx文件类型)</p>
            </div>
          </Upload></Col
        >
      </Row>
      <p class="hd-title mb20">已上传文件列表</p>
      <div>
        <div
          v-for="(item, index) in fileList"
          :key="index"
          class="file-item mb20"
        >
          <span class="mr20 file-item-name"> {{ item.name }}</span>
          <span class="mr20">上传时间:{{ item.time }}</span>
          <Button type="primary" icon="ios-link" @click="preview(item)"
            >预览</Button
          >
        </div>
      </div>
    </Card>
    <!-- <div id="demo" style="height: 1000px"></div> -->
  </div>
</template>

<script>
import axios from "axios";
import { Base64 } from "js-base64";
const tabledata = {
  merge: {
    merges: [],
  },
  cols: {
    len: 3,
  },
  rows: {
    len: 16,
    data: [
      {
        height: 13.5,
        row: 0,
      },
      {
        height: 13.5,
        row: 1,
      },
      {
        height: 13.5,
        row: 2,
      },
      {
        height: 13.5,
        row: 3,
      },
      {
        height: 13.5,
        row: 4,
      },
      {
        height: 13.5,
        row: 5,
      },
      {
        height: 13.5,
        row: 6,
      },
      {
        height: 13.5,
        row: 7,
      },
      {
        height: 13.5,
        row: 8,
      },
      {
        height: 13.5,
        row: 9,
      },
      {
        height: 13.5,
        row: 10,
      },
      {
        height: 13.5,
        row: 11,
      },
      {
        height: 13.5,
        row: 12,
      },
      {
        height: 13.5,
        row: 13,
      },
      {
        height: 13.5,
        row: 14,
      },
      {
        height: 13.5,
        row: 15,
      },
      {
        height: 13.5,
        row: 16,
      },
    ],
  },
  data: [
    ["1", "2", "3", ""],
    ["2", "3", "4", ""],
    ["3", "4", "5", ""],
    ["4", "5", "6", ""],
    ["5", "6", "7", ""],
    ["6", "7", "8", ""],
    ["7", "8", "9", ""],
    ["8", "9", "10", ""],
    ["9", "10", "11", ""],
    ["10", "11", "12", ""],
    ["11", "12", "13", ""],
    ["12", "13", "14", ""],
    ["", "14", "15", ""],
    ["", "", "16", ""],
    ["", "", "17", ""],
    ["", "", "18", ""],
    ["", "", "19", ""],
  ],
};
export default {
  data() {
    return {
      pdfUrl: "",
      fileList: [
        {
          name: "susutest/newtest.docx",
          time: "2022-05-12 15:37:57",
          url: "/susutest/newtest.docx",
        },
        {
          name: "susutest/word-test2.docx",
          time: "2022-05-12 15:37:57",
          url: "/susutest/word-test2.docx",
        },
        {
          name: "susutest/前端如何提升用户体验.docx",
          time: "2022-05-12 15:37:57",
          url: "/susutest/前端如何提升用户体验.docx",
        },
        {
          name: "susutest/web.docx",
          time: "2022-05-12 15:37:57",
          url: "/susutest/web.docx",
        },
        {
          name: "susutest/blcp.docx",
          time: "2022-05-12 15:37:57",
          url: "/susutest/blcp.docx",
        },
        {
          name: "苏苏/blcp.docx",
          time: "2022-05-12 15:37:57",
          url: "/苏苏/blcp.docx",
        },
        {
          name: "苏苏/苏苏苏.docx",
          time: "2022-05-12 15:37:57",
          url: "/苏苏/苏苏苏.docx",
        },
        {
          name: "susutest/test2.xlsx",
          time: "2022-05-12 15:37:57",
          url: "/susutest/test2.xlsx",
        },
      ],
      Accept: ".doc,.docx,application/msword,.xlsx,.xls,", //上传文件格式限制
      Format: [".docx", ".doc", ".xlsx", "xls"], //上传文件格式限制
      uploadUrl: "",
      uploadParams: {
        region: "苏苏",
      },
      tabledata,
    };
  },
  created() {
    this.uploadUrl = "http://172.21.34.164:8888/attach/upload";
  },
  methods: {
    beforeUpload(e) {
      //"application/vnd.ms-excel",
      // "application/msword",
      let types = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (types.indexOf(e.type) == -1) {
        this.$Message.error("请上传Excel或者word");
        return false;
      }
    },
    onSuccess(res, file, fileList) {
      if (res.code == 0) {
        this.$Message.success(res.message || "上传成功");
        fileList.forEach((item) => {
          this.fileList.push({
            name: item.name,
            time: item.response.data.createdDate,
            url: item.response.data.attachPath,
          });
        });
      }
    },
    onError(e, file, filelist) {
      console.log("error", e, file, filelist);
    },
    preview(e) {
      let type = this.$tools.getFileType(e.url),
        path = Base64.encode(encodeURIComponent(e.url));

      console.log(path);
      console.log(Base64.decode(path));
      console.log(decodeURIComponent(Base64.decode(path)));
      if (type == "word") {
        axios
          .get("http://172.21.34.103:9999/preview/convert/docx", {
            params: {
              path: path,
            },
            responseType: "blob",
          })
          .then((res) => {
            console.log(res.data);
            this.pdfUrl = window.URL.createObjectURL(
              new Blob([res.data], { type: "application/pdf" })
            );
            console.log(this.pdfUrl);
            window.open(
              "../../pdf/web/viewer.html?file=" +
                encodeURIComponent(this.pdfUrl)
            );
            // window.open(this.pdfUrl);//普通网页
          });
      } else {
        // axios
        //   .get("http://172.21.34.103:9999/preview/convert/xlsx", {
        //     params: {
        //       fileUrl: path,
        //     },
        //     responseType: "arraybuffer", // 设置响应体类型为arraybuffer
        //   })
        //   .then(({ data }) => {
        //     console.log(data);
        //     console.log(XLSX);
        //     let workbook = XLSX.read(new Uint8Array(data), { type: "array" }); // 解析数据
        //     var worksheet = workbook.Sheets[workbook.SheetNames[0]]; // workbook.SheetNames 下存的是该文件每个工作表名字,这里取出第一个工作表
        //     this.tableau = XLSX.utils.sheet_to_html(worksheet); // 渲染
        //   });
        // window.open("../../Xsheet/index.html");
        this.$api.previewExcel({ fileUrl: path }).then((res) => {
          console.log(res);
          if (res.code == "200") {
            // eslint-disable-next-line no-undef
            new XSheet("#demo", {
              workConfig: {
                body: {
                  sheets: [
                    {
                      tableConfig: res.data,
                    },
                  ],
                },
              },
            });
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px;
  font-family: "PingFang SC";
  font-size: 20px;
}
.card {
  box-sizing: border-box;
  padding: 20px;
}
.hd-title {
  color: #333;
  font-size: 20px;
  font-weight: bold;
}
.file-item {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px dashed #ccc;
}
.file-item-name {
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap !important;
  overflow: hidden;
}
.mr20 {
  margin-right: 20px;
}
</style>