<template>
  <div class="fundlist">
    <div style="display:flex;margin-left:20px;margin-top:20px;">
      <p :class="status ==1?'select':'noselect'" @click="nextstatus" style="cursor:pointer">资产比例配置</p>
      <img src="./right.png" style="width:30px;height:20px;margin:7px 10px;" />
      <p :class="status ==2?'select':'noselect'">基金配置</p>
    </div>
    <div v-if="status ==1">
      <p style="text-align:right;  color:#999;font-size:12px;" class="listTitle">{{titlemsg}}</p>
      <xtable
        :dataSource="tadata"
        v-loading="loading"
        :columns="cols1"
        class="listTable"
        @addbai="addbai"
        :height="500"
      ></xtable>
    </div>
    <div v-if="status ==2">
      <p
        style="text-align:right;  color:#999;font-size:12px;"
        class="listTitle"
      >{{nextTransferInfo}}</p>
      <xtable
        :dataSource="dataSource"
        :columns="cols"
        class="listTable"
        :height="500"
        v-loading="loading1"
      >
        <el-table-column slot="handle-column" align="center" label="操作" min-width="120">
          <template slot-scope="scope">
            <div style="text-align:left">
              <el-button
                size="mini"
                type="success"
                @click="handleEdit(scope.$index,scope.row,'add')"
                v-if="scope.row.num != '' && scope.row.num <5"
                :disabled="(buttonArr.indexOf('添加') >-1?false:true) || secondDisabled"
              >添加</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                v-if="scope.row.num !=1&&scope.row.fundname"
                :disabled="(buttonArr.indexOf('删除') >-1?false:true) || secondDisabled"
              >删除</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index,scope.row,'update')"
                v-if="scope.row.fundname"
                :disabled="(buttonArr.indexOf('替换') >-1?false:true) || secondDisabled"
              >替换</el-button>
            </div>
          </template>
        </el-table-column>
      </xtable>
    </div>

    <div style="margin-top: 20px;margin-bottom:20px;text-align:right;margin-right:20px;">
      <!-- <el-button v-if="haveupdate" @click="_saveConfig()" :disabled="inTimeWindow">保存配置</el-button>
      <el-button v-if="haveupdate" @click="cancalConfig()" :disabled="inTimeWindow">取消配置</el-button>
      <el-button v-if="showButton" @click="_defaultSetting()" :disabled="inTimeWindow">恢复默认配置</el-button>
      <el-button v-if="!haveupdate" @click="_ztGroupTransfer()" :disabled="inTimeWindow">立即调仓</el-button>-->
      <el-button
        @click="firstsynchrodata()"
        v-if="status==1"
        :disabled="(buttonArr.indexOf('同步资产参考配置') >-1?false:true) || firstDisabled"
      >同步资产参考配置</el-button>
      <el-button
        @click="_saveAssetConfig()"
        v-if="status==1"
        :disabled="(buttonArr.indexOf('保存资产配置') >-1?false:true) || firstDisabled"
      >保存资产配置</el-button>
      <el-button
        @click="nextstatus()"
        v-if="status==1"
        :disabled="(buttonArr.indexOf('下一步') >-1?false:true) "
      >下一步，基金配置</el-button>
      <el-button
        @click="secondsynchrodata()"
        v-if="status==2"
        :disabled="(buttonArr.indexOf('同步基金参考配置') >-1?false:true) || secondDisabled"
      >同步基金参考配置</el-button>
      <el-button @click="_saveConfig()" v-if="status==2" :disabled="(buttonArr.indexOf('同步基金参考配置') >-1?false:true) || secondDisabled">保存基金配置</el-button>
      <el-button
        @click="_ztGroupTransfer()"
        :disabled="(buttonArr.indexOf('同意调仓') >-1?false:true) || secondDisabled"
        v-if="status==2"
      >同意调仓</el-button>
    </div>
    <el-dialog :visible.sync="dialogTableVisible" width="90%">
      <addFund
        :styleType="styleType"
        :alreadyFunds="alreadyFunds"
        :type="type"
        @addDateSource="addDateSource"
        @updateDateSource="updateDateSource"
        ref="refAdd"
      ></addFund>
    </el-dialog>

    <el-dialog title="提示" :visible.sync="showMessage" width="40%">
      <span>确认立即调仓</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showMessage = false">取 消</el-button>
        <el-button type="primary" @click="submitSave()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import xtable from "@/components/table";
