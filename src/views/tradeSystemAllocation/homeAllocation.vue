<template>
  <div class="homeAllocation">
    <div style="margin:20px 0;">
      请选择引流渠道进行配置：
      <el-select 
        @change="selectFundBySearch"
        v-model="channelId" placeholder="请选择引流渠道" style="width:400px;">
        <el-option
          v-for="(item,index) in dropdownData"
          :key="index"
          :label="item.sourcename+':'+item.sn"
          :value="item.sn">
        </el-option>
      </el-select>
    </div>
    <el-tabs v-model="activeName" type="border-card" style="margin-bottom: 30px;" @tab-click='handleTabsClick'>
      <el-tab-pane label="幻灯片管理" name='child1'>
        <markhotCp v-if="childList.child1" :message='channelId'></markhotCp>
      </el-tab-pane>
      <el-tab-pane label="快速入口管理" name='child2'>
        <defaultchannel v-if="childList.child2" :message='channelId'></defaultchannel>
      </el-tab-pane>
      <el-tab-pane label="推广运营位" name='child3'>
        <hotfund v-if="childList.child3" :message='channelId'></hotfund>
      </el-tab-pane>
      <el-tab-pane label="理财推荐位" name='child4'>
        <licaiconf v-if="childList.child4" :message='channelId'></licaiconf>
      </el-tab-pane>
      <el-tab-pane label="存金宝" name='child5'>
        <goldBanner v-if="childList.child5" :message='channelId'></goldBanner>
      </el-tab-pane>
      <el-tab-pane label="帐户中心活期推广" name='child6'>
        <hqBanner v-if="childList.child6" :message='channelId'></hqBanner>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import xtable from "@/components/table/clientTable";
import markhotCp from "./components/homeAllocation/markethot";
import defaultchannel from "./components/homeAllocation/defaultchannel";
import hotfund from "./components/homeAllocation/hotfund";
import licaiconf from "./components/homeAllocation/licaiconf";
import goldBanner from "./components/homeAllocation/goldBanner";
import hqBanner from "./components/homeAllocation/hqBanner";
import comTitle from '@/basecomp/comTitle'; // 标题
import {
  getPertnerByField,
  queryFundOptimizedList,
  insertSingleFundOptimized,
  updateSingleFundOptimized,
  batchAddFundOptimized,
  getRatingType,
  queryPartnerChoiceList
} from "@/api/tradeSystem";
//import Sortable from 'sortablejs'
export default {
  components: {
     markhotCp,
     defaultchannel,
     hotfund,
     licaiconf,
     goldBanner,
     hqBanner,
     comTitle
  },
  data() {
    return {
      channelId:'',
      dropdownData:[],
      activeName:'child1',
      childList:{
       child1:false,
       child2:false,
       child3:false,
       child4:false,
       child5:false,
       child6:false,
     }
    };
  },
  mounted() {
    this._queryPartnerChoiceList();
  },
  methods: {
    handleTabsClick(tab, event){
      if (this.channelId) {
        if (tab.label == '幻灯片管理') {
          this.childList.child1 = true;
          this.childList.child2 = false;
          this.childList.child3 = false;
          this.childList.child4 = false;
          this.childList.child5 = false;
          this.childList.child6 = false;
        }
        if (tab.label == '快速入口管理') {
          this.childList.child1 = false;
          this.childList.child2 = true;
          this.childList.child3 = false;
          this.childList.child4 = false;
          this.childList.child5 = false;
          this.childList.child6 = false;
        }
        if (tab.label == '推广运营位') {
          this.childList.child1 = false;
          this.childList.child2 = false;
          this.childList.child3 = true;
          this.childList.child4 = false;
          this.childList.child5 = false;
          this.childList.child6 = false;
        }
         if (tab.label == '理财推荐位') {
          this.childList.child1 = false;
          this.childList.child2 = false;
          this.childList.child3 = false;
          this.childList.child4 = true;
          this.childList.child5 = false;
          this.childList.child6 = false;
        }
         if (tab.label == '存金宝') {
          this.childList.child1 = false;
          this.childList.child2 = false;
          this.childList.child3 = false;
          this.childList.child4 = false;
          this.childList.child5 = true;
          this.childList.child6 = false;
        }
         if (tab.label == '帐户中心活期推广') {
          this.childList.child1 = false;
          this.childList.child2 = false;
          this.childList.child3 = false;
          this.childList.child4 = false;
          this.childList.child5 = false;
          this.childList.child6 = true;
        }
      }
    },
    //加载选中的基金
		selectFundBySearch(val) {
      console.log(val);
			if(val){
        if (this.activeName == 'child1') {
          this.childList.child1 = true;
          this.childList.child2 = false;
          this.childList.child3 = false;
          this.childList.child4 = false;
          this.childList.child5 = false;
          this.childList.child6 = false;
        }
        if (this.activeName == 'child2') {
          this.childList.child1 = false;
          this.childList.child2 = true;
          this.childList.child3 = false;
          this.childList.child4 = false;
          this.childList.child5 = false;
          this.childList.child6 = false;
        }
        if (this.activeName == 'child3') {
          this.childList.child1 = false;
          this.childList.child2 = false;
          this.childList.child3 = true;
          this.childList.child4 = false;
          this.childList.child5 = false;
          this.childList.child6 = false;
        }
         if (this.activeName == 'child4') {
          this.childList.child1 = false;
          this.childList.child2 = false;
          this.childList.child3 = false;
          this.childList.child4 = true;
          this.childList.child5 = false;
          this.childList.child6 = false;
        }
         if (this.activeName == 'child5') {
          this.childList.child1 = false;
          this.childList.child2 = false;
          this.childList.child3 = false;
          this.childList.child4 = false;
          this.childList.child5 = true;
          this.childList.child6 = false;
        }
         if (this.activeName == 'child6') {
          this.childList.child1 = false;
          this.childList.child2 = false;
          this.childList.child3 = false;
          this.childList.child4 = false;
          this.childList.child5 = false;
          this.childList.child6 = true;
        }
			}
    },
    //合作渠道查询
    _queryPartnerChoiceList() {
      let params = {
      };
      queryPartnerChoiceList(params).then(res => {
        if (res.data.code == "0000") {
          console.log(res.data);
          this.dropdownData = res.data.data
        }
      });
    },
  },
  
};
</script>

<style lang="scss" scoped>
.homeAllocation {
  background: #fff;
  border: 1px solid #dcdfe6;
  padding: 0px 20px;
  margin-bottom: 30px;
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
.homeAllocation {
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