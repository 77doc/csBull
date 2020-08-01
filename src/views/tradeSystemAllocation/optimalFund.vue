<template>
  <div class="optimalFund">
    <div style="margin-top:20px;">
      请选择引流渠道进行查询：
      <el-select 
      @change="selectFundBySearch"
      v-model="dropdownText" placeholder="请选择引流渠道" style="width:400px;">
        <el-option
          v-for="(item,index) in dropdownData"
          :key="index"
          :label="item.sourcename+':'+item.sn"
          :value="item.sn">
        </el-option>
      </el-select>
    </div>
    <div v-if="dropdownText" style="margin-top: 20px;">
      在当前渠道下进行以下操作：
        <el-button @click="handlesingleAdd()">添加优选基金</el-button>
        <el-link style="margin:0 20px;" href="http://192.168.100.56:9100/fundextends.xlsx" icon="el-icon-download" target="_blank">批量导入模板</el-link>
        <el-button style="position:relative;">批量导入优选基金
          <input type="file" id="fileExport" class="fileInput" @change="handlebatchAdd('fund')" ref="inputer">
        </el-button>
        <el-link style="margin:0 20px;" href="http://192.168.100.56:9100/fundextends.xlsx" icon="el-icon-download" target="_blank">扩展批量导入模板</el-link>
        <el-button style="position:relative;">优选基金扩展批量导入
          <input type="file" id="fileExport1" class="fileInput" @change="handlebatchAdd('extends')" ref="inputer1">
        </el-button>
      <!-- <el-button @click="handlebatchAddExtends()">优选基金扩展批量导入</el-button> -->
    </div>
    <el-dialog :title="handleType == 'add' ? '添加优选基金' : '修改优选基金'" :visible="dialogFormVisible" :show-close='false'>
      <el-form ref="form" :model="form" label-width="180px" label-position="right">
        <el-form-item label="渠道码">
          <el-input v-model="form.channelId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收益区间">
          <el-select v-model="form.ratingTitle" placeholder="请选择收益区间">
            <el-option
              v-for="(item,index) in ratingData"
              :key="index"
              :label="item.value+':'+item.text"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="基金代码">
          <el-input v-model="form.fundCode" :disabled="handleType == 'update'"></el-input>
        </el-form-item>
        <el-form-item label="专题页tag">
          <el-input v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="推广标题">
          <el-input v-model="form.slogan"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sortIndex"></el-input>
        </el-form-item>
        <el-form-item label="模板类型编号">
          <el-select v-model="form.flag" placeholder="请选择模板类型编号">
            <el-option
              v-for="(item,index) in flagData"
              :key="index"
              :label="item.text+':'+item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" v-if="handleType == 'update'">
          <el-radio-group v-model="form.status">
            <el-radio label="1">下线</el-radio>
            <el-radio label="0">正常</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-if="handleType == 'add'" @click="singleAdd">立即添加</el-button>
          <el-button type="primary" v-if="handleType == 'update'"  @click="editUpdate">立即修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    
    <xtable :dataSource="dataSource" :columns="cols" class="listTable" row-key="keyid">
      <el-table-column slot="handle-column" align="center" label="操作" min-width="80">
        <template slot-scope="scope">
          <div>
            <!-- <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="scope.row.num !=1"
            >删除</el-button> -->
            <el-button size="mini" @click="handleEdit(scope.row)">修改</el-button>
          </div>
        </template>
      </el-table-column>
    </xtable>
    <!-- <pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :currentPage='page.pageNo'
      :pageSize="page.pageSize"
      :pageSizes="page.pageSizes"
      :layout="page.layout"
      :total="page.total"
      v-show="paginationShow"
    ></pagination> -->
  </div>
</template>

