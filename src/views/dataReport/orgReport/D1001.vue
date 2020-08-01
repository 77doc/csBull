<template>
  <div class="data-report-container">
    <upload-excel-component 
      
      @handlePost="handlePost" 
      :btnName="'导入'+btnName"/>
    <report-table :table-data='tableData' :list-loading='listLoading'>
      <el-table-column slot="handle-column" align="center" label="操作" min-width="220" fixed="right">
        <template slot-scope="{row,$index}">
          <div v-if="row.showAudit=='1'">
            <el-button :disabled="row.canAudit=='0'" size="mini" type="success" @click="handlePass(row)">
              通过
            </el-button>
            <el-button :disabled="row.canAudit=='0'" size="mini" type="danger" @click="handleReject(row)">
              驳回
            </el-button>
          </div>
          <div v-else>
            <upload-excel-component 
            :disabled="row.canUpdate == '0'"
            
            :row-id='row.logId'
            @handlePost="handleUpdate" 
            style='margin-right:10px'
            btnName="更新"/>
            <el-button :disabled="row.canDelete=='0'" size="mini" type="danger" @click="handleDelete(row,$index)">
              删除
            </el-button>
            <el-button :disabled="row.canSubmit=='0'" size="mini" type="success" @click="handleSubmit(row)">
              提交
            </el-button>
          </div>
          
        </template>
    
      </el-table-column>
    </report-table>
    <!-- <pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :currentPage='page.pageNo'
      :pageSize="page.pageSize"
      :pageSizes="page.pageSizes"
      :layout="page.layout"
      :total="page.total"
    ></pagination> -->
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/myUpload.vue'
import ReportTable from '../components/ReportTable.vue'
import pagination from '@/basecomp/pagination'; // 分页
import {
  getD1001AuditInfo,
  addD1001AuditInfo,
  updateD1001AuditInfo,
  deleteD1001AuditInfo,
  submitD1001AuditInfo,
  passD1001AuditInfo,
  rejectD1001AuditInfo} from "@/api/report";

export default {
  name: 'D1001',
  components: { UploadExcelComponent, ReportTable, pagination },
  data() {
    return {
      tableData: [],
      listLoading:true,
      page:{
				pageSizes:[10, 20, 50, 100],
				layout:"total, sizes, prev, pager, next, jumper",
				total:0,
				pageNo:1,
				pageSize:10,
      },
      btnName:''
    }
  },
  created(){
    this.btnName = this.$route.meta.title
    this._getAuditInfo()
  },
  methods: {
    _getAuditInfo(){
      getD1001AuditInfo().then(res=>{
        console.log(res);
        this.listLoading = false;
        this.tableData = res.data.data
      })
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
       addD1001AuditInfo(formData).then(res=>{
        console.log(res);
        if (res.data.code == '0000') {
          this._getAuditInfo()
          this.$notify({
            title: '成功',
            message: '导入成功',
            type: 'success',
            duration: 2000
          })
        }else{

        }
      })
    },
     handleUpdate(formData) {
       updateD1001AuditInfo(formData).then(res=>{
        console.log(res);
        if (res.data.code == '0000') {
          this._getAuditInfo()
          this.$notify({
            title: '成功',
            message: '更新成功',
            type: 'success',
            duration: 2000
          })
        }else{

        }
      })
    },
    handleDelete(row, index) {
      let params = {
        logId:row.logId
      }
      deleteD1001AuditInfo(params).then(res=>{
        console.log(res);
        if (res.data.code == '0000') {
          this._getAuditInfo()
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        }else{

        }
      })
    },
    handleSubmit(row) {
      let params = {
        logId:row.logId
      }
      submitD1001AuditInfo(params).then(res=>{
        console.log(res);
        if (res.data.code == '0000') {
          this._getAuditInfo()
          this.$notify({
            title: '成功',
            message: '提交成功',
            type: 'success',
            duration: 2000
          })
        }else{

        }
      })
    },
    handlePass(row) {
      let params = {
        logId:row.logId
      }
      passD1001AuditInfo(params).then(res=>{
        console.log(res);
        if (res.data.code == '0000') {
          this._getAuditInfo()
          this.$notify({
            title: '成功',
            message: '审批通过',
            type: 'success',
            duration: 2000
          })
        }else{

        }
      })
    },
    handleReject(row) {
      let params = {
        logId:row.logId
      }
      this.$prompt('请输入驳回原因', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator:'',
          inputPattern:/^.{1,100}$/,
          inputErrorMessage: '原因不能为空，且不能超过100字符',
          inputPlaceholder:'请输入驳回原因，不超过100字符',
        }).then(({ value }) => {
          params.reason = value
          rejectD1001AuditInfo(params).then(res=>{
            console.log(res);
            if (res.data.code == '0000') {
              this._getAuditInfo()
              this.$notify({
                title: '成功',
                message: '审批驳回',
                type: 'success',
                duration: 2000
              })
            }else{

            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
        });
      
    },
    handleSizeChange(pageSize) {
			this.page.pageSize = pageSize
      this._getAuditInfo()
    },
    handleCurrentChange(currentPage) {
			this.page.pageNo = currentPage
      this._getAuditInfo()
    },
  }
}
</script>
