<!-- 分页组件 -->
<template>
<div class='paginationBox'>
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page.sync="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    :layout="layout"
    :total="total">
  </el-pagination>
</div>
</template>

<script>
export default {
  props: {
    currentPage: {
        type: Number,
        default: 1
    },
    pageSizes: {
        type: Array,
        default: function () {
            return [10, 20, 50, 100]
        }
    },
    pageSize: {
        type: Number,
        default: 10
    },
    layout: {
        type: String,
        default: "total, sizes, prev, pager, next, jumper"
    },
    total: {
        type: Number,
        default: 0
    },
  },
  data () {
    return {
    };
  },

  components: {},

  methods: {
    handleSizeChange(val) {
      
      
      this.$emit("handleSizeChange",val)
    },
    handleCurrentChange(val) {
      console.log(val);
      console.log(this.currentPage);
      this.$emit("handleCurrentChange",val)
    },
  }
}

</script>
<style lang='scss' scoped>
.paginationBox{
    float: right;
    margin: 10px;
}
</style>