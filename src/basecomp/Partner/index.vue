<!-- 合作伙伴 -->
<template>
  <div>
      <ul class="partner">
          <li>
              <div><img src="../../static/images/zizhi.png" alt=""></div>
              <p>基金销售资质</p>
          </li>
          <li>
              <div><img src="../../static/images/weiyuanhui.png" alt=""></div>
              <p>监管机构</p>
          </li>
          <li>
              <div><img src="../../static/images/logo-china.png" alt=""></div>
              <p>自律组织</p>
          </li>
          <li>
              <div><img src="../../static/images/payh_logo.png" alt=""></div>
              <p>监管银行</p>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  methods: {}
}

</script>
<style lang='scss' scoped>
@import '../../styles/mixins.scss'; 
.partner{
    @include flex-box;
    padding: 40px 0;
    min-height: 75px;
    border-bottom: #b4b2b2 1px solid;
    li{
       @include flex; 
       text-align: center;
       font-size: 14px;
       color: #666666;
       div{
            margin-bottom: 10px;
            height: 42px;
       }
    }
}
</style>