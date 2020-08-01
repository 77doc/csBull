<!-- 子组件 -->
<template>
  <!-- 警告提示 -->
  <div class="warning-info" v-if="warningShow">
		<i class="warning-info-icon iconfont icon-cuowu"></i>
		<div class="warning-info-content">
			<span class="warning-info-title">您所选择的基金风险等级为高风险，高出您的风险承受等级（保守型）！本机构特此向您书面警示：购买该产品，可能导致您承担超出自身承受能力损失以及不利后果。请您认真了解产品风险特征，审慎决定购买。或</span><a data-v-5bc4e482="" href="/buyFund/redeem" class="">【重新测评】</a>
			<i class="iconfont icon-del" @click="closeWarning"></i>
		</div>
	</div>
</template>
<script>
export default {
  name: "warning",
  props: {
		warningShow: {
				type: Boolean,
				default: true
		},
		warningInfo: {
				type: String,
				default: '标题'
		}
	},
  data() {
    return {
    };
  },
  mounted() {
  },
  methods: {
		closeWarning() {
			this.warningShow = false;
		}
  }
};
</script>

<style lang='scss'>
@import '../../styles/mixins.scss';
@import '../../styles/color.scss';
.warning-info {
    color: #df2b1e;
    background-color: #ffebeb;
    font-size: 12px;
		padding: 8px 16px;
		position: relative;
		@include flex-align;
		.warning-info-icon{
			font-size: 16px;
			width: 16px;
		}
    .warning-info-content{
			display: table-cell;
    	padding: 0 10px;
		}
		.icon-del{
			font-size: 12px;
			color: #c0c4cc;
			opacity: 1;
			position: absolute;
			top: 12px;
			right: 15px;
			cursor: pointer;
		}
    a {
        cursor: pointer;
        color: #0099ff;
        font-size: 12px;
		}
}
</style>





// WEBPACK FOOTER //
// src/components/bread/index.vue
