<template>
  <div>
    <div class="account-container">
      <!-- <div class="account-pass">
        原密码：
        <el-input placeholder="请输入密码" v-model="oldpassword" show-password style="width:220px"></el-input>
      </div>
      <p style='font-size:12px;color:'#f56c6c''>{{showerrmessage1}}</p>
      <div class="account-pass">
        新密码：
        <el-input placeholder="请输入密码" v-model="newpassword1" show-password style="width:220px"></el-input>
        <p>{{showerrmessage1}}</p>
      </div>
      <div class="account-pass">
        新密码：
        <el-input placeholder="请输入密码" v-model="newpassword2" show-password style="width:220px"></el-input>
        <p>{{showerrmessage1}}</p>
      </div>
      -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码">
          <el-input type="password" v-model="password" show-password></el-input>
          <p style='font-size:12px;color:#F56C6C'>{{msg}}</p>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" show-password autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" show-password autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { updateUserPassword } from "@/api/user";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      //  let tes = new RegExp("^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$");
      // let tes= new RegExp('^[0-9]{6}$')
      // let vv = tes.test(value);
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6 || value.length > 20) {
        callback(new Error("密码长度为6到20位!"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      password: "",
      msg:""
    };
  },
  mounted() {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            oldPassword: this.password,
            newPassword: this.ruleForm.pass
          };
          updateUserPassword(params).then(res => {
            if (res.data.code == "0000") {
              this.$msg("success", "修改成功");
               this.msg=''
            }else{
              this.msg=res.data.message
            }
          });
        } else {
          this.$msg("error", res.data.data.message);
          return false;
        }
      });
    }
  },
  watch: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel='stylesheet/scss' lang='scss' scoped>
.account-container {
  height: 500px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 垂直居中 */
  .account-pass {
    display: flex;
    margin-top: 20px;
    line-height: 40px;
  }
}
</style>
