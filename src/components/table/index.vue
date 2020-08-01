<template>
  <div>
    <el-table
      stripe
      border
      :data="dataSource"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      class="table"
      :header-row-class-name="'table-header-style-bg'"
      ref="refTable"
      :max-height="height"
    >
      <el-table-column
        type="index"
        label="排序"
        header-align="center"
        align="center"
        width="60"
        v-if="hasxu"
      ></el-table-column>
    
      <!--数据源-->
      <el-table-column
        v-for="(column, index) in columns"
        header-align="center"
        v-if="column.isShow"
        :sortable="column.hasSort"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :align="column.align"
        :width="column.width"
        :fixed="column.fixed"
      >
        <template slot-scope="scope" :style="column.label =='单位净值/日期'?'padding:0':''">
          <div class="cell">
            <span v-if="column.prop=='groupname'">
              {{scope.row[column.prop]}}
              <br />参考/当前配置
            </span>
            <span v-else-if="column. haschange" style="display:flex;">
              <span
                style="height:40px;line-height:50px;display:block;font-size:14px;"
              >{{$common.fmoney(scope.row.reference[column.prop],2,false,true)}}%/</span>
              <!-- {{scope.row.current[column.prop]}}% -->
              <el-input
                v-model="scope.row.current[column.prop]"
                @focus="focus($event)"
                placeholder
                style="width:80px;height:32px;margin-left:10px;"
                v-if="!scope.row.disabled"
                @change="addbai(scope.$index,column.prop)"
              ></el-input>
              <span v-else  style="height:40px;line-height:50px;display:block;font-size:14px;">
                {{scope.row.current[column.prop]}}
              </span>
            </span>
            <span v-else>{{scope.row[column.prop]}}</span>
          </div>
        </template>
      </el-table-column>
        <!--操作-->
      <slot name="handle-add"></slot>
      <!--操作-->
      <slot name="handle-column"></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["columns", "dataSource", "hasxu", "height"],
  data() {
    return {};
  },
  methods: {
    handleSelectionChange() {},
    expandChange() {},
    handleSortChange(column) {
      this.$emit("handleSortChange", column);
    },
    focus(event) {
      event.currentTarget.select();
    },
    addbai(index, value) {
      this.$emit("addbai");
    }
  }
};
</script>

<style lang="scss" scoped>
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
</style>