import addFund from "./addFund";
import { getUserButton } from "@/api/authority";
import {
  getCurrentConfigFund,
  saveConfig,
  defaultSetting,
  searchFundsByAssetType,
  getFundsByAssetType,
  ztGroupTransfer,
  getAssetConfig,
  saveAssetConfig,
  transfer
} from "@/api/roboAdvisor";
export default {
  components: {
    xtable,
    addFund
  },
  data() {
    return {
      dataSource: [],
      showMessage: false,
      canTransfer: true,
      titlemsg: "",
      cols1: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "groupname", //<String>  对应属性名
          label: "", //<String>   表头标签
          fixed: true,
          align: "center", //表头内容是否居中
          width: 140 // 列宽
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "ZZ1000", //<String>  对应属性名
          label: "中证100", //<String>   表头标签
          haschange: true,
          width: 180,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "ZZ0500", //<String>  对应属性名
          label: "中证500", //<String>   表头标签
          haschange: true,
          width: 180,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "SH0300", //<String>  对应属性名
          label: "沪深300", //<String>   表头标签
          haschange: true,
          width: 180,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "HSIHK", //<String>  对应属性名
          label: "恒生", //<String>   表头标签
          haschange: true,
          width: 180,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "SP500", //<String>  对应属性名
          label: "标普", //<String>   表头标签
          haschange: true,
          width: 180,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "B00IPE", //<String>  对应属性名
          label: "原油", //<String>   表头标签
          haschange: true,
          width: 180,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "AU9999", //<String>  对应属性名
          label: "黄金", //<String>   表头标签
          haschange: true,
          width: 180,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "SH0012", //<String>  对应属性名
          label: "国债", //<String>   表头标签
          haschange: true,
          width: 180,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "MONEY", //<String>  对应属性名
          label: "货币", //<String>   表头标签
          haschange: true,
          width: 180,
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "sum", //<String>  对应属性名
          label: "总计", //<String>   表头标签
          width: 120,
          fixed: "right",
          align: "center" //表头内容是否居中
        }
      ],
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "styleTypeName", //<String>  对应属性名
          label: "大类资产", //<String>   表头标签
          align: "center", //表头内容是否居中

          width: 120 // 列宽
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "ckfdName", //<String>  对应属性名
          label: "模型参考配置", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "fundname", //<String>  对应属性名
          label: "当前配置", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "isActiveFundName", //<String>  对应属性名
          label: "主/被动", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "status", //<String>  对应属性名
          label: "交易状态", //<String>   表头标签
          align: "center" //表头内容是否居中
        }
      ],
      showButton: "0",
      loading: false,
      loading1: false,
      haveupdate: false,
      dialogTableVisible: false,
      styleType: "",
      alreadyFunds: "",
      tabledata: [],
      tadata: [],
      nextTransferInfo: "",
      inTimeWindow: "0",
      status: "1",
      buttonArr: [],
      firstDisabled: false,
      secondDisabled: false,
      updateindex: "", //被替换的index
      type: "" //打开弹窗的方式 add为添加 update为替换
    };
  },
  mounted() {
    this._getCurrentConfigFund();
    this._getAssetConfig();
    this._getUserButton();
  },
  methods: {
    _getUserButton() {
      let params = {
        menuId: 14
      };
      getUserButton(params).then(res => {
        if (res.data.code == "0000") {
          let data = res.data.data;
          data.forEach(item => {
            this.buttonArr.push(item.label);
          });
        }
      });
    },
    addbai() {
      let that = this;

      this.tadata.forEach((item, index) => {
        item.current.ZZ1000 =
          that.$common.fmoney(item.current.ZZ1000, 2, false, true) + "%";
        item.current.SH0300 =
          that.$common.fmoney(item.current.SH0300, 2, false, true) + "%";
        item.current.ZZ0500 =
          that.$common.fmoney(item.current.ZZ0500, 2, false, true) + "%";
        item.current.SH0012 =
          that.$common.fmoney(item.current.SH0012, 2, false, true) + "%";
        item.current.HSIHK =
          that.$common.fmoney(item.current.HSIHK, 2, false, true) + "%";
        item.current.SP500 =
          that.$common.fmoney(item.current.SP500, 2, false, true) + "%";
        item.current.AU9999 =
          that.$common.fmoney(item.current.AU9999, 2, false, true) + "%";
        item.current.B00IPE =
          that.$common.fmoney(item.current.B00IPE, 2, false, true) + "%";
        item.current.MONEY =
          that.$common.fmoney(item.current.MONEY, 2, false, true) + "%";
        // item.current.ZZ1000 =
        //   item.current["ZZ1000"].toString().indexOf("%") > -1
        //     ? that.$common.fmoney(item.current.ZZ1000,2,false,true)
        //     : that.$common.fmoney(item.current.ZZ1000,2,false,true) + "%";
        // item.current.SH0300 =
        //   item.current["SH0300"].toString().indexOf("%") > -1
        //     ? that.$common.fmoney(item.current.SH0300,2,false,true)
        //     : that.$common.fmoney(item.current.SH0300,2,false,true) + "%";
        // item.current.SH0012 =
        //   item.current["SH0012"].toString().indexOf("%") > -1
        //     ? that.$common.fmoney(item.current.SH0012,2,false,true)
        //     : that.$common.fmoney(item.current.SH0012,2,false,true) + "%";
        // item.current.ZZ0500 =
        //   item.current["ZZ0500"].toString().indexOf("%") > -1
        //     ? that.$common.fmoney(item.current.ZZ0500,2,false,true)
        //     : that.$common.fmoney(item.current.ZZ0500,2,false,true) + "%";
        // item.current.HSIHK =
        //   item.current["HSIHK"].toString().indexOf("%") > -1
        //     ? that.$common.fmoney(item.current.HSIHK,2,false,true)
        //     : that.$common.fmoney(item.current.HSIHK,2,false,true) + "%";
        // item.current.SP500 =
        //   item.current["SP500"].toString().indexOf("%") > -1
        //     ? that.$common.fmoney(item.current.SP500,2,false,true)
        //     : that.$common.fmoney(item.current.SP500,2,false,true) + "%";
        // item.current.AU9999 =
        //   item.current["AU9999"].toString().indexOf("%") > -1
        //     ? that.$common.fmoney(item.current.AU9999,2,false,true)
        //     : that.$common.fmoney(item.current.AU9999,2,false,true) + "%";
        // item.current.B00IPE =
        //   item.current["B00IPE"].toString().indexOf("%") > -1
        //     ? that.$common.fmoney(item.current.B00IPE,2,false,true)
        //     : that.$common.fmoney(item.current.B00IPE,2,false,true) + "%";
        // item.current.MONEY =
        //   item.current["MONEY"].toString().indexOf("%") > -1
        //     ? that.$common.fmoney(item.current.MONEY,2,false,true)
        //     : that.$common.fmoney(item.current.MONEY,2,false,true) + "%";
        item.sum =
          this.$common.fmoney(
            parseFloat(item.current.ZZ1000) +
              parseFloat(item.current.SH0300) +
              parseFloat(item.current.SH0012) +
              parseFloat(item.current.ZZ0500) +
              parseFloat(item.current.HSIHK) +
              parseFloat(item.current.SP500) +
              parseFloat(item.current.AU9999) +
              parseFloat(item.current.B00IPE) +
              parseFloat(item.current.MONEY),
            2,
            false,
            true
          ) + "%";
        that.$set(that.tadata, index, that.tadata[index]);
      });
    },
    //第一个页面的同步模型参数
    firstsynchrodata() {
      let that = this;
      this.tadata.forEach(item => {
        item.disabled = item.disabled == 0 ? false : true;
        item.current.SH0300 =
          that.$common.fmoney(item.reference.SH0300, 2, false, true) + "%";
        item.current.SH0012 =
          that.$common.fmoney(item.reference.SH0012, 2, false, true) + "%";
        item.current.ZZ0500 =
          that.$common.fmoney(item.reference.ZZ0500, 2, false, true) + "%";
        item.current.ZZ1000 =
          that.$common.fmoney(item.reference.ZZ1000, 2, false, true) + "%";
        item.current.HSIHK =
          that.$common.fmoney(item.reference.HSIHK, 2, false, true) + "%";
        item.current.SP500 =
          that.$common.fmoney(item.reference.SP500, 2, false, true) + "%";
        item.current.AU9999 =
          that.$common.fmoney(item.reference.AU9999, 2, false, true) + "%";
        item.current.B00IPE =
          that.$common.fmoney(item.reference.B00IPE, 2, false, true) + "%";
        item.current.MONEY =
          that.$common.fmoney(item.reference.MONEY, 2, false, true) + "%";
        item.sum =
          that.$common.fmoney(
            parseFloat(item.current.ZZ1000) +
              parseFloat(item.current.SH0300) +
              parseFloat(item.current.SH0012) +
              parseFloat(item.current.ZZ0500) +
              parseFloat(item.current.HSIHK) +
              parseFloat(item.current.SP500) +
              parseFloat(item.current.AU9999) +
              parseFloat(item.current.B00IPE) +
              parseFloat(item.current.MONEY),
            2,
            false,
            true
          ) + "%";
      });
    },
    //第二个页面 同步数据
    secondsynchrodata() {
      console.log(this.dataSource);
      let that = this;
      this.dataSource.forEach((item, index) => {
        //  item.styleType=''
        if (item.ckfdName) {
          if (item.fundname == "" && item.ckfdName != "") {
            if (item.num == "") {
              let styleType = item.styleType;
              this.addnum(styleType);
            } else {
            }
          }
          item.fundCode = item.ckpzCode;
          item.fundname = item.ckfdName;
          item.status = item.ckpzstatus;
          item.isActiveFundName = item.ckpzisActiveFundName;
        } else {
          let styleType = item.styleType;
          this.reducenum(styleType);
          console.log(index);
          // this.dataSource.splice(index, 1);
        }
      });
      this.deletedata();
      console.log(this.dataSource);
    },
    deletedata() {
      // this.dataSource.forEach((item,index) => {
      //   if(item.ckfdName =='' || !item.ckfdName ||item.ckfdName =='undefined'){
      //      this.dataSource.splice(index,1)

      //   }
      // });
      for (var i = this.dataSource.length - 1; i >= 0; i--) {
        if (this.dataSource[i].ckfdName == "" || !this.dataSource[i].ckfdName) {
          this.dataSource.splice(i, 1);
        }
      }
    },
    //
    _getAssetConfig() {
      this.loading1 = true;
      let params = {
        orgId: "1"
      };
      getAssetConfig(params).then(res => {
        if (res.data.code == "0000") {
          this.tadata = res.data.data.list;
          let data = res.data.data.list;
          this.titlemsg = res.data.data.message;
          this.firstDisabled = res.data.data.disabled == 0 ? false : true;
          data.forEach((item, index) => {
            item.groupname = "风险等级" + item.riskLevel;
            item.sum =
              item.current.ZZ1000 +
              item.current.SH0300 +
              item.current.SH0012 +
              item.current.ZZ0500 +
              item.current.HSIHK +
              item.current.SP500 +
              item.current.AU9999 +
              item.current.B00IPE +
              item.current.MONEY +
              "%";
            item.current.ZZ1000 =
              this.$common.fmoney(item.current.ZZ1000, 2, false, true) + "%";
            item.current.SH0300 =
              this.$common.fmoney(item.current.SH0300, 2, false, true) + "%";
            item.current.SH0012 =
              this.$common.fmoney(item.current.SH0012, 2, false, true) + "%";
            item.current.ZZ0500 =
              this.$common.fmoney(item.current.ZZ0500, 2, false, true) + "%";
            item.current.HSIHK =
              this.$common.fmoney(item.current.HSIHK, 2, false, true) + "%";
            item.current.SP500 =
              this.$common.fmoney(item.current.SP500, 2, false, true) + "%";
            item.current.AU9999 =
              this.$common.fmoney(item.current.AU9999, 2, false, true) + "%";
            item.current.B00IPE =
              this.$common.fmoney(item.current.B00IPE, 2, false, true) + "%";
            item.current.MONEY =
              this.$common.fmoney(item.current.MONEY, 2, false, true) + "%";
          });
          this.loading1 = false;
        } else {
          this.loading1 = false;
        }
      });
    },
    //切换状态
    nextstatus() {
      if (this.status == 1) {
        let flag = 1;
        this.tadata.forEach(item => {
          if (parseFloat(item.sum) != 100) {
            flag = 2;
          }
        });
        if (flag == 1) {
          this.status = 2;
        } else {
          this.$msg("error", "资产配置比例和不为100%");
        }
      } else if (this.status == 2) {
        this.status = 1;
      }
    },
    //获取智能投顾基金配置信息
    _getCurrentConfigFund() {
      this.loading = true;
      let params = {
        orgId: "1"
      };
      getCurrentConfigFund(params).then(res => {
        if (res.data.code == "0000") {
          let data = res.data.data;
          this.inTimeWindow = data.inTimeWindow;
          this.nextTransferInfo = data.nextTransferInfo;
          this.secondDisabled = res.data.data.disabled == 0 ? false : true;
          this.canTransfer = res.data.data.canTransfer == 0 ? false : true;
          let table = data.list;
          this.tabledata = data.list;
          let obj = {};
          let arr = [];
          console.log(table);
          table.forEach(item => {
            item.fundList.forEach((temp, index) => {
              obj = {};
              obj = {
                styleTypeName: index == 0 ? item.styleTypeName : "",
                num: index == 0 ? item.fundList.length : "",
                fundname: temp.fundCode + " " + temp.fundName,
                isActiveFundName: temp.isActiveFundName,
                status: temp.onRedeemName + "/" + temp.onSaleName,
                styleType: item.styleType,
                fundCode: temp.fundCode,
                ckpzstatus: item.modelFundList[index]
                  ? item.modelFundList[index].onRedeemName +
                    "/" +
                    item.modelFundList[index].onSaleName
                  : "",
                ckpzisActiveFundName: item.modelFundList[index]
                  ? item.modelFundList[index].isActiveFundName
                  : "",
                ckpzCode: item.modelFundList[index]
                  ? item.modelFundList[index].fundCode
                  : "",
                ckfdName: item.modelFundList[index]
                  ? item.modelFundList[index].fundCode +
                    " " +
                    item.modelFundList[index].fundName
                  : ""
              };
              arr.push(obj);
            });
            item.modelFundList.forEach((temp, index) => {
              obj = {};
              obj = {
                styleTypeName: "",
                num: "",
                fundname: "",
                isActiveFundName: "",
                status: "",
                styleType: item.styleType,
                fundCode: "",
                ckpzCode: item.modelFundList[index].fundCode,
                ckpzstatus:
                  item.modelFundList[index].onRedeemName +
                  "/" +
                  item.modelFundList[index].onSaleName,
                ckpzisActiveFundName:
                  item.modelFundList[index].isActiveFundName,
                ckfdName:
                  item.modelFundList[index].fundCode +
                  " " +
                  item.modelFundList[index].fundName
              };
              if (index > item.fundList.length - 1) {
                arr.push(obj);
              } else {
              }
              // if (item.modelFundList.length > item.fundList.length) {
              //   arr.push(obj);
              // }
            });
          });
          this.dataSource = arr;
          this.loading = false;
          console.log(arr);
        } else {
          this.loading = false;
        }
      });
    },
    //恢复默认配置
    _defaultSetting() {
      this.$confirm("确认恢复默认配置?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
            orgId: "1"
          };
          defaultSetting(params).then(res => {
            if (res.data.code == "0000") {
              this.$msg({
                showClose: true,
                message: "成功恢复默认配置",
                type: "success"
              });
              this.haveupdate = false;
              this._getCurrentConfigFund();
            } else {
              this.$msg({
                showClose: true,
                message: res.data.message,
                type: "error"
              });
            }
          });
        })
        .catch(() => {});
    },
    //
    _saveAssetConfig() {
      let list = [];
      this.tadata.forEach(item => {
        let temp = {
          AU9999: Number(
            item.current.AU9999.substring(0, item.current.AU9999.length - 1)
          ),
          B00IPE: Number(
            item.current.B00IPE.substring(0, item.current.B00IPE.length - 1)
          ),
          riskLevel: Number(item.riskLevel),
          SH0012: Number(
            item.current.SH0012.substring(0, item.current.SH0012.length - 1)
          ),
          SP500: Number(
            item.current.SP500.substring(0, item.current.SP500.length - 1)
          ),
          SH0300: Number(
            item.current.SH0300.substring(0, item.current.SH0300.length - 1)
          ),
          ZZ0500: Number(
            item.current.ZZ0500.substring(0, item.current.ZZ0500.length - 1)
          ),
          ZZ1000: Number(
            item.current.ZZ1000.substring(0, item.current.ZZ1000.length - 1)
          ),
          HSIHK: Number(
            item.current.HSIHK.substring(0, item.current.HSIHK.length - 1)
          ),
          MONEY: Number(
            item.current.MONEY.substring(0, item.current.MONEY.length - 1)
          )
        };
        list.push(temp);
      });
      let params = {
        // orgId: 1,
        configList: list
      };
      saveAssetConfig(params).then(res => {
        if (res.data.code == "0000") {
          this.$msg("success", "保存成功");
        } else {
          this.$msg("error", res.data.message);
        }
      });
    },
    //定期调仓
    _transfer() {
      let params = {
        // orgId:"1"
      };
      transfer(params).then(res => {
        if (res.data.code == "0000") {
          // this.$msg(
          //   "success",
          //   "调仓方案已提交，正在调仓。稍后请在客户端查看调仓情况"
          // );

          this.showMessage = false;
          this.$alert(
            "调仓方案已提交，正在调仓。稍后请在客户端查看调仓情况",
            "调仓成功",
            {
              confirmButtonText: "确定",
              callback: action => {}
            }
          );
          this._getAssetConfig();
          this._getCurrentConfigFund();
        } else {
          this.$msg("error", res.data.message);
        }
      });
    },
    async submitSave() {
      this._transfer();
    },
    //立即调仓
    _ztGroupTransfer() {
      this.showMessage = true;
    },
    //打开添加、替换弹窗
    handleEdit(index, value, type) {
      if (type == "update") {
        this.updateindex = index;
      }
      console.log(value);
      this.styleType = value.styleType;
      let alreadyFunds = "";
      console.log(this.dataSource);
      this.dataSource.forEach(item => {
        if (item.styleType == value.styleType) {
          alreadyFunds = alreadyFunds + "," + item.fundCode;
        }
      });

      alreadyFunds = alreadyFunds.substr(1);
      this.alreadyFunds = alreadyFunds;
      console.log(this.$refs);
      this.type = type;
      this.dialogTableVisible = true;
      this.$nextTick(() => {
        this.$refs.refAdd.init();
        // this.$refs.refAdd._getFundsByAssetType();
      });
    },
    //删除提示
    handleDelete(i, val) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.dataSource[i].ckfdName) {
            if (this.dataSource[i].num != "") {
              this.dataSource[i].fundname = this.dataSource[i + 1].fundname;
              this.dataSource[i].fundCode = this.dataSource[i + 1].fundCode;
              this.dataSource[i].isActiveFundName = this.dataSource[
                i + 1
              ].isActiveFundName;
              this.dataSource[i].status = this.dataSource[i + 1].status;
              if (this.dataSource[i + 1].ckfdName) {
                this.dataSource[i + 1].fundname = "";
                this.dataSource[i + 1].fundCode = "";
                this.dataSource[i + 1].isActiveFundName = "";
                this.dataSource[i + 1].status = "";
              } else {
                this.dataSource.splice(i + 1, 1);
              }
            } else {
              this.dataSource[i].fundname = "";
              this.dataSource[i].fundCode = "";
              this.dataSource[i].isActiveFundName = "";
              this.dataSource[i].status = "";
            }
          } else {
            this.dataSource.splice(i, 1);
          }
          console.log(this.dataSource);
          if (val.num == "") {
            this.dataSource.forEach(item => {
              if (item.styleType == val.styleType) {
                if (item.num != "") {
                  item.num = item.num - 1;
                }
              }
            });
            console.log(this.dataSource);
          } else {
            for (var j = 0; j < this.dataSource.length; j++) {
              let item = this.dataSource[j];
              if (item.styleType == val.styleType) {
                item.num = val.num - 1;
                // item.styleTypeName = val.styleTypeName;
                return;
              }
            }
          }
        })
        .catch(() => {
          // this.$msg({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    addnum(type) {
      this.dataSource.forEach(item => {
        if (item.styleType == type) {
          if (item.num != "") {
            item.num = item.num + 1;
          }
        }
      });
    },
    reducenum(type) {
      this.dataSource.forEach(item => {
        if (item.styleType == type) {
          if (item.num != "" && item.num != 1) {
            item.num = item.num - 1;
          }
        }
      });
    },
    //表格添加基金
    addDateSource(val) {
      this.dialogTableVisible = false;
      this.haveupdate = true;
      for (let i = 0; i < this.dataSource.length; i++) {
        let item = this.dataSource[i];
        if (item.styleType == val.styleType) {
          if (item.fundname != "" && item.ckfdName != "") {
            // function adddata(type1, k) {
            //   console.log(k);
            //   console.log(type2);
            //   if (type1[k].styleType != val.styleType) {
            //     let tem = {
            //       styleTypeName: "",
            //       num: "",
            //       fundname: val.fundname,
            //       isActiveFundName: val.isActiveFundName,
            //       status: val.status,
            //       styleType: val.styleType,
            //       fundCode: val.fundCode
            //     };
            //     that.dataSource.splice(k, 0, tem);
            //     if (item.num != "") {
            //       item.num = item.num + 1;
            //     }
            //     return;
            //   } else {
            //     if (type1[k].fundname == "" && type1[k].ckfdName != "") {
            //       item.fundname = val.fundname;
            //       item.isActiveFundName = val.isActiveFundName;
            //       item.status = val.status;
            //       item.styleType = val.styleType;
            //       item.fundCode = val.fundCode;
            //       return;
            //     } else {
            //       if (k < that.dataSource.length) {
            //         k++;
            //         console.log(k)
            //         console.log(that.dataSource.length)
            //         // adddata(type1, k);
            //       }
            //     }
            //   }
            // }
            // adddata(this.dataSource, i + 1);
            if (i == this.dataSource.length - 1) {
              let tem = {
                styleTypeName: "",
                num: "",
                fundname: val.fundname,
                isActiveFundName: val.isActiveFundName,
                status: val.status,
                styleType: val.styleType,
                fundCode: val.fundCode
              };
              this.dataSource.splice(i + 1, 0, tem);
              if (item.num != "") {
                item.num = item.num + 1;
              }
              return;
            } else {
              if (this.dataSource[i + 1].styleType != val.styleType) {
                let tem = {
                  styleTypeName: "",
                  num: "",
                  fundname: val.fundname,
                  isActiveFundName: val.isActiveFundName,
                  status: val.status,
                  styleType: val.styleType,
                  fundCode: val.fundCode
                };
                this.dataSource.splice(i + 1, 0, tem);
                if (item.num != "") {
                  item.num = item.num + 1;
                }
                return;
              } else {
                if (
                  this.dataSource[i + 1].fundname == "" &&
                  this.dataSource[i + 1].ckfdName == ""
                ) {
                } else if (item.fundname == "" && item.ckfdName != "") {
                  item.fundname = val.fundname;
                  item.isActiveFundName = val.isActiveFundName;
                  item.status = val.status;
                  item.styleType = val.styleType;
                  item.fundCode = val.fundCode;
                  return;
                } else {
                  // let tem = {
                  //   styleTypeName: "",
                  //   num: "",
                  //   fundname: val.fundname,
                  //   isActiveFundName: val.isActiveFundName,
                  //   status: val.status,
                  //   styleType: val.styleType,
                  //   fundCode: val.fundCode
                  // };
                  // this.dataSource.splice(i + 1, 0, tem);
                  // item.num = item.num + 1;
                  // return;
                }
              }
            }
          } else if (item.fundname == "" && item.ckfdName != "") {
            item.fundname = val.fundname;
            item.isActiveFundName = val.isActiveFundName;
            item.status = val.status;
            item.styleType = val.styleType;
            item.fundCode = val.fundCode;
            return;
          } else {
            let tem = {
              styleTypeName: "",
              num: "",
              fundname: val.fundname,
              isActiveFundName: val.isActiveFundName,
              status: val.status,
              styleType: val.styleType,
              fundCode: val.fundCode
            };
            this.dataSource.splice(i + 1, 0, tem);
            // item.num = item.num + 1;
            this.addnum(item.styleType);
            return;
          }
        } else {
        }

        this.$set(this.dataSource, i, this.dataSource[i]);
      }
      console.log(this.dataSource);
    },
    //替换基金
    updateDateSource(val) {
      this.dialogTableVisible = false;
      this.haveupdate = true;
      let item = this.dataSource[this.updateindex];
      item.fundname = val.fundname;
      item.fundCode = val.fundCode;
      item.status = val.status;
      item.isActiveFundName = val.isActiveFundName;
    },
    //保存配置
    _saveConfig() {
      let list = [];
      console.log(this.dataSource);
      this.dataSource.forEach(item => {
        let temp = {
          styleType: item.styleType,
          fundCode: item.fundCode
        };
        list.push(temp);
      });
      console.log(list);
      let params = {
        orgId: "1",
        list: list
      };
      console.log(params);
      saveConfig(params).then(res => {
        if (res.data.code == "0000") {
          this.$msg("success", "保存成功");
          // this.haveupdate = false;
          // this._getCurrentConfigFund();
          // this._transfer();
        } else {
          this.$msg("error", res.data.message);
        }
      });
    },
    //取消配置
    cancalConfig() {
      this.haveupdate = false;
      this._getCurrentConfigFund();
    }
  },
  watch: {
    tadata() {
      // let that=this
      // this.tadata.forEach((item,index) => {
      //    item.current.ZZ1000 = item.current.ZZ1000+'%';
      //    item.current.SH0300 = item.current.SH0300+'%';
      //    item.current.SH0012 = item.current.SH0012+'%';
      //    item.current.ZZ0500 = item.current.ZZ0500+'%';
      //    item.current.HSIHK = item.current.HSIHK+'%';
      //    item.current.SP500 = item.current.SP500+'%';
      //    item.current.AU9999 = item.current.AU9999+'%';
      //    item.current.B00IPE = item.current.B00IPE+'%';
      //    item.current.MONEY = item.current.MONEY+'%';
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.fundlist {
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  .listTitle {
    padding: 20px 20px 0;
  }
  .listTable {
    // margin:0 20px;
    padding: 20px 20px;
  }
  .select {
    background: #258efd;
    color: #fff;
    padding: 5px;
  }
  .noselect {
    padding: 5px;
  }
}
</style>