<!-- 子组件 -->
<template>
  <!-- 交易结果 -->
  <div class="success">
		<i class="iconfont icon-wancheng"></i>
		<br/>
		<slot></slot>
		<p>{{resultCont}}</p>
		
	</div>
</template>
<script>
export default {
  name: "tradeResult",
  props: {
		resultCont: {
				type: String,
				default: ''
		}
	},
  data() {
    return {
    };
  },
};
</script>

<style lang='scss'>
@import '../../styles/mixins.scss';
@import '../../styles/color.scss';
.success{
	text-align: center;
	margin-bottom: 30px;
	i{
		font-size: 70px;
		color: #46b530;
	}
	p{
		font-size: 20px;
		font-weight: bold;
		color: #333333;
		margin-top: 10px;
	}
	.resultTime{
		font-size: 14px;
		color: #999;
	}
}
</style>





// WEBPACK FOOTER //
// src/components/bread/index.vue
