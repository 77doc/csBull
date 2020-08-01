<template>
  <div class="apiManage ov" style="padding:0 20px;">
    <el-button type="primary" icon="el-icon-edit" @click="filterBoxshow = !filterBoxshow">编辑条件进行查询</el-button>
    <el-button type="primary" @click="handleAdd">添加接口</el-button>
    <div v-if="filterBoxshow" class="filterBox">
      <el-form :model="queryForm" label-width="180px" label-position="right">
        <el-form-item label="路由路径">
          <el-input v-model="queryForm.routePath"></el-input>
        </el-form-item>
        <el-form-item label="接口路径">
          <el-input v-model="queryForm.interfacePath"></el-input>
        </el-form-item>
        <el-form-item label="请求接口方法类型">
          <el-radio-group v-model="queryForm.method">
            <el-radio label='POST'>POST</el-radio>
            <el-radio label='GET'>GET</el-radio>
          </el-radio-group>
          <!-- <el-select v-model="queryForm.method">
            <el-option
              v-for="item in methodType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item label="控制限制类型">
          <el-radio-group v-model="queryForm.type">
            <el-radio label="0">无访问限制</el-radio>
            <el-radio label="1">登陆访问</el-radio>
            <el-radio label="2">权限控制访问</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接口状态">
          <el-radio-group v-model="queryForm.status">
            <el-radio label="1">有效</el-radio>
            <el-radio label="0">无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="orderType">
          <el-input v-model="queryForm.orderType"></el-input>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" @click="_queryInterface">立即查询</el-button>
          <el-button @click="clearFilter">清空筛选条件</el-button>
        </div>
      </el-form>
    </div>
    <el-dialog title="新增接口" :visible="addDialog" :show-close='false'>
      <el-form :model="addForm" label-width="180px" label-position="right">
        <el-form-item label="路由路径">
          <el-input v-model="addForm.routePath"></el-input>
        </el-form-item>
        <el-form-item label="接口路径">
          <el-input v-model="addForm.interfacePath"></el-input>
        </el-form-item>
        <el-form-item label="请求接口方法类型">
          <el-radio-group v-model="addForm.method">
            <el-radio label='POST'>POST</el-radio>
            <el-radio label='GET'>GET</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接口描述">
          <el-input v-model="addForm.interfaceDescription"></el-input>
        </el-form-item>
        <el-form-item label="控制限制类型">
          <el-radio-group v-model="addForm.type">
            <el-radio label="0">无访问限制</el-radio>
            <el-radio label="1">登陆访问</el-radio>
            <el-radio label="2">权限控制访问</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接口状态">
          <el-radio-group v-model="addForm.status">
            <el-radio label="1">有效</el-radio>
            <el-radio label="0">无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="可访问的IP地址">
          <el-input v-model="addForm.regexIP"></el-input>
        </el-form-item>
        <el-form-item label="是否自动记录日志信息">
          <el-radio-group v-model="addForm.logRecord">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" @click="_addInterface">立即创建</el-button>
          <el-button @click="addDialog = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog title="修改接口" :visible="dialogFormVisible" :show-close='false'>
      <el-form :model="updateForm" label-width="180px" label-position="right">
        <el-form-item label="路由路径">
          <el-input v-model="updateForm.routePath"></el-input>
        </el-form-item>
        <el-form-item label="接口路径">
          <el-input v-model="updateForm.interfacePath"></el-input>
        </el-form-item>
        <el-form-item label="请求接口方法类型">
          <el-radio-group v-model="updateForm.method">
            <el-radio label='POST'>POST</el-radio>
            <el-radio label='GET'>GET</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接口描述">
          <el-input v-model="updateForm.interfaceDescription"></el-input>
        </el-form-item>
        <el-form-item label="控制限制类型">
          <el-radio-group v-model="updateForm.type">
            <el-radio label="0">无访问限制</el-radio>
            <el-radio label="1">登陆访问</el-radio>
            <el-radio label="2">权限控制访问</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="接口状态">
          <el-radio-group v-model="updateForm.status">
            <el-radio label="1">有效</el-radio>
            <el-radio label="0">无效</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="可访问的IP地址">
          <el-input v-model="updateForm.regexIP"></el-input>
        </el-form-item>
        <el-form-item label="是否自动记录日志信息">
          <el-radio-group v-model="updateForm.logRecord">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <div style="text-align: center;">
          <el-button type="primary" @click="_updateInterface">立即修改</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
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
            <el-button size="mini" type='danger' @click="handleDelete(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </xtable>
    <pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :currentPage='page.pageNo'
      :pageSize="page.pageSize"
      :pageSizes="page.pageSizes"
      :layout="page.layout"
      :total="page.total"
    ></pagination>
  </div>
</template>

