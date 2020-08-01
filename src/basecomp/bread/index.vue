<!-- 子组件 -->
<template>
  <!-- 面包屑 -->
  <div class="list_head">
    <p>
      您现在所在位置：
      <!-- 路径循环渲染 -->
      <span v-for="(item, index) in fromFather">
        <span class="breadTitle1">{{item.menuName}}</span>
        <span v-if="item.name != ''">></span>
        <span
            class='hovers'
            v-if="index == fromFather.length - 1">{{item.name}}</span>
            <el-button v-else
                   class="goHover"
                   @click="hrefbread(item)"
                   type="text"
                   :disabled="isDisabled">{{item.name}}</el-button>
      </span>
    </p>
  </div>
</template>
<script>
export default {
  name: "bread",
  props: ["fromFather"], // 父组件给子组件传参
  data() {
    return {
      isDisabled: true
    };
  },
  mounted() {
    setTimeout(() => {
      this.isDisabled = false;
    }, 2000);
  },
  methods: {
    hrefbread(item) {
      this.$router.push({
        path: "/" + item.path
      });
    }
  }
};
</script>

<style lang='scss'>
.list_head {
  padding: 20px 0 14px 0;
  p{
    color: #797979;
    font-size: 12px;
    padding: 0 10px; /*margin-bottom: 10px;*/
    background: #fff;
    box-shadow: 0 3px 7px #ddd;
    line-height: 50px;
  }
  .breadTitle1 {
    color: #797979;
  }
  .el-button--text {
    color: #518BDC;
    font-size: 12px;
  }
  .el-button--medium{
    padding: 0px !important;
  }
  .el-button--text:hover {
    color: rgb(61, 140, 227);
    border-bottom: 1px solid #518bdc;
  }
  // a标签
  .hovers{
    color:#518BDC;
  }
  .hovers:hover {
    cursor: pointer;
    border-bottom: 1px solid #518bdc;
  }

  .goHover:hover {
    color: rgb(61, 140, 227);
    cursor: pointer;
  }
}
</style>





// WEBPACK FOOTER //
// src/components/bread/index.vue
