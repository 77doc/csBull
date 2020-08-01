<template>
  <div class="customInfo ov" style="padding:0 20px;">
    <div class="filterBox">
      <el-form :model="queryForm" label-width="180px" label-position="right">
        <el-form-item label="客户类型">
          <el-radio-group v-model="queryForm.custType">
            <el-radio label="1">个人</el-radio>
            <el-radio label="0">机构</el-radio>
          </el-radio-group>
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
    <!-- <div class="linkList">
      <router-link to="/holdQuery"><el-button type="text">客户持仓查询</el-button></router-link>
      <router-link to="/holdFundIncome"><el-button type="text">持仓基金收益查询</el-button></router-link>
      <router-link to="/acountIncome"><el-button type="text">帐户收益查询</el-button></router-link>
      <router-link to="/transConfirm"><el-button type="text">交易确认查询</el-button></router-link>
      <router-link to="/bonusQuery"><el-button type="text">分红查询</el-button></router-link>
      <router-link to="/privateFundHoldList"><el-button type="text">私募投资查询</el-button></router-link>
    </div>
    <div class="linkList" v-if="queryForm.custType == 2 && dataSource.length>0">
      <router-link to="/holdQuery"><el-button type="text">客户持仓查询</el-button></router-link>
      <router-link to="/holdFundIncome"><el-button type="text">持仓基金收益查询</el-button></router-link>
      <router-link to="/acountIncome"><el-button type="text">帐户收益查询</el-button></router-link>
      <router-link to="/transConfirm"><el-button type="text">交易确认查询</el-button></router-link>
      <router-link to="/bonusQuery"><el-button type="text">分红查询</el-button></router-link>
      <router-link to="/privateFundHoldList"><el-button type="text">私募投资查询</el-button></router-link>
    </div> -->
    <ul class="dataList" v-if="dataSource.length>0">
      <li>
        <span>生日:</span>{{dataSource.birthday}}
      </li>
      <li>
        <span>客户编号:</span>{{dataSource.custno}}
      </li>
      <li>
        <span>账号状态:</span>{{dataSource.accoStatusText}}
      </li>
      <li>
        <span>联系地址:</span>{{dataSource.communicationaddr}}
      </li>
      <li>
        <span>开户日期:</span>{{dataSource.opendate}}
      </li>
      <li>
        <span>网上交易是否开通:</span>{{dataSource.netconsign}}
      </li>
      <li>
        <span>开户手机号:</span>{{dataSource.handset}}
      </li>
      <li>
        <span>邮箱:</span>{{dataSource.email}}
      </li>
      <li>
        <span>是否最低风险承受能力:</span>{{dataSource.minriskflag}}
      </li>
      <li>
        <span>职业:</span>{{dataSource.work}}
      </li>
      <li>
        <span>性别:</span>{{dataSource.sex}}
      </li>
      <li>
        <span>证件有效期:</span>{{dataSource.invalidate}}
      </li>
      <li>
        <span>经纪人:</span>{{dataSource.broker}}
      </li>
      <li>
        <span>证件号:</span>{{dataSource.idno}}
      </li>
      <li>
        <span>风险测评状态:</span>{{dataSource.riskFlag}}
      </li>
      <li>
        <span>手机委托是否开通:</span>{{dataSource.mobiletrust}}
      </li>
      <li>
        <span>账户实际受益人:</span>{{dataSource.beneficiary}}
      </li>
      <li>
        <span>风险问卷更新日期:</span>{{dataSource.riskUpdateTime}}
      </li>
    </ul>
    <div v-else class="el-table__empty-block" style="height: 500px;"><span class="el-table__empty-text">暂无数据</span></div>
  </div>
</template>

<script>
import xtable from "@/components/table/clientTable";
import pagination from '@/basecomp/pagination'; // 分页
import comTitle from '@/basecomp/comTitle'; // 标题
import {
  getAccountInfoByIdNo
} from "@/api/customManage";
export default {
  components: {
     xtable,
     pagination,
     comTitle
  },
  data() {
    return {
      dataSource:{},
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
        custType:'',
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
    console.log(this.$route.query);
    
    this.queryForm = {
      custType:this.$route.query.custType || '1',
        identityNo: this.$route.query.identityNo || '',
    }
  },
  methods: {
    //查询
    _selectHold() {
      let params = {
        custType:this.queryForm.custType,
        identityno:this.queryForm.identityNo,
        identityType:'0',
      }
      
      getAccountInfoByIdNo(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.data;
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
.customInfo {
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
  .dataList{
    overflow: hidden;
    border: 1px solid #dcdfe6;
    margin-bottom: 20px;
    padding: 0 20px;
    li{
      width: 50%;
      line-height: 30px;
      margin: 20px 0;
      float: left;
      font-size: 18px;
      span{
        width: 30%;
      }
    }
  }
  .linkList{
    a{
      span{
        font-size: 18px;
      }
      margin: 0 20px;
    }
  }
}
</style>
<style lang="scss">
.customInfo {
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