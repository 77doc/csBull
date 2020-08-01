<template>
  <div class="qsManager">
    <div class="bgwhite ov" style="padding:0 20px 20px;">
      <div class="tableLeft">
        <p style="margin-top:20px;">全量产品</p>
        <xtable :dataSource="dataSource" :columns="cols" class="listTable">
          <el-table-column slot="handle-column" align="center" label="操作" min-width="80">
            <template slot-scope="scope">
              <div>
                <el-button size="mini" 
                  @click="handleAdd(scope.row)">添加</el-button>
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
      <div class="tableRight">
        <p style="margin-top:20px;">每期维护产品(可拖拽每行进行自定义排序)
          <!-- <el-button style="position:relative;float:right" type="primary" size='mini'>导入维护产品表
            <input type="file" id="fileExport" class="fileInput" @change="changeFile" ref="inputer">
          </el-button> -->
          <upload-excel-component 
            style="position:relative;float:right"
            @handlePost="handlePost" 
            btnName='导入维护产品表'/>
        </p>
        
        <xtable :dataSource="dataSource1" :columns="cols1" class="listTable" :rowkey="qskeyid">
          <el-table-column slot="handle-column" align="center" label="状态" min-width="130">
            <template slot-scope="scope">
              <el-select v-model="scope.row.status">
                <el-option
                  v-for="(item,index) in statusData"
                  :key="index"
                  :label="item.text"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column slot="handle-column" align="center" label="操作" min-width="80">
            <template slot-scope="scope">
              <div>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  v-if="scope.row.num !=1"
                >删除</el-button>
              </div>
            </template>
          </el-table-column>
        </xtable>
        <p style="text-align:center;">
          <el-button
            size="mini"
            type="primary"
            @click="submit()"
          >提交</el-button>
        </p>
        <!-- <pagination
          @handleSizeChange="handleSizeChange1"
          @handleCurrentChange="handleCurrentChange1"
          :currentPage='page1.pageNo'
          :pageSize="page1.pageSize"
          :pageSizes="page1.pageSizes"
          :layout="page1.layout"
          :total="page1.total"
        ></pagination> -->
      </div>
    </div>
  </div>
</template>