<script>
import xtable from "@/components/table/clientTable";
import pagination from '@/basecomp/pagination'; // 分页
import {
  queryInterface,
  updateInterface,
  addInterface,
  deleteInterface
} from "@/api/authority";
export default {
  components: {
     xtable,
     pagination
  },
  data() {
    return {
      dataSource:[],
      filterBoxshow:false,
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "id", //<String>  对应属性名
          label: "接口ID", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "insertTime", //<String>  对应属性名
          label: "插入时间", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "routePath", //<String>  对应属性名
          label: "路由路径", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "interfacePath", //<String>  对应属性名
          label: "接口路径", //<String>   表头标签
          align: "center", //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "interfaceDescription", //<String>  对应属性名
          label: "接口描述", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "method", //<String>  对应属性名
          label: "请求接口方法", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "regexIP", //<String>  对应属性名
          label: "可以访问接口的IP", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "operationType", //<String>  对应属性名
          label: "操作类型", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "logRecord", //<String>  对应属性名
          label: "是否记录日志", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "type", //<String>  对应属性名
          label: "接口访问控制类型", //<String>   表头标签
          align: "center" //表头内容是否居中
        }
      ],
      addDialog:false,
      dialogFormVisible: false,
      queryForm:{
        routePath: "",
        method: "",
        type: "",
        interfacePath: "",
        status: "",
        orderType:""
      },
      addForm:{
        routePath: "",
        interfacePath: "",
        method: "",
        interfaceDescription:'',
        type: "",
        status: "",
        regexIP:'',
        logRecord:'',
        operationType:'',
      },
      updateForm:{},
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
  },
  methods: {
    //合作渠道查询
    _queryInterface() {
      let pageJson = {
        pageSize:this.page.pageSize,
        pageNum:this.page.pageNo,
      }
      let params = {};
      Object.assign(params,this.queryForm,pageJson)
      console.log(params);
      
      queryInterface(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.data.list;
          this.dataSource.forEach(element => {
            element.type = element.type == '0' ? '无访问限制' : (element.type == '1' ? '登陆访问' : '权限控制访问')
            element.logRecord = element.logRecord == '0' ? '否' : '是'
          });
          this.page.total = res.data.data.total
        }
      });
    },
    clearFilter(){
      for (const key in this.queryForm) {
            if (this.queryForm.hasOwnProperty(key)) {
              this.queryForm[key] = ''
            }
          }
    },
    handleEdit(value){
      let obj = Object.assign({},value)
      this.dialogFormVisible = true;
      delete obj.insertTime;
      obj.type = obj.type == '无访问限制' ? '0' : (obj.type == '登陆访问' ? '1' : '2')
      obj.logRecord = obj.logRecord == '否' ? '0' : '1'
      this.updateForm = obj;
      this.updateForm.operationType = '3';
      console.log(this.updateForm);
    },
    //修引流渠道提交
    _updateInterface() {
      updateInterface(this.updateForm).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this._queryInterface()
          this.dialogFormVisible = false
          for (const key in this.updateForm) {
            if (this.updateForm.hasOwnProperty(key)) {
              this.updateForm[key] = ''
            }
          }
        }
      });
    },
    handleAdd(){
      this.addDialog = true;
      for (const key in this.addForm) {
        if (this.addForm.hasOwnProperty(key)) {
          this.addForm[key] = ''
        }
      }
      console.log(this.addForm);
      this.addForm.operationType = '1';
    },
    //新增渠道提交
    _addInterface(){
      console.log(this.addForm);
      addInterface(this.addForm).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this._queryInterface()
          this.addDialog = false
        }
      });
    },
    handleDelete(value){
      console.log(value);
      
      let params = [1,2];
      params.push(value.id)
      console.log(params);
      
      this.$confirm('确定删除此接口？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteInterface(params).then(res => {
          if (res.data.code == "0000") {
            console.log(res.data);
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this._queryInterface()
          }else{
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        });
      }).catch(() => {
      });
    },
    _deleteInterface(){
      deleteInterface(this.addForm).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this._queryInterface()
          this.addDialog = false
        }
      });
    },
    handleSizeChange(pageSize) {
			this.page.pageSize = pageSize
      this._queryInterface()
    },
    handleCurrentChange(currentPage) {
			this.page.pageNo = currentPage
      this._queryInterface()
    },
  },
  
};
</script>

<style lang="scss" scoped>
.apiManage {
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
  .filterBox{
    margin-top: 20px;
    padding: 20px 0;
    border: 1px solid #999;
  }
}
</style>
<style lang="scss">
.apiManage {
  .el-form-item__label{
  }
  .el-form-item__content{
  }
  .filterBox{
    .el-form-item {
        margin-bottom: 22px;
        width: 48%;
        display: inline-block;
    }
  }
}
</style>