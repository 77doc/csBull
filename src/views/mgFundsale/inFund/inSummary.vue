<template>
  <div class="inSummary">
    <div class="bgwhite" style="padding:0 20px 20px;">
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
        <el-button size="medium" v-if="queryDate && dataSource.length>0" @click="_inSelectSummaryToExcel()"><i class="el-icon-upload el-icon--right"></i>表格导出</el-button>
        <span v-if="queryDate && dataSource.length>0" style="text-align:right;font-weight:bold;">总计：{{totalSaleCost}}元</span>
        <el-button size="medium" style="float:right;" v-if='queryDate && userName=="清算用户" && dataSource.length>0' @click="audit()">审核通过</el-button>
      </div>
      <p style="text-align:left;font-weight:bold;">基金总规模&lt;5亿元</p>
       
      <xtable :dataSource="dataSource" :columns="cols" class="listTable">
      </xtable>
      <p style="text-align:left;font-weight:bold;">基金总规模&gt;=5亿元</p>
      <xtable :dataSource="dataSource1" :columns="cols" class="listTable">
      </xtable>
      <!-- <pagination
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :currentPage='page.pageNum'
        :pageSize="page.pageSize"
        :pageSizes="page.pageSizes"
        :layout="page.layout"
        :total="page.total"
        v-show="paginationShow"
      ></pagination> -->
    </div>
  </div>
</template>

<script>
import xtable from "@/components/table/clientTable.vue";
import comTitle from '@/basecomp/comTitle'; // 标题
import pagination from '@/basecomp/pagination'; // 分页
import storage from '@/utils/storage';
import {
  inSelectSummary,
  inAudit,
  inSelectSummaryToExcel,
} from "@/api/mgFundsale";
export default {
  components: {
     xtable,
     pagination,
     comTitle
  },
  data() {
    return {
      queryDate:'',
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
      userName:'',
      dataSource:[],
      dataSource1:[],
      totalSaleCost:0,
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "rateManagerRatio", //<String>  对应属性名
          label: "基金管理费率", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "sumTotalMoney", //<String>  对应属性名
          label: "保有金额累计（元）", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "bgDay", //<String>  对应属性名
          label: "日保有金额（元", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "title", //<String>  对应属性名
          label: "年化费率", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "bgTotal", //<String>  对应属性名
          label: "销售费用小计（元）", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
      ],
      dialogFormVisible: false,
      form: {
        sourcename: '',
        targeturl: null,
        sdtend: '',
        smssuffix: '',
        secretkey: '',
        channelhs: '',
        comefrom: '',
        channel: '',
        isneedtradepassword: false,
        logourl: '',
      },
      handleType:'add',
      page:{
				pageSizes:[10, 20, 50, 100],
				layout:"total, sizes, prev, pager, next, jumper",
				total:0,
				pageNum:1,
				pageSize:10,
			},
    };
  },
  mounted() {
    this.userName = storage.getLocal("username")
    
    //this._selectSummary();
    //this._queryPartnerList();
  },
  methods: {
    timeChange(){
			if (this.queryDate) {
        this._selectSummary()
      }else{
			}
    },
    formatDate(str){
			return str.substr(0, 4) + '-' + str.substr(4, 2)
    },
    getLastMonth(){//获取上个月日期
		    var date = new Date; 
		    var year = date.getFullYear();
		    var month = date.getMonth() + 1 < 10 ? '0' + date.getMonth() : date.getMonth();
		    if(month == 0){
		         year = year -1;
		         month = 12; 
        }
        var lastDay = new Date(year,month,0).getDate();
		    return new Date(year, month, lastDay,23,59).getTime()
		},
    //汇总查询
    _selectSummary() {
      let params = {
        beginDate:this.formatDate(this.queryDate[0]),
        endDate:this.formatDate(this.queryDate[1]),
      };
      inSelectSummary(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.dataLittle;
          this.dataSource1 = res.data.dataBig;
          this.dataSource.concat(this.dataSource1).forEach(element => {
            this.totalSaleCost = this.totalSaleCost + element.bgTotal
          });
          
        }
      });
    },
    audit(){
       this.$confirm("确认审核通过?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            'beginDate':this.formatDate(this.queryDate[0]),
            'endDate':this.formatDate(this.queryDate[1])
          };
          inAudit(params).then(res => {
            if (res.data.code == "0000") {
              console.log(res.data);
            }
          });
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },

    //表格导出
    _inSelectSummaryToExcel() {
      this.downloading = true;
      let params = {
        beginDate:this.formatDate(this.queryDate[0]),
        endDate:this.formatDate(this.queryDate[1]),
      };
      inSelectSummaryToExcel(params)
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

          link.setAttribute("download", "IN基金销售费用汇总表.xlsx");
          document.body.appendChild(link);
          console.log(link);
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(
              blob,
              'IN基金销售费用汇总表' + ".xlsx"
            );
          } else {
            link.click();
          }
          // link.click()
          console.log(link.href);
          // window.location.href=link.href

          document.body.removeChild(link);
          console.log(123);
          this.downloading = false;
        })
        .catch(error => {
          this.downloading = false;
          message.showErrMsg(this, "下载失败");
        });
    },
  },
  
};
</script>

<style lang="scss" scoped>
.inSummary {
  background: #fff;
  border: 1px solid #dcdfe6;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  .listTitle {
    padding: 20px 0;
  }
  .listTable {
    // margin:0 20px;
    padding: 20px 0;
  }
  .el-date-editor .el-range-separator{
			width: auto !important;
		}
}
</style>
<style lang="scss">
.inSummary {
  .el-date-editor .el-range-separator {
			width: 8%;
	}
  .el-form-item__label{
  }
  .el-form-item__content{
  }
}
</style>