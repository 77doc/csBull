<template>
  <div class="inDetail" v-loading="downloading">
    <div class="bgwhite ov" style="padding:0 20px;">
      <el-button style="margin-top:15px;" @click="changeproductstatus()">新增产品</el-button>
      <xtable :dataSource="dataSource" :columns="cols" class="listTable" :hasxu="true">
        <el-table-column slot="handle-column" align="center" label="操作" min-width="200">
          <template slot-scope="scope">
            <div style="display:flex">
              <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>

              <el-button
                size="mini"
                @click="_changeProductState(scope.row)"
              >{{scope.row.state =='上架' ?"下架":"上架"}}</el-button>

              <el-button size="mini" @click="handleMove(scope.row,0)" v-if="scope.row.orderNum !=1">上移</el-button>
              <el-button size="mini" @click="handleMove(scope.row,1)">下移</el-button>
            </div>
          </template>
        </el-table-column>
      </xtable>
      <addProduct
        :productstatus="productstatus"
        :productname="productname"
        :productid="productid"
        @closedialog="closedialog()"
      ></addProduct>
      <p>上架产品数/总产品数：{{onself}} /{{page.total}}</p>
      <pagination
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :currentPage="page.pageNo"
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
import comTitle from "@/basecomp/comTitle"; // 标题
import pagination from "@/basecomp/pagination"; // 分页
import {
  getProductList,
  changeProductState,
  changeProductOrder
} from "@/api/bank";
import addProduct from "@/views/bankProduct/addproduct";
export default {
  components: {
    xtable,
    pagination,
    comTitle,
    addProduct
  },
  data() {
    return {
      downloading: false,
      queryDate: "",
      dataSource: [],
      productstatus: "0",
      onself: "",
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "bankName", //<String>  对应属性名
          label: "银行名称", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "productName", //<String>  对应属性名
          label: "产品名称", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "title", //<String>  对应属性名
          label: "主标题", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "subTitle", //<String>  对应属性名
          label: "副标题", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "rate", //<String>  对应属性名
          label: "产品利率（%）", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "rateType", //<String>  对应属性名
          label: "利率类型", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "termType", //<String>  对应属性名
          label: "产品期限", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "state", //<String>  对应属性名
          label: "状态", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "channels", //<String>  对应属性名
          label: "上架渠道", //<String>   表头标签
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
      productname: "",
      productid: ""
    };
  },
  mounted() {
    this._getProductList();
  },
  methods: {
    handleSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this._getProductList();
    },
    handleCurrentChange(currentPage) {
      this.page.pageNo = currentPage;
      this._getProductList();
    },
    changeproductstatus() {
      this.productid = "";
      this.productstatus = 1;
    },
    handleEdit(value) {
      this.productstatus = 2;
      this.productname = value.productName;
      this.productid = value.id;
    },
    _changeProductState(value) {
      console.log(value);
      let params = {
        productId: value.id,
        type: value.state == "上架" ? "0" : "1"
      };
      changeProductState(params).then(res => {
        if (res.data.code == "0000") {
          //this.$msg("success", "操作成功");
          this._getProductList();
        } else {
          //this.$msg("error", res.data.message);
        }
      });
    },
    closedialog() {
      this.productstatus = 0;
      this._getProductList();
    },
    handleMove(val, type) {
      let params = {
        productId: val.id,
        type: type
      };
      changeProductOrder(params).then(res => {
        if (res.data.code == "0000") {
          //this.$msg("success", "操作成功");
          this._getProductList();
        } else {
          //this.$msg("error", res.data.message);
        }
      });
    },
    //获取银行列表
    _getProductList() {
      let params = {
        pageNum: this.page.pageNo,
        pageSize: this.page.pageSize
      };
      getProductList(params).then(res => {
        if (res.data.code == "0000") {
          this.dataSource = res.data.data.list;
          this.page.total = res.data.data.total;
          this.onself = res.data.data.onShelf;
          this.dataSource.forEach(item => {
            item.state = item.state == 1 ? "上架" : "下架";
            item.channels = item.channels.join(",");
          });
        }
      });
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