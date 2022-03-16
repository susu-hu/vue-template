
<template>
  <el-form
    :model="formData"
    class="demo-ruleForm"
    ref="ruleForm"
    label-position="left"
    label-width="120px"
  >
    <el-col
      :span="formobj.width ? formobj.width : 24"
      v-for="(formobj, index) in formObj"
      :key="index"
      v-show="!formobj.notShow"
    >
      <el-form-item
        :label="formobj.label"
        :prop="formobj.prop"
        :rules="formobj.rules"
      >
        <!-- inupt输入框 -->
        <el-input
          size="small"
          v-if="formobj.input"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          :placeholder="formobj.placeholder"
          @input="inputINPUT($event, index, formobj.prop)"
          @change="inputChange($event, index, formobj.prop)"
        ></el-input>
        <!-- textarea输入框 -->
        <el-input
          size="small"
          type="textarea"
          v-if="formobj.textarea"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          :placeholder="formobj.placeholder"
        ></el-input>
        <!-- select选择器 -->
        <el-select
          size="small"
          v-if="formobj.select"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          :placeholder="formobj.placeholder"
          @change="selectChange($event, index, formobj.prop)"
        >
          <el-option
            :label="options.label"
            :value="options.value"
            v-for="(options, index) in formobj.options"
            :key="index"
          >
          </el-option>
        </el-select>
        <!-- select搜索框 -->
        <el-select
          size="small"
          v-if="formobj.searchSelect"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          filterable
          remote
          reserve-keyword
          :placeholder="formobj.placeholder"
          :remote-method="(query) => remoteMethod(query, index, formobj.prop)"
          @change="selectChange($event, index, formobj.prop)"
          :loading="searchSelectLoading"
        >
          <el-option
            v-for="(item, index) in formobj.options"
            :key="index"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <!-- 年月日时分秒选择器 -->
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetime"
          size="small"
          v-if="formobj.dateTime"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          :placeholder="formobj.placeholder"
        ></el-date-picker>
        <!-- 年月日时分秒，开始和结束时间 -->
        <el-date-picker
          value-format="yyyy-MM-dd HH:mm:ss"
          format="yyyy-MM-dd HH:mm:ss"
          size="small"
          v-if="formobj.dateTimeRange"
          type="datetimerange"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <!-- 时分秒选择器 -->
        <el-time-picker
          value-format="HH:mm:ss"
          format="HH:mm:ss"
          size="small"
          v-if="formobj.timePicker"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          :placeholder="formobj.placeholder"
          :picker-options="formobj.options"
        >
        </el-time-picker>
        <!-- 时分秒选择器，开始和结束时间 -->
        <el-time-picker
          value-format="HH:mm:ss"
          format="HH:mm:ss"
          is-range
          size="small"
          v-if="formobj.timePickerIsRange"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
        <!-- 年月日选择器 -->
        <el-date-picker
          value-format="yyyy-MM-dd"
          size="small"
          v-if="formobj.datePicker"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          :placeholder="formobj.placeholder"
        >
        </el-date-picker>
        <!-- 年月日选择器，开始和介绍年月日 -->
        <el-date-picker
          value-format="yyyy-MM-dd"
          type="daterange"
          size="small"
          v-if="formobj.datePickerIsRange"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          :placeholder="formobj.placeholder"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <!-- switch开关 -->
        <el-switch
          size="small"
          v-if="formobj.switch"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
          @change="formSwitchChange($event, index, formobj.prop)"
        ></el-switch>
        <!-- radio单选框 -->
        <el-radio-group
          v-if="formobj.radio"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
        >
          <el-radio
            :label="options.label"
            :value="options.value"
            v-for="(options, index) in formobj.options"
            :key="index"
          >
          </el-radio>
        </el-radio-group>
        <!-- checkbox复选框 -->
        <el-checkbox-group
          v-if="formobj.checkbox"
          :disabled="formobj.disabled"
          v-model="formData[formobj.prop]"
        >
          <!--eslint-disable -->
          <el-checkbox
            :label="options.label"
            :key="options.value"
            v-for="(options, index) in formobj.options"
          >
          </el-checkbox>
        </el-checkbox-group>
        <!-- 文件上传 --><!-- 如果对象有值就回显，没有值就为空 -->
        <el-upload
          :accept="formobj.accept ? formobj.accept : 'PNG,JPEG'"
          v-if="formobj.upload"
          :ref="formobj.prop"
          :file-list="formData[formobj.prop] ? formData[formobj.prop] : []"
          :action="`${uploadUrl}${
            formobj.uploadObj.fileType ? formobj.uploadObj.fileType : ''
          }`"
          :limit="formobj.uploadObj.limit"
          :class="{
            hide:
              formobj.uploadObj.hideUpload ||
              formData[formobj.prop].length == formobj.uploadObj.limit,
          }"
          :on-preview="handlePictureCardPreview"
          :on-remove="
            (file, fileList) =>
              handleRemove(
                file,
                fileList,
                formobj.uploadObj.limit,
                formobj.prop,
                index
              )
          "
          :on-success="
            (response, file, fileList) =>
              uploadSuccess(
                response,
                file,
                fileList,
                formobj.uploadObj.limit,
                formobj.prop,
                index
              )
          "
          list-type="picture-card"
          :auto-upload="true"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog
          :visible.sync="dialogVisible"
          v-if="formobj.upload"
          :modal-append-to-body="false"
          width="40%"
        >
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>

        <!-- 按钮 -->
        <el-button
          size="small"
          v-if="formobj.button"
          :disabled="formobj.disabled"
          :loading="formobj.loading"
          :type="formobj.buttonType || 'primary'"
          @click="buttonClick(formobj.prop, index)"
          >{{ formobj.placeholder }}</el-button
        >
        <!-- text展示 -->
        <span v-if="formobj.text" v-text="formData[formobj.prop]"></span>
        <!-- 计量单位 -->
        <span class="left10" v-if="formobj.unit">{{ formobj.unit }}</span>

        <!-- 高德地图 -->
        <!-- <div class="amap_div" v-if="formobj.aMap">
					<el-input size="small" v-model="formData[formobj.prop]" @input="aMapInput($event,formobj.prop)"></el-input>
					<ul v-show="searchShow==formobj.prop" class="sreach_ul">
						<li @click="selectVal(sval,formobj.prop,index)" v-for=" (sval, index) in setSearchVal" :key="index">{{sval.name}}
							<span style="color:#8591A6 ;font-size: 12px;">{{sval.district}}</span>
						</li>
					</ul>
					<aMap :ref="'aMap'+formobj.prop" :aMapId="'aMapId'+formobj.prop" :location="formData[formobj.prop+'location']" @cbSearch="cbSearch($event,formobj.prop)"></aMap>
				</div> -->
        <quillEditor
          v-if="formobj.quillEditor"
          :quill="formData[formobj.prop]"
        ></quillEditor>
      </el-form-item>
    </el-col>
  </el-form>
</template>
<script>
// 富文本编辑器:vue-quill-editor---地址：https://github.com/surmon-china/vue-quill-editor
// 1.vue-quill-editor是基于quill(github地址)适用于Vue2的富文本编辑器，所以对于quill的原生属性扩展也是支持的。quill文档地址
// 2.quill 中有许多扩展和自定义方法功能。比如图片的重定义大小、图片上传的点击处理等
export default {
  props: {
    formObj: {
      type: Array,
      required: true,
    },
    formData: {
      type: Object,
      required: true,
    },
    searchSelectOptionsCb: {
      type: Array,
    },
  },
  data() {
    let uploadFileUrl = this.$store.state.user.uploadFileUrl;
    return {
      uploadUrl: uploadFileUrl,
      dialogImageUrl: "",
      searchSelectLoading: false,
      dialogVisible: false,
      disabled: false,
      searchShow: "", //高德地图input收索联想
      setSearchVal: [], //高德地图赋值搜索内容
    };
  },
  created() {},
  watch: {},
  methods: {
    //select变化调用
    selectChange(value, index, prop) {
      this.$emit("selectChange", value, index, prop);
    },
    // input的input事件
    inputINPUT(value, index, prop) {
      this.$emit("inputINPUT", value, index, prop);
    },
    // input的change事件
    inputChange(value, index, prop) {
      this.$emit("inputChange", value, index, prop);
    },
    // 搜索类型select搜索
    remoteMethod(query, index, prop) {
      if (query) {
        this.searchSelectLoading = true;
        this.$emit("querySelectValue", query, index, prop);
        setTimeout(() => {
          this.formObj[index].options = this.searchSelectOptionsCb;
          this.searchSelectLoading = false;
        }, 500);
      } else {
        this.searchSelectOptios = [];
      }
    },
    //switch变化
    formSwitchChange(val, index, prop) {
      this.$emit("formSwitchChange", val, index, prop);
    },
    //按钮点击事件
    buttonClick(prop, index) {
      this.$emit("buttonClick", prop, index);
    },

    //文件上传成功回调
    uploadSuccess(response, file, fileList, limit, prop, index) {
      this.formObj[index].uploadObj.hideUpload = fileList.length == limit; //文件列表变化后判断当前文件列表长度是否等于限制长度。目的，当长度相等时隐藏文件上传按钮
      this.pushUpload(file, fileList, limit, prop);
    },
    //文件删除
    handleRemove(file, fileList, limit, prop, index) {
      this.formObj[index].uploadObj.hideUpload = fileList.length == limit; //文件删除后判断当前文件列表长度是否等于限制长度。目的，当长度相等时隐藏文件上传按钮
      this.pushUpload(file, fileList, limit, prop);
    },
    // 文件预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //提交时验证表单，直接在父级调用
    submitForm() {
      let formValidate = Boolean;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          formValidate = true;
        } else {
          this.$message.warning("请把信息填写完整！");
          formValidate = false;
        }
      });
      return formValidate;
    },
    /* 清空表单
				逻辑：
				1 、如果要清空文件上传列表，要传入要清空的upload的字段名，假如多个upload用for循环，调用清空方法！
				2、清空upload之后，还要把upload上传框展示出来，通过字段名比对，获取到在formObj中的下标，通过下标操作对象属性，进行展示
			 */
    resetForm(uploadArr) {
      this.$refs.ruleForm.resetFields();
      if (uploadArr) {
        for (let i = 0; i < uploadArr.length; i++) {
          this.$refs[uploadArr[i]][0].clearFiles();
          let index = this.formObj.findIndex(
            (item) => item.prop == uploadArr[i]
          );
          this.formObj[index].uploadObj.hideUpload = false;
        }
      }
    },
    // 单个字段验证
    validateFieldProp(prop) {
      let formValidate = Boolean;
      this.$refs.ruleForm.validateField(prop, (valid) => {
        if (!valid) {
          formValidate = true;
        } else {
          formValidate = false;
        }
      });
      return formValidate;
    },
    // 对文件上传，删除进行赋值，调用form验证
    pushUpload(file, fileList, limit, prop) {
      if (fileList.length > 0) {
        this.formData[prop] = fileList;
      } else {
        // 表示没有数据,把字段置空
        this.formData[prop] = "";
      }
      this.$refs.ruleForm.validateField(prop); //调用验证form表单的文件上传
    },
    //地图input的input事件
    aMapInput(value, prop) {
      this.$refs[`aMap${prop}`][0].getSearch(value);
    },
    //子组件返回地图搜索值
    cbSearch(val, prop) {
      this.setSearchVal = val.tips; //子组件
      this.searchShow = prop; //显示input输入联想
    },
    //选中地图值
    /* eslint-disable */
    selectVal(val, prop, index) {
      // 赋值的时候，拿到键，及formobj的下标，进行赋值
      this.formData[prop] = val.name; //input输入框赋值
      this.formData.district = val.district; //传入省市区
      let lngLat = {
        lng: val.location.lng,
        lat: val.location.lat,
      };
      this.formData[`${prop}location`] = lngLat;
      this.searchShow = ""; //隐藏input输入联想
    },
  },
};
</script>
 
<style lang="less" scoped>
@width: 220px;
/deep/.el-input {
  width: @width;
}

/deep/.el-select {
  width: @width;
}

/deep/.el-date-editor.el-input {
  width: @width;
}
/deep/.el-date-editor .el-range-separator {
  width: 20px !important;
}
/deep/.el-range-editor--small.el-input__inner {
  width: 400px;
}

.el-textarea {
  width: 400px;
}

.hide {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}
.amap_div {
  overflow: hidden;
  height: 400px;
  width: 600px;
  position: relative;

  .sreach_ul {
    position: absolute;
    top: 1;
    background-color: white;
    z-index: 9;
    min-width: 210px;
    float: auto;
    height: 200px;
    overflow: auto;
    padding: 0 20px;
    line-height: 24px;
  }
}
</style>