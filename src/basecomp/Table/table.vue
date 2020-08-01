<template>
  <div class="comman_table">
    <el-table
      :data="tableData"
      style="width: 100%"
      class="table"
      border
      fit
      stripe
      :height="height"
      tooltip-effect="dark"
      :header-row-class-name="headerstyle=='1'?'table-header-style-bg':'table-header-style'"
      @sort-change="handleSortChange"
    >
      <el-table-column
        type="index"
        label="编号"
        header-align="center"
        align="center"
        width="80"
        v-if="hasorder"
      ></el-table-column>
      <el-table-column
        type="index"
        label="序号"
        header-align="center"
        align="center"
        width="60"
        v-if="hasxu"
      ></el-table-column>
      <el-table-column
        type="index"
        label="样本序列号"
        header-align="center"
        align="center"
        width="100"
        v-if="hasnum"
      ></el-table-column>
      <el-table-column
        :label="item.label"
        v-if="item.type =='normal' && item.show!=false"
        v-for="(item, key) in header"
        :key="item.id"
        :min-width="item.mwidth"
        show-overflow-tooltip
        :align="item.prop=='bankName' || item.prop=='productName'?'left':'center'"
        :sortable="item.sort=='true'?'custom':false"
      >
        <template slot-scope="scope">
          <div class="cell">
            <span
              v-if="item.prop =='warehouseTime' || item.prop =='effectiveDate'"
            >{{scope.row[item.prop] ||scope.row.createTime}}</span>
            <span v-else-if="item.prop=='productName' || item.prop=='bankName'">
              <el-tooltip :content="scope.row[item.prop]" placement="top" effect="light">
                <span>{{scope.row[item.prop].substring(0,10)}}</span>
              </el-tooltip>
            </span>
            <span v-else-if="item.prop=='rank'">
              {{scope.row[item.prop]}}
              <!-- <i class="el-icon-back" :style="scope.row[item.prop]>scope.row['preRank']?'transform: rotate(270deg);color:#339966':scope.row[item.prop]==scope.row['preRank']?'display:none':'transform: rotate(90deg);color:#ff3333'"></i> -->
            </span>
            <span
              v-else-if="item.prop=='starsRY1' || item.prop=='starsRY2' ||item.prop=='starsRY3' "
            >
              <i class="el-icon-star-on iconcolor" v-for="temp in scope.row[item.prop]"></i>
              <i class="el-icon-star-off" v-for="val in (5-scope.row[item.prop])"></i>
            </span>
            <span v-else-if="item.label =='单位净值/日期'">
              {{scope.row[item.prop]}}
              <br />
              <span
                style="font-size:12px;color: #b3b3b3"
              >{{scope.row[item.prop] ==''?'':scope.row.sdtPeriod}}</span>
            </span>
            <span v-else-if="item.color">{{scope.row[item.prop]}}</span>
            <span
              v-else-if="typeof(scope.row[item.prop]) == true"
              :class="scope.row[item.prop].indexOf('%')>'-1'?(scope.row[item.prop].indexOf('-')?'numcorlorred':'numcolorgreen'):'numnocolor'"
            >{{scope.row[item.prop]}}</span>
            <span
              v-else-if="item.havecolor"
              :class="scope.row[item.prop] ==null|| scope.row[item.prop] ==0?'':scope.row[item.prop].indexOf('-')?'numcorlorred':'numcolorgreen'"
            >{{scope.row[item.prop]}}</span>
            <span
              v-else-if="item.prop=='percent'"
            >{{scope.row[item.prop] == 0 ? '0.00%': scope.row[item.prop]+ '%'}}</span>
           
            <span v-else>{{scope.row[item.prop]}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-else-if="item.type =='select'" align="center" :min-width="item.mwidth">
        <template slot="header" slot-scope="scope">
          <el-select
            v-model="value"
            placeholder="请选择"
            class="table_select"
            :style="'width:'+item.mwidth"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </template>
        <template slot-scope="scope">
          <div class="cell">
            <span>{{ scope.row[item.prop] ==0 ? '0.00%' :$utils.fmoney(scope.row[item.prop] *100,2,false,false) + '%'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="item.type =='data'"
        align="center"
        :width="item.mwidth"
        class="data"
      >
        <template slot="header" slot-scope="scope">
          <div class="cell">
            <span>{{item.label}}</span>
            <el-date-picker
              v-model="item.startDate"
              type="date"
              :picker-options="pickerOptions1"
              value-format="yyyy-MM-dd"
              placeholder="请选择"
              class="timedata"
            ></el-date-picker>
            <span class="to">至</span>
            <el-date-picker
              v-model="item.endDate"
              type="date"
              :picker-options="pickerOptions2"
              value-format="yyyy-MM-dd"
              placeholder="请选择"
              class="timedata"
            ></el-date-picker>
          </div>
        </template>
        <template v-for="col in item.children">
          <el-table-column
            :key="col.id"
            :label="col.label"
            :prop="col.prop"
            align="center"
            :width="col.width"
          >
            <template slot-scope="scope">
              <div v-if="item.label=='基金经理变更' && scope.row.managerList.length !=0">
                <div v-for="val in scope.row.managerList">
                  <span v-if="col.prop !='mchange'" style="display:block">{{val[col.prop]}}</span>
                  <!-- <span v-else>{{scope.row[col.prop]}}</span> -->
                </div>
              </div>
              <div v-if="item.label=='基金公司股东变更'&& scope.row.shareHolderList.length !=0">
                <div v-for="temp in scope.row.shareHolderList">
                  <span v-if="col.prop !='hchange'" style="display:block">{{temp[col.prop]}}</span>
                  <!-- <span v-else>{{scope.row[col.prop]}}</span> -->
                </div>
              </div>
              <span v-else>{{scope.row[col.prop]}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="item.type =='data1'"
        align="center"
        :width="item.mwidth"
        class="data"
      >
        <template slot="header" slot-scope="scope">
          <div class="cell">
            <span>{{item.label}}</span>
            <el-date-picker
              v-model="item.startDate"
              type="date"
              :picker-options="pickerOptions3"
              value-format="yyyy-MM-dd"
              placeholder="请选择"
              class="timedata"
            ></el-date-picker>
            <span class="to">至</span>
            <el-date-picker
              v-model="item.endDate"
              type="date"
              :picker-options="pickerOptions4"
              value-format="yyyy-MM-dd"
              placeholder="请选择"
              class="timedata"
            ></el-date-picker>
          </div>
        </template>
        <template v-for="col in item.children">
          <el-table-column
            :key="col.id"
            :label="col.label"
            :prop="col.prop"
            align="center"
            :width="col.width"
          >
            <template slot-scope="scope">
              <div v-if="item.label=='基金经理变更' && scope.row.managerList.length !=0">
                <div v-for="val in scope.row.managerList">
                  <span v-if="col.prop !='mchange'" style="display:block">{{val[col.prop]}}</span>
                </div>
                <span>{{scope.row[col.prop]}}</span>
              </div>
              <div v-if="item.label=='基金公司股东变更'&& scope.row.shareHolderList.length !=0">
                <div v-for="temp in scope.row.shareHolderList">
                  <span
                    v-if="col.prop !='hchange'"
                    style="display:block;overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;"
                  >{{temp[col.prop]}}</span>
                </div>
                <span
                  style="overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;"
                >{{scope.row[col.prop]}}</span>
              </div>
              <span
                v-else
                style="overflow: hidden;
                      text-overflow: ellipsis;
                      display: -webkit-box;
                      -webkit-line-clamp: 2;
                      -webkit-box-orient: vertical;"
              >{{scope.row[col.prop]}}</span>
            </template>
          </el-table-column>
        </template>
      </el-table-column>
      <el-table-column
        v-else-if="item.type =='moremenu'"
        align="center"
        :width="item.mwidth"
        class="data"
        :label="item.label"
      >
        <template v-for="col in item.children">
          <el-table-column
            :key="col.id"
            :label="col.label"
            :prop="col.prop"
            align="center"
            :width="col.width"
          >
            <template slot-scope="scope">
              <span v-if="col.type=='icon'">
                <i class="el-icon-star-on iconcolor" v-for="temp in scope.row[col.prop]"></i>
                <i class="el-icon-star-off" v-for="val in (5-scope.row[col.prop])"></i>
              </span>
              <span v-else>{{scope.row[col.prop]}}</span>
            </template>
          </el-table-column>
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
    "hasxu",
    "hasnum",
    "maxheight"
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
          _this.header.forEach(item => {
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
          _this.header.forEach(item => {
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
          _this.header.forEach(item => {
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
          _this.header.forEach(item => {
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
      showindex: 6,
      startindex: 2,
      maxindex: null,
      guding: 1
    };
  },
  methods: {
    moveLeft() {
      if (this.showindex > 6 && this.startindex >= 2) {
        this.showindex = this.showindex - 1;
        this.startindex = this.startindex - 1;
        this.oldheader = this.olddata
          .slice(0, 2)
          .concat(this.olddata.slice(this.startindex, this.showindex));
      }
    },
    moveRight() {
      if (this.showindex >= 6 && this.showindex <= this.maxindex - 1) {
        this.showindex = this.showindex + 1;
        this.startindex = this.startindex + 1;
        this.oldheader = this.olddata
          .slice(0, 2)
          .concat(this.olddata.slice(this.startindex, this.showindex));
      }
      // this.$set(this.tableData,this.tableData,this.tableData)
    },
    handleSortChange(column) {
      this.$emit("handleSortChange", column);
    }
  },
  watch: {
    value() {
      this.$emit("changeanalysisdate", this.value);
    },
    header() {
      console.log(123);
      console.log(this.header);
      if (this.header.length >= 2) {
        if (this.header[2]) {
          this.value = this.header[2].label;
        }
      }
    }
  },
  mounted() {
    // this.olddata = JSON.parse(JSON.stringify(this.header));

    // this.oldheader = this.olddata.concat();
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

    // this.oldheader=this.olddata.concat();
    // this.oldheader=this.olddata.slice(this.startindex,this.showindex)
    // if (this.guding) {
    //   this.oldheader = this.olddata
    //     .slice(0, 2)
    //     .concat(this.olddata.slice(this.startindex, this.showindex));
    // } else {
    //   this.oldheader = this.header;
    // }

    //  console.log(this.header)
    // console.log(this.oldheader)
    // this.header =this.oldheader.splice(2,4)
    console.log(this.header);
  }
};
</script>

<style lang='scss' >
.comman_table {
  position: relative;
  .el-table .cell {
    // display: flex;
    // align-items: center;
    // justify-content: center;
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
    height: 46px !important;
  }
}
.timedata {
  width: 135px !important;
  .el-input__inner {
    width: 135px !important;
  }
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
.iconcolor {
  color: #ff9900;
}
</style>