<!-- 幻灯片管理 -->
<template>
  <section class="markethot">
    <div v-if="datasource.length>0">
      <el-carousel trigger="click" :autoplay="false" arrow="always">
        <el-carousel-item v-for="(item,index) in datasource" :key="index">
          <p>第{{index+1}}张幻灯片</p>
            <el-form ref="form" label-width="200px" label-position="right" :model="second" v-for="(second,index1) in item" :key="index1">
              <el-form-item :label="second.text">
                <el-input v-if="second.type == 'text'" v-model="second.value"></el-input>
                <el-button type='text' v-if="second.field == 'imgUrl'" style="position: absolute;margin-left: 10px;right:10px;top:3px;" @click="lookPic(second.value)">图片预览</el-button>
                <el-select 
                  @change="selectFlag"
                  v-if="second.type == 'select' && second.field == 'flag'" v-model="second.value" placeholder="请选择">
                  <el-option
                    v-for="item1 in optionsflag"
                    :key="item1.value"
                    :label="item1.text+':'+item1.value"
                    :value="item1.value">
                  </el-option>
                </el-select>
                <el-select v-if="second.type == 'select' && second.field == 'ratingField'" v-model="second.value" placeholder="请选择">
                  <el-option
                    v-for="item1 in optionsratingField"
                    :key="item1.value"
                    :label="item1.label"
                    :value="item1.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <div v-if="second.type == 'list'" v-show="magazineShow">
                <div class="magazineList" v-if="second.value.length>0">
                  <div v-for="(third,index2) in second.value" :key="index2">
                    <el-form-item  label-width="130px" :label="third.text">
                      <el-input v-model="third.value"></el-input>
                    </el-form-item>
                    <el-button @click="deleteMagazine(index,index2)" v-if="index2%2 == 1" type="danger" icon="el-icon-delete" circle style="margin:0 0 20px 30px;"></el-button>
                  </div>
                </div>
                <el-button size="medium" style="display: block;margin:0 auto;margin-bottom:20px;" @click="addMagazine(index)">添加周报</el-button>
              </div>
            </el-form>
            <el-button :disabled="deleteLimit" style="margin:0 auto;display: block;" type="danger" @click="deleteSubmit(index)">删除此张幻灯片</el-button>
        </el-carousel-item>
      </el-carousel>
      <el-dialog :visible.sync="dialogImgVisible" :close-on-click-modal='true' :show-close="false">
        <img :src="bigImgSrc" alt="" style="cursor:pointer;width:100%;">
      </el-dialog>
      <!-- <el-dialog title="更新幻灯片" :visible="dialogFormVisible" :show-close='false'>
        <el-form :model="defineForm" label-width="180px" label-position="right">
          <el-form-item label="幻灯片标题">
            <el-input v-model="defineForm.title"></el-input>
          </el-form-item>
          <el-form-item label="页面模板">
            <el-select v-model="defineForm.flag" placeholder="请选择">
              <el-option
                v-for="item1 in optionsflag"
                :key="item1.value"
                :label="item1.label"
                :value="item1.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基金代码">
            <el-input v-model="defineForm.fundCode"></el-input>
          </el-form-item>
          <el-form-item label="图片地址">
            <el-input v-model="defineForm.imgUrl"></el-input>
          </el-form-item>
          <el-form-item label="收益区间">
            <el-select v-model="defineForm.ratingField" placeholder="请选择">
              <el-option
                v-for="item1 in optionsratingField"
                :key="item1.value"
                :label="item1.label"
                :value="item1.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区间收益率">
            <el-input v-model="defineForm.rating" placeholder="选填"></el-input>
          </el-form-item>
          <el-form-item label="排序索引">
            <el-input v-model="defineForm.index" placeholder="填写大于0的数字"></el-input>
          </el-form-item>
          <el-form-item label="跳转地址">
            <el-input v-model="defineForm.target"></el-input>
          </el-form-item>
          <el-form-item label="周报期刊" v-if="defineForm.flag == '1'">
            <el-input v-model="defineForm.magazine"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_updatePertnerInfo">提交修改</el-button>
            <el-button type="danger" @click="_updatePertnerInfo">删除此幻灯片</el-button>
            <el-button @click="dialogFormVisible = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog> -->
      <el-dialog title="添加幻灯片" :visible="dialogFormVisible1" :show-close='false'>
        <el-form ref="form" label-width="180px" label-position="right">
          <el-form-item :label="item.text" :model="item" v-for="(item,index) in defineForm1" :key="index">
            <el-input v-if="item.type == 'text'" v-model="item.value"></el-input>
            <el-select @change="selectFlag1" v-if="item.type == 'select' && item.field == 'flag'" v-model="item.value" placeholder="请选择">
              <el-option
                v-for="item1 in optionsflag"
                :key="item1.value"
                :label="item1.text+':'+item1.value"
                :value="item1.value">
              </el-option>
            </el-select>
            <el-select v-if="item.type == 'select' && item.field == 'ratingField'" v-model="item.value" placeholder="请选择">
              <el-option
                v-for="item1 in optionsratingField"
                :key="item1.value"
                :label="item1.value"
                :value="item1.value">
              </el-option>
            </el-select>
            <div v-if="item.type == 'list' && magazineShow1">
              <div class="magazineList1">
                <div v-for="(item1,index1) in item.value" :key="index1">
                  <el-form-item label-width="100px" :label="item1.text">
                    <el-input v-model="item1.value"></el-input> 
                  </el-form-item>
                  <el-button @click="deleteMagazine1(index1)" v-if="index1%2 == 1" type="danger" icon="el-icon-delete" circle style="margin:0 0 20px 10px;"></el-button>
                </div>
              </div>
              <el-button size="medium" style="display: block;margin:0 auto;margin-bottom:20px;" @click="addMagazine1()">添加周报</el-button>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_addPertnerInfo1">确定添加</el-button>
            <el-button @click="dialogFormVisible1 = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-button type="primary" size="medium" style="margin:0 auto;" @click="submitModify()">提交修改</el-button>
      <el-button size="medium" style="margin:0 auto;" @click="addBanner()">添加幻灯片</el-button>
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
  getPertnerByDefine,
  getRatingType
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
      optionsflag:this.$key.flagData,
      optionsratingField: [],
      channelId:'',
      magazineShow:true,
      magazineShow1:true,
      deleteLimit:false
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
    this._getRatingType();
  },
  methods: {
    //收益区间查询
    _getRatingType(){
      getRatingType().then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.optionsratingField = res.data.data;
        }
      });
    },
    //
		selectFlag(val) {
      console.log(val);
			if(val == '1'){
        this.magazineShow = true;
			}else{
        this.magazineShow = false;
      }
    },
    selectFlag1(val) {
      console.log(val);
			if(val == '1'){
        this.magazineShow1 = true;
			}else{
        this.magazineShow1 = false;
      }
    },
    //幻灯片查询
    _getPertnerByField() {
      let params = {
        field:'MARKETHOT',
        channelId:this.channelId
      };
      getPertnerByField(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data.data);
          let resData = res.data.data;
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
    deleteSubmit(index){
      if (this.datasource.length <= 1) {
        this.deleteLimit = true;
      }else{
        this.deleteLimit = false;
        this.$confirm('确定删除此幻灯片?点击提交修改后生效', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.datasource.splice(index,1)
          }).catch(() => {
          });
      }
      
    },
    //提交修改
    submitModify(flag){
      let jsonValue = [];
      console.log(this.datasource);
      
      this.datasource.forEach(element => {
        let obj={};
        //遍历elemnt数组
        element.forEach(item => {
          if (item.field == 'magazine') {
            console.log(item.value);
            obj['magazine'] = [];
            for (let index = 0; index < item.value.length; index=index+2) {
              let obj1 = {};
              obj1['title'] = item.value[index].value;
              obj1['params'] = item.value[index+1].value;
              obj['magazine'].push(obj1)
            }
          }else{
            obj[item.field] = item.value;
          }
        });
        console.log(obj);
        jsonValue.push(obj)
      });
      console.log(jsonValue);
      let params = {
        field:'MARKETHOT',
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
          this.dialogFormVisible1 = false;
          this._getPertnerByField()
        }
      });
    },
    //添加新的幻灯片
    addBanner(){
      this.dialogFormVisible1 = true;
      this._getPertnerByDefine()
    },
    _addPertnerInfo1(){
      
      this.$confirm('确定添加幻灯片?点击提交修改后生效', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(this.defineForm1);
          
          this.datasource.push(this.defineForm1)
          console.log(this.datasource);
          
          this.dialogFormVisible1 = false;
        }).catch(() => {
        });
      
    },
    //幻灯片模板
    _getPertnerByDefine(){
      let params = {
        field:'MARKETHOT',
        channelId:this.channelId
      };
      getPertnerByDefine(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data.data);
          this.defineForm1 = res.data.data
        }
      });
    },
    //添加周报
    addMagazine(index){
      this.datasource[index].forEach(element => {
        if (element.field == 'magazine') {
          element.value.unshift({
            field:'title',
            text:"周报标题：",
            type:'text',
            value:''
          },{
            field:'params',
            text:"周报参数：",
            type:'text',
            value:''
          })
        }
      });
    },
    //添加周报
    addMagazine1(){
      this.defineForm1.forEach(element => {
        if (element.field == 'magazine') {
          element.value.unshift({
            field:'title',
            text:"周报标题：",
            type:'text',
            value:''
          },{
            field:'params',
            text:"周报参数：",
            type:'text',
            value:''
          })
        }
      });
    },
    deleteMagazine(val1,val2){
      
      this.datasource[val1].forEach(element => {
        if (element.field == 'magazine') {
            element.value.splice(Number(val2)-1,2)
        }
      });
    },
    deleteMagazine1(val){
      
      this.defineForm1.forEach(element => {
        if (element.field == 'magazine') {
            element.value.splice(Number(val)-1,2)
        }
      });
    }
  }
}

</script>
<style lang='scss' scoped>
.markethot{
}
</style>
<style lang='scss'>
.markethot{
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__container{
    height: 880px;
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
    margin-left:140px;width: 70%;max-height:250px;overflow-y: scroll;margin-bottom:20px;
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
