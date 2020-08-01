<template>
  <div class="data-report-container">
    <!-- <upload-excel-component :on-success="handleSuccess" />
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table> -->
    <el-select v-model="selectValue" @change="selectChange" placeholder="请选择上报条目" style="width:200px;">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.label">
      </el-option>
    </el-select>
    <!-- <el-button v-if="btnVal && btnVal != '全部'" class="filter-item" type="primary" icon="el-icon-search">
        导入{{btnVal}}
    </el-button> -->
    <upload-excel-component 
      v-if="btnVal && btnVal != '全部'"
      
      @handlePost="handlePost" 
      :btnName='"导入"+btnVal'/>
    <report-table :list='tableData'></report-table>
    
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/myUpload.vue'
import ReportTable from './components/ReportTable.vue'
import {getAuditInfo,addAuditInfo,updateAuditInfo,deleteAuditInfo,submitAuditInfo,passAuditInfo,rejectAuditInfo} from "@/api/report";

export default {
  name: 'UploadExcel',
  components: { UploadExcelComponent, ReportTable },
  data() {
    return {
      tableData: [],
      selectValue:'全部',
      btnVal:'',
      options:[{
          value: 'all',
          label: '全部'
        },{
          value: 'D1001',
          label: '公司基本信息'
        }, {
          value: '选项2',
          label: '公司分支机构信息'
        }, {
          value: '选项3',
          label: '公司股东信息'
        }, {
          value: '选项4',
          label: '公司股东信息'
        }, {
          value: '选项5',
          label: '公司股东信息'
        }]
    }
  },
  created(){
    this._getAuditInfo('all')
  },
  methods: {
    _getAuditInfo(code){
      console.log(code);
      
      let pcode = '';
      this.options.forEach(element => {
        if (element.label == code) {
          pcode = element.value
        }
      });
      let params = {
        code:pcode
      }
      console.log(params.code);
      this.tableData = [
        {
            "toOrders": 1,
            "completeAudit": "0",
            "canUpdate": "1",
            "fromOrders": 1,
            "reportStatus": "0",
            "userId": 34,
            "operatorName": "施秦",
            "url": "http://xxx",
            "insertTime": "2020-06-22 09:34:48",
            "operationTypeDesc": "保存数据",
            "currentAuditor": "施秦",
            "auditOperationTypeDesc": "",
            "logId": 23,
            "operationType": "0",
            "auditOperationType": null,
            "canDelete": "1",
            "canAudit": "0",
            "canSubmit": "1"
        }
    ]

      /* getAuditInfo(params).then(res=>{
        console.log(res);
        
      }) */
    },
    selectChange(val){
      this.btnVal = this.selectValue;
      this._getAuditInfo(val)
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 3

      if (isLt1M) {
        return true
      }

      this.$message({
        message: '文件太大，请不要超过3M',
        type: 'warning'
      })
      return false
    },
    handlePost(formData){
      console.log(1111);
       addAuditInfo(formData).then(res=>{
        console.log(res);
        
      })
    }
  }
}
</script>
