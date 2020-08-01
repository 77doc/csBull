<template>
  <div class="inDetail" v-loading="downloading">
    <div class="bgwhite ov" style="padding:0 20px;">
      <el-button style= 'margin-top:15px;' @click='changebankstatus()'>新增银行</el-button>
      <xtable :dataSource="dataSource" :columns="cols" class="listTable" :hasxu="true">
        <el-table-column slot="handle-column" align="center" label="操作" min-width="120">
          <template slot-scope="scope">
            <div>
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </xtable>
      <addBank :bankstatus='bankstatus' :bankname='bankname' :bankid='bankid' @closedialog='closedialog()'></addBank>
      <!-- <pagination
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :currentPage='page.pageNo'
        :pageSize="page.pageSize"
        :pageSizes="page.pageSizes"
        :layout="page.layout"
        :total="page.total"
      ></pagination>-->
    </div>
  </div>
</template>

<script>
import xtable from "@/components/table/clientTable";
import comTitle from "@/basecomp/comTitle"; // 标题
import pagination from "@/basecomp/pagination"; // 分页
import { getBankList} from "@/api/bank";
import addBank from "@/views/bankProduct/addbank"
export default {
  components: {
    xtable,
    pagination,
    comTitle,
    addBank
  },
  data() {
    return {
      downloading: false,
      queryDate: "",
      dataSource: [],
      bankstatus:'0',
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "bankName", //<String>  对应属性名
          label: "银行名称", //<String>   表头标签
          align: "center" //表头内容是否居中
        }
      ],
      page: {
        pageSizes: [10, 20, 50, 100],
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0,
        pageNo: 1,
        pageSize: 10
      },
      bankname:'',
      bankid:''
    };
  },
  mounted() {
      this.getbanklist()
  },
  methods: {
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
    },
    handleCurrentChange(currentPage) {
      this.page.pageNo = currentPage;
    },
    changebankstatus(){
        this.bankstatus =1
    },
    handleEdit(value){
        this.bankstatus=2
        this.bankname=value.bankName
        this.bankid=value.id
    },
    closedialog(){
        this.bankstatus =0;
        this.getbanklist()
    },
    //获取银行列表
    getbanklist(){
        let params={


        }
        getBankList(params).then(res =>{
            if(res.data.code =='0000'){
                this.dataSource=res.data.data
            }
        })

    }
  }
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
}
</style>