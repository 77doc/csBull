<template>
  <div class="bonusQuery ov" style="padding:0 20px;">
    <div class="filterBox">
      <el-form :model="queryForm" label-width="180px" label-position="right">
        <el-form-item label="持仓交易日期">
          <el-date-picker
            v-model="queryForm.holdDate"
            :editable='false'
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd"
            type="date"
            placeholder="必填项"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="恒生客户号">
          <el-input v-model="queryForm.custNo"></el-input>
        </el-form-item>
        <el-form-item label="基金代码">
          <el-input v-model="queryForm.fundCode"></el-input>
        </el-form-item>
        <el-form-item label="来源">
          <el-input v-model="queryForm.comefrom"></el-input>
        </el-form-item>
        <el-form-item label="产品分类">
          <el-input v-model="queryForm.remark"></el-input>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" @click="_selectHold">立即查询</el-button>
          <el-button @click="clearFilter">清空筛选条件</el-button>
        </div>
      </el-form>
    </div>
    <xtable :dataSource="dataSource" :columns="cols" class="listTable">
      <el-table-column slot="handle-column" align="center" label="操作" min-width="120">
        <template slot-scope="scope">
          <div>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="scope.row.num !=1"
            >删除</el-button> -->
            <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
            <el-button size="mini" type='danger' @click="handleDelete(scope.row)">删除</el-button>
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
  selectHold
} from "@/api/customQuery";
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
          prop: "userId", //<String>  对应属性名
          label: "用户编号", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "fundCode", //<String>  对应属性名
          label: "基金代码", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "usefulShare", //<String>  对应属性名
          label: "可用份额", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "totalShare", //<String>  对应属性名
          label: "持有份额", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "marketValue", //<String>  对应属性名
          label: "持有市值", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "sdtPeriod", //<String>  对应属性名
          label: "最新净值日期", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "holdDate", //<String>  对应属性名
          label: "持仓日期", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "holdDatePrev", //<String>  对应属性名
          label: "前交易日", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "unPaidIncome", //<String>  对应属性名
          label: "未付收益（元）", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "dailyIncome", //<String>  对应属性名
          label: "日涨幅", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "totalIncome", //<String>  对应属性名
          label: "总收益", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "comefrom", //<String>  对应属性名
          label: "交易来源", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "custNo", //<String>  对应属性名
          label: "恒生交易编号", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "combCode", //<String>  对应属性名
          label: "组合编号", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "melonMethod", //<String>  对应属性名
          label: "分红方式", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "remark", //<String>  对应属性名
          label: "产品分类", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
      ],
      addDialog:false,
      dialogFormVisible: false,
      queryForm:{
        holdDate: "",
        custNo: "",
        fundCode: "",
        comefrom: "",
        remark: "",
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
  },
  methods: {
    //查询
    _selectHold() {
      if (!this.queryForm.holdDate) {
				this.$msg('warning','持仓交易日期为必填项')
				return false
      }
      for (const key in this.queryForm) {
        if (this.queryForm.hasOwnProperty(key)) {
          if (this.queryForm[key] == '') {
            delete this.queryForm[key]
          }
        }
      }
      let pageJson = {
        pageSize:this.page.pageSize,
        pageNum:this.page.pageNo,
      }
      let params = {};
      Object.assign(params,this.queryForm,pageJson)
      console.log(params);
      
      selectHold(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.data.list;
          this.dataSource.forEach(element => {
            
          });
          this.page.total = res.data.data.total
        }
      });
    },
    clearFilter(){
      for (const key in this.queryForm) {
            if (this.queryForm.hasOwnProperty(key)) {
              this.queryForm[key] = ''
            }
          }
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
.bonusQuery {
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
.bonusQuery {
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