<template>
  <div class="Upload">
    <Upload
      v-if="UploadStyle == 'no'"
      multiple
      type="drag"
      :accept="Accept"
      :format="Format"
      :max-size="FileMaxSize"
      :before-upload="HandleUpload"
      :action="UploadUrl"
      :data="UploadParams"
    >
      <div style="text-align: center">
        <Icon
          type="ios-monitor-outline"
          style="font-size: 32px; color: #c5c5c5"
        ></Icon>
        <p style="color: #999">从本地添加</p>
      </div>
    </Upload>
    <Button
      v-if="UploadStyle == 'has'"
      style="padding: 0px 0px"
      type="ghost"
      @click="AgainUpload"
    >
      <Upload
        multiple
        type="drag"
        :accept="Accept"
        :format="Format"
        :max-size="FileMaxSize"
        :before-upload="HandleUpload"
        :action="UploadUrl"
        :data="UploadParams"
      >
        本地添加
      </Upload>
    </Button>
    <Modal
      :title="ModalTitle"
      v-model="UploadModal"
      :styles="{ top: '348px' }"
      width="420"
    >
      <div style="text-align: center">
        <div style="margin: 20px 10px">
          <!-- 上传文件 -->
          <div v-if="UploadState == 'before-upload'">
            <div class="demo-upload-list">
              <img :src="ImgUrl" />
            </div>
            <span class="upload-span">{{ File.name }}</span>
          </div>
          <!-- 进度条 -->
          <div v-else-if="UploadState == 'on-progress'">
            <div class="demo-upload-list">
              <Progress
                :percent="PercentNum"
                :status="ProgressStatus"
                hide-info
              ></Progress>
            </div>
            <span class="upload-span">上传进度：{{ PercentNum }}%</span>
          </div>
          <!-- 上传成功 -->
          <div v-else-if="UploadState == 'on-success'">
            <div class="demo-upload-list">
              <img style="width: 103px; height: 74px" :src="SuccessImgUrl" />
            </div>
            <span class="upload-span">{{ UploadMessage }}</span>
            <span class="upload-span">{{ FilesNum }} 个文件上传成功 </span>
          </div>
          <!-- 上传失败 -->
          <div v-else-if="UploadState == 'on-error'" style="height: 30px">
            <div
              class="demo-upload-list"
              style="float: left; margin-left: 100px"
            >
              <img :src="ErrorImgUrl" style="width: 24px; height: 24px" />
            </div>
            <div
              class="demo-upload-list"
              style="
                width: 200px;
                float: left;
                margin-left: 20px;
                text-align: left;
              "
            >
              <span style="font-size: 16px; font-weight: bold"
                >文件上传失败</span
              >
              <br />
              <span class="upload-span">网络出现异常，请点击再次上传</span>
            </div>
          </div>
          <!-- 上传超限 -->
          <div v-else-if="UploadState == 'max-size'">
            <div class="demo-upload-list">
              <img :src="ErrorImgUrl" />
            </div>
            <span class="upload-span">{{ UploadMessage }}</span>
          </div>
        </div>
      </div>
      <div slot="footer">
        <div v-if="UploadState == 'before-upload'">
          <Checkbox class="center-checkbox" v-model="SynchronousCloud"
            >同步</Checkbox
          >
          <Button
            type="ghost"
            @click="UploadModal = false"
            style="border: solid 1px #dcdcdc; color: #888"
            >取消</Button
          >
          <Button type="primary" @click="Upload" :loading="loadingStatus"
            >上传</Button
          >
        </div>
        <div
          v-else-if="UploadState == 'on-progress'"
          style="text-align: center"
        >
          <Button type="primary" loading>文件上传中...</Button>
        </div>
        <div v-else-if="UploadState == 'on-success'" style="text-align: center">
          <Button type="primary" @click="UploadModal = false">完成</Button>
          <Button
            v-if="FilesNum < 5"
            type="ghost"
            @click="AgainUpload"
            style="padding: 0px 0px"
          >
            <Upload
              multiple
              type="drag"
              :accept="Accept"
              :format="Format"
              :max-size="FileMaxSize"
              :before-upload="HandleUpload"
              :action="UploadUrl"
              :data="UploadParams"
            >
              继续上传
            </Upload>
          </Button>
        </div>
        <div v-else-if="UploadState == 'on-error'" style="text-align: center">
          <Button type="primary" @click="Upload">点击重试</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
 
