<template>
  <div class="channelAllocation">
    <el-dialog title="修改渠道信息" :visible="dialogFormVisible" :show-close='false'>
      <el-form ref="form" :model="updateForm" label-width="180px" label-position="right">
        <el-form-item label="渠道名称">
          <el-input v-model="updateForm.sourcename"></el-input>
        </el-form-item>
        <el-form-item label="合作截止日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" format='yyyy-MM-dd' v-model="updateForm.sdtend" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="短信签名">
          <el-input v-model="updateForm.smssuffix"></el-input>
        </el-form-item>
        <el-form-item label="参数签名公私钥">
          <el-input v-model="updateForm.secretkey"></el-input>
        </el-form-item>
        <el-form-item label="恒生调用channel参数">
          <el-input v-model="updateForm.channelhs"></el-input>
        </el-form-item>
        <el-form-item label="交易来源">
          <el-input v-model="updateForm.comefrom"></el-input>
        </el-form-item>
        <el-form-item label="登录token保存类型">
          <el-input v-model="updateForm.channel"></el-input>
        </el-form-item>
        <el-form-item label="是否启用恒生交易密码">
          <el-radio-group v-model="updateForm.isneedtradepassword">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合作方Logo">
          <el-input v-model="updateForm.logourl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="_updatePartner">立即修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="新增渠道信息" :visible="addDialog" :show-close='false'>
      <el-form ref="form" :model="addForm" label-width="180px" label-position="right">
        <el-form-item label="渠道名称">
          <el-input v-model="addForm.sourcename"></el-input>
        </el-form-item>
        <el-form-item label="合作截止日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" value-format="yyyyMMdd" format='yyyy-MM-dd' v-model="addForm.sdtend" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="短信签名">
          <el-input v-model="addForm.smssuffix"></el-input>
        </el-form-item>
        <el-form-item label="参数签名公私钥">
          <el-input v-model="addForm.secretkey"></el-input>
        </el-form-item>
        <el-form-item label="恒生调用channel参数">
          <el-input v-model="addForm.channelhs"></el-input>
        </el-form-item>
        <el-form-item label="交易来源">
          <el-input v-model="addForm.comefrom"></el-input>
        </el-form-item>
        <el-form-item label="登录token保存类型">
          <el-input v-model="addForm.channel"></el-input>
        </el-form-item>
        <el-form-item label="是否启用恒生交易密码">
          <el-radio-group v-model="addForm.isneedtradepassword">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="合作方Logo">
          <el-input v-model="addForm.logourl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_insertPartnerInfo">立即创建</el-button>
          <el-button @click="addDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-button @click="handleAdd()" style="margin-top:20px;">新增渠道</el-button>
    <xtable :dataSource="dataSource" :columns="cols" class="listTable">
      <el-table-column slot="handle-column" align="center" label="操作" min-width="120">
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
  queryPartnerList,
  updatePartner,
  insertPartnerInfo,
  refreshPartnerCache,
  ghostPartnerConfig
} from "@/api/tradeSystem";
export default {
  components: {
     xtable,comTitle
  },
  data() {
    return {
      dataSource:[],
       cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "sourcename", //<String>  对应属性名
          label: "引流方名称", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "channel", //<String>  对应属性名
          label: "引流渠道命名", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "sn", //<String>  对应属性名
          label: "引流渠道码", //<String>   表头标签
          align: "center", //表头内容是否居中
          width: 200 // 列宽
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "comefrom", //<String>  对应属性名
          label: "交易来源", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "createdate", //<String>  对应属性名
          label: "创建日期", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "sdtend", //<String>  对应属性名
          label: "合作截止日期", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "smssuffix", //<String>  对应属性名
          label: "短信签名定义", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "secretkey", //<String>  对应属性名
          label: "调用验签公私钥", //<String>   表头标签
          align: "center" //表头内容是否居中
        }
      ],
      dialogFormVisible: false,
      addDialog: false,
      updateForm: {
        sourcename: '',
        targeturl: null,
        sdtend: '',
        smssuffix: '',
        secretkey: '',
        channelhs: '',
        comefrom: '',
        channel: '',
        isneedtradepassword: '0',
        logourl: '',
      },
      addForm: {
        sourcename: '',
        targeturl: null,
        sdtend: '',
        smssuffix: '',
        secretkey: '',
        channelhs: '',
        comefrom: '',
        channel: '',
        isneedtradepassword: '0',
        logourl: '',
      },
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
    this._queryPartnerList();
    //this._queryPartnerList();
  },
  methods: {
    //合作渠道查询
    _queryPartnerList() {
      let params = {
      };
      queryPartnerList(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.data
          for (let i = 0; i < this.dataSource.length; i++) {
						const element = this.dataSource[i];
						element.createdate =this.$common.currentTimeYMD_(element.createdate)
            element.sdtend =this.$common.currentTimeYMD_(element.sdtend)
            for (const key in element) {
              if (element.hasOwnProperty(key)) {
                const value = element[key];
                if (value === '' || value === null) {
                  element[key] = '--'
                }
              }
            }
					}
        }
      });
    },
    handleEdit(value){
      console.log(value);
      this.dialogFormVisible = true;
      for (const key in this.updateForm) {
        if (this.updateForm.hasOwnProperty(key)) {
          this.updateForm[key] = ''
        }
      }
      this.addObj={
        channelid:value.channelid,
        id:value.id,
      }
      this.updateForm = {
        sourcename: value.sourcename == '--' ? '' : value.sourcename,
        targeturl: null,
        sdtend: value.sdtend,
        smssuffix: value.smssuffix == '--' ? '' : value.smssuffix,
        secretkey: value.secretkey == '--' ? '' : value.secretkey,
        channelhs: value.channelhs == '--' ? '' : value.channelhs,
        comefrom: value.comefrom == '--' ? '' : value.comefrom,
        channel: value.channel == '--' ? '' : value.channel,
        isneedtradepassword: value.isneedtradepassword,
        logourl: value.logourl == '--' ? '' : value.logourl, 
      }
      console.log(this.updateForm);
      
      
    },
    //修引流渠道提交
    _updatePartner() {
      let obj = Object.assign({},this.updateForm)
      obj.sdtend = obj.sdtend.replace(/-/g,'')
      obj = Object.assign(obj,this.addObj)
      console.log(obj);
      updatePartner(obj).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this._refreshPartnerCache(obj.channel);
          this._queryPartnerList()
          this.dialogFormVisible = false
          
        }
      });
    },
    handleAdd(){
      this.addDialog = true;
      // for (const key in this.form) {
      //       if (this.form.hasOwnProperty(key)) {
      //         this.form[key] = ''
      //       }
      //     }
      // this.form.isneedtradepassword = false
    },
    //新增渠道提交
    _insertPartnerInfo(){
      console.log(this.addForm);
      insertPartnerInfo(this.addForm).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this._refreshPartnerCache(this.addForm.channel);
          this._queryPartnerList()
          this.addDialog = false
          this.$confirm('是否对此新增渠道进行初始化配置？', '提示', {
            confirmButtonText: '确定配置',
            cancelButtonText: '不配置',
            type: 'warning'
          }).then(() => {
            this._ghostPartnerConfig(res.data.data)
          }).catch(() => {
          });
        }
      });
    },
    //一键配置
    _ghostPartnerConfig(val) {
      let params = {
        channelId:val,
        channel:this.form.sourcename
      }
      ghostPartnerConfig(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this._refreshPartnerCache(this.form.channel);
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
.channelAllocation {
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
}
</style>
<style lang="scss">
.channelAllocation {
  .el-form-item__label{
  }
  .el-form-item__content{
  }
}
</style>