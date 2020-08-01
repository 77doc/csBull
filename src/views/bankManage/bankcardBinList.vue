<template>
  <div class="bankLimit ov" style="padding:0 20px;">
    <xtable :dataSource="dataSource" :columns="cols" class="listTable" v-loading="loading">
      <el-table-column slot="handle-column" align="center" label="操作" min-width="120" fixed="right">
        <template slot-scope="scope">
          <div>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="scope.row.num !=1"
            >删除</el-button> -->
            <el-button size="mini" :disabled="scope.row.CHANNELBANKINFO == '易办事'" @click="handleEdit(scope.row)">编辑</el-button>
            <!-- el-button size="mini" type='danger' @click="handleDelete(scope.row)">删除</el-button> -->
          </div>
        </template>
      </el-table-column>
    </xtable>
    <el-dialog title="编辑银行限额" :visible="dialogFormVisible" :show-close='false'>
      <el-form ref="form" :model="updateForm" label-width="180px" label-position="right">
        <el-form-item label="银行ID">
          <el-input v-model="updateForm.BANKID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="渠道类型">
          <el-input v-model="updateForm.CHANNELBANKINFO" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="updateForm.BANKINFOREMARK" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="每笔限额">
          <el-input v-model="updateForm.QUOTA"></el-input>
        </el-form-item>
        <el-form-item label="日限额">
          <el-input v-model="updateForm.DAILY"></el-input>
        </el-form-item>
        <el-form-item label="月限额">
          <el-input v-model="updateForm.MOTHLY"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_updateLimitByBank">提交</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :currentPage='page.pageNo'
      :pageSize="page.pageSize"
      :pageSizes="page.pageSizes"
      :layout="page.layout"
      :total="page.total"
    ></pagination>
  </div>
</template>

<script>
import xtable from "@/components/table/clientTable";
import pagination from '@/basecomp/pagination'; // 分页
import comTitle from '@/basecomp/comTitle'; // 标题
import {
  getUCGetLimitation,
  updateLimitByBank
} from "@/api/bankManage";
export default {
  components: {
     xtable,
     pagination,
     comTitle
  },
  data() {
    return {
      loading:false,
      dataSource:[],
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "DICVALUE", //<String>  对应属性名
          label: "银行名称", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "CHANNELBANKINFO", //<String>  对应属性名
          label: "渠道类型", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "STRLIMITE", //<String>  对应属性名
          label: "其他业务", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "QUOTA", //<String>  对应属性名
          label: "每笔限额", //<String>   表头标签
          width: 100,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "DAILY", //<String>  对应属性名
          label: "日限额", //<String>   表头标签
          align: "center",//表头内容是否居中
          width: 100,
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "MOTHLY", //<String>  对应属性名
          label: "月限额", //<String>   表头标签
          width: 100,
          align: "center" //表头内容是否居中
        },
      ],
      addDialog:false,
      dialogFormVisible: false,
      updateForm:{
        BANKID: "",
        CHANNELBANKINFO: "",
        BANKINFOREMARK: "",
        QUOTA: "",
        DAILY: "",
        MOTHLY: "",
      },
      page:{
				pageSizes:[10, 20, 50, 100],
				layout:"total, sizes, prev, pager, next, jumper",
				total:0,
				pageNo:1,
				pageSize:10,
			},
    };
  },
  mounted() {
    this._selectHold()
  },
  methods: {
    //查询
    _selectHold() {
      let params = {
        pageSize:this.page.pageSize,
        curPage:this.page.pageNo,
      }
      this.loading = true;
      getUCGetLimitation(params).then(res => {
          this.loading = false;
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.data;
          this.dataSource.forEach(element => {
            if (element.CHANNELBANKINFO == '1') {
              element.CHANNELBANKINFO = '易办事'
            }else if(element.CHANNELBANKINFO == '3'){
              element.CHANNELBANKINFO = '通联'
            }else{
              element.CHANNELBANKINFO = ''
            }
          });
          this.page.total = res.data.dataCount
        }
      });
    },
    handleEdit(value){
      let obj = Object.assign({},value)
      this.dialogFormVisible = true;
      for (const key in this.updateForm) {
        if (this.updateForm.hasOwnProperty(key)) {
          this.updateForm[key] = ''
        }
      }
      this.updateForm = {
        BANKID: value.BANKID,
        CHANNELBANKINFO: value.CHANNELBANKINFO,
        BANKINFOREMARK: value.BANKINFOREMARK,
        QUOTA: value.QUOTA,
        DAILY: value.DAILY,
        MOTHLY: value.MOTHLY,
      }
    },
    //修引流渠道提交
    _updateLimitByBank() {
      this.updateForm.CHANNELBANKINFO = this.updateForm.CHANNELBANKINFO== '通联' ? '3' : '1'
      console.log(this.updateForm);
      updateLimitByBank(this.updateForm).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dialogFormVisible = false
          this._selectHold()
          for (const key in this.updateForm) {
            if (this.updateForm.hasOwnProperty(key)) {
              this.updateForm[key] = ''
            }
          }
        }
      });
    },
    handleSizeChange(pageSize) {
			this.page.pageSize = pageSize
      this._selectHold()
    },
    handleCurrentChange(currentPage) {
			this.page.pageNo = currentPage
      this._selectHold()
    },
  },
  
};
</script>

<style lang="scss" scoped>
.bankLimit {
  background: #fff;
  border: 1px solid #dcdfe6;
  padding: 0px 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  .listTitle {
    padding: 20px 0;
  }
  .listTable {
    // margin:0 20px;
    padding: 20px 0;
  }
  .filterBox{
    margin-top: 20px;
    padding: 20px 0;
  }
}
</style>
<style lang="scss">
.bankLimit {
  .el-form-item__label{
  }
  .el-form-item__content{
  }
  .filterBox{
    .el-form-item {
        margin-bottom: 22px;
        width: 48%;
        display: inline-block;
    }
  }
}
</style>