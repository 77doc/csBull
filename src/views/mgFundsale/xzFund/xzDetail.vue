<template>
  <div class="xzDetail">
    <div class="bgwhite ov" style="padding:0 20px;">
      <div style="text-align:left;margin:20px 0;">
        确认日期
        <el-date-picker
          v-model="queryDate"
          style="width:120px;margin-right:20px;"
          :editable='false'
          value-format="yyyy-MM"
          align='right'
          type="month"
          placeholder="选择月"
          :picker-options="pickerOptions"
           size="medium"
           @change='timeChange'
        >
        </el-date-picker>
        <el-button size="medium" v-if="queryDate && dataSource.length>0" @click="_selectListToExcel()"><i class="el-icon-upload el-icon--right"></i>表格导出</el-button>
        <span v-if="queryDate && dataSource.length>0" style="text-align:right;font-weight:bold;">总计：{{totalSaleCost}}元</span>
      </div>
      
      <xtable :dataSource="dataSource" :columns="cols" class="listTable">
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
  xzSelectList,
  xzSelectListToExcel
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
      dataSource:[],
      totalSaleCost:0,
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "confirmDate", //<String>  对应属性名
          label: "日期", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "brokerName", //<String>  对应属性名
          label: "经纪人名称", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "fundName", //<String>  对应属性名
          label: "产品名称", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "fundType", //<String>  对应属性名
          label: "基金类型", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "amount", //<String>  对应属性名
          label: "认申购金额（元）", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "capitalmode", //<String>  对应属性名
          label: "交易方式", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "fee", //<String>  对应属性名
          label: "收费标准", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "saleCost", //<String>  对应属性名
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
    //合作渠道查询
    _selectList() {
      let params = {
        yearMonth:this.queryDate,
        pageNum:this.page.pageNo,
        pageSize:this.page.pageSize
      };
      xzSelectList(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.data.list;
          this.page.total = res.data.data.count;
          this.totalSaleCost = res.data.data.sumSaleCost
          this.dataSource.forEach(element => {
            element.amount = this.$common.numToQfw(element.amount)
            element.saleCost = this.$common.numToQfw(element.saleCost)
            element.capitalmode = element.capitalmode == '1' ? '线上交易' : '转账交易'
            if (element.fee) {
              element.fee = '每万元补贴金额'+element.fee+'元'
            }
          });
        }
      });
    },
    //表格导出
    _selectListToExcel() {
      let params = {
        yearMonth:this.queryDate,
        pageNum:this.page.pageNo,
        pageSize:this.page.pageSize
      };
      this.downloading = true;
      xzSelectListToExcel(params)
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

          link.setAttribute("download", "新证销售费用明细表.xlsx");
          document.body.appendChild(link);
          console.log(link);
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(
              blob,
              '新证销售费用明细表' + ".xlsx"
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
.xzDetail {
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
}
</style>
<style lang="scss">
.xzDetail {
  .el-form-item__label{
  }
  .el-form-item__content{
  }
}
</style>