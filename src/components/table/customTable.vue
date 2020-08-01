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
      :row-key='rowkey'
    >
      <el-table-column
        type="index"
        label="排序"
        header-align="center"
        align="center"
        width="60"
        v-if="hasxu"
      ></el-table-column>
      <!--操作-->
      <slot name="handle-add"></slot>
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
        <template slot-scope="scope">
          {{scope.row[column.prop] == null||scope.row[column.prop] == '-99999'||scope.row[column.prop] == '-99999.00' ? '--' :scope.row[column.prop]}}
        </template>
      </el-table-column>
      <!--操作-->
      <slot name="handle-column"></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  props: ["columns", "dataSource", "hasxu",'height','rowkey'],
  data() {
    return {};
  },
  methods: {
    handleSelectionChange() {},
    expandChange() {},
    handleSortChange(column) {
      this.$emit("handleSortChange", column);
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