<template>
  <div class="inDetail" v-loading="downloading">
    <div class="bgwhite ov" style="padding:0 20px;">
      <div style="text-align:left;margin:20px 0;">
        确认日期
        <el-date-picker
						v-model="queryDate"
						style="width:300px;margin-right:20px;"
						type="monthrange"
						value-format="yyyyMM"
						unlink-panels
            start-placeholder="开始月份"
            end-placeholder="结束月份"
						range-separator="至"
            :picker-options="pickerOptions"
            @change='timeChange'
						>
				</el-date-picker>
        <el-button size="medium" v-if="queryDate && dataSource.length>0" @click="_inSelectListToExcel()"><i class="iconfont icon-daochu"></i>表格导出</el-button>
        <el-button size="medium" v-if="queryDate && dataSource.length>0" @click="_mgExportExcelinfund()"><i class="el-icon-upload el-icon--right"></i>交易记录明细表</el-button>
        <span v-if="queryDate && dataSource.length>0" style="text-align:right;font-weight:bold;">总计：{{totalSaleCost}}元</span>
      </div>
      
      <xtable id="mytable1" :dataSource="dataSource" :columns="cols" class="listTable" v-loading="loading">
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
  </div>
</template>

<script>
import xtable from "@/components/table/clientTable";
import comTitle from '@/basecomp/comTitle'; // 标题
import pagination from '@/basecomp/pagination'; // 分页
import {
  inSelectList,
  inSelectListToExcel,
  mgExportExcelinfund
} from "@/api/mgFundsale";
import axios from 'axios'
import FileSaver from "file-saver";
import XLSX from "xlsx";
import message from "@/utils/message";
export default {
  components: {
     xtable,
     pagination,
     comTitle
  },
  data() {
    return {
      downloading:false,
      loading:false,
      queryDate:'',
      totalSaleCost:0,
      pickerOptions: {
        disabledDate(time) {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            var currentdate = year.toString()  + month.toString();

            var timeyear = time.getFullYear();
            var timemonth = time.getMonth() + 1;
            if (timemonth >= 1 && timemonth <= 9) {
                timemonth = "0" + timemonth;
            }
            var timedate = timeyear.toString() + timemonth.toString();
            return currentdate <= timedate;
        },
      },
      dataSource:[],
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "VC_DATE", //<String>  对应属性名
          label: "日期", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "FUNDNAME", //<String>  对应属性名
          label: "产品名称", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "EN_MANAGERATIO", //<String>  对应属性名
          label: "管理费率", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "EN_BALA", //<String>  对应属性名
          label: "日保有金额（元）", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "RATEBYYEAR", //<String>  对应属性名
          label: "年化费率", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "SALEFEE", //<String>  对应属性名
          label: "销售费用（元）", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
      ],
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
    //this._selectList();
    //this._queryPartnerList();
  },
  methods: {
    timeChange(){
			if (this.queryDate) {
        this._selectList()
      }else{
			}
    },
    formatDate(str){
			return str.substr(0, 4) + '-' + str.substr(4, 2)
    },
    formatDate8 (str) {
				return str.substr(0, 4) + '-' + str.substr(4, 2) + '-' + str.substr(6, 2)
		},
    //合作渠道查询
    _selectList() {
      this.loading = true;
      let params = {
        beginDate:this.formatDate(this.queryDate[0]),
        endDate:this.formatDate(this.queryDate[1]),
        pageIndex:this.page.pageNo,
        pageSize:this.page.pageSize
      };
      inSelectList(params).then(res => {
        this.loading = false;
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.data;
          this.page.total = res.data.count[0].TOTALCOUNT;
          this.totalSaleCost = res.data.bgResultSum
          this.dataSource.forEach(element => {
            element.VC_DATE = this.formatDate8(element.VC_DATE)
            element.EN_BALA = this.$common.numToQfw(element.EN_BALA)
            element.SALEFEE = this.$common.numToQfw(element.SALEFEE)
          });
        }
      });
    },
    //表格导出
    _inSelectListToExcel() {
      this.downloading = true;
      let params = {
        beginDate:this.formatDate(this.queryDate[0]),
        endDate:this.formatDate(this.queryDate[1]),
      };
      inSelectListToExcel(params)
        .then(res => {
          let link = document.createElement("a");
          link.style.display = "none";
          link.setAttribute("target", "_blank");
          console.log(res.data);
          let blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
          });
          link.href = URL.createObjectURL(blob);

          link.setAttribute("download", "IN基金销售费用明细表.xlsx");
          document.body.appendChild(link);
          console.log(link);
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(
              blob,
              'IN基金销售费用明细表' + ".xlsx"
            );
          } else {
            link.click();
          }
          // link.click()
          console.log(link.href);
          //window.location.href=link.href

          document.body.removeChild(link);
          console.log(123);
          this.downloading = false;
        })
        .catch(error => {
          this.downloading = false;
          message.showErrMsg(this, "下载失败");
        });
    },
    //对账明细导出
    _mgExportExcelinfund() {
      this.downloading = true;
      let params = {
        beginDate:this.formatDate(this.queryDate[0]),
        endDate:this.formatDate(this.queryDate[1]),
      };
      mgExportExcelinfund(params)
        .then(res => {
          let link = document.createElement("a");
          link.style.display = "none";
          link.setAttribute("target", "_blank");
          console.log(res.data);
          let blob = new Blob([res.data], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
          });
          link.href = URL.createObjectURL(blob);

          link.setAttribute("download", "IN基金对账明细表.xlsx");
          document.body.appendChild(link);
          console.log(link);
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(
              blob,
              'IN基金对账明细表' + ".xlsx"
            );
          } else {
            link.click();
          }
          // link.click()
          console.log(link.href);
          //window.location.href=link.href

          document.body.removeChild(link);
          console.log(123);
          this.downloading = false;
        })
        .catch(error => {
          this.downloading = false;
          message.showErrMsg(this, "下载失败");
        });
    },
    handleSizeChange(pageSize) {
			this.page.pageSize = pageSize
      this._selectList()
    },
    handleCurrentChange(currentPage) {
			this.page.pageNo = currentPage
      this._selectList()
    },
  },
  
};
</script>

<style lang="scss" scoped>
.inDetail {
  background: #fff;
  margin-bottom: 30px;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  .listTitle {
    padding: 20px 0;
  }
  .listTable {
    // margin:0 20px;
    padding: 20px 0;
  }
}
</style>
<style lang="scss">
.inDetail {
  .el-date-editor .el-range-separator {
			width: 8%;
	}
  .el-form-item__label{
  }
  .el-form-item__content{
  }
}
</style>