<template>
  <div class="data-report-table">

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="数据ID" prop='logId' :sortable="true" align="center" width="80">
        <template slot-scope="{row}">
          <span>{{ row.logId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作人" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operatorName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" min-width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.insertTime | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作描述" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.operationTypeDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文件地址" min-width="150px" align="center">
        <template slot-scope="{row}">
          <a traget='_blank' style="text-decoration: underline;color: #1890ff;" :href='row.url'>{{ row.url }}</a>
        </template>
      </el-table-column>
      <el-table-column label="当前操作人" width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.currentAuditor }}</span>
        </template>
      </el-table-column>
      <el-table-column label="本节点审批操作描述" width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.auditOperationTypeDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="驳回原因" width="110px" align="center">
        <template slot-scope="{row}">
          <span style="color:red;">{{ row.reason }}</span>
        </template>
      </el-table-column>
      <slot name="handle-column"></slot>
    </el-table>


  </div>
</template>

<script>
import { parseTime } from '@/utils'

export default {
  name: 'ReportTable',
  filters: {
  },
  props: {
    tableData:{
      type:Array,
      default:[]
    },
    listLoading: {
      type:Boolean,
      default:true
    },
  },
  data() {
    return {
      tableKey: 0,
      showReviewer: false,
    }
  },
  created() {
  },
  methods: {
    
   
  }
}
</script>
<style lang="scss">
  .data-report-table{
    margin-top:20px;
  }
</style>