<script>
import UploadExcelComponent from '@/components/UploadExcel/myUpload.vue'
import xtable from "@/components/table/clientTable";
import comTitle from '@/basecomp/comTitle'; // 标题
import pagination from '@/basecomp/pagination'; // 分页
import axios from "axios";
import {
  getNeedQslcData,
  getAllQslcData,
  updateByStatus,
  uploadQslcExcelFile,
} from "@/api/qsManager";
import Sortable from 'sortablejs'
export default {
  components: {
     xtable,
     pagination,
     comTitle,
     UploadExcelComponent
  },
  data() {
    return {
      dataSource:[],
      dataSource1:[],
      qskeyid:'strBakCode',
      cols: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "strBakCode",
          label: "基金代码", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "PTSNAME", //<String>  对应属性名
          label: "基金名称", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "BuyStartDate", //<String>  对应属性名
          label: "基金开放日", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "Rating", //<String>  对应属性名
          label: "业绩比较基准", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "InvestPeriod", //<String>  对应属性名
          label: "基金周期", //<String>   表头标签
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
      cols1: [
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "strBakCode",
          label: "基金代码", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "PTSNAME", //<String>  对应属性名
          label: "基金名称", //<String>   表头标签
          align: "center", //表头内容是否居中
          
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "BuyStartDate", //<String>  对应属性名
          label: "基金开放日", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "Rating", //<String>  对应属性名
          label: "业绩比较基准", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
        {
          hasSort: false, //<Boolean> 是否排序
          isShow: true, //<Boolean> 是否展示
          prop: "InvestPeriod", //<String>  对应属性名
          label: "基金周期", //<String>   表头标签
          align: "center" //表头内容是否居中
        },
      ],
      statusData:[
        {
          text:'已售罄',
          value:'1'
        },
        {
          text:'热销中',
          value:'2'
        },
        {
          text:'即将开放',
          value:'3'
        }
      ],
      page:{
				pageSizes:[10, 20, 50, 100],
				layout:"total, sizes, prev, pager, next, jumper",
				total:0,
				pageNo:1,
				pageSize:10,
      },
      page1:{
				pageSizes:[10, 20, 50, 100],
				layout:"total, sizes, prev, pager, next, jumper",
				total:0,
				pageNo:1,
				pageSize:10,
			},
    };
  },
  mounted() {
    this._getAllQslcData();
    this._getNeedQslcData();
    this.rowDrop()
  },
  methods: {
    //行拖拽
    rowDrop() {
      const tbody = document.querySelector('.tableRight .el-table__body-wrapper tbody')
      
      const _this = this
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          const currRow = _this.dataSource1.splice(oldIndex, 1)[0]
          _this.dataSource1.splice(newIndex, 0, currRow)
        }
      })
    },
    handlePost(formData){
      console.log(formData);
       uploadQslcExcelFile(formData).then(res=>{
        console.log(res);
        if (res.data.code == '0000') {
            console.log(111);
            that._getNeedQslcData()
          }
      })
    },
    changeFile(e) {
      let inputDOM = this.$refs.inputer;
      var file = inputDOM.files[0]
      var that = this
      console.log(file);
      var formData = new FormData();
      formData.append("file", file);
      console.log(formData);
      var that = this;
      axios({
          method: "post",
          url: "http://192.168.100.56:9100/qszg/qs/uploadQslcExcelFile",
          data: formData,
          headers: {
              'Content-Type': 'multipart/form-data',  // 文件上传
          },
      }).then(function (res) {
          console.log(res);
          if (res.data.code == '0000') {
            console.log(111);
            that._getNeedQslcData()
          }
      }).catch(function (reason) {

      })
    },
    //全量
    _getAllQslcData() {
      let params = {
        curPage:this.page.pageNo,
        pageSize:this.page.pageSize
      };
      getAllQslcData(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource = res.data.data
          this.page.total = res.data.dataCount
          this.dataSource.forEach(element => {
            element.BuyStartDate = this.$common.currentTimeYMD_(Number(element.BuyStartDate))
            if (element.status == '1') {
              element.status = '已售罄'
            }else if (element.status == '2') {
              element.status = '热销中'
            }else if (element.status == '3') {
              element.status = '即将开放'
            }else{
              element.status = '--'
            }
          });
          
        }
      });
    },
    //维护
    _getNeedQslcData() {
      let params = {
        curPage:this.page.pageNo,
        pageSize:this.page.pageSize
      };
      getNeedQslcData(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dataSource1 = res.data.data
          this.dataSource1.forEach(element => {
            element.BuyStartDate = this.$common.currentTimeYMD_(Number(element.BuyStartDate))
            if (element.status == '1') {
              element.status = '已售罄'
            }
            if (element.status == '2') {
              element.status = '热销中'
            }
            if (element.status == '3') {
              element.status = '即将开放'
            }
          });
          //this.page1.total = res.data.dataCount
        }
      });
    },
    handleAdd(value){
      console.log(JSON.stringify(this.dataSource1).indexOf(JSON.stringify(value)));
      let obj = Object.assign({},value)
      if (JSON.stringify(this.dataSource1).indexOf(obj.strBakCode) > -1) {
        this.$message({
            type: 'warning',
            message: '维护列表中已存在'
          });
      }else{
        this.dataSource1.push(obj)
      }
    },
    handleDelete(index,value){
      console.log(index);
      this.dataSource1.splice(index,1)
    },
    submit(){
      let str = ''
            
      this.dataSource1.forEach(element => {
        if (element.status == '已售罄') {
          element.status = '1'
        }else if (element.status == '热销中') {
          element.status = '2'
        }else if (element.status == '即将开放') {
          element.status = '3'
        }
        str += element.strBakCode+'*'+element.status+'*'+this.$common.dateToNum(element.BuyStartDate)+','
      });
      if (str.indexOf('--') > -1) {
        this.$message({
            type: 'warning',
            message: '请选择产品状态'
          });
      }else{
        let params = {
          params:str
        };
        console.log(params);
        updateByStatus(params).then(res => {
          if (res.data.code == "0000") {
            console.log(res.data);
            this.$message({
              type: 'success',
              message: '更新成功'
            });
            this._getNeedQslcData();
          }else{
            this.$message({
              type: 'error',
              message: res.data.message
            });
          }
        });
      }
    },
    handleSizeChange(pageSize) {
			this.page.pageSize = pageSize
      this._getAllQslcData()
    },
    handleCurrentChange(currentPage) {
			this.page.pageNo = currentPage
      this._getAllQslcData()
    },
  },
  
  
};
</script>

<style lang="scss" scoped>
.qsManager {
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
  .tableLeft{
    width: 48%;
    float: left;
    margin-right: 2%;
  }
  .tableRight{
    width: 48%;
    float: left;
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
.qsManager {
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