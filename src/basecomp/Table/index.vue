<template>
  <div class="comman_table">
    <el-table
      :data="tabdata"
      style="width: 100%"
      class="table"
      border
      fit
      :height="height"
      tooltip-effect="dark"
      :header-row-class-name="headerstyle=='1'?'table-header-style-bg':'table-header-style'"
      @sort-change="handleSortChange"
    >
      <el-table-column
        type="index"
        label="序号"
        header-align="center"
        align="center"
        width="60"
        v-if="hasxu"
      ></el-table-column>
      <el-table-column
        :label="item.label"
        v-if="item.type =='normal' && item.show "
        v-for="(item, key) in oldheader"
        :key="item.id"
        :min-width="item.mwidth"
        show-overflow-tooltip
        :align="item.prop=='bankName' || item.prop=='productName'?'left':'center'"
        :sortable="item.sort=='true'?true:false"
      >
        <template slot-scope="scope" :style="item.label =='单位净值/日期'?'padding:0':''">
          <div class="cell">
            <span>{{scope.row[item.prop]}}</span>
          </div>
        </template>
      </el-table-column>

      <!--操作-->
      <slot name="handle-column"></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  props: [
    "header",
    "height",
    "headerstyle",
    "tableData",
    "hasorder",
    "hasnum",
    "hasxu"
  ],
  data() {
    let _this = this;
    return {
      pickerOptions1: {
        disabledDate(time) {
          const date = new Date(time.getTime()),
            Y = date.getFullYear() + "-",
            M =
              date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1 + "-",
            d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          const curDate = Y + M + d;
          let endDate = "";
          _this.oldheader.forEach(item => {
            if (item.label == "基金经理变更") {
              endDate = item.endDate;
            }
          });
          if (endDate == null) {
            endDate = "";
          }
          let later = _this.$utils.reduceYear(endDate, 12);
          if (endDate != "") {
            return endDate < curDate || curDate < later;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions2: {
        disabledDate(time) {
          const date = new Date(time.getTime()),
            Y = date.getFullYear() + "-",
            M =
              date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1 + "-",
            d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          const curDate = Y + M + d;
          let startDate = "";
          _this.oldheader.forEach(item => {
            if (item.label == "基金经理变更") {
              startDate = item.startDate;
            }
          });
          if (startDate == null) {
            startDate = "";
          }
          let before = _this.$utils.addYear(startDate, 12);
          if (startDate != "") {
            return before < curDate || curDate < startDate;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions3: {
        disabledDate(time) {
          const date = new Date(time.getTime()),
            Y = date.getFullYear() + "-",
            M =
              date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1 + "-",
            d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          const curDate = Y + M + d;
          let endDate = "";
          _this.oldheader.forEach(item => {
            if (item.label == "基金公司股东变更") {
              endDate = item.endDate;
            }
          });
          if (endDate == null) {
            endDate = "";
          }
          let later = _this.$utils.reduceYear(endDate, 12);
          if (endDate != "") {
            return endDate < curDate || curDate < later;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptions4: {
        disabledDate(time) {
          const date = new Date(time.getTime()),
            Y = date.getFullYear() + "-",
            M =
              date.getMonth() + 1 < 10
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1 + "-",
            d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
          const curDate = Y + M + d;
          let startDate = "";
          _this.oldheader.forEach(item => {
            if (item.label == "基金公司股东变更") {
              startDate = item.startDate;
            }
          });
          if (startDate == null) {
            startDate = "";
          }
          let before = _this.$utils.addYear(startDate, 12);
          if (startDate != "") {
            return before < curDate || curDate < startDate;
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      oldheader: [],
      olddata: [],
      value: "最近一个月",
      options: [
        {
          value: "最近一周",
          label: "最近一周"
        },
        {
          value: "最近一个月",
          label: "最近一个月"
        },
        {
          value: "最近一季",
          label: "最近一季"
        },
        {
          value: "最近一年",
          label: "最近一年"
        }
      ],
      showindex: "",
      startindex: 2,
      endindex: "",
      maxindex: null,
      guding: 1,
      tabdata: []
    };
  },
  methods: {
    moveLeft() {
      if (this.showindex == "") {
      } else {
        for (let i = this.oldheader.length - 1; i >= 0; i--) {
          if (this.oldheader[i].type == "normal") {
            if (this.showindex == "") {
            } else {
              if (this.oldheader[i].show) {
              } else {
                console.log(this.oldheader);
                console.log(this.startindex);
                if (this.startindex > 2) {
                  this.startindex = this.startindex - 1;

                  console.log(this.showindex);
                  this.oldheader[this.showindex].show = false;
                  this.showindex = this.showindex - 1;
                  this.oldheader[this.startindex].show = true;

                  break;
                }
              }
            }
          }
        }
      }
      // if (this.showindex > 6 && this.startindex >= 2) {
      //   this.showindex = this.showindex - 1;
      //   this.startindex = this.startindex - 1;
      //   this.oldheader = this.olddata
      //     .slice(0, 2)
      //     .concat(this.olddata.slice(this.startindex, this.showindex));
      // }
      //   this.tabdata = JSON.parse(JSON.stringify(this.tableData));
    },
    handleSortChange(column) {
      this.$emit("handleSortChange", column);
    },
    productinfo(code) {
      this.$emit("handleOpeninfo", code);
    },
    moveRight() {
      console.log(this.oldheader);
      // let showindex = "";
      // this.oldheader.forEach((item, index) => {
      //   if (item.show) {

      //   } else {
      //     showindex = index
      //     return;

      //   }
      // });

      for (let i = 0; i < this.oldheader.length; i++) {
        if (this.oldheader[i].type == "normal") {
          console.log(this.showindex);
          if (this.showindex == "") {
            if (this.oldheader[i].show) {
            } else {
              this.showindex = i;
              console.log(i);
              console.log(this.oldheader);
              this.oldheader[this.showindex].show = true;
              this.oldheader[this.startindex].show = false;
              this.startindex = this.startindex + 1;
              break;
            }
          } else {
            if (i >= this.showindex) {
              if (this.oldheader[i].show) {
              } else {
                this.showindex = i;
                this.oldheader[this.showindex].show = true;
                this.oldheader[this.startindex].show = false;
                this.startindex = this.startindex + 1;
                break;
              }
            }
          }
        }
      }
      console.log(this.showindex);
      // if (this.showindex >= 6 && this.showindex <= this.maxindex - 2) {
      //   this.showindex = this.showindex + 1;
      //   this.startindex = this.startindex + 1;
      //   this.oldheader = this.olddata
      //     .slice(0, 2)
      //     .concat(this.olddata.slice(this.startindex, this.showindex));
      // }
      //   this.tabdata = JSON.parse(JSON.stringify(this.tableData));
      // this.$set(this.tableData,this.tableData,this.tableData)
    },
    goinfo(url) {
      // window.location.href = url;
      window.open(url);
    }
  },
  watch: {
    value() {
      this.$emit("changeanalysisdate", this.value);
    },
    header() {},
    tableData() {
      // this.showindex = "";
      // this.startindex = 2;
      // this.endindex = "";
      this.tabdata = JSON.parse(JSON.stringify(this.tableData));
      console.log(this.tabdata);
    }
  },
  mounted() {
    // this.tabdata = JSON.parse(JSON.stringify(this.tableData));
    // console.log(this.tabdata);
    // this.maxindex = this.header.length;
    // this.guding = 1;
    // this.header.forEach(item => {
    //   if (item.label == "操作") {
    //     this.maxindex = this.header.length - 1;
    //   }
    //   if (item.children) {
    //     this.guding = 0;
    //   }
    // });

    // this.olddata = JSON.parse(JSON.stringify(this.header));

    // // this.oldheader=this.olddata.concat();
    // // this.oldheader=this.olddata.slice(this.startindex,this.showindex)
    // if (this.guding) {
    //   this.oldheader = this.olddata
    //     .slice(0, 2)
    //     .concat(this.olddata.slice(this.startindex, this.showindex));
    // } else {
    //   this.oldheader = this.header;
    // }
    this.olddata = JSON.parse(JSON.stringify(this.header));
    this.oldheader = this.olddata;
    this.tabdata = JSON.parse(JSON.stringify(this.tableData));
    console.log(this.tableData);

    //  console.log(this.header)

    // this.header =this.oldheader.splice(2,4)
  }
};
</script>

<style lang='scss' >
.comman_table {
  position: relative;
  .el-table th.gutter {
    display: table-cell !important;
  }
  .el-table .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }
}
.table {
  margin-top: 10px;
  padding: 0 !important;
  .table_select {
    .el-input__inner {
      background: #5153a2 !important;
      color: #fff !important;
    }
  }
  .to {
    margin-left: 5px;
  }
  td {
    .cell {
      font-size: 12px !important;
    }
  }
  // td {
  //    .cell{
  //   height: 46px !important;
  // }
  // }
}


// .el-carousel__arrow--right {
//   right: 66px;
// }
// .el-carousel__arrow--left {
//   left: 270px;
// }
.red {
  color: red;
}
</style>