<!-- 幻灯片管理 -->
<template>
  <section class="defaultchannel">
    <div v-if="datasource.length>0">
      <el-row :gutter="20">
        <el-col :span="12" v-for="(item,index) in datasource" :key="index">
          <div class="grid-content bg-purple">
            <el-form ref="form" label-width="100px" label-position="right" :model="second" v-for="(second,index1) in item" :key="index1">
              <el-form-item :label="second.text">
                <el-input v-if="second.type == 'text'" v-model="second.value"></el-input>
                <el-button type='text' v-if="second.field == 'imgUrl'" style="position: absolute;margin-left: 10px;right:10px;top:3px;" @click="lookPic(second.value)">图片预览</el-button>
                <el-radio-group v-if="second.field == 'needlogin'&&second.type == 'select'" v-model="second.value">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <el-button @click="deleteChannel(index)" type="danger" icon="el-icon-delete" circle style="position: absolute;top: 40%;margin: auto;right: 20px;"></el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div @click="addChannel()" style="width: 178px;margin: 0 auto;height: 252px;display: flex;align-items: center;justify-content: center;cursor: pointer;">
              <i class="el-icon-plus avatar-uploader-icon" style="font-size: 80px;color: #999;"></i>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-button type="primary" size="medium" style="display:block;margin:0 auto;" @click="submitModify()">提交修改</el-button>
    </div>
    <div v-else style="height:300px;line-height:300px;text-align:center;">
      此渠道下暂无数据
    </div>
  </section>
</template>

<script>
// 数据请求
import {
  getPertnerByField,
  updatePertnerInfo,
  getPertnerByDefine
} from "@/api/tradeSystem";
export default {
  props: ['message'],
  data () {
    return {
      btnShow:false,
      datasource:[],
      defineForm:{},
      defineForm1:{},
      dialogFormVisible:false,
      dialogFormVisible1:false,
      dialogImgVisible:false,
      bigImgSrc:'',
      optionsflag: [{
          value: '1',
          label: '理财周报'
        }, {
          value: '21',
          label: '基金模板一'
        }, {
          value: '22',
          label: '基金模板二'
        }, {
          value: '23',
          label: '基金模板三'
        }, {
          value: '选项5',
          label: '北京烤鸭'
      }],
      optionsratingField: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
      }],
      channelId:''
    };
  },

  components: {},
  created(){
    this.channelId=this.message  //初始化时候的赋值
  },
  //这里用watch方法来监听父组件传过来的值，来实现实时更新
  watch:{
    message(val){    //message即为父组件的值，val参数为值
      this.channelId = val    //将父组件的值赋给childrenMessage 子组件的值
      console.log('com'+this.channelId);
      this._getPertnerByField();
    }
  },
  mounted() {
    this._getPertnerByField();
    
  },
  methods: {
    //幻灯片查询
    _getPertnerByField() {
      let params = {
        field:'DEFAULTCHANNEL',
        channelId:this.channelId
      };
      getPertnerByField(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data.data);
          let resData = res.data.data;
          resData.forEach(element => {
            element.forEach(second => {
             /*  if (second.field == 'needlogin' && second.value == 'true') {
                second.value = ''
              }else if(second.field == 'needlogin' && second.value == 'false'){
                second.value = false
              } */
            });
          });
          this.datasource = resData
          console.log(this.datasource);
        }else{
          this.datasource = [];
          this.$message({
            type: 'error',
            message: res.data.message
          });
        }
      });
    },
    //图片预览
    lookPic(val){
      console.log(val);
      this.dialogImgVisible = true;
      this.bigImgSrc = val;
    },
    //删除幻灯片
    deleteChannel(index){
      this.$confirm('确定删除此入口?点击提交修改后生效', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.datasource.splice(index,1)
        }).catch(() => {
        });
      
    },
    //提交修改
    submitModify(flag){
      let jsonValue = [];
      console.log(this.datasource);
      
      this.datasource.forEach(element => {
        let obj={};
        //遍历elemnt数组
        element.forEach(item => {
          
          obj[item.field] = item.value;
        });
        console.log(obj);
        jsonValue.push(obj)
      });
      console.log(jsonValue);
      let params = {
        field:'DEFAULTCHANNEL',
        channelId:this.channelId,
        jsonValue:jsonValue
      };
      
      console.log(params.jsonValue);
      updatePertnerInfo(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data.data);
          this.$message({
            type: 'success',
            message: '修改成功'
          });
          if(document.documentElement&&document.documentElement.scrollTop){
              document.documentElement.scrollTop = 0;
          }else if(document.body){
              document.body.scrollTop = 0;
          }
          this._getPertnerByField()
        }
      });
    },
    //添加新的幻灯片
    addChannel(){
      this._getPertnerByDefine()
    },
    //幻灯片模板
    _getPertnerByDefine(){
      let params = {
        field:'DEFAULTCHANNEL',
        channelId:this.channelId
      };
      getPertnerByDefine(params).then(res => {
        if (res.data.code == "0000") {
          
          res.data.data.forEach(element => {
            if (element.field == 'needlogin' && !element.value) {
              element.value = false
            }
          });
          console.log(res.data.data);
          this.datasource.push(res.data.data)
        }
      });
    },
  }
}

</script>
<style lang='scss' scoped>
.defaultchannel{
}
</style>
<style lang='scss'>
.defaultchannel{
  .el-col-12 {
      width: 48%;
      margin: 20px 10px;
      border: 1px solid #999;
      padding: 10px;
      border-radius:5px;
      position: relative;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__container{
    height: 1000px;
  }
  .el-form-item__content{
    width: 65%;
  }
  .el-carousel__button{
    background-color:#99a9bf !important;
  }
  .el-dialog{
    width:80% !important;
  }
  .magazineList{
    margin-left:140px;width: 70%;min-height:300px;overflow-y: scroll;margin-bottom:20px;
    .el-form-item{
      width: 45%;
      float: left;
      margin-bottom:0 !important;
    }
  }
  .magazineList1{
   max-height:300px;overflow-y: scroll;margin-bottom:20px;
    .el-form-item{
      width: 45%;
      float: left;
    }
  }

}
</style>
