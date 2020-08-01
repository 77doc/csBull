<template>
  <div class="dialog-table">
    <div class="table-top clearfloat">
      <el-select v-model="value" placeholder="请选择" style="float:left" @change="changValue">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div style='height:40px;float:left;line-height:40px;margin-left:20px;'>
          <el-checkbox v-model="radio" @change="_getFundsByAssetType()">仅显示代销</el-checkbox>
      </div>
      <el-select
        class="inline-input"
        v-model="searchText"
        filterable
        clearable
        remote
        placeholder="输入基金名称/代码"
        :remote-method="searchFundCompany1"
        @change="changDate"
        style="width:250px;margin-left: auto;float:right"
      >
        <el-option
          v-for="(item,index) in searchoptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="table-main">
      <xtable
        :dataSource="dataSource"
        :columns="cols"
        @handleSortChange="handleSortChange"
        class="listTable"
      >
        <el-table-column slot="handle-add" align="center" label="操作" min-width="120">
          <template slot-scope="scope">
            <div v-if="type=='add'">
              <el-button size="mini" @click="addFundcode(scope.row)" v-if="scope.row.canAdd ==1 && scope.row.isProxy =='√'">添加</el-button>
              <div v-else-if="scope.row.isProxy =='×'">非代销</div>
              <div v-else>已添加</div>
            </div>
            <div v-else>
              <el-button
                size="mini"
                @click="updateFundcode(scope.row)"
                v-if="scope.row.canAdd ==1 && scope.row.isProxy =='√'"
              >选择</el-button>
              <div v-else-if="scope.row.isProxy =='×'">非代销</div>
              <div v-else>已选择</div>
            </div>
          </template>
        </el-table-column>
      </xtable>
      <paging @pageChange="pageChange" @sizeChange="sizeChange" :paging="paging"></paging>
    </div>
  </div>
</template>

<script>
import xtable from "@/components/table";
import paging from "@/basecomp/pagging";
import {
  getCurrentConfigFund,
  saveConfig,
  defaultSetting,
  searchFundsByAssetType,
  getFundsByAssetType,
  ztGroupTransfer
} from "@/api/roboAdvisor";
export default {
  props: ["styleType", "alreadyFunds", "type"],
  data() {
    return {
      options: [
        {
          value: "0",
          label: "被动型"
        },
        {
          value: "1",
          label: "主动型"
        },
        {
          value: "2",
          label: "全部"
        }
      ],
      searchoptions: [],
      value: "0",
      searchText: "",
      dataSource: [],
      radio :true,
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "num", //<String>  对应属性名
          label: "排序", //<String>   表头标签
          align: "center", //表头内容是否居中
          width: 80 // 列宽
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "fundName", //<String>  对应属性名
          label: "基金", //<String>   表头标签
          align: "center", //表头内容是否居中
          width: 200 // 列宽
        },
        {
          hasSort: true, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "totalS", //<String>  对应属性名
          label: "基金得分", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: true, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "styleTypeWeight", //<String>  对应属性名
          label: "投资风格", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "isActiveFund", //<String>  对应属性名
          label: "主/被动", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: true, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "fundScale", //<String>  对应属性名
          label: "基金规模", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: true, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "isProxy", //<String>  对应属性名
          label: "是否代销", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: true, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "tradeState", //<String>  对应属性名
          label: "交易状态", //<String>   表头标签
          align: "center" //表头内容是否居中
        }
      ],
      paging: {
        pageSize: 10, // 页大小
        pageNum: 1, // 当前页
        total: 0 //总数
      },
      sort: "",
      order: "",
      fundCode: "" //精确查找的fundCode
    };
  },
  components: {
    xtable,
    paging
  },
  mounted() {},
  methods: {
    init() {
      this.paging = {
        pageSize: 10, // 页大小
        pageNum: 1, // 当前页
        total: 0 //总数
      };
      this.fundCode = "";
      this.dataSource = [];
      this.searchText = "";
      this.value = "0";
      this.searchoptions = [];
      this._getFundsByAssetType();
    },
    //当前页发生改变
    pageChange: function(val) {
      this.paging.pageNum = val;
      this._getFundsByAssetType();
    },

    //每页显示数量发生改变
    sizeChange(val) {
      this.paging.pageSize = val;
      this._getFundsByAssetType();
    },
    //初始化获取列表
    _getFundsByAssetType() {
      let params = {
        orgId: "1",
        styleType: this.styleType,
        alreadyFunds: this.alreadyFunds,
        pageNum: this.paging.pageNum,
        pageSize: this.paging.pageSize,
        fundCode: this.fundCode,
        isProxy:this.radio?'1':'',
        order: this.order,
        sort: this.sort
      };
      if (this.value != "2") {
        params.activeType = this.value;
      }
      getFundsByAssetType(params).then(res => {
        if (res.data.code == "0000") {
          this.paging.total = res.data.data.total;
          console.log(this.paging.total)
          this.dataSource = res.data.data.list;
          this.dataSource.forEach(item => {
            if (item.isActiveFund) {
              item.isActiveFund = item.isActiveFund == 1 ? "主动型" : "被动型";
            }
            if (item.fundName) {
              item.fundName = item.fundCode + " " + item.fundName;
            }
            if (item.isProxy) {
              item.isProxy = item.isProxy == 1 ? "√" : "×";
            }
          });
        }
      });
    },
    //查询接口
    _searchFundsByAssetType(query) {
      let params = {
        orgId: "1",
        styleType: this.styleType,
        keyword: query
      };
      searchFundsByAssetType(params).then(res => {
        if (res.data.code == "0000") {
          this.searchoptions = [];
          let data = res.data.data;
          data.forEach(item => {
            let options = {
              value: item.fundCode,
              label: item.fundName + "(" + item.fundCode + ")"
            };
            this.searchoptions.push(options);
          });
        }
      });
    },
    searchFundCompany1(query) {
      //搜索基金公司
      if (query && query.trim()) {
        this.searchoptions = [];
        this._searchFundsByAssetType(query.trim());
      }
    },
    changDate() {
      this.fundCode = this.searchText;
      this.value = "2";
      this._getFundsByAssetType();
    },
    changValue() {
      this.paging = {
        pageSize: 10, // 页大小
        pageNum: 1, // 当前页
        total: 0
      };
      this._getFundsByAssetType();
    },
    addFundcode(val) {
      console.log(val);
      let obj = {
        fundCode: val.fundCode,
        fundname: val.fundName,
        isActiveFundName: val.isActiveFund,
        status: val.tradeState,
        styleType: this.styleType
      };
      console.log(obj);
      this.$emit("addDateSource", obj);
    },
    updateFundcode(val) {
      let obj = {
        fundCode: val.fundCode,
        fundname: val.fundName,
        isActiveFundName: val.isActiveFund,
        status: val.tradeState,
        styleType: this.styleType
      };
      console.log(obj);
      this.$emit("updateDateSource", obj);
    },
    //排序
    handleSortChange(column) {
      console.log(column.order);
      if (column.order == "descending") {
        this.sort = "DESC";
      } else if (column.order == "ascending") {
        this.sort = "ASC";
      }
      this.cols.forEach((item, index) => {
        if (item.label == column.column.label) {
          this.order = this.cols[index].prop;
        }
      });
      this._getFundsByAssetType();
    }
  }
};
</script>

<style lang="scss" scoped>
.table-main {
  margin-top: 20px;
  padding-bottom:30px;
}
</style>