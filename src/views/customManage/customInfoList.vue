<template>
  <div class="customInfoList ov" style="padding:0 20px;">
    <div class="filterBox">
      <el-form :model="queryForm" label-width="180px" label-position="right">
        <el-form-item label="客户类型">
          <el-radio-group v-model="queryForm.custType" @change="dataSource = []">
            <el-radio label="1">个人</el-radio>
            <el-radio label="0">机构</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="客户编号">
          <el-input v-model="queryForm.custNo"></el-input>
        </el-form-item>
        <el-form-item label="交易账号">
          <el-input v-model="queryForm.tradeAcco"></el-input>
        </el-form-item>
        <el-form-item label="经纪人编号">
          <el-input v-model="queryForm.broker"></el-input>
        </el-form-item>
        <el-form-item label="交易来源">
          <el-input v-model="queryForm.comeFrom"></el-input>
        </el-form-item>
        <el-form-item label="证件号">
          <el-input v-model="queryForm.identityNo"></el-input>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" @click="_selectHold">立即查询</el-button>
          <el-button @click="clearFilter">清空筛选条件</el-button>
        </div>
      </el-form>
    </div>
    <xtable :dataSource="dataSource" :columns="cols" class="listTable">
      <el-table-column slot="handle-column" align="center" label="操作" min-width="180" fixed="right">
        <template slot-scope="scope">
          <div>
            <el-button
              size="mini"
              type="primary"
              @click="handleBind(scope.row)"
              v-if="queryForm.custType ==1"
            >绑定</el-button>
            <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
          </div>
        </template>
      </el-table-column>
    </xtable>
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
  queryCustomInfoList,
  bindUserInfo
} from "@/api/customManage";
export default {
  components: {
     xtable,
     pagination,
     comTitle
  },
  data() {
    return {
      dataSource:[],
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "custno", //<String>  对应属性名
          label: "客户编号", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "acconame", //<String>  对应属性名
          label: "客户名称", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "capitalmode", //<String>  对应属性名
          label: "资金模式", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "comefrom", //<String>  对应属性名
          label: "交易来源", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "opendate", //<String>  对应属性名
          label: "开户日期", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "broker", //<String>  对应属性名
          label: "经纪人", //<String>   表头标签
          align: "center",//表头内容是否居中
          width: 100,
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "custtype", //<String>  对应属性名
          label: "客户类型", //<String>   表头标签
          width: 100,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "shortIdentityno", //<String>  对应属性名
          label: "证件号码", //<String>   表头标签
          width: 100,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "tradeacco", //<String>  对应属性名
          label: "交易账号", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "phone", //<String>  对应属性名
          label: "电话/手机号", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "state", //<String>  对应属性名
          label: "账号状态", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
      ],
      addDialog:false,
      dialogFormVisible: false,
      queryForm:{
        custType:'1',
        custNo:'',
        tradeAcco: "",
        broker: "",
        comeFrom: "",
        identityNo: "",
      },
      page:{
				pageSizes:[10, 20, 50, 100],
				layout:"total, sizes, prev, pager, next, jumper",
				total:0,
				pageNo:1,
				pageSize:10,
      },
      accountState:[
        {value:0,text:'正常'},
        {value:1,text:'新开户'},
        {value:2,text:'账号登记'},
        {value:5,text:'正在销户'},
        {value:6,text:'销户'},
        {value:'A',text:'挂失'},
        {value:'D',text:'冻结'},
        {value:'F',text:'开户失败'},
        {value:'G',text:'冻结且挂失'},
      ]
    };
  },
  mounted() {
  },
  methods: {
    //查询
    _selectHold() {
      for (const key in this.queryForm) {
        if (this.queryForm.hasOwnProperty(key)) {
          if (this.queryForm[key] == '') {
            delete this.queryForm[key]
          }
        }
      }
      let pageJson = {
        pageSize:this.page.pageSize,
        pageIndex:this.page.pageNo,
      }
      let params = {};
      Object.assign(params,this.queryForm,pageJson)
      console.log(params);
      
      queryCustomInfoList(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.data;
          this.dataSource.forEach(element => {
            this.accountState.forEach(i => {
              if (i.value == element.state) {
                element.state = i.text
              }
            });
          });
          this.page.total = res.data.data.totalRecords
        }
      });
    },
    clearFilter(){
      for (const key in this.queryForm) {
            if (this.queryForm.hasOwnProperty(key)) {
              this.queryForm[key] = ''
            }
          }
      this.queryForm.custType = '1'
    },
    handleEdit(row){
      console.log(row);
      
      this.$router.push({
        name:'客户详情查询',
        query:{
          custType:row.custtype,
          identityNo: row.identityno,
          identityType:row.identityType
        }
      })
    },

    handleBind(row){
      console.log(row);
      this.$confirm('确定进行添加交易账户绑定？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '不绑定',
            type: 'warning'
          }).then(() => {
            let params = {}
            params.identityNo = row.identityno
            params.mobile = row.phone
            params.name = row.acconame
            params.custNo = row.custno
            console.log(params);
            
            bindUserInfo(params).then(res=>{
              if (res.data.code == "0000") {
                console.log(res.data);
                this.$message({
                  type: 'success',
                  message: '添加交易账户绑定成功'
                });
              }else{
                this.$message({
                  type: 'error',
                  message: res.data.message
                });
              }
            })
          }).catch(() => {
            
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
.customInfoList {
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
.customInfoList {
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