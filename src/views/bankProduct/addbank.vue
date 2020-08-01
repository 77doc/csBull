<template>
  <div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" :before-close="handleClose">
      <span>银行名称</span>
      <el-input v-model="name" style="width:200px;margin-left:20px;margin-right:20px"></el-input>
      <span>{{name.length}}/12</span>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose()">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addBank,editBank} from "@/api/bank";
export default {
  props: ["bankstatus",'bankid','bankname'],
  data() {
    return {
      dialogVisible: false,
      name: "",
      dialogTitle:"新增银行"
    };
  },
  methods: {
    handleClose(done) {
      this.$emit("closedialog");
    },
    submit(){
        if(this.bankstatus ==1){
            this._addbank()
        }else if(this.bankstatus==2){
            this._editBank()
        }
    },
    _addbank(){
        let params={
            bankName:this.name
        }
        addBank(params).then(res =>{
            if(res.data.code == '0000'){
                //this.$msg('success','添加成功')
                this.$emit("closedialog");
            }else{
                 //this.$msg('error',res.data.message)
            }
        })
    },
    _editBank(){
        let params ={
            bankName:this.name,
            id:this.bankid
        }
        editBank(params).then(res =>{
            if(res.data.code == '0000'){
                //this.$msg('success','添加成功')
                this.$emit("closedialog");
            }else{
                //this.$msg('error',res.data.message)
            }
        })
    }
  },
  watch: {
    //0为隐藏并且初始化 1是增加  2是编辑
    bankstatus() {
      if (this.bankstatus == 1) {
        this.dialogVisible = true;
        this.dialogTitle='新增银行'
      } else if (this.bankstatus == 2) {
        this.dialogVisible = true;
        this.name=this.bankname
        this.dialogTitle='编辑银行'
      } else if (this.bankstatus == 0) {
        (this.dialogVisible = false), (this.name = "");
      }
    },
    name() {
      this.name = this.name.substring(0, 12);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>