<script>
import xtable from "@/components/table/clientTable";
import comTitle from '@/basecomp/comTitle'; // 标题
import {
  queryPartnerChoiceList,
  queryFundOptimizedList,
  insertSingleFundOptimized,
  updateSingleFundOptimized,
  batchUpdateFundData,
  getRatingType
} from "@/api/tradeSystem";
import axios from "axios";
//import Sortable from 'sortablejs'
export default {
  components: {
     xtable,comTitle
  },
  data() {
    return {
      dropdownText:'',
      dropdownData:[],
      dataSource:[],
      ratingData:[],
      flagData:this.$key.flagData,
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "sortIndex", //<String>  对应属性名
          label: "排序", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "strSName", //<String>  对应属性名
          label: "基金名称", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "fundCode", //<String>  对应属性名
          label: "基金代码", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "slogan", //<String>  对应属性名
          label: "优选标题", //<String>   表头标签
          align: "center", //表头内容是否居中
          width: 200 // 列宽
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "content", //<String>  对应属性名
          label: "专题页tag", //<String>   表头标签
          align: "center", //表头内容是否居中
          width: 200 // 列宽
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "createDate", //<String>  对应属性名
          label: "添加时间", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "sdtUpdate", //<String>  对应属性名
          label: "合作截止日期", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "flag", //<String>  对应属性名
          label: "模板类型编号", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "status", //<String>  对应属性名
          label: "状态", //<String>   表头标签
          align: "center" //表头内容是否居中
        }
      ],
      dialogFormVisible: false,
      form: {
        channelId: '',
        ratingTitle: '',
        fundCode:'',
        content:'',
        slogan: '',
        sortIndex: '',
        flag: '',
        status:''
      },
      handleType:'add',
      page:{
				pageSizes:[10, 20, 50, 100],
				layout:"total, sizes, prev, pager, next, jumper",
				total:0,
				pageNo:1,
				pageSize:10,
			},
    };
  },
  mounted() {
    this._queryPartnerChoiceList();
    
  },
  methods: {
    //合作渠道查询
    _queryPartnerChoiceList() {
      let params = {
      };
      queryPartnerChoiceList(params).then(res => {
        console.log(res);
        
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dropdownData = res.data.data
          
        }
      });
    },
    //加载选中的基金
		selectFundBySearch(val) {
      console.log(val);
			if(val){
        this._queryFundOptimizedList(val)
        //清空file
        var file = document.getElementById('fileExport');
        file.value = ''; 
        var file1 = document.getElementById('fileExport1');
        file1.value = ''; 
			}
    },
    //优选基金列表查询
    _queryFundOptimizedList(val) {
      let params = {
        channelId:val
      };
      queryFundOptimizedList(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.data
          for (let i = 0; i < this.dataSource.length; i++) {
						const element = this.dataSource[i];
						element.createDate =this.$common.currentTimeYMDHM(element.createDate)
            element.sdtUpdate =this.$common.currentTimeYMD_(element.sdtUpdate)
            element.status = element.status == '0' ? '正常' : '下线'
          }
        }
      });
    },
    //收益区间查询
    _getRatingType(){
      getRatingType().then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.ratingData = res.data.data;
        }
      });
    },
    //修改按钮
    handleEdit(value){
      this.dialogFormVisible = true;
      this.handleType='update';
      this._getRatingType();
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          this.form[key] = ''
        }
      }
      this.addObj={
        id:value.id,
      }
      this.form = {
        channelId: value.channelId,
        ratingTitle: value.ratingTitle,
        fundCode: value.fundCode,
        content: value.content,
        slogan: value.slogan,
        sortIndex: value.sortIndex,
        flag: value.flag,
        status:value.status == '下线' ? '1' : '0'
      }
      console.log(this.addObj);
      
    },
    //修引提交
    editUpdate() {
      this.form = Object.assign(this.form,this.addObj)
      console.log(this.form);
      
      updateSingleFundOptimized(this.form).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dialogFormVisible = false
          this._queryFundOptimizedList(this.form.channelId)
          for (const key in this.form) {
            if (this.form.hasOwnProperty(key)) {
              this.form[key] = ''
            }
          }
          
        }
      });
    },
    //单支添加按钮
    handlesingleAdd(){
      this.dialogFormVisible = true;
      this.handleType='add';
      this._getRatingType();
      for (const key in this.form) {
            if (this.form.hasOwnProperty(key)) {
              this.form[key] = ''
            }
          }
          this.form.channelId = this.dropdownText
    },
    //单支添加提交
    singleAdd(){
      insertSingleFundOptimized(this.form).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dialogFormVisible = false
          this._queryFundOptimizedList(this.form.channelId)
        }
      });
    },
    
    //批量添加按钮
    handlebatchAdd(val){
      let inputDOM = this.$refs.inputer;
      var file = inputDOM.files[0]
      var that = this
      console.log(file);
      var formData = new FormData();
      formData.append("file", file);
      formData.append("clientId", this.dropdownText);
      formData.append("type", val);
      console.log(formData);

      let params = {
        file:file,
        clientId:this.dropdownText,
        type:val
      }
      console.log(JSON.stringify(params));
      axios({
          method: "post",
          url: "http://192.168.100.56:9100/systemConfig/fundOptimized/batchUpdateFundData",
          data: formData,
          headers: {
              'Content-Type': 'multipart/form-data',  // 文件上传
          },
      }).then(function (res) {
          console.log(res);
          if (res.data.code == '0000') {
            console.log(111);
            that._queryFundOptimizedList(that.dropdownText)
          }
      }).catch(function (reason) {

      })
      /* batchUpdateFundData(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this._refreshPartnerCache(this.form.channel);
          this.dialogFormVisible = false
        }
      }); */
    },
    //批量添加提交
    batchAdd(){
      batchUpdateFundData(this.form).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this._refreshPartnerCache(this.form.channel);
          this.dialogFormVisible = false
        }
      });
    },
    //配置缓存刷新
    _refreshPartnerCache(value) {
      let params = {
        channel:value
      }
      refreshPartnerCache(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
        }
      });
    },
  },
  
};
</script>

<style lang="scss" scoped>
.optimalFund {
  background: #fff;
  border: 1px solid #dcdfe6;
  padding: 0px 20px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  .listTitle {
    padding: 20px 0;
  }
  .listTable {
    // margin:0 20px;
    padding: 20px 0;
  }
  .fileInput{
    height: 2.26rem;
    width: 100%;
    margin: 0 auto;
    opacity: 0;
    z-index: 99999;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
<style lang="scss">
.optimalFund {
  .el-dropdown-menu{
        height: 80%;
    overflow-y: scroll;
  }
  .el-form-item__label{
  }
  .el-form-item__content{
  }
}
</style>