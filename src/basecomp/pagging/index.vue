<!-- 分页组件 -->
<template>
  <el-footer height="auto" class="paging-box">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paging.pageNum"
      :page-sizes="[5, 10, 15, 20,25]"
      :page-size="paging.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paging.total"
      >
    </el-pagination>
  </el-footer>
</template>

<script>
export default {
  props: ['paging'],
  methods: {
    //每页数量发生改变
    handleSizeChange(val) {
      this.$emit('sizeChange',val);
    },
    //当前页发生改变
    handleCurrentChange(val) {
      this.$emit('pageChange',val);
    }
  }
}
</script>

<style lang="scss" scoped>
  .paging-box{
    padding-top: 10px;
    text-align: right;
  }
</style>
