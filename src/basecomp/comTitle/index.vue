<!-- 子组件 -->
<template>
  <!-- 面包屑 -->
  <div class="main-title">
    <p>{{titleName}}</p>
    <slot></slot>
</div>
</template>
<script>
export default {
  name: "comTitle",
  props: {
		titleName: {
				type: String,
				default: '标题'
		}
	},
  data() {
    return {
      isDisabled: true
    };
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style lang='scss'>
@import '../../styles/mixins.scss';
@import '../../styles/color.scss';
.main-title{
	background-color: #fff;
	overflow: hidden;
	@include flex-justify-between;
	@include flex-align ;
	padding: 30px 0;
	border-bottom: 1px dashed #ccc;
	p{
		font-size: 28px;
		color: #333;
		font-weight: bold;
	}
}
</style>





// WEBPACK FOOTER //
// src/components/bread/index.vue
