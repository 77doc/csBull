<!-- 底部导航 -->
<template>
  <div class="footer-nav">
        <div><a href="http://www.jnlc.com/about/map.shtml" target="_blank">网站地图</a>  |  <a href="http://www.jnlc.com/about/index.shtml" target="_blank">关于我们</a>  |  <a href="http://pubfund.jnlc.com/www/home/help?setup=6" target="_blank">基金从业信息</a>  |  <a href="http://www.jnlc.com/about/join.shtml" target="_blank">诚聘英才</a>  |  <a href="http://www.jnlc.com/about/ad.shtml" target="_blank">广告服务</a>  |  <a href="http://www.jnlc.com/about/contact.shtml" target="_blank">联系方式</a>  |  <a href="http://www.jnlc.com/about/duty.shtml" target="_blank">免责声明</a>  |  <a href="http://www.jnlc.com/about/link.shtml" target="_blank">友情链接</a></div>
        <div class="copyright">Copyright © 2015 <a href="http://www.jnlc.com">www.jnlc.com</a> All Rights Reserved.金牛理财网 版权所有</div>
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
.footer-nav{
    text-align: center;
    font-size: 12px;
    color: #666666;
    padding: 20px 0;
    a{
        color: #666666;
        &:hover{
            text-decoration: underline;
        }
    }
    .copyright{
        margin-top: 10px;
    }
}
</style>