<script type="text/ecmascript-6">
import { Icon, Upload, Modal, Checkbox, Button, Progress } from "iView";
import { Random } from "../../services/utils/utils";
export default {
  name: "PrepareUpload",
  props: ["SetUploadParams", "UploadStyle"],
  data() {
    return {
      ModalTitle: "本地文件上传",
      UploadModal: false,
      SynchronousCloud: true,
      ImgUrl: "",
      SuccessImgUrl: "/static/images/success_upload.png",
      ErrorImgUrl: "/static/images/error_icn.png",
      File: [], //file内容
      FilesID: [], //上传文件ID数组
      FilesNum: 0, //上传文件总个数
      FileMaxNum: 5, //最多上传文件数量
      Accept:
        ".pdf,.pptx,.docx,.xlsx,.png,.jpg,.jpeg,.gif,.mp4,.mpeg,.mpg,.avi,.mov,.wmv,.mkv,.flv,.mp3,.wave,.wma", //上传文件格式限制
      Format: [
        ".pdf",
        ".pptx",
        ".docx",
        ".xlsx",
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".mp4",
        ".mpeg",
        ".mpg",
        ".avi",
        ".mov",
        ".wmv",
        ".mkv",
        ".flv",
        ".mp3",
        ".wave",
        ".wma",
      ], //上传文件格式限制
      FileMaxSize: 2048 * 20, //文件最大支持20兆
      VerifyType: "num", //验证类型 num:文件数量 size:文件大小 type:文件类型
      loadingStatus: false, //上传按钮状态
      UploadParams: {}, //上传接口所需参数
      UploadState: "before-upload", //上传当前状态
      PercentNum: 0, //进度条百分数
      ProgressStatus: "active", //进度条状态
    };
  },
  components: {
    Icon: Icon,
    Upload: Upload,
    Modal: Modal,
    Checkbox: Checkbox,
    Button: Button,
    Progress: Progress,
  },
  methods: {
    HandleUpload(file) {
      //控制最多上传文件数量
      if (this.FilesNum > this.FileMaxNum - 1) {
        this.VerifyType = "num";
        this.UploadState = "max-size";
        this.UploadModal = true;
        setTimeout(() => {
          this.UploadModal = false;
        }, 1500);
        return false;
      }
      var imgUrl;
      var fileType = file.name.split(".");
      fileType = fileType[fileType.length - 1].toLowerCase();
      switch (fileType) {
        case "pdf":
        case "pptx":
          imgUrl = "ppt_icn.png";
          break;
        case "docx":
          imgUrl = "word_icn.png";
          break;
        case "xlsx":
          imgUrl = "xlsx_icn.png";
          break;
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
          imgUrl = "img_icn.png";
          break;
        case "mp4":
        case "mpeg":
        case "mpg":
        case "avi":
        case "mov":
        case "wmv":
        case "mkv":
        case "flv":
          imgUrl = "video_icn.png";
          break;
        case "mp3":
        case "wave":
        case "wma":
          imgUrl = "voice_icn.png";
          break;
        default:
          break;
      }
      this.ImgUrl = "/static/images/" + imgUrl;
      this.File = file;
      this.UploadParams = this.$props.SetUploadParams;

      this.UploadParams.File = file;
      this.UploadParams.FileName = file.name;

      //初始化
      this.UploadState = "before-upload";
      this.PercentNum = 0;
      this.ProgressStatus = "active";

      this.UploadModal = true;
      return false; //阻断自动上传
    },
    Upload() {
      this.loadingStatus = true;
      this.UploadState = "on-progress";
      var num = 0;
      for (;;) {
        num = Random(100);
        if (num > 75 && num < 95) {
          break;
        }
      }
      for (let index = 1; index < num + 1; index++) {
        this.PercentNum = index;
      }
    },
    AgainUpload() {
      //   this.UploadModal = false;
      //   console.log(this.$refs);
      //   this.$refs.inputFile.getFile();
    },
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    UploadMessage() {
      if (this.VerifyType == "num") {
        return "文件 【" + this.UploadParams.FileName + "】 上传成功";
      } else if (this.VerifyType == "size") {
        return "本地上传文件大小不能超过20M";
      } else if (this.VerifyType == "type") {
        return "本地上传文件错误";
      }
    },
  },
};
</script>
 
<style lang="scss" scoped type="text/css">
.center-checkbox {
  float: left;
  position: relative;
  top: 8px;
  color: #888;
  font-size: 12px;
}
.demo-upload-list img {
  width: 42px;
  height: 48px;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
.upload-span {
  margin-top: 6px;
  font-size: 14px;
  color: #333;
}
</style>