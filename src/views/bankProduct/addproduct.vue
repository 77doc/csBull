<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleClose">
      <div class="infolist">
        <span>银行名称</span>
        <el-select
          v-model="bankname"
          placeholder="请选择银行"
          style="width:200px;margin-left:20px;margin-right:20px"
        >
          <el-option v-for="item in options" :key="item.id" :label="item.bankName" :value="item.id"></el-option>
        </el-select>
        <span style="color:#409eff;cursor:pointer;" @click='gobank'>银行名单管理</span>
      </div>
      <div class="infolist">
        <span>产品名称</span>
        <el-input v-model="productName" style="width:200px;margin-left:20px;margin-right:20px"></el-input>
        <span>{{productName.length}}/12</span>
      </div>
      <div class="infolist">
        <span>产品代码</span>
        <el-input v-model="productCode" style="width:200px;margin-left:20px;margin-right:20px"></el-input>
        <!-- <span>（尼克提供）</span> -->
      </div>
      <div class="infolist">
        <span>产品标题</span>
        <el-input v-model="productTitle" style="width:200px;margin-left:20px;margin-right:20px"></el-input>
        <span>{{productTitle.length}}/16</span>
      </div>
      <div class="infolist">
        <span>产品副标题</span>
        <el-input v-model="title" style="width:200px;margin-left:20px;margin-right:20px"></el-input>
        <span>{{title.length}}/16</span>
      </div>
      <div class="infolist">
        <span>产品利率（%）</span>
        <el-input v-model="rate" style="width:200px;margin-left:20px;margin-right:20px"></el-input>
        <span>{{rate.length}}/12</span>
      </div>
      <div class="infolist">
        <span>利率类型</span>
        <el-input v-model="rateType" style="width:200px;margin-left:20px;margin-right:20px"></el-input>
        <span>{{rateType.length}}/8</span>
      </div>
      <div class="infolist">
        <span>产品期限</span>
        <el-select
          v-model="termType"
          placeholder="请选择产品期限"
          style="width:200px;margin-left:20px;margin-right:20px"
        >
          <el-option
            v-for="item in options1"
            :key="item.termCode"
            :label="item.termName"
            :value="item.termCode"
          ></el-option>
        </el-select>
      </div>
      <div class="infolist">
        <span>宣传标签</span>
        <el-select
          v-model="productLabel"
          placeholder="请选择宣传标签"
          style="width:200px;margin-left:20px;margin-right:20px"
        >
          <el-option v-for="item in options2" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </div>
      <div class="infolist">
        <span>上架渠道</span>
        <xtable :dataSource="tableData" :columns="cols" class="listTable">
          <el-table-column slot="handle-column" align="center" label="操作" min-width="120">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.select"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeSwitch(scope.$index)"
              ></el-switch>
            </template>
          </el-table-column>
        </xtable>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addBank, editBank } from "@/api/bank";
import { getProductDetail, addOrEditProduct } from "@/api/bank";
import xtable from "@/components/table/clientTable";
export default {
  props: ["productstatus", "productid", "productname"],
  components: {
    xtable
  },
  data() {
    return {
      dialogVisible: false,
      name: "",
      dialogTitle: "新增产品",
      options: [],
      bankname: "",
      productName: "",
      productCode: "",
      productTitle: "",
      title: "",
      rate: "",
      rateType: "",
      productLabel: "",
      clientId: "",
      termType: "",
      options1: [],
      options2: [
        {
          name: "限购",
          value: "限购"
        },
        {
          name: "爆款",
          value: "爆款"
        },
        {
          name: "上新",
          value: "上新"
        },
        {
          name: "限购",
          value: "限购"
        }
      ],
      tableData: [],
      clientIds: [],
      productId: "",
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "name", //<String>  对应属性名
          label: "渠道名称", //<String>   表头标签
          align: "center" //表头内容是否居中
        }
      ]
    };
  },
  methods: {
    handleClose(done) {
      this.$emit("closedialog");
    },
    submit() {
      this.submitProduct();
    },
    init() {
      this.bankname = "";
      this.productName = "";
      this.productCode = "";
      this.productTitle = "";
      this.title = "";
      this.rate = "";
      this.rateType = "";
      this.termType = "";
      this.productLabel = "";
      this.clientIds = [];
    },
    gobank(){
        this.$router.push({  //核心语句
        path:'/bankProduct/banklist',   //跳转的路径
       
      })
    },
    //获取银行列表
    _getProductDetail() {
      let params = {
        productId: this.productid
      };
      getProductDetail(params).then(res => {
        if (res.data.code == "0000") {
          if (res.data.data.product) {
            let data = res.data.data.product;
            this.bankname = data.bankId;
            this.productName = data.productName;
            this.productCode = data.productCode;
            this.productTitle = data.title;
            this.title = data.subTitle;
            this.rate = data.rate.toString();
            this.rateType = data.rateType;
            this.termType = data.termType;
            this.productLabel = data.productLabel;
            this.clientIds = data.clientIds;
            this.productId = this.id;
          }
          this.options = res.data.data.bankList;
          this.options1 = res.data.data.termTypes;
          this.tableData = res.data.data.channels;
          this.tableData.forEach(item => {
            if (this.clientIds) {
              if (this.clientIds.indexOf(item.clientId) > -1) {
                item.select = true;
              } else {
                item.select = false;
              }
            }
          });
        }
      });
    },
    //新增修改产品
    submitProduct() {
      let clientIds = "";
      this.tableData.forEach(item => {
        if (item.select == true) {
          clientIds = clientIds + item.clientId + ",";
        }
      });
      let params = {
        productCode: this.productCode,
        productName: this.productName,
        bankId: this.bankname,
        title: this.productTitle,
        subTitle: this.title,
        rate: this.rate,
        rateType: this.rateType,
        termType: this.termType,
        productLabel: this.productLabel,
        clientIds: clientIds.substring(0, clientIds.length - 1)
      };
      if (this.productstatus == 2) {
        params.id = this.productid;
      }
      addOrEditProduct(params).then(res => {
        if (res.data.code == "0000") {
          //this.$msg("success", "操作成功");
          this.$emit("closedialog");
        } else {
          //this.$msg("error", res.data.message);
        }
      });
    },
    changeSwitch(index) {
      console.log(13123);
      console.log(this.tableData[index].select);

      this.$set(this.tableData, index, this.tableData[index]);
      console.log(this.tableData);
    }
  },
  watch: {
    //0为隐藏并且初始化 1是增加  2是编辑
    productstatus() {
      if (this.productstatus == 1) {
        this.dialogVisible = true;
        this.init();
        this.dialogTitle = "新增产品";
        this._getProductDetail();
      } else if (this.productstatus == 2) {
        this.dialogVisible = true;
        this.dialogTitle = "编辑产品";
        this._getProductDetail();
      } else if (this.productstatus == 0) {
        this.dialogVisible = false;
        this.init();
      }
    },
    productName() {
      this.productName = this.productName.substring(0, 12);
    },
    productTitle() {
      this.productTitle = this.productTitle.substring(0, 16);
    },
    title() {
      this.title = this.title.substring(0, 16);
    },
    rate() {
      this.rate = this.rate.substring(0, 12);
    },
    rateType() {
      this.rateType = this.rateType.substring(0, 8);
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.infolist {
  margin: 20px 0;
  display: flex;
  span:first-child {
    width: 100px;
    display: block;
  }
}
</style>