<!--表格组件-->
<template>
    <el-table
            :data="tableData"
            :border="border"
            @filter-change="filterChange"
            header-row-class-name='el-table-left'
            stripe
            v-loading="tableLoading"
            element-loading-text="正在加载..."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.4)"
            :header-cell-style="{background:'#61617c',color:'#fff',fontWeight: 'normal'}"
            :height="tableHeight"
            >
            <slot 
                slot="empty"
                v-if="newComer">
                <router-link style="color:#00a0e9;" to="/buyFund">未持有基金产品，去看看~</router-link>
                </slot>
        <!--选择-->
        
        <el-table-column
                v-if="hasSelection"
                type="selection"
                width="55">
        </el-table-column>
        <!--序号-->
        <el-table-column
                v-if="hasIndex"
                type="index"
                width="55">
        </el-table-column>
        <!--数据源-->
        <el-table-column v-for="(column, index) in columns"
            :align="column.align"
            :sortable="column.sort"
            :key="column.prop"
            :prop="column.prop"
            :label="column.label"
            :show-overflow-tooltip="true"
            :width="column.width"
            :min-width="column.minWidth"
            :max-width="column.maxWidth"
            v-if="column.type == 'filter'"
            :filters="column.filters"
            :filter-multiple='false'
          >
          
            <template slot-scope="scope">
              <!--  @click="pushDetail(scope.row,column.prop)" -->
              <span 
                :class="{cursor:column.cursor}"
                v-if="!column.updown"
                :style="column.customStyle"
                @click="pushDetail(scope.row,column.prop)"
                >
                  <i style="transform:scale(0.8,0.8);padding:1px 2px;background-color: #61617c;font-style: normal;color: #fff;font-size: 12px;" v-if="scope.row[column.prop1]&&column.transflag&&scope.row.fund_busin_code=='138'">转出</i>
                  {{scope.row[column.prop] == null||scope.row[column.prop] == '-99999'||scope.row[column.prop] == '-99999.00' ? '--' :scope.row[column.prop]}}
              </span>
              <span 
                v-if="column.updown"
                :class="{zhang:scope.row[column.prop]>0 ? true : false,die:scope.row[column.prop]<0 ? true : false,}">
                    <i style="transform:scale(0.8,0.8);padding:1px 2px;background-color: #61617c;font-style: normal;color: #fff;font-size: 12px;" v-if="scope.row[column.prop1]&&column.transflag&&scope.row.fund_busin_code=='138'">转出</i>
                    {{scope.row[column.prop] == null||scope.row[column.prop] == '-99999'||scope.row[column.prop] == '-99999.00' ? '--' :scope.row[column.prop]+"%"}}
                </span>
              <span
                 v-if="column.prop1"
                 class="time"
                 :style="column.transflag ? {'overflow':'hidden','text-overflow': 'ellipsis','white-space': 'nowrap','width':' 97%'} : ''"
                 :class="column.colorflag?'color333':''">
                    <i style="transform:scale(0.8,0.8);padding:1px 2px;background-color: #61617c;font-style: normal;color: #fff;font-size: 12px;" v-if="scope.row[column.prop1]&&column.transflag&&scope.row.fund_busin_code=='137'">转入</i>
                    {{scope.row[column.prop1]}}
                    <i class="iconfont icon-zhuanhuan" style="position: absolute;top: 31%;right: 5%;" v-if="scope.row[column.prop1]&&column.transflag"></i>
                </span>
            </template>
        </el-table-column>
        <el-table-column 
          :align="column.align"
          :sortable="column.sort"
          :key="column.prop"
          :prop="column.prop"
          :label="column.label"
          :show-overflow-tooltip="true"
          :width="column.width"
          :min-width="column.minWidth"
          :max-width="column.maxWidth"
           v-else-if="column.type == 'normal'"
          >
          
            <template slot-scope="scope">
              <!--  @click="pushDetail(scope.row,column.prop)" -->
              <span 
                :class="{cursor:column.cursor}"
                v-if="!column.updown"
                :style="column.customStyle"
                @click="pushDetail(scope.row,column.prop)"
                >
                  <i style="transform:scale(0.8,0.8);padding:1px 2px;background-color: #61617c;font-style: normal;color: #fff;font-size: 12px;" v-if="scope.row[column.prop1]&&column.transflag&&scope.row.fund_busin_code=='138'">转出</i>
                  {{scope.row[column.prop] == null||scope.row[column.prop] == '-99999'||scope.row[column.prop] == '-99999.00' ? '--' :scope.row[column.prop]}}
              </span>
              <span 
                v-if="column.updown"
                :class="{zhang:scope.row[column.prop]>0 ? true : false,die:scope.row[column.prop]<0 ? true : false,}">
                    <i style="transform:scale(0.8,0.8);padding:1px 2px;background-color: #61617c;font-style: normal;color: #fff;font-size: 12px;" v-if="scope.row[column.prop1]&&column.transflag&&scope.row.fund_busin_code=='138'">转出</i>
                    {{scope.row[column.prop] == null||scope.row[column.prop] == '-99999'||scope.row[column.prop] == '-99999.00' ? '--' :scope.row[column.prop]+"%"}}
                </span>
              <span
                 v-if="column.prop1"
                 class="time"
                 :style="column.transflag ? {'overflow':'hidden','text-overflow': 'ellipsis','white-space': 'nowrap','width':' 97%'} : ''"
                 :class="column.colorflag?'color333':''">
                    <i style="transform:scale(0.8,0.8);padding:1px 2px;background-color: #61617c;font-style: normal;color: #fff;font-size: 12px;" v-if="scope.row[column.prop1]&&column.transflag&&scope.row.fund_busin_code=='137'">转入</i>
                    {{scope.row[column.prop1]}}
                    <i class="iconfont icon-zhuanhuan" style="position: absolute;top: 31%;right: 5%;" v-if="scope.row[column.prop1]&&column.transflag"></i>
                </span>
            </template>
        </el-table-column>
        <!--操作-->
        <slot name="handle-column">
        </slot>
    </el-table>
</template>

<script type="text/ecmascript-6">
    /*向父组件传递的数据：
     * commitSelection     被选中的数据
     *
     * */
    export default {
        name: 'tm-table',
        props: {
            //是否为空  新用户
            newComer: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            //是否可以选择
            hasSelection: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            //是否有序列项
            hasIndex: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            //表格高度
            tableHeight: {
                type: Number ,
                default: null
            },
            // 相应的字段展示
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            // 数据源
            tableData: {
                type: Array,
                default: function () {
                    return []
                }
            },
            // 是否有边框
            border: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            // 是否有加载动画
            tableLoading: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
        },
        methods: {
            //将选中的行发送到父组件
            handleSelectionChange(val) {
                const selectionArr = [];
                val.forEach(function (el) {
                    selectionArr.push(el);
                });
                this.$emit('commitSelection', selectionArr);
            },
            pushDetail(val,prop){
                this.$emit("pushDetail",val,prop)
            },
            filterChange(value) {
                const param = Object.values(value)
                console.log(param[0][0]);
                this.$emit("filterChange",param[0][0])
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-table {
        width: 100%
    }
    .elfdfd{
        background: red
    }
    .time{
        display: block;
        color: #ccc;
    }
    .zhang{
        color: red;
    }
    .die{
        color: green;
    }
    .cursor{
        cursor: pointer;
    }
    .color333{
        color:#606266;
    }
</style>
