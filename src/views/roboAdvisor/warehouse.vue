<template>
  <div class="fundlist">

    <div>
      <p
        style="text-align:right;  color:#999;font-size:12px;"
        class="listTitle"
      >{{nextTransferInfo}}</p>
      <xtable :dataSource="dataSource" :columns="cols" class="listTable"></xtable>
    </div>
    <div>
      <xtable
        :dataSource="tadata"
        :columns="cols1"
        class="listTable"
        @addbai="addbai"
        :height="500"
      ></xtable>
    </div>
    <div style="margin-top: 20px;margin-bottom:20px;text-align:right;margin-right:20px;">
      <!-- <el-button v-if="haveupdate" @click="_saveConfig()" :disabled="inTimeWindow">保存配置</el-button>
      <el-button v-if="haveupdate" @click="cancalConfig()" :disabled="inTimeWindow">取消配置</el-button>
      <el-button v-if="showButton" @click="_defaultSetting()" :disabled="inTimeWindow">恢复默认配置</el-button>
      <el-button v-if="!haveupdate" @click="_ztGroupTransfer()" :disabled="inTimeWindow">立即调仓</el-button>-->
      <el-button @click="firstsynchrodata()"   :disabled="(buttonArr.indexOf('同步资产参考配置') >-1?false:true) && firstDisabled">同步资产参考配置</el-button>
      <el-button @click="_ztGroupTransfer()"    :disabled="(buttonArr.indexOf('同意调仓') >-1?false:true) && firstDisabled">同意调仓</el-button>
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
import {
  getCurrentConfigFund,
  saveConfig,
  defaultSetting,
  searchFundsByAssetType,
  getFundsByAssetType,
  ztGroupTransfer,
  getAssetConfig,
  saveAssetConfig,
  transfer,
  getAssetConfigByRiskControl,
  riskControlTransfer
} from "@/api/roboAdvisor";
import { getUserButton } from "@/api/authority";
export default {
  components: {
    xtable,
    addFund
  },
  data() {
    return {
      dataSource: [],
      showMessage: false,
      cols1: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "groupname", //<String>  对应属性名
          label: "", //<String>   表头标签
          align: "center", //表头内容是否居中
          width: 120 // 列宽
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
          width: 180,
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

          width: 200 // 列宽
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "num", //<String>  对应属性名
          label: "当前配置数量", //<String>   表头标签
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
      haveupdate: false,
      dialogTableVisible: false,
       firstDisabled: false,
      styleType: "",
      alreadyFunds: "",
      tabledata: [],
      tadata: [],
      nextTransferInfo: "",
      inTimeWindow: "0",

      buttonArr: [],
      status: "1",
      updateindex: "", //被替换的index
      type: "" //打开弹窗的方式 add为添加 update为替换
    };
  },
  mounted() {
    this._getCurrentConfigFund();
    this._getAssetConfigByRiskControl();
    this._getUserButton();
  },
  methods: {
    _getUserButton() {
      let params = {
        menuId: 15
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
     //第一个页面的同步模型参数
    firstsynchrodata() {
      let that = this;
      this.tadata.forEach(item => {
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
    //
    _getAssetConfigByRiskControl() {
      let params = {
        orgId: "1"
      };
      getAssetConfigByRiskControl(params).then(res => {
        if (res.data.code == "0000") {
          this.tadata = res.data.data.list;
          let data = res.data.data.list;
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
            item.current.ZZ1000 = item.current.ZZ1000 + "%";
            item.current.SH0300 = item.current.SH0300 + "%";
            item.current.SH0012 = item.current.SH0012 + "%";
            item.current.ZZ0500 = item.current.ZZ0500 + "%";
            item.current.HSIHK = item.current.HSIHK + "%";
            item.current.SP500 = item.current.SP500 + "%";
            item.current.AU9999 = item.current.AU9999 + "%";
            item.current.B00IPE = item.current.B00IPE + "%";
            item.current.MONEY = item.current.MONEY + "%";
          });
        }
      });
    },
    //切换状态
    nextstatus() {
      if (this.status == 1) {
        this.status = 2;
      } else if (this.status == 2) {
        this.status = 1;
      }
    },
    //获取智能投顾基金配置信息
    _getCurrentConfigFund() {
      let params = {
        orgId: "1"
      };
      getCurrentConfigFund(params).then(res => {
        if (res.data.code == "0000") {
          let data = res.data.data;
          this.inTimeWindow = data.inTimeWindow;
          this.showButton = data.showButton;
          this.nextTransferInfo = data.nextTransferInfo;
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
                fundCode: temp.fundCode
              };
              arr.push(obj);
            });
          });
          this.dataSource = arr;
          console.log(arr);
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
              this.$message({
                showClose: true,
                message: "成功恢复默认配置",
                type: "success"
              });
              this.haveupdate = false;
              this._getCurrentConfigFund();
            } else {
              this.$message({
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
          this._saveConfig();
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
          this.$msg("sucess", "调仓成功");
          this.showMessage = false;
          this._getAssetConfig();
        } else {
          this.$msg("error", res.data.message);
        }
      });
    },
    async submitSave() {
      // this._saveAssetConfig();
      this._riskControlTransfer();
    },
    //风控调仓

    _riskControlTransfer() {
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
        configList: list
      };
      riskControlTransfer(params).then(res => {
        if (res.data.code == "0000") {
          this.$msg("success", "调仓成功");
          this.showMessage = false;
        } else {
          this.$msg("success", res.data.message);
          this.showMessage = false;
        }
      });
    },
    //立即调仓
    _ztGroupTransfer() {
      this.showMessage = true;
      // this._saveAssetConfig()
      // this.$confirm("确认立即调仓?", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning"
      // })
      //   .then(() => {
      //     console.log(333);
      //     that._saveAssetConfig();
      //     // that.c()
      //     // let params = {
      //     //   orgId: "1"
      //     // };
      //     // ztGroupTransfer(params).then(res => {
      //     //   if (res.data.code == "0000") {
      //     //     this.$msg("success", "调仓成功");
      //     //   } else {
      //     //     this.$msg("error", res.data.message);
      //     //   }
      //     // });
      //   })
      //   .catch(() => {});
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
          this.haveupdate = true;
          this.dataSource.splice(i, 1);
          if (val.num == "") {
            this.dataSource.forEach(item => {
              if (item.styleType == val.styleType) {
                if (item.num != "") {
                  item.num = item.num - 1;
                }
              }
            });
          } else {
            for (var j = 0; j < this.dataSource.length; j++) {
              let item = this.dataSource[j];
              if (item.styleType == val.styleType) {
                item.num = val.num - 1;
                item.styleTypeName = val.styleTypeName;
                return;
              }
            }
          }
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    //表格添加基金
    addDateSource(val) {
      this.dialogTableVisible = false;
      this.haveupdate = true;
      for (let i = 0; i < this.dataSource.length; i++) {
        let item = this.dataSource[i];
        if (item.styleType == val.styleType) {
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
          item.num = item.num + 1;
          return;
        }
      }
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
          // this.$msg("success", "保存成功");
          // this.haveupdate = false;
          // this._getCurrentConfigFund();
          this._transfer();
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