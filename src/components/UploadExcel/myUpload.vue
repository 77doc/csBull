<template>
  <span>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls, .zip" @change="handleClick">
      <el-button :disabled='disabled' size="mini" type="primary" @click="handleUpload">
        {{btnName}}
      </el-button>
  </span>
</template>

<script>
import XLSX from 'xlsx'
export default {
  props: {
    btnName:{
      type:String,
      default:'导入'
    },
    apiAdress:{
      type:String,
      default:''
    },
    rowId:{
      type:Number,
      default:0
    },
    disabled:{
      type:Boolean,
      default:false
    },
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      console.log(e.target.value);
      let inputDOM = this.$refs['excel-upload-input'];
      var file = inputDOM.files[0]
      console.log(file);
      var formData = new FormData();
      formData.append("file", file);
      if (this.rowId) {
        formData.append("logId", this.rowId);
      }
      e.target.value = '';
      this.$emit('handlePost',formData)
      /* axios({
          method: "post",
          url: process.env.VUE_APP_BASE_API + this.apiAdress,
          data: formData,
          headers: {
              'Content-Type': 'multipart/form-data',  // 文件上传
              'token' : getToken()
          },
      }).then(function (res) {
          console.log(res);
            this.$emit('upload-success',res)
          if (res.data.code == '0000') {
          }else{
            this.$emit('upload-fail',res)
          }
      }).catch(function (reason) {

      }) */
      /* axios({
          method: "post",
          url: "process.env.VUE_APP_BASE_API/qszg/qs/uploadQslcExcelFile",
          data: formData,
          headers: {
              'Content-Type': 'multipart/form-data',  // 文件上传
          },
      }).then(function (res) {
          console.log(res);
          if (res.data.code == '0000') {
            console.log(111);
            this.$emit('handlePost',formData)
            that._getNeedQslcData()
          }
      }).catch(function (reason) {

      }) */
    },
  }
}
</script>

<style scoped>
.excel-upload-input{
  display: none;
  z-index: -9999;
}
.drop{
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
