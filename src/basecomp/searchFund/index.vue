<!-- 分页组件 -->
<template>
  <el-select
    style="width: 30%;margin-left: 20px;float:left;"
    v-model="searchFundResult"
    filterable
    clearable
    remote
    placeholder="请输入产品名称/代码/简拼搜索"
    :remote-method="searchFund"
    @change="selectFundBySearch"
    @clear="clearSearchFundInput"
    :loading="searchLoading"
    loading-text="搜索中">
    <el-option
      v-for="item in fundList"
      :key="item.fundCode"
      :label="item.value"
      :value="item.fundCode"
      >
    </el-option>
    <i slot="prefix" class="el-input__icon el-icon-search"></i>
  </el-select>
</template>

<script>
// 数据请求
import  {fuzzySearchFund} from '@/api/tradeQuery';
export default {
  props: {
    hasType: {
        type: Boolean,
        default: false
    },
  },
  data () {
    return {
      searchFundResult:"",
      fundList:[],
      searchLoading:false
    };
  },

  components: {},

  methods: {
    searchFund(query) {//搜索基金
			if (query) {
				this.searchLoading = true;
				//this.fundList = [];
				fuzzySearchFund({searchText: query,channel :"search"}).then(res => {
          
          
					if (res.data.code == '0000' && res.data.data) {
						let resList = res.data.data;
						this.searchLoading = false;
						resList.forEach(i => {
              if (this.hasType) {
                i.value = i.fundCode+'   '+i.fundName+'   '+i.fundType
              }else{
                i.value = i.fundCode+'   '+i.fundName
              }
						});
            this.fundList = resList
            console.log(resList);
					}
				}).catch(error => {

				})
			}
		},
		//加载选中的基金
		selectFundBySearch(val) {
      this.$emit("selectFundBySearch",val)
    },
    clearSearchFundInput(val) { //清除搜索框
			this.$emit("clearSearchFundInput",val)
		}
  }
}

</script>
<style lang='scss' scoped>
.paginationBox{
    float: right;
    margin: 10px;
}
</style>
