<!-- 子组件 -->
<template>
    <!-- 右侧导航 -->
    <div class="sideRight">
        <!-- 用户头像和用户姓名 -->
        <span v-if="isLogin" class='svg-container info' id="user" style="margin-right:20px;">
            <img src="../../static/images/qiye.png" alt="" style="position: relative; top: -5px; width:30px;height:30px;  margin-right: 5px;">
            <span style="position: relative;top:-2px;">{{userName}}</span>
        </span>
        <a href="http://www.jnlc.com" target="_black" v-else class="svg-container" id="homepage">
            <i class="iconfont icon-iconfontzhizuobiaozhun023101"></i>
            <span style="position: relative;top: -2px;">首页</span>
        </a>
        <!-- <span class="svg-container" id="helping" @click="help">
            <i class="iconfont icon-bangzhuzhongxin"></i>
            <span style="position: relative;top: -2px;">帮助中心</span>
        </span> -->
        <!-- <span class='svg-container info' id="customService">
            <i class="iconfont icon-dianhua"></i>
            <span style="position: relative;top: -2px;">客服热线：4008-909-998</span>
        </span> -->

        <span v-if="isLogin" class='svg-container info' id="logout" @click="_logout">
            <i class="iconfont icon-quit"></i>
            <span style="position: relative;top: -2px;">安全退出</span>
        </span>
    </div>
</template>
<script>
import storage from '@/utils/storage';
import key from '@/utils/constant';
// 数据请求
import  {logout} from '@/api/login';
export default {
  name: "SideRight",
  props: {
      isLogin:{
          type:Boolean,
          default:false
      }
  }, // 父组件给子组件传参
  data() {
    return {
        userName: storage.getLocal('username'),
    };
  },
  mounted() {
  },
  methods: {
    help(){
        document.querySelector("#chatBtn").addEventListener("click",function(){})
    },
    _logout(){
          this.$confirm('确定退出登录吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              let token = storage.getLocal('token');
              console.log(token);
            if (token) {
              storage.clearAllLocal();

              logout().then(res =>{
              })
            }
            
            this.$router.push({ path: '/login' });
          }).catch(() => {
          });
        }
  }
};
</script>

<style lang='scss'>
.sideRight {
    float: right;
    overflow: hidden;
    line-height: 55px;
    .helping {
        font-size: 12px;
        height: 41px;
        line-height: 41px;
        position: relative;
        color: #282828;
        cursor: pointer;
        margin-right: 14px;
    }
    .svg-container{
        margin: 0 10px;
        font-size: 16px;
        color: #000;
        .iconfont{
            font-size: 18px;
        }
    }
}
#logout{cursor: pointer;}
</